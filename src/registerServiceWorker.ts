/* tslint:disable:no-console */
import { Workbox } from 'workbox-window'

if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox(`${process.env.BASE_URL}service-worker.js`)

    wb.addEventListener('installed', (event) => {
      console.log('[sw] Installed service worker')
    })

    wb.addEventListener('waiting', async (event) => {
      // @ts-ignore
      wb.messageSW({
        type: 'SKIP_WAITING',
      })

      wb.addEventListener('controlling', (event) => {
        window.location.reload()
      })
    })

    wb.register()
  }
}
