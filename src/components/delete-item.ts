import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { LOCAL_STORAGE_KEY } from "src/constants";
import type { localStorageEntry } from "src/types";
import { withTwind } from "src/utils/twindDecorator";

@customElement("delete-item")
@withTwind
class DeleteItem extends LitElement {
  @property({})
  id = "";

  render() {
    return html`
      <button @click=${this.deleteItem} class="p-4 bg-gray-200">-</button>
    `;
  }
  deleteItem() {
    const currentData = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || "[]",
    ) as localStorageEntry[];

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(currentData.filter((entry) => entry.id !== this.id)),
    );
    dispatchEvent(new Event("storage"));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "delete-item": DeleteItem;
  }
}
