# MemoHealthcare

## Table of Contents
- [Introduzione](#introduzione)
- [Features per utenti](#features-per-utenti)
- [Tecnologie utilizzate](#tecnologie-utilizzate)
- [Pacchetti Installati](#pacchetti-installati)
- [Struttura del progetto](#struttura-del-progetto)
- [Installazione](#installazione)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Documentazione](#documentazione)

## Introduzione
Benvenuti in **MemoHealthcare**! Questa applicazione web è stata progettata per aiutare gli utenti, soprattutto gli anziani, a gestire facilmente i propri promemoria sanitari quotidiani. 

L'applicazione permette agli utenti di:
- Gestire i promemoria dei farmaci con orari personalizzati
- Organizzare appuntamenti medici
- Tenere traccia degli esami da effettuare
- Visualizzare e modificare il proprio profilo personale

Una volta effettuato il login, l'utente può accedere ad un'interfaccia intuitiva dove aggiungere, modificare ed eliminare promemoria, appuntamenti ed esami, mantenendo tutte le informazioni sulla propria salute in un unico spazio sicuro.

## Features per utenti
- **Registrazione e Login**: Crea un account personale utilizzando il codice fiscale e un PIN di almeno 4 cifre
- **Gestione Farmaci**: Aggiungi promemoria per i tuoi farmaci con frequenza personalizzata (1, 2 o 3 volte al giorno) e orari specifici
- **Gestione Appuntamenti**: Organizza i tuoi appuntamenti medici con titolo, data, ora e note opzionali
- **Gestione Esami**: Tieni traccia degli esami medici da effettuare
- **Profilo Personale**: Visualizza e modifica i tuoi dati personali (nome, cognome, data di nascita, PIN)
- **Pannello di Gestione**: Interfaccia centralizzata per modificare o eliminare tutti i tuoi dati
- **Responsive Design**: Interfaccia ottimizzata per desktop, tablet e mobile
- **Autenticazione Sicura**: Sistema di autenticazione basato su JWT con cookie httpOnly

## Tecnologie utilizzate
### Frontend
- **Vue.js 3** - Framework JavaScript progressivo
- **Vite** - Build tool e dev server
- **Vue Router** - Routing per Single Page Application
- **TypeScript** - Superset tipizzato di JavaScript
- **Axios** - Client HTTP per chiamate API
- **CSS/SCSS** - Gestione dello stile

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web per Node.js
- **TypeScript** - Sviluppo backend tipizzato
- **MySQL** - Database relazionale
- **mysql2** - Driver MySQL per Node.js

### Autenticazione e Sicurezza
- **bcrypt** - Hashing delle password (PIN)
- **jsonwebtoken (JWT)** - Gestione token di autenticazione
- **cookie-parser** - Parsing dei cookie

## Pacchetti Installati

### Backend
```json
{
  "express": "Web framework",
  "mysql2": "Driver MySQL con supporto Promise",
  "typescript": "Supporto TypeScript",
  "bcrypt": "Hashing PIN utente",
  "jsonwebtoken": "Generazione e verifica JWT",
  "cookie-parser": "Parsing cookie HTTP",
  "body-parser": "Parsing body delle richieste",
  "cors": "Gestione CORS",
  "connect-history-api-fallback": "Supporto SPA routing"
}
```

### Frontend
```json
{
  "vue": "Framework frontend",
  "vue-router": "Routing applicazione",
  "axios": "Client HTTP",
  "typescript": "Supporto TypeScript",
  "vite": "Build tool"
}
```

## Struttura del progetto
```
MemoHealthcare/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth-controller.ts
│   │   │   ├── users-controller.ts
│   │   │   ├── reminders-controller.ts
│   │   │   ├── appointments-controller.ts
│   │   │   └── esami-controller.ts
│   │   ├── routes/
│   │   │   ├── auth-routes.ts
│   │   │   ├── users-routes.ts
│   │   │   ├── reminders-routes.ts
│   │   │   ├── appointments-routes.ts
│   │   │   └── esami-routes.ts
│   │   ├── middleware/
│   │   │   └── auth-middleware.ts
│   │   └── utils/
│   │       ├── db.ts
│   │       └── auth.ts
│   └── app.ts
│
├── frontend/
│   ├── src/
│   │   ├── views/
│   │   │   ├── Welcome.vue
│   │   │   ├── Login.vue
│   │   │   ├── Register.vue
│   │   │   ├── Home.vue
│   │   │   ├── Profilo.vue
│   │   │   ├── Farmaci.vue
│   │   │   ├── Appuntamenti.vue
│   │   │   ├── Esami.vue
│   │   │   └── Gestione.vue
│   │   ├── components/
│   │   │   └── layout/
│   │   │       ├── AppMenu.vue
│   │   │       ├── AppHero.vue
│   │   │       └── AppFooter.vue
│   │   ├── router/
│   │   │   └── index.ts
│   │   ├── assets/
│   │   │   └── auth.css
│   │   ├── axios.ts
│   │   └── App.vue
│   └── package.json
│
└── README.md
```

## Installazione

### Prerequisiti
- **Node.js** (versione 14 o superiore)
- **npm** (incluso con Node.js)
- **MySQL** (versione 5.7 o superiore)
- **XAMPP** o altro ambiente per MySQL (opzionale)

### Passaggi di installazione

1. **Clona il repository**
   ```bash
   git clone https://github.com/assmaamatouk/memohealthcare-.git
   cd MemoHealthcare
   ```

2. **Installa le dipendenze del backend**
   ```bash
   cd backend
   npm install
   ```

3. **Installa le dipendenze del frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Avvia l'applicazione**
   
   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   Il server sarà disponibile su `http://localhost:3000`
   
   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
   L'applicazione sarà disponibile su `http://localhost:5173`

5. **Accedi all'applicazione**
   
   Apri il browser e vai su `http://localhost:5173`

## API Endpoints

GET
- `/api/auth/profile`
- `/api/users/me`
- `/api/reminders/user`
- `/api/appointments`
- `/api/esami/esami`

POST
- `/api/auth/register`
- `/api/auth/login`
- `/api/auth/logout`
- `/api/reminders`
- `/api/appointments`
- `/api/esami`

PUT
- `/api/users/me`
- `/api/reminders/:id`
- `/api/appointments/:id`
- `/api/esami/:id`

DELETE
- `/api/reminders/:id`
- `/api/appointments/:id`
- `/api/esami/:id`

## Database

Il database memohealthcare, gestito tramite https://www.phpmyadmin.net/, è il cuore dell'applicazione e raccoglie tutti i dati degli utenti junto ai loro promemoria per farmaci, appuntamenti ed esami. La connessione al database viene stabilita nel file db.ts, presente nella cartella utils dentro src del backend, permettendo di recuperare e visualizzare correttamente le informazioni. La struttura è basata su 4 tabelle distinte, legate tra loro da foreign key, che garantiscono l'integrità dei dati. La sicurezza degli utenti è assicurata dal hashing dei PIN con bcrypt e dalla gestione delle sessioni tramite JWT.

## Documentazione

### Risorse utili
- **Vue.js**: https://vuejs.org/guide/introduction.html
- **Vue Router**: https://router.vuejs.org/
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Express**: https://expressjs.com/
- **MySQL**: https://dev.mysql.com/doc/
- **JWT**: https://jwt.io/introduction
- **bcrypt**: https://www.npmjs.com/package/bcrypt

---

**Progetto realizzato per**: Ingegneria dei Sistemi Web - 2025/2026
