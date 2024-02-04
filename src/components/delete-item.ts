import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { textsApi } from "src/api/localTextsApi";
import { withTwind } from "src/utils/twindDecorator";

@customElement("delete-item")
@withTwind
class DeleteItem extends LitElement {
  @property({})
  id = "";

  render() {
    return html`
      <button
        @click=${this.deleteItem}
        class="inline-flex justify-center items-center p-4 w-2 h-2 bg-gray-200"
      >
        -
      </button>
    `;
  }
  deleteItem() {
    textsApi.deleteItem(this.id);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "delete-item": DeleteItem;
  }
}
