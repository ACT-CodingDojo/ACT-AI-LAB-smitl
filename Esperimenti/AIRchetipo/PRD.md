# AiSommelier - Product Requirements Document

**Author:** AIRchetipo
**Date:** 2026-03-31
**Version:** 1.0

---

## Elevator Pitch

> AiSommelier è l'app che trasforma la foto di un piatto in un consiglio di vino immediato, comprensibile e motivato.
>
> For **appassionati di vino senza formazione enologica**, who has the problem of **non sapere quale vino abbinare al pasto senza dover cercare online o chiedere al sommelier**, **AiSommelier** is a **web app mobile-first** that **suggerisce il vino giusto in pochi secondi a partire da una foto, un testo o un vocale, spiegando anche il perché dell'abbinamento**. Unlike **una ricerca su Google o un'app di catalogazione vini**, our product **non richiede nessuna conoscenza di partenza e risponde nel momento esatto in cui ne hai bisogno — al ristorante o in cucina**.

---

## Vision

AiSommelier vuole essere il compagno tascabile di chiunque ami il vino senza essere un esperto. L'app elimina l'imbarazzo del "non so cosa ordinare" e trasforma ogni pasto in un'occasione per scoprire qualcosa di nuovo sul mondo del vino italiano, in modo naturale e senza pressione.

### Product Differentiator

Il differenziatore principale è la combinazione di **input multimodale** (foto, testo, voce) con un output che non si limita al consiglio, ma **educa l'utente spiegando il perché dell'abbinamento** — prima in modo semplice, poi con approfondimento tecnico per chi vuole saperne di più. Il tutto senza registrazione, senza database, senza barriere d'ingresso.

---

## User Personas

### Persona 1: Marco

**Role:** Curioso sociale — usa l'app principalmente al ristorante
**Age:** 34 | **Background:** Lavora in un'agenzia creativa, estroverso, vita sociale attiva

**Goals:**
- Scegliere un vino adeguato al pasto senza fare brutta figura
- Capire abbastanza da poter fare una scelta autonoma davanti al menu
- Scoprire etichette nuove senza dover studiare

**Pain Points:**
- Si sente in difficoltà quando il sommelier o i colleghi aspettano una scelta
- Non sa distinguere un abbinamento buono da uno mediocre
- Le app di vino esistenti sono troppo tecniche o richiedono troppo tempo

**Behaviors & Tools:**
- Usa lo smartphone per tutto, prevalentemente in mobilità
- Apre app solo se la risposta arriva in pochi secondi
- Condivide scoperte via WhatsApp o storie Instagram

**Motivations:** Fare bella figura in contesti sociali, curiosità leggera verso il mondo del vino
**Tech Savviness:** Alta — adotta nuove app facilmente, bassa tolleranza per la complessità

#### Customer Journey - Marco

| Phase | Action | Thought | Emotion | Opportunity |
|---|---|---|---|---|
| Awareness | Un amico gli mostra l'app al ristorante | "Figo, funziona davvero con la foto?" | Curioso, sorpreso | Effetto wow immediato — il primo contatto deve stupire |
| Consideration | Scatta una foto al menu o al piatto | "Quanto ci mette? Sarà preciso?" | Leggermente scettico | Risposta rapida e visivamente curata = fiducia istantanea |
| First Use | Riceve il consiglio con esempi e spiegazione semplice | "Ah, capito! È più facile di quanto pensassi" | Soddisfatto, leggero | La spiegazione semplice deve essere memorabile, non didascalica |
| Regular Use | Apre l'app ogni volta che va al ristorante | "Ormai è un'abitudine, mi fido" | Rilassato, sicuro | Coerenza dei risultati nel tempo |
| Advocacy | Lo consiglia agli amici o lo mostra a tavola | "Dai, provalo anche tu" | Orgoglioso | Il momento di condivisione a tavola è il vettore di crescita principale |

---

### Persona 2: Giulia

**Role:** Cuoca del weekend — usa l'app prevalentemente a casa
**Age:** 41 | **Background:** Insegnante, appassionata di cucina, acquista vino in enoteca locale o supermercato

**Goals:**
- Trovare il vino giusto da abbinare a quello che cucina nel weekend
- Capire i principi degli abbinamenti per migliorare nel tempo
- Fare bella figura quando ha ospiti a cena

**Pain Points:**
- Al supermercato è sommersa da etichette e non sa orientarsi
- Vorrebbe capire il "perché" degli abbinamenti, non solo ricevere un consiglio
- Le risorse online sono spesso troppo generiche o troppo tecniche

**Behaviors & Tools:**
- Smartphone e tablet a casa, cerca ispirazione culinaria su YouTube e Instagram
- Ha tempo per leggere e approfondire
- Condivide ricette e scoperte su WhatsApp con amici

**Motivations:** Crescita personale culinaria, fare bella figura con gli ospiti, piacere della scoperta
**Tech Savviness:** Media — usa lo smartphone con disinvoltura ma preferisce interfacce semplici

#### Customer Journey - Giulia

| Phase | Action | Thought | Emotion | Opportunity |
|---|---|---|---|---|
| Awareness | Trova l'app tramite un amico o un gruppo di cucina | "Potrebbe essere utile quando cucino nel weekend" | Incuriosita | Il passaparola è il canale principale — l'app deve valere la raccomandazione |
| Consideration | Prova a fotografare un piatto che ha appena cucinato | "Vediamo se riconosce quello che ho fatto" | Aspettativa moderata | Il riconoscimento del piatto deve essere preciso anche per piatti casalinghi |
| First Use | Legge la spiegazione semplice e poi apre l'approfondimento | "Ah, non l'avevo mai pensata così. Interessante." | Soddisfatta, curiosa | La spiegazione tecnica deve aggiungere valore reale, non essere solo padding |
| Regular Use | Usa l'app ogni weekend prima di andare in enoteca | "Ormai so già cosa cercare quando arrivo in enoteca" | Competente, autonoma | L'app diventa un trampolino verso una maggiore autonomia enologica |
| Advocacy | Consiglia l'app alle amiche che cucinano | "È proprio utile, semplice ma ti insegna qualcosa" | Orgogliosa, generosa | Il tono educativo dell'app è il motore del passaparola per questo segmento |

---

## Brainstorming Insights

> Key discoveries and alternative directions explored during the inception session.

### Assumptions Challenged

- **"L'utente vuole solo un consiglio rapido"** → Sfidato da Costanza: l'utente curioso vuole anche capire il perché. La spiegazione non è un optional, è parte del valore principale del prodotto.
- **"Il prodotto è solo utile a casa"** → Il contesto ristorante è altrettanto rilevante, con vincoli diversi (velocità, discrezione). L'input multimodale nasce proprio da questa sfida.
- **"Basta riconoscere il piatto dalla foto"** → Al ristorante l'utente ordina prima che arrivi il piatto: servono anche input testuale e vocale per descrivere ciò che intende ordinare.

### New Directions Discovered

- **Educazione progressiva:** l'app non è solo uno strumento, è un percorso di apprendimento leggero. Ogni consiglio insegna qualcosa senza forzare.
- **Input multimodale come differenziatore UX:** la combinazione foto + testo + voce abbassa radicalmente la barriera d'ingresso rispetto alle app esistenti.
- **Contenuto visivo shareable (escluso dall'MVP):** una card visivamente curata con piatto + vino + spiegazione potrebbe diventare un vettore di crescita organica sui social. Da valutare post-MVP.

---

## Product Scope

### MVP - Minimum Viable Product

- Input del piatto tramite foto (galleria o fotocamera), testo libero o voce
- Possibilità di combinare più modalità di input per aggiungere contesto
- Riconoscimento del piatto tramite AI (OpenRouter) con score di confidenza (0–100)
- Banner di avviso visibile quando la confidenza è inferiore al 70%
- Output: tipo di vino consigliato + almeno 3 esempi di vini italiani famosi, presentati graficamente
- Spiegazione semplice visibile immediatamente
- Sezione "Approfondisci" espandibile con spiegazione tecnica dettagliata
- Rendering progressivo del risultato (streaming)
- Interfaccia mobile-first, accessibile da browser senza installazione
- Nessun database, nessuna autenticazione, nessuna raccolta di dati utente

### Growth Features (Post-MVP)

- Storico degli abbinamenti dell'utente (locale, senza account)
- Card shareable visivamente curata (piatto + vino + spiegazione)
- Supporto per cucine regionali italiane con contestualizzazione geografica
- Suggerimenti su fascia di prezzo o tipologia (biologico, naturale, ecc.)

### Vision (Future)

- Espansione ai vini internazionali
- Modalità "sommelier": percorso educativo strutturato per chi vuole approfondire
- Integrazione con enoteche locali o e-commerce per disponibilità bottiglie
- Community di abbinamenti condivisi dagli utenti

---

## Technical Architecture

> **Proposed by:** Leonardo (Architect)

### System Architecture

L'applicazione è una web app **mobile-first** accessibile da browser, senza necessità di installazione. L'architettura è volutamente semplice: un singolo progetto Next.js gestisce sia il frontend che le API Routes che fungono da backend leggero verso OpenRouter.

**Architectural Pattern:** Monolite modulare (Next.js fullstack)

**Main Components:**
- **Frontend (App Router Next.js):** pagina di input e pagina di risultato
- **API Route `/api/analizza`:** riceve l'input dell'utente, chiama OpenRouter, restituisce il risultato strutturato in JSON
- **OpenRouter:** provider AI che espone modelli con capacità vision per il riconoscimento del piatto e modelli LLM per la generazione del consiglio e delle spiegazioni
- **Web Speech API:** gestione dell'input vocale lato browser, zero dipendenze esterne

### Technology Stack

| Layer | Technology | Version | Rationale |
|---|---|---|---|
| Language | TypeScript | 5.x | Type safety, migliore DX, standard de-facto con Next.js |
| Backend Framework | Next.js API Routes | 14.x | Nessun server separato, sufficiente per questo scope |
| Frontend Framework | Next.js (App Router) | 14.x | SSR, routing semplice, ottimo supporto mobile |
| Styling | Tailwind CSS | 3.x | Veloce, responsive by default, nessun runtime CSS |
| Database | Nessuno | — | MVP senza persistenza dati |
| ORM | Nessuno | — | Nessun database nel MVP |
| Auth | Nessuna | — | App pubblica, nessun account utente |
| Testing | Da definire in implementazione | — | — |

### Project Structure

**Organizational pattern:** Feature-based, cartelle per componente UI e per layer AI

```text
/app
  /page.tsx                  # Home — schermata di input
  /risultato/page.tsx        # Schermata risultato abbinamento
  /api
    /analizza/route.ts       # Endpoint principale: riceve input, chiama OpenRouter, restituisce JSON
/components
  /InputPiatto/              # Componenti per upload foto, input testo, input voce
  /RisultatoVino/            # Card risultato, accordion spiegazione tecnica, banner avviso
/lib
  /openrouter.ts             # Client OpenRouter e definizione prompt
/public
/types
  /index.ts                  # Tipi condivisi (RisultatoAbbinamento, ecc.)
.env.local.example
```

### Development Environment

Ambiente locale Node.js standard. Nessuna dipendenza da servizi esterni oltre a OpenRouter.

**Required tools:** Node.js 20+, npm o pnpm, chiave API OpenRouter

### CI/CD & Deployment

**Build tool:** Next.js (built-in)

**Pipeline:** Push su `main` → build automatica su Vercel → deploy

**Deployment:** Vercel (piano Hobby, gratuito per progetti personali)

**Target infrastructure:** Vercel Edge Network

### Architecture Decision Records (ADR)

**ADR-01 — OpenRouter al posto di OpenAI diretto**
Motivazione: flessibilità nella scelta del modello e ottimizzazione dei costi per un hobby project. La client API è compatibile con l'interfaccia OpenAI (stesso SDK, cambio di `baseURL`). Il modello specifico viene configurato tramite variabile d'ambiente e può essere cambiato senza modificare il codice.

**ADR-02 — Monolite Next.js senza backend separato**
Motivazione: il volume di richieste atteso è basso, la logica backend è semplice (una chiamata AI per richiesta). Un'architettura separata aggiunge complessità senza benefici nel contesto di un hobby project.

**ADR-03 — Strategia di prompt (assunzione aperta)**
La chiamata ad OpenRouter può essere strutturata come una singola chiamata (riconoscimento + abbinamento in un unico prompt) o due chiamate separate (prima riconosce il piatto, poi genera il consiglio). La scelta è lasciata alla fase implementativa in base alle performance del modello scelto.

---

## Harness Blueprint

> **Proposed by:** Leonardo (Architect)
>
> Questa sezione definisce il contesto operativo necessario affinché un agente AI possa implementare il codice in modo affidabile e coerente.

### Context Map

| Componente | Responsabilità | Confine |
|---|---|---|
| `/app/page.tsx` | Raccoglie l'input dell'utente (foto, testo, voce) | Nessuna logica AI — solo UI e raccolta dati |
| `/app/risultato/page.tsx` | Mostra il risultato ricevuto dall'API | Nessuna logica AI — solo rendering |
| `/api/analizza/route.ts` | Unico punto di contatto con OpenRouter | Tutta la logica AI è qui |
| `/lib/openrouter.ts` | Definisce il client e i prompt | I prompt sono la logica di business — non vanno sparsi nel codice |
| `/types/index.ts` | Definisce lo schema JSON della risposta AI | Unica fonte di verità per il contratto tra API e frontend |

**Schema JSON della risposta AI (contratto obbligatorio):**
```json
{
  "piatto_riconosciuto": "string",
  "confidence": 85,
  "avviso_indicativo": false,
  "tipo_vino": "string",
  "esempi": ["string", "string", "string"],
  "spiegazione_semplice": "string",
  "spiegazione_tecnica": "string"
}
```

### Quality Gates

- TypeScript strict mode attivo (`"strict": true` in `tsconfig.json`)
- ESLint con configurazione Next.js default
- Build Vercel senza errori come gate pre-merge
- Nessun `any` esplicito nel codice di produzione

### Bootstrap Requirements

```bash
# 1. Clona il repository
git clone <repo-url>
cd ai-sommelier

# 2. Installa le dipendenze
npm install

# 3. Configura le variabili d'ambiente
cp .env.local.example .env.local
# Modifica .env.local con:
#   OPENROUTER_API_KEY=<tua-chiave>
#   OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
#   OPENROUTER_MODEL=<modello-scelto>  # es. google/gemini-flash-1.5

# 4. Avvia il server di sviluppo
npm run dev
```

---

## Functional Requirements

### Area 1 — Input del piatto

| ID | Requisito |
|---|---|
| RF-01 | L'utente può caricare una foto del piatto dalla galleria del dispositivo |
| RF-02 | L'utente può scattare una foto direttamente dalla fotocamera |
| RF-03 | L'utente può descrivere il piatto tramite testo libero |
| RF-04 | L'utente può descrivere il piatto tramite input vocale (Web Speech API) |
| RF-05 | L'utente può combinare più modalità di input (es. foto + testo aggiuntivo) per fornire contesto ulteriore |

### Area 2 — Riconoscimento e analisi AI

| ID | Requisito |
|---|---|
| RF-06 | Il sistema invia l'input a OpenRouter e ottiene il riconoscimento del piatto con uno score di confidenza numerico (0–100) |
| RF-07 | Se la confidenza è inferiore al 70%, il sistema imposta `avviso_indicativo: true` |
| RF-08 | Il sistema genera il consiglio di abbinamento vino utilizzando il piatto riconosciuto come contesto |

### Area 3 — Output e presentazione risultato

| ID | Requisito |
|---|---|
| RF-09 | Il risultato mostra in primo piano il tipo di vino consigliato (es. "Vino rosso") |
| RF-10 | Il risultato mostra almeno 3 esempi di vini italiani famosi adatti all'abbinamento, presentati graficamente (non come lista testuale) |
| RF-11 | Il risultato include una spiegazione semplice dell'abbinamento, visibile immediatamente senza interazione aggiuntiva |
| RF-12 | L'utente può espandere una sezione "Approfondisci" per leggere la spiegazione tecnica dettagliata |
| RF-13 | Se `avviso_indicativo: true`, viene mostrato un banner visibile che avverte che il consiglio è puramente indicativo |

### Area 4 — Esperienza d'uso

| ID | Requisito |
|---|---|
| RF-14 | L'interfaccia è ottimizzata per dispositivi mobile (mobile-first) |
| RF-15 | Il risultato viene visualizzato progressivamente (streaming): tipo vino + esempi → spiegazione semplice → sezione approfondimento |

---

## Non-Functional Requirements

### Security

- **RNF-01** L'applicazione non raccoglie né persiste dati personali degli utenti (nessun database, nessuna autenticazione, nessun tracking)
- **RNF-02** La chiave API OpenRouter non deve mai essere esposta al frontend — tutte le chiamate AI avvengono esclusivamente lato server tramite API Route

### Integrations

- **RNF-03** Il tempo di risposta end-to-end (dall'invio dell'input alla visualizzazione del risultato base) deve essere inferiore a 8 secondi in condizioni normali di rete
- **RNF-04** L'integrazione con OpenRouter avviene tramite client compatibile con l'interfaccia OpenAI SDK, configurato con `baseURL` e `OPENROUTER_MODEL` da variabile d'ambiente

---

## Next Steps

1. **Harness Setup** - Run `/airchetipo-harness` to generate the development harness
2. **Backlog** - Ask `airchetipo-inception` to transform this PRD into a backlog
3. **UX Design** - Define detailed interaction flows and wireframes for MVP features
4. **Validation** - Review with stakeholders and test the riskiest assumptions

---

_PRD generated via AIRchetipo Product Inception - 2026-03-31_
_Session conducted by the AIRchetipo team_
