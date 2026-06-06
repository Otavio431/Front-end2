# 🚀 Site Base

Base reutilizável para criar novos sites. Inclui:

- ✅ Servidor **Express** já configurado
- ✅ **Auto `npm install`** – ao rodar `npm start`, se as dependências não estiverem instaladas, ele instala sozinho
- ✅ Sistema simples de **API** (`/api`)
- ✅ Conexão com **Firebase** pronta (Admin SDK + Firestore)
- ✅ Frontend estático em `/public` (HTML + CSS + JS)

---

## ▶️ Como usar

```bash
npm start
```

Pronto. Na primeira execução ele instala as dependências automaticamente e sobe o servidor em **http://localhost:3000**.

---

## 📁 Estrutura

```
site-base/
├── install-and-start.js   # roda npm install se precisar, depois inicia o server
├── server.js              # servidor Express
├── package.json
├── .env.example           # copie para .env e preencha
├── config/
│   └── firebase.js        # conexão Firebase
├── routes/
│   └── api.js             # rotas da API
└── public/                # frontend
    ├── index.html
    ├── style.css
    └── app.js
```

---

## 🔥 Configurar Firebase (opcional)

Você tem **2 opções**:

**Opção 1 – arquivo JSON**
1. No Firebase Console: *Project Settings → Service accounts → Generate new private key*
2. Salve o arquivo como `config/serviceAccountKey.json`

**Opção 2 – variáveis de ambiente**
1. Copie `.env.example` para `.env`
2. Preencha `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL` e `FIREBASE_PRIVATE_KEY`

> Se não configurar nada, o servidor sobe normalmente — só as rotas que usam Firebase ficarão indisponíveis.

---

## 🛣️ Rotas da API já prontas

| Método | Rota          | Descrição                          |
|--------|---------------|------------------------------------|
| GET    | `/api`        | Status da API                      |
| GET    | `/api/ping`   | Teste rápido                       |
| POST   | `/api/echo`   | Devolve o body recebido            |
| GET    | `/api/items`  | Lista coleção `items` (Firestore)  |
| POST   | `/api/items`  | Cria documento em `items`          |

---

## 🧱 Como usar como base para outros sites

1. Copie a pasta inteira e renomeie
2. Ajuste o `name` no `package.json`
3. Edite `public/` para o novo design
4. Adicione novas rotas em `routes/api.js`

Pronto pra escalar. 🚀
