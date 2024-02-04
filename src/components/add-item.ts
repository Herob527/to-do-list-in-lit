import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { textsApi } from "src/api/localTextsApi";

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
    textsApi.addNewItem();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "add-item": AddItem;
  }
}
