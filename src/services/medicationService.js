// Medication daily adherence logic and compliance tracker

import { storageService } from "./storageService";
import { getTodayKey } from "./dateUtils";

export const medicationService = {
  getTodayStatus(medications, dailyDoses) {
    const today = getTodayKey();
    const todayLogs = (dailyDoses && dailyDoses[today]) || {};

    return medications.filter(m => m.active).map(med => {
      const status = todayLogs[med.id] || "pending";
      return {
        ...med,
        status, // 'taken' | 'missed' | 'pending'
      };
    });
  },

  updateDoseStatus(medId, status, dateKey = null) {
    const targetDate = dateKey || getTodayKey();
    const allDoses = storageService.getDailyDoses();

    if (!allDoses[targetDate]) {
      allDoses[targetDate] = {};
    }

    allDoses[targetDate][medId] = status;
    storageService.saveDailyDoses(allDoses);
    return allDoses;
  },

  calculateAdherence(medications, dailyDoses, daysCount = 7) {
    const activeMeds = medications.filter(m => m.active);
    if (activeMeds.length === 0) return { percentage: 100, takenCount: 0, totalCount: 0, streak: 0, days: [] };

    let totalScheduled = 0;
    let totalTaken = 0;
    const daysSummary = [];
    let currentStreak = 0;
    let streakBroken = false;

    const today = new Date();

    for (let i = 0; i < daysCount; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateKey = d.toISOString().split("T")[0];
      const dayLogs = (dailyDoses && dailyDoses[dateKey]) || {};

      let dayTaken = 0;
      let dayMissed = 0;
      let dayPending = 0;

      activeMeds.forEach(med => {
        const st = dayLogs[med.id] || (i === 0 ? "pending" : "missed");
        if (st === "taken") {
          dayTaken++;
          totalTaken++;
        } else if (st === "missed") {
          dayMissed++;
        } else {
          dayPending++;
        }
        totalScheduled++;
      });

      const allTaken = dayTaken === activeMeds.length;
      if (!streakBroken) {
        if (allTaken) {
          currentStreak++;
        } else if (i > 0) {
          streakBroken = true;
        }
      }

      daysSummary.push({
        dateKey,
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dateNumber: d.getDate(),
        taken: dayTaken,
        missed: dayMissed,
        pending: dayPending,
        total: activeMeds.length,
        status: allTaken ? "completed" : dayMissed > 0 ? "missed" : "partial"
      });
    }

    const percentage = totalScheduled > 0 ? Math.round((totalTaken / totalScheduled) * 100) : 100;

    return {
      percentage,
      takenCount: totalTaken,
      totalCount: totalScheduled,
      streak: currentStreak,
      days: daysSummary.reverse() // chronological order
    };
  }
};
