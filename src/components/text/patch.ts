import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "src/components/text/delete";
import { textsApi } from "src/api/localTextsApi";
import { withTwind } from "src/utils/twindDecorator";
import "src/components/category/patch";

@customElement("text-patch")
@withTwind()
export class TextPatch extends LitElement {
  @property({ type: String })
  category: string = "";

  @property({ type: String })
  id: string = "";

  @property({ type: String })
  text: string = "";

  render() {
    return html`
      <input
        type="text"
        class="flex-1 p-2 bg-gray-50 rounded-l-xl border-2 border-gray-300"
        .id=${this.id}
        @input=${(text: InputEvent) =>
          (this.text = (text.currentTarget as HTMLInputElement).value)}
        .value=${this.text}
      ></input>
      <text-delete id=${this.id} class="flex h-full"></text-delete>
      <category-patch id=${this.category} @change=${this.handleCategoryChange} class="min-w-[5rem]"></category-patch>

    `;
  }

  protected handleCategoryChange(value: CustomEvent) {
    this.category = value.detail;
  }

  protected updated(): void {
    textsApi.patchItem(this.id, { category: this.category, value: this.text });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "text-patch": TextPatch;
  }
}
