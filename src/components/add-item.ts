import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { LOCAL_STORAGE_KEY } from "src/constants";
import { type localStorageEntry } from "src/types";
import { v4 } from "uuid";

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
    const dataItem = { id: v4(), value: "" } satisfies localStorageEntry;

    const currentData = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || "[]",
    ) as localStorageEntry[];

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([...currentData, dataItem]),
    );
    dispatchEvent(new Event("storage"));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "add-item": AddItem;
  }
}
