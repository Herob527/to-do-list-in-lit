import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { categoryApi, type CategoryEntry } from "src/api/localCategoryApi";
import { $filterCategory, $filterText } from "src/store/filters";
import { withTwind } from "src/utils/twindDecorator";

@customElement("category-delete")
@withTwind()
class CategoryDelete extends LitElement {
  @property({ type: Array })
  private categories: CategoryEntry[] = [];

  @state()
  private category: string = "";

  constructor() {
    super();
    this.categories = categoryApi.getAll();
    this.category = this.categories.length > 0 ? this.categories[0].id : "";

    window.addEventListener("storage", () => {
      this.categories = categoryApi.getAll();
      this.category = this.categories.length > 0 ? this.categories[0].id : "";
    });
  }

  protected render() {
    return html`
      <div
        class="flex flex-col gap-2 items-center p-2 text-center rounded-xl border-2 border-gray-300"
      >
        <p>Remove Category</p>
        <select
          @change=${this.handleChange}
          class="p-2 w-full bg-gray-50 rounded-xl border-2 border-gray-300"
        >
          ${this.categories.length > 0
            ? repeat(
                this.categories,
                (item) => item.id,
                (category) =>
                  html`<option value=${category.id}>${category.value}</option>`,
              )
            : html`<option>None</option>`}
        </select>
        <button
          @click=${this.removeItem}
          class="py-2 px-4 w-full bg-gray-50 rounded-xl border-2 border-gray-300 transition-colors hover:bg-gray-200"
        >
          Remove category
        </button>
      </div>
    `;
  }
  private handleChange(event: Event) {
    const { value } = event.target as HTMLSelectElement;
    this.category = value;
  }
  private removeItem() {
    categoryApi.deleteItem(this.category);
    $filterCategory.set("");
    $filterText.set("");
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "category-delete": CategoryDelete;
  }
}
