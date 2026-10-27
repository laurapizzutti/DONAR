# DONAR

Plataforma que conecta colaboradores a instituições para agendar doações.

- `front/` – páginas HTML/CSS/JS
- `back/` – API Node.js (Express) que também entrega o front
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

### 2. Publicar o servidor (Render)

1. Crie uma conta em <https://render.com> entrando com o GitHub.
2. **New → Blueprint** e selecione este repositório. O Render lê o `render.yaml`.
3. Quando pedir `DATABASE_URL`, cole a URL do passo anterior e confirme.
4. Aguarde o deploy. O site fica em `https://donar-XXXX.onrender.com`
   e a documentação da API em `/api-docs`.

As tabelas são criadas sozinhas na primeira vez que o servidor sobe.
Cada `git push` na branch configurada gera um novo deploy automaticamente.

> No plano gratuito do Render o servidor "dorme" após 15 min sem acesso;
> a primeira visita depois disso demora uns 30–50 segundos.

## Rodar localmente

```bash
cd back
cp .envexample .env   # ajuste os dados do seu MySQL (ou cole a DATABASE_URL da nuvem)
npm install
npm run dev
```

Acesse <http://localhost:3001>.
