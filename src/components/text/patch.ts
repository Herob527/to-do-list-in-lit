import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import "src/components/text/delete";
import { textsApi } from "src/api/localTextsApi";
import "src/components/category/patch";
import style from "@unocss/reset/tailwind.css?inline";

@customElement("text-patch")
export class TextPatch extends LitElement {
  static styles = css`
    ${unsafeCSS(style)};
    @unocss-placeholder;
  `;
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

      <category-patch id=${this.category} @change=${this.handleCategoryChange} class="flex overflow-hidden flex-col justify-center items-center h-full border-2 border-gray-300 min-w-[5rem]"></category-patch>
      <text-delete id=${this.id} class="flex overflow-hidden h-full rounded-r-xl"></text-delete>

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
