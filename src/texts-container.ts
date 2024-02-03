import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { v4 } from "uuid";
import "/src/text-input";
import { LOCAL_STORAGE_KEY } from "./constants";
import { type localStorageEntry } from "src/types";
import { withTwind } from "./utils/twindDecorator";

@customElement("texts-container")
@withTwind
class TextsContainer extends LitElement {
  @property({
    state: true,
  })
  protected items: localStorageEntry[];

  constructor() {
    super();
    const texts = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || "[]",
    ) as localStorageEntry[];

    this.items = texts;
    window.addEventListener("storage", () => {
      this.items = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) || "[]",
      ) as localStorageEntry[];
    });
  }

  private addItem() {
    const dataItem = [{ id: v4(), value: "" }] satisfies localStorageEntry[];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataItem));
    this.items = dataItem;
  }

  render() {
    return this.items.length > 0
      ? html`<div class="flex flex-col gap-1.5">
          ${repeat<localStorageEntry>(
            this.items,
            (item) => item.id,
            (item) =>
              html`<text-input id=${item.id} text=${item.value}></text-input>`,
          )}
        </div> `
      : html` <button @click=${this.addItem}>Add Text</button> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "texts-container": TextsContainer;
  }
}
