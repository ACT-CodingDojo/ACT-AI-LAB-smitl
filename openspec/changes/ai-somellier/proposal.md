## Why

L'applicazione AiSomellier mira a semplificare la scelta del vino per utenti senza competenze enologiche, offrendo consigli personalizzati basati su parametri come tipo di pasto, evento, momento della giornata e stagione. Questo risolve il problema della difficoltà nella selezione di vini adatti, rendendo accessibile l'esperienza anche a principianti.

## What Changes

- Introduzione di una nuova applicazione web chiamata AiSomellier.
- Implementazione di un sistema di suggerimento vini basato su regole statiche iniziali, con possibilità futura di fuzzy logic o AI LLM.
- Creazione di un catalogo base di abbinamenti cibo-vini.
- Architettura a tre livelli: database leggero (SQLite), backend in C# (ASP.NET Core), frontend in TypeScript.

## Capabilities

### New Capabilities
- `wine-recommendation`: Sistema per suggerire vini adatti basati su contesto pasto, evento e stagione, con logica di matching e output di consigli con descrizione.

### Modified Capabilities
<!-- Nessuna modifica a capabilities esistenti -->

## Impact

- Nuovo progetto senza impatto su codice esistente.
- Dipendenze: SQLite, ASP.NET Core, framework frontend TypeScript (es. React o Blazor).
- Nessun sistema esistente interessato.</content>
<parameter name="filePath">/home/daniel/Workspaces/ACT-AI-LAB-smitl/openspec/changes/ai-somellier/proposal.md