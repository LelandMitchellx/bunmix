import { createAssetServer } from 'remix/assets'
import { ImportMap } from 'remix/component/server'
import { compression } from 'remix/middleware/compression'
import { render } from 'remix/middleware/render'
import { createRouter } from 'remix/router'

const isDev = process.execArgv.includes('--watch')
const assets = createAssetServer({
  basePath: '_', mounts: { app: '.' },
  allowFiles: ['entry.ts', 'button.tsx'], allowPackages: ['remix'],
  watch: isDev, fingerprint: !isDev, minify: true
})
const entrys = await assets.getScriptEntry(import.meta.resolve('./entry.ts'))
const router = createRouter({ middleware: [compression(), render({ assets })] })

router.get('/_/*', async ({ request }) => assets
  .fetch(request)
  .then((res) => res ?? new Response('Not Found', { status: 404 }))
)

router.get('/', ({ render }) => {
  return render(<html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title children='Remix' />
      <link rel="icon" href="https://remix.run/favicon.ico" />
      {entrys.preloads.map((href) => <link key={href} rel="modulepreload" href={href} />)}
      <ImportMap value={entrys.importMap} />
      <script type="module" src={entrys.href} />
      <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser" />
    </head>
    <body class="grid place-items-center h-dvh select-none bg-white/90 text-black/90 dark:bg-black/90 dark:text-white/90">
      <a children={<img class="dark:invert-100 max-w-[61.8vw]" src="https://guides.remix.run/remix-wordmark-light-mode.svg" />} href="https://remix.run/" target="_blank" />
    </body>
  </html>)
})

Bun.serve({ fetch: (req) => router.fetch(req), port: 80 })
console.info(`✨ http://localhost`)
