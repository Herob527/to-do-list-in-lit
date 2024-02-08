import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import { $filterCategory } from "src/store/filters";
import { categoryApi, type CategoryEntry } from "src/api/localCategoryApi";
import { repeat } from "lit/directives/repeat.js";
import style from "@unocss/reset/tailwind.css?inline";

@customElement("category-search")
class CategorySearch extends LitElement {
  static styles = css`
    ${unsafeCSS(style)};
    @unocss-placeholder;
  `;
  @state()
  categories: CategoryEntry[] = [];

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
        class="p-2 h-full bg-gray-50"
        title="Select by category"
      >
        ${this.categories.length > 0
          ? html`<option value="">All</option>
              ${repeat(
                [...this.categories, { id: "None", value: "None" }],
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
  handleChange(e: Event) {
    const { value } = e.currentTarget as HTMLInputElement;
    $filterCategory.set(value);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "category-search": CategorySearch;
  }
}
