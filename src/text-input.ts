import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { LOCAL_STORAGE_KEY } from "./constants";
import type { localStorageEntry } from "./types";
import "src/components/delete-item";

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
          @input=${(text: Event) => (this.text = text.currentTarget.value)}
          .value=${this.text}
        />
        <delete-item id=${this.id}></delete-item>
      </div>
    `;
  }
  protected updated(): void {
    console.log("updated");
    if (this.text === "") return;
    const entries: localStorageEntry[] = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || "[]",
    );
    const newEntry = { id: this.id, value: this.text };
    const entryIndex = entries.findIndex((entry) => entry.id === this.id);
    entries[entryIndex] = newEntry;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...entries]));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "text-input": TextInput;
  }
}
