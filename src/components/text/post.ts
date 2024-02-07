import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { textsApi } from "src/api/localTextsApi";
import { withTwind } from "src/utils/twindDecorator";

@customElement("text-post")
@withTwind()
class TextPost extends LitElement {
  render() {
    return html`
      <button
        @click=${this.addItem}
        class="py-2 px-4 bg-gray-50 transition-colors hover:bg-gray-200"
      >
        <span>Add entry</span>
      </button>
    `;
  }
  addItem() {
    textsApi.addNewItem();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "text-post": TextPost;
  }
}
