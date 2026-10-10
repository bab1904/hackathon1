import React from 'react';
import AshaTriageDashboard from '../components/AshaTriageDashboard';

export default function HealthWorkerDemo({
  lang = "te",
  onSwitchStage,
  onNavigatePage
}) {
  return (
    <AshaTriageDashboard
      profile={{ stage: "asha" }}
      onSwitchStage={onSwitchStage || (() => {})}
      onNavigatePage={onNavigatePage || (() => {})}
      lang={lang}
    />
  );
}
