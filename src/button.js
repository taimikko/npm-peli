export default (onClick, children) =>
`<button
    class="btn btn-primary"
    onClick="${onClick.replace(/"/g, '&quot;')}"
  >
    ${children}
  </button>`;