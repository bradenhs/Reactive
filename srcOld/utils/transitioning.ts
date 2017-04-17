let transitioningCounter = 0

export function startTransition() {
  if (transitioningCounter === 0) {
    document.body.classList.add('transitioning')
  }
  transitioningCounter++
}

export function endTransition() {
  transitioningCounter--
  if (transitioningCounter === 0) {
    document.body.classList.remove('transitioning')
  }
}
