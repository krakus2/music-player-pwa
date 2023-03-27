export const vibrate = () => {
  if (typeof window === 'undefined') {
    return
  }

  const isVibrateSupported = 'vibrate' in window.navigator

  if (isVibrateSupported) {
    window.navigator.vibrate([200])
  }
}
