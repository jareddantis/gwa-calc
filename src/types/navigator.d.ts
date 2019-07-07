interface ShareData {
  title?: string
  text?: string
  url?: string
  files?: File[]
}

interface Navigator {
  share: (data?: ShareData) => Promise<void>
  canShare: (data?: ShareData) => boolean
}
