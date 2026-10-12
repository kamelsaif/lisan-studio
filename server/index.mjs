import { createStudio } from './app.mjs';

const port = Number(process.env.PORT || 4317);
const studio = await createStudio();
const server = studio.app.listen(port, '127.0.0.1', () => {
  console.log(`Lisan Studio is ready: http://127.0.0.1:${port}`);
});
server.requestTimeout = 0;
server.headersTimeout = 60_000;
for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
