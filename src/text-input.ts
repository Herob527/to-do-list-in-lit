import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "src/components/delete-item";
import { api } from "./api/localStorageApi";

@customElement("text-input")
export class TextInput extends LitElement {
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
    console.log("updated");
    if (this.text === "") return;
    api.setItem(this.id, this.text);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "text-input": TextInput;
  }
}
