import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import "/src/text-input";
import { withTwind } from "./utils/twindDecorator";
import { api } from "./api/localStorageApi";
import type { Entry } from "./api/type";

@customElement("texts-container")
@withTwind
class TextsContainer extends LitElement {
  @property({
    state: true,
  })
  protected items: Entry[];

  constructor() {
    super();
    const texts = api.getAll();
    this.items = texts;
    window.addEventListener("storage", () => {
      this.items = api.getAll();
    });
  }

  private addItem() {
    api.addNewItem();
  }

  render() {
    return this.items.length > 0
      ? html`<div class="flex flex-col gap-1.5">
          ${repeat<Entry>(
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
