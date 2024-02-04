import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "src/components/delete-item";
import { textsApi } from "./api/localTextsApi";

@customElement("text-input")
export class TextInput extends LitElement {
  @property({ type: String })
  category: string = "";

  @property({ type: String })
  id: string = "";

  @property({ type: String })
  text: string = "";

  render() {
    return html`
      <div>
        <input
          type="text"
          class="bg-blue-50"
          .id=${this.id}
          @input=${(text: InputEvent) =>
            (this.text = (text.currentTarget as HTMLInputElement).value)}
          .value=${this.text}
        />
        <delete-item id=${this.id}></delete-item>
      </div>
    `;
  }
  protected updated(): void {
    if (this.text === "") return;
    textsApi.setItem(this.id, { category: this.category, value: this.text });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "text-input": TextInput;
  }
}
