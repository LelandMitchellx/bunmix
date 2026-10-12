import { run } from 'remix/component'
import { importModule } from 'remix/multiple-import-maps-polyfill'

// Step 1: Initialize client-side component hydration runner
const app = run({
  async loadModule(moduleUrl, exportName) {
    return importModule(moduleUrl).then(mod => mod[exportName] as Function)
  },
})

// Step 2: Handle live updates during development
if (import.meta.hot) {
  import.meta.hot.on('server:update', () => {
    app.ready().then(app.frames.top.reload)
  })
}