// log the pageview with their URL
export function pageview(url: string) {
  if (!window.gtag) return;
  window.gtag('config', 'G-YF000XMFJC', {
    page_path: url,
  })
}

// log specific events happening.
export function event({ action, params }: { action: string, params: object }) {
  if (!window.gtag) return;
  window.gtag('event', action, params)
}
