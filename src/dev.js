// @flow
import styles from './dev.css'
import { noop } from './utils'

const KEY_CODE_K = 75
const KEY_CODE_S = 83
const body = ((document: any).body: HTMLElement)

function toggleColor(force?: boolean) {
  body.classList.toggle('reflex-color-mode', force)
}

function toggleOverlayMode(overlay, force?: boolean) {
  const hasOverlay = body.contains(overlay)
  const set = typeof force === 'undefined' ? !hasOverlay : force

  body.classList.toggle('reflex-dev-mode', set)

  if (set && !hasOverlay) {
    body.appendChild(overlay)
  } else if (!set && hasOverlay) {
    body.removeChild(overlay)
  }
}

function getKeyDownHandler(method, { key, useCtrl, useShift }) {
  return function onKeyDown(e: KeyboardEvent) {
    const pressedKey = e.keyCode || e.charCode || 0
    const ctrlKeyPressedOrNotRequired = !useCtrl || (e.ctrlKey || e.metaKey)
    const shiftKeyPressedOrNotRequired = !useShift || e.shiftKey

    if (
      ctrlKeyPressedOrNotRequired &&
      shiftKeyPressedOrNotRequired &&
      key === pressedKey
    ) {
      method()
    }
  }
}

function createOverlay() {
  const overlay = document.createElement('div')
  const content = document.createElement('div')

  overlay.className = 'reflex-overlay'
  content.className = styles.content
  overlay.appendChild(content)

  return overlay
}

const defaults = {
  colorKeyCode: KEY_CODE_S,
  overlayKeyCode: KEY_CODE_K,
  useCtrl: true,
  useShift: true,
}

const disabledDevMode = {
  register: noop,
  toggleColor: noop,
  toggleOverlay: noop,
  unregister: noop,
}

type Props = {
  colorKeyCode?: number,
  force?: boolean,
  overlayKeyCode?: number,
  useCtrl?: boolean,
  useShift?: boolean,
}

export default function initDevMode({ force, ...props }: Props = {}) {
  if (process.env.NODE_ENV === 'production' && force !== true) {
    return disabledDevMode
  }

  const { overlayKeyCode, colorKeyCode, ...options } = {
    ...defaults,
    ...props,
  }
  const toggleOverlay = toggleOverlayMode.bind(this, createOverlay())
  const overlayKeyDown = getKeyDownHandler(toggleOverlay, {
    key: overlayKeyCode,
    ...options,
  })
  const colorKeyDown = getKeyDownHandler(toggleColor, {
    key: colorKeyCode,
    ...options,
  })

  function register() {
    if (overlayKeyCode) {
      body.addEventListener('keydown', overlayKeyDown)
    }
    if (colorKeyCode) {
      body.addEventListener('keydown', colorKeyDown)
    }
  }

  function unregister() {
    body.removeEventListener('keydown', overlayKeyDown)
    body.removeEventListener('keydown', colorKeyDown)
  }

  register()

  return {
    register,
    toggleColor,
    toggleOverlay,
    unregister,
  }
}
