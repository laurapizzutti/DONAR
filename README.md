# DONAR

Plataforma que conecta colaboradores a instituições para agendar doações.

- `front/` – páginas HTML/CSS/JS
- `back/` – API Node.js (Express)
- `api/` + `vercel.json` – configuração para publicar na Vercel
- `banco/` – script SQL de referência (as tabelas são criadas automaticamente ao iniciar a API)

## Colocar na nuvem (grátis, sem Workbench)

São dois serviços: um **banco MySQL na nuvem** e o **servidor** que roda a API e o site.

### 1. Criar o banco (TiDB Cloud — compatível com MySQL)

1. Crie uma conta em <https://tidbcloud.com> e crie um cluster **Starter** (gratuito).
2. Abra o cluster → **Connect**. Em *Connect With*, escolha **General**.
3. Clique em **Generate Password** e anote a senha.
4. Crie o banco: na aba **SQL Editor** rode `CREATE DATABASE DONAR_MVP;`
5. Monte a URL de conexão com os dados mostrados na tela:
   ```
   mysql://USUARIO:SENHA@HOST:4000/DONAR_MVP
   ```
   (o usuário tem o formato `xxxxxxxx.root`; o host termina em `tidbcloud.com`).

### 2. Publicar na Vercel

1. Em <https://vercel.com>, abra o projeto **donar** (ou **Add New → Project** e importe este repositório).
2. Em **Settings → General**, deixe **Root Directory** vazio (raiz do repositório) e
   **Framework Preset** como **Other**. O resto vem do `vercel.json`.
3. Em **Settings → Environment Variables**, crie `DATABASE_URL` com a URL do passo anterior
   (marque Production, Preview e Development).
4. Vá em **Deployments** e clique em **Redeploy** no último deploy.
5. O site fica em `https://donar-XXXX.vercel.app`.

As tabelas são criadas sozinhas no primeiro acesso.
Cada `git push` na branch `main` gera um novo deploy automaticamente.

## Rodar localmente

```bash
cd back
cp .envexample .env   # ajuste os dados do seu MySQL (ou cole a DATABASE_URL da nuvem e apague DB_SSL)
npm install
npm run dev
```

Acesse <http://localhost:3001>.
