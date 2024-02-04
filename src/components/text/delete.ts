import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { textsApi } from "src/api/localTextsApi";
import { withTwind } from "src/utils/twindDecorator";

@customElement("text-delete")
@withTwind()
class TextDelete extends LitElement {
  @property({ type: String })
  id = "";

  render() {
    return html`
      <button
        @click=${this.deleteItem}
        class="flex justify-center items-center px-4 bg-gray-200 transition-colors hover:bg-gray-300"
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
    "text-delete": TextDelete;
  }
}
