import React, { useState } from 'react';
import { ShieldAlert, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';

export default function SafetyNotice({ lang = "te" }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-amber-50/90 border-b border-amber-200 text-amber-950 px-4 py-2.5 text-xs transition-all duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-medium">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            {lang === "te" ? (
              <>
                <strong>వైద్య సమాచార గమనిక:</strong> గ్రామమా AI సాధారణ సమాచారం & సహాయాన్ని మాత్రమే అందిస్తుంది. ఇది రోగ నిర్ధారణ చేయదు లేదా డాక్టరుకు ప్రత్యామ్నాయం కాదు.
              </>
            ) : (
              <>
                <strong>Healthcare Safety Notice:</strong> GramaMaa AI provides educational guidance only. It does not diagnose diseases, prescribe medication, or replace a doctor.
              </>
            )}
          </span>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-amber-800 hover:text-amber-950 font-semibold underline flex items-center gap-1 shrink-0 ml-2"
          aria-expanded={expanded}
        >
          {expanded ? (lang === "te" ? "తక్కువ చూడండి" : "Less") : (lang === "te" ? "పూర్తి వివరాలు" : "Safety Policy")}
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {expanded && (
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-amber-200/70 text-amber-900 leading-relaxed text-[11px]">
          {lang === "te" ? (
            <p>
              ఈ అప్లికేషన్ గర్భస్రావాన్ని నిర్ధారించదు, పిండం ఆరోగ్యాన్ని హామీ ఇవ్వదు మరియు మందులు రాయదు. ఏదైనా రక్తస్రావం, తీవ్రమైన కడుపు నొప్పి, లేదా అసాధారణ లక్షణాలు కనిపిస్తే తక్షణం అత్యవసర విభాగం (112) లేదా మీ సమీప ఆసుపత్రికి వెళ్లండి. డాక్టర్ సూచించిన ప్రిస్క్రిప్షన్ ప్రకారమే మందులు వేసుకోండి.
            </p>
          ) : (
            <p>
              This platform never claims to diagnose miscarriage, guarantee fetal viability, or prescribe dosages. In case of vaginal bleeding, severe abdominal pain, high fever, or labor warning signs, immediately contact emergency services (112 / 108) or visit your nearest hospital. Always take medications strictly as prescribed by your registered doctor.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
