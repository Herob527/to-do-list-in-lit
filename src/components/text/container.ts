import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import "src/components/text/patch";
import { withTwind } from "src/utils/twindDecorator";
import { textsApi } from "src/api/localTextsApi";
import type { TextEntry } from "src/api/type";

@customElement("texts-container")
@withTwind
class TextsContainer extends LitElement {
  @property({
    state: true,
  })
  protected items: TextEntry[];

  constructor() {
    super();
    const texts = textsApi.getAll();
    this.items = texts;
    window.addEventListener("storage", () => {
      this.items = textsApi.getAll();
    });
  }

  private addItem() {
    textsApi.addNewItem();
  }

  render() {
    return this.items.length > 0
      ? html`<div class="flex flex-col gap-1.5">
          ${repeat<TextEntry>(
            this.items,
            (item) => item.id,
            (item) =>
              html`<text-input
                id=${item.id}
                text=${item.value}
                category=${item.category}
              ></text-input>`,
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
