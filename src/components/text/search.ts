import { useStores } from "@nanostores/lit";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import { $filterText } from "src/store/filters";
import style from "@unocss/reset/tailwind.css?inline";

@customElement("text-search")
@useStores($filterText)
class TextSearch extends LitElement {
  static styles = css`
    ${unsafeCSS(style)};
    @unocss-placeholder;
  `;
  protected render() {
    return html`<input
      class="p-2 h-full bg-gray-50"
      type="text"
      @input=${this.changeText}
    />`;
  }

  changeText(e: Event) {
    const { value } = e.currentTarget as HTMLInputElement;
    $filterText.set(value);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "text-search": TextSearch;
  }
}
