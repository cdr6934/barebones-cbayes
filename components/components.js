class SiteFooter extends HTMLElement {
  connectedCallback() {
    fetch('./components/footer.html')
      .then(response => response.text())
      .then(html => this.innerHTML = html);
  }
}
customElements.define('site-footer', SiteFooter);

// Add more components below following the same pattern:

class SiteHeader extends HTMLElement {
  connectedCallback() {
    fetch('./components/header.html')
      .then(response => response.text())
      .then(html => this.innerHTML = html);
  }
}
customElements.define('site-header', SiteHeader);
