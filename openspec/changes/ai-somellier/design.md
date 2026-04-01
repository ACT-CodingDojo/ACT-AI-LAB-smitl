## Context

L'applicazione AiSomellier è un nuovo progetto web per fornire consigli personalizzati su vini basati su contesto utente (pasto, evento, stagione). L'architettura proposta è a tre livelli per semplicità e modularità: database leggero, backend API, frontend web.

## Goals / Non-Goals

**Goals:**
- Implementare un sistema di suggerimento basato su regole statiche iniziali.
- Creare un catalogo base di vini e abbinamenti.
- Fornire un'interfaccia web semplice per input parametri e output consigli.
- Strutturare il codice per future estensioni (fuzzy logic, AI LLM).

**Non-Goals:**
- Supporto per preferenze utente personalizzate (budget, gusti).
- Integrazione AI o modelli avanzati nella fase iniziale.
- Gestione cronologia o profili utente.

## Decisions

- **Backend**: ASP.NET Core in C# per API RESTful, logica di matching regole.
- **Database**: SQLite per leggerezza e semplicità, con seed data per catalogo vini.
- **Frontend**: TypeScript con framework leggero (Blazor o React/Vite) per form input e display risultati.
- **Logica suggerimento**: Regole statiche basate su mapping parametri → vini, con possibilità futura di fuzzy logic.
- **Deployment**: Applicazione standalone, no cloud obbligatorio.

Alternative considerate: Node.js per backend (scartato per familiarità C#), PostgreSQL (troppo pesante per MVP).

## Risks / Trade-offs

- **Accuratezza regole**: Regole statiche potrebbero non coprire tutti casi → Mitigazione: catalogo espandibile, feedback utente futuro.
- **Scalabilità**: SQLite limitato per grandi cataloghi → Mitigazione: facile migrazione a SQL Server se necessario.
- **UX semplicità**: Form basico potrebbe sembrare limitato → Mitigazione: design intuitivo, espansione futura.</content>
<parameter name="filePath">/home/daniel/Workspaces/ACT-AI-LAB-smitl/openspec/changes/ai-somellier/design.md