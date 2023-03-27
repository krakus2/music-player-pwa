const isVibrateSupported = 'vibrate' in window.navigator

export const vibrate = () => {
  if (isVibrateSupported) {
    return window.navigator.vibrate([200])
  }

  return false
}
