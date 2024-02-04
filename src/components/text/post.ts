import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { textsApi } from "src/api/localTextsApi";

@customElement("text-post")
class AddItem extends LitElement {
  render() {
    return html`
      <button @click=${this.addItem}>
        <span>Add</span>
      </button>
    `;
  }
  addItem() {
    textsApi.addNewItem();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "text-post": AddItem;
  }
}
