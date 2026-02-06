/**
 * v-glow directive — adds a mouse-tracking glow border to any element.
 *
 * Usage:
 *   <div v-glow class="rounded-3xl ...">
 *   <div v-glow="{ radius: 300, tension: 0.04, friction: 0.25 }">
 *
 * Performance:
 *   - All glow elements share ONE global mousemove listener (via globalMouse).
 *   - All active spring animations run in ONE shared requestAnimationFrame loop.
 *   - The loop auto-stops when every element has settled.
 */

import type { ObjectDirective } from 'vue'
import { subscribeMouseMove } from '~/utils/globalMouse'

// ── Types ──────────────────────────────────────────────

interface GlowOptions {
  radius?: number
  tension?: number
  friction?: number
}

interface GlowState {
  overlay: HTMLDivElement
  el: HTMLElement
  x: number
  y: number
  targetX: number
  targetY: number
  velocityX: number
  velocityY: number
  tension: number
  friction: number
  radius: number
  unsubMouse: (() => void) | null
}

// ── Shared animation loop ──────────────────────────────

const ACTIVE = new Set<GlowState>()
let FRAME_ID = 0
let LOOP_RUNNING = false

function startLoop() {
  if (LOOP_RUNNING) return
  LOOP_RUNNING = true
  FRAME_ID = requestAnimationFrame(tick)
}

function tick() {
  for (const s of ACTIVE) {
    stepSpring(s)
  }

  if (ACTIVE.size > 0) {
    FRAME_ID = requestAnimationFrame(tick)
  } else {
    LOOP_RUNNING = false
  }
}

function stepSpring(s: GlowState) {
  const dx = s.targetX - s.x
  const dy = s.targetY - s.y

  s.velocityX = (s.velocityX + dx * s.tension) * (1 - s.friction)
  s.velocityY = (s.velocityY + dy * s.tension) * (1 - s.friction)

  // Settled — snap and remove from active set
  if (
    Math.abs(dx) < 0.1 &&
    Math.abs(dy) < 0.1 &&
    Math.abs(s.velocityX) < 0.01 &&
    Math.abs(s.velocityY) < 0.01
  ) {
    s.x = s.targetX
    s.y = s.targetY
    s.velocityX = 0
    s.velocityY = 0
    ACTIVE.delete(s)
    applyMask(s)
    return
  }

  s.x += s.velocityX
  s.y += s.velocityY
  applyMask(s)
}

// ── DOM helpers ────────────────────────────────────────

const GLOW_KEY = '__glowState' as const

function createOverlay(): HTMLDivElement {
  const el = document.createElement('div')
  el.style.position = 'absolute'
  el.style.inset = '0'
  el.style.borderRadius = 'inherit'
  el.style.border = '1px solid var(--color-primary)'
  el.style.opacity = '0.5'
  el.style.pointerEvents = 'none'
  el.style.transition = 'opacity 0.3s'
  return el
}

function applyMask(s: GlowState) {
  const val = `radial-gradient(${s.radius}px circle at ${s.x}px ${s.y}px, black, transparent)`
  s.overlay.style.maskImage = val
  s.overlay.style.webkitMaskImage = val
}

function parseOptions(value: GlowOptions | undefined) {
  return {
    radius: value?.radius ?? 250,
    tension: value?.tension ?? 0.03,
    friction: value?.friction ?? 0.28,
  }
}

// ── Directive definition ───────────────────────────────

const glowDirective: ObjectDirective<HTMLElement, GlowOptions | undefined> = {
  getSSRProps() {
    return {}
  },

  mounted(el, binding) {
    // Ensure positioned context
    if (getComputedStyle(el).position === 'static') {
      el.style.position = 'relative'
    }

    const opts = parseOptions(binding.value)
    const overlay = createOverlay()
    el.appendChild(overlay)

    const state: GlowState = {
      overlay,
      el,
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      velocityX: 0,
      velocityY: 0,
      ...opts,
      unsubMouse: null,
    }

    // Subscribe to the shared global mouse (ONE listener for the whole app)
    state.unsubMouse = subscribeMouseMove((mx, my) => {
      const rect = el.getBoundingClientRect()
      state.targetX = mx - rect.left
      state.targetY = my - rect.top

      // Mark active so the shared loop picks it up
      ACTIVE.add(state)
      startLoop()
    })

    ;(el as any)[GLOW_KEY] = state
  },

  updated(el, binding) {
    const state: GlowState | undefined = (el as any)[GLOW_KEY]
    if (!state) return
    const opts = parseOptions(binding.value)
    state.radius = opts.radius
    state.tension = opts.tension
    state.friction = opts.friction
  },

  unmounted(el) {
    const state: GlowState | undefined = (el as any)[GLOW_KEY]
    if (!state) return
    state.unsubMouse?.()
    ACTIVE.delete(state)
    state.overlay.remove()
    delete (el as any)[GLOW_KEY]
  },
}

// ── Plugin registration ────────────────────────────────

export default defineNuxtPlugin({
  name: 'glow-directive',
  enforce: 'pre',
  setup(nuxtApp) {
    nuxtApp.vueApp.directive('glow', glowDirective)
  },
})
