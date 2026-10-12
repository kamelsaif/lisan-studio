import { build } from 'esbuild';
const common = {
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node22',
  external: ['ffmpeg-static', '@ffprobe-installer/ffprobe'],
  banner: { js: "import { createRequire as __studioCreateRequire } from 'node:module'; const require = __studioCreateRequire(import.meta.url);" },
  logLevel: 'warning'
};
await build({ ...common, entryPoints: ['server/index.mjs'], outfile: 'server/launch.mjs' });
await build({ ...common, entryPoints: ['server/app.mjs'], outfile: 'server/core.mjs' });
console.log('Lisan Studio is prepared for quick launch.');
