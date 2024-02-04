import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { categoryApi, type CategoryEntry } from "src/api/localCategoryApi";
import { withTwind } from "src/utils/twindDecorator";

@customElement("category-patch")
@withTwind()
class CategoryPatch extends LitElement {
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
      <select @change=${this.handleChange}>
        ${this.categories.length > 0
          ? repeat<CategoryEntry>(
              this.categories,
              (item) => item.id,
              (item) =>
                html`<option
                  value="${item.id}"
                  ?selected=${item.id === this.id}
                >
                  ${item.value}
                </option>`,
            )
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