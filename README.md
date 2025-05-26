# lashes-krashe

Веб‑приложение для записи клиентов на услугу наращивания ресниц.

* **Frontend:** React + Vite (папка `web`)
* **Backend:** Express + TypeScript (папка `server`)
* **CI/CD:** GitHub Actions  
  * `CI` — проверка сборки
  * `Deploy Web` — публикация фронтенда в GitHub Pages

## Запуск в Codespaces

```bash
pnpm i
pnpm dev   # фронт :5173, API :3000
```

## Структура

```
.github/workflows/   # CI и деплой
web/                 # React‑клиент
server/              # Express API
prisma/              # схема БД (пустая)
```
