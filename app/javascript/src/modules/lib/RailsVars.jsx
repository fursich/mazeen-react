export function csrfToken() {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')
  if (csrfToken) { return csrfToken.getAttribute('content') }
  return null
}
