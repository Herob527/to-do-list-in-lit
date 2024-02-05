import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import "src/components/text/patch";
import { withTwind } from "src/utils/twindDecorator";
import { textsApi, type TextEntry } from "src/api/localTextsApi";
import { $filterText } from "src/store/filterText";

import { useStores } from "@nanostores/lit";
@customElement("texts-container")
@withTwind()
@useStores($filterText)
class TextsContainer extends LitElement {
  @property({
    state: true,
    type: Array,
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

  render() {
    const { items } = this;
    const text = $filterText.get();
    return items.length > 0
      ? html`
          ${repeat<TextEntry>(
            text !== ""
              ? items.filter((el) => el.category.includes(text))
              : items,
            (item) => item.id,
            (item) =>
              html`<text-patch
                class="inline-flex gap-2 basis-[calc(25%-0.75rem)] items-center justify-start"
                id=${item.id}
                text=${item.value}
                category=${item.category}
              ></text-patch>`,
          )}
        `
      : html`<p class="m-0">No data</p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "texts-container": TextsContainer;
  }
}
