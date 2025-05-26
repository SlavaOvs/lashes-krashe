import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Разрешаем запросы *только* с GitHub-Pages-домена.
 *  – если нужно добавить ещё origin (например Codespaces-превью),
 *    укажите массив: origin: ['https://slavaovs.github.io', 'https://*.preview.app.github.dev']
 */
app.use(
  cors({
    origin: 'https://slavaovs.github.io',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: false // сделайте true, если позже появятся куки/сессии
  })
);

app.use(express.json());

app.options('*', cors()); // обрабатываем pre-flight OPTIONS

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => console.log('API listening on', PORT));
