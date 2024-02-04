import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "src/components/text/delete";
import { textsApi } from "src/api/localTextsApi";
import { withTwind } from "src/utils/twindDecorator";

@customElement("text-patch")
@withTwind()
export class TextInput extends LitElement {
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
        class="flex-1 p-2 bg-gray-50 border-2 border-gray-300"
        .id=${this.id}
        @input=${(text: InputEvent) =>
          (this.text = (text.currentTarget as HTMLInputElement).value)}
        .value=${this.text}
      ></input>
      <text-delete id=${this.id}></text-delete>
    `;
  }
  protected updated(): void {
    if (this.text === "") return;
    textsApi.setItem(this.id, { category: this.category, value: this.text });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "text-patch": TextInput;
  }
}
