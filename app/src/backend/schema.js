export function normalizeConfidence(value) {
  const n = Number(value);
  if (Number.isNaN(n)) {
    return 0;
  }
  return Math.max(0, Math.min(100, Math.round(n)));
}

export function withRiskAndOrder(results) {
  const normalized = results.map((r) => {
    const confidencePercent = normalizeConfidence(r.confidencePercent);
    return {
      name: String(r.name || ""),
      reason: String(r.reason || ""),
      confidencePercent,
      risk: confidencePercent < 70 ? "at_risk" : "safe"
    };
  });

  normalized.sort((a, b) => b.confidencePercent - a.confidencePercent);
  return normalized.slice(0, 3);
}

export function buildResponse(results) {
  const ranked = withRiskAndOrder(results);

  while (ranked.length < 3) {
    ranked.push({
      name: "Suggerimento non disponibile",
      reason: "Dati insufficienti per un abbinamento valido.",
      confidencePercent: 0,
      risk: "at_risk"
    });
  }

  const topPick = ranked[0];
  const alternatives = ranked.slice(1, 3);

  const globalAdvisory =
    topPick.confidencePercent < 70
      ? "Informazioni insufficienti: il consiglio e' puramente indicativo."
      : null;

  return {
    topPick,
    alternatives,
    globalAdvisory,
    generatedAt: new Date().toISOString()
  };
}
