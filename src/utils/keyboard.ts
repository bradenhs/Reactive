export function closeKeyboard() {
  const inputs = document.querySelectorAll('input')
  const textareas = document.querySelectorAll('textarea')

  for (let i = 0; i < inputs.length; i++) {
    inputs.item(i).blur()
  }

  for (let i = 0; i < textareas.length; i++) {
    textareas.item(i).blur()
  }
}
