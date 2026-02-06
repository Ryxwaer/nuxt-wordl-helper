/**
 * Singleton global mouse tracker.
 *
 * ONE passive mousemove listener on `window`, shared by every consumer
 * (v-glow directive, ColorBackground, etc.).
 *
 * Usage:
 *   import { subscribeMouseMove, initGlobalMouse, destroyGlobalMouse } from '~/utils/globalMouse'
 *
 *   const unsub = subscribeMouseMove((x, y) => { ... })
 *   unsub() // when done
 */

type MouseCallback = (x: number, y: number) => void

let MOUSE_X = 0
let MOUSE_Y = 0
let INITIALIZED = false

const LISTENERS = new Set<MouseCallback>()

function onMouseMove(e: MouseEvent) {
  MOUSE_X = e.clientX
  MOUSE_Y = e.clientY
  for (const cb of LISTENERS) cb(MOUSE_X, MOUSE_Y)
}

/** Call once (idempotent) to attach the global listener. */
export function initGlobalMouse() {
  if (INITIALIZED) return
  INITIALIZED = true
  window.addEventListener('mousemove', onMouseMove, { passive: true })
}

/** Tear down — called on app unmount if needed. */
export function destroyGlobalMouse() {
  if (!INITIALIZED) return
  window.removeEventListener('mousemove', onMouseMove)
  INITIALIZED = false
  LISTENERS.clear()
}

/** Subscribe to mouse movements. Returns an unsubscribe function. */
export function subscribeMouseMove(cb: MouseCallback): () => void {
  // Auto-init on first subscriber
  initGlobalMouse()
  LISTENERS.add(cb)
  return () => LISTENERS.delete(cb)
}

/** Read the last known mouse position (non-reactive). */
export function getMousePosition() {
  return { x: MOUSE_X, y: MOUSE_Y }
}
