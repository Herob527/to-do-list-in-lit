import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import "src/components/text/patch";
import { withTwind } from "src/utils/twindDecorator";
import { textsApi } from "src/api/localTextsApi";
import type { TextEntry } from "src/api/type";

@customElement("texts-container")
@withTwind()
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
    return (
      this.items.length > 0 &&
      html`
        ${repeat<TextEntry>(
          this.items,
          (item) => item.id,
          (item) =>
            html`<text-patch
              class="inline-flex gap-3 basis-[25%]"
              id=${item.id}
              text=${item.value}
              category=${item.category}
            ></text-patch>`,
        )}
      `
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "texts-container": TextsContainer;
  }
}
