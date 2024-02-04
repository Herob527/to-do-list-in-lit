import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { api } from "src/api/localStorageApi";

@customElement("add-item")
class AddItem extends LitElement {
  render() {
    return html`
      <button @click=${this.addItem}>
        <span>Test</span>
      </button>
    `;
  }
  addItem() {
    api.addNewItem();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "add-item": AddItem;
  }
}
