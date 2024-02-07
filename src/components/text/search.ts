import { useStores } from "@nanostores/lit";
import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { $filterText } from "src/store/filters";
import { withTwind } from "src/utils/twindDecorator";

@customElement("text-search")
@withTwind()
@useStores($filterText)
class TextSearch extends LitElement {
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
