// Date calculation utilities for maternal and child healthcare

export function calculateGestationalAge(lmpDateStr) {
  if (!lmpDateStr) {
    return { weeks: 24, days: 3, trimester: 2, edd: "2027-01-23", valid: false };
  }

  const lmp = new Date(lmpDateStr);
  const today = new Date();
  
  if (isNaN(lmp.getTime())) {
    return { weeks: 24, days: 3, trimester: 2, edd: "2027-01-23", valid: false };
  }

  // Calculate days difference
  const diffTime = today.getTime() - lmp.getTime();
  const diffDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
  
  const weeks = Math.floor(diffDays / 7);
  const remainingDays = diffDays % 7;

  // Calculate standard Naegele's rule EDD (LMP + 280 days)
  const eddDate = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);
  const eddFormatted = eddDate.toISOString().split("T")[0];

  // Determine Trimester
  let trimester = 1;
  if (weeks >= 13 && weeks <= 27) {
    trimester = 2;
  } else if (weeks >= 28) {
    trimester = 3;
  }

  return {
    weeks: Math.min(42, Math.max(1, weeks)),
    days: remainingDays,
    totalDays: diffDays,
    trimester,
    edd: eddFormatted,
    valid: true
  };
}

export function calculateChildAge(dobStr) {
  if (!dobStr) return { months: 4, days: 10, totalDays: 130, label: "4 Months" };
  const dob = new Date(dobStr);
  const today = new Date();
  if (isNaN(dob.getTime())) return { months: 4, days: 10, totalDays: 130, label: "4 Months" };

  const diffTime = Math.max(0, today.getTime() - dob.getTime());
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const months = Math.floor(totalDays / 30.4375);
  const remainingDays = Math.floor(totalDays % 30.4375);

  return {
    months,
    days: remainingDays,
    totalDays,
    labelEn: months < 1 ? `${totalDays} Days` : `${months} Months ${remainingDays} Days`,
    labelTe: months < 1 ? `${totalDays} రోజులు` : `${months} నెలల ${remainingDays} రోజులు`
  };
}

export function formatDate(dateStr, lang = "en") {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return d.toLocaleDateString(lang === "te" ? 'te-IN' : 'en-IN', options);
  } catch {
    return dateStr;
  }
}

export function getTodayKey() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}
