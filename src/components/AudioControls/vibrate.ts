export const vibrate = () => {
  if (typeof window === 'undefined') {
    return
  }

  const isVibrateSupported = 'vibrate' in window.navigator

  if (isVibrateSupported) {
    return window.navigator.vibrate([200])
  }

  return false
}
