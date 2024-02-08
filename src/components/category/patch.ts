import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { categoryApi, type CategoryEntry } from "src/api/localCategoryApi";
import style from "@unocss/reset/tailwind.css?inline";

@customElement("category-patch")
class CategoryPatch extends LitElement {
  static styles = css`
    ${unsafeCSS(style)};
    @unocss-placeholder;
  `;
  @property({ type: Array })
  private categories: CategoryEntry[] = [];

  @property()
  id: string = "";

  constructor() {
    super();
    this.categories = categoryApi.getAll();

    window.addEventListener("storage", () => {
      this.categories = categoryApi.getAll();
    });
  }

  protected render() {
    return html`
      <select
        @change=${this.handleChange}
        class="p-2 w-full bg-gray-50 min-w-[5rem]"
      >
        ${this.categories.length > 0
          ? html` <option value="None">None</option>
              ${repeat(
                this.categories,
                (item) => item.id,
                (item) =>
                  html`<option
                    value="${item.id}"
                    ?selected=${item.id === this.id}
                  >
                    ${item.value}
                  </option>`,
              )}`
          : html`<option>None</option>`}
      </select>
    `;
  }

  handleChange(ev: Event) {
    const { value } = ev.target as HTMLSelectElement;
    this.dispatchEvent(new CustomEvent("change", { detail: value }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "category-patch": CategoryPatch;
  }
}
