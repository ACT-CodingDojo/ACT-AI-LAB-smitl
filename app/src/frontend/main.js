const form = document.getElementById("recommendation-form");
const statusEl = document.getElementById("status");
const advisoryEl = document.getElementById("advisory");
const topPickEl = document.getElementById("top-pick");
const alt1El = document.getElementById("alt-1");
const alt2El = document.getElementById("alt-2");

function renderCard(el, title, item) {
  el.innerHTML = `
    <h3>${title}: ${item.name}</h3>
    <div class="meta">
      <span class="badge ${item.risk}">${item.risk === "at_risk" ? "A rischio" : "Affidabile"}</span>
      <span class="badge ${item.risk}">${item.confidencePercent}%</span>
    </div>
    <p>${item.reason}</p>
  `;
  el.classList.remove("hidden");
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  statusEl.textContent = "Elaborazione in corso...";
  advisoryEl.classList.add("hidden");

  const data = new FormData(form);

  try {
    const response = await fetch("/api/recommend", {
      method: "POST",
      body: data
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.message || "Errore nella raccomandazione");
    }

    statusEl.textContent = "Suggerimenti pronti.";

    renderCard(topPickEl, "Suggerimento evidenziato", json.topPick);
    renderCard(alt1El, "Alternativa 1", json.alternatives[0]);
    renderCard(alt2El, "Alternativa 2", json.alternatives[1]);

    if (json.globalAdvisory) {
      advisoryEl.textContent = json.globalAdvisory;
      advisoryEl.classList.remove("hidden");
    }
  } catch (error) {
    statusEl.textContent = `Errore: ${error.message}`;
  }
});
