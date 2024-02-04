import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { categoryApi } from "src/api/localCategoryApi";
import { withTwind } from "src/utils/twindDecorator";

@customElement("category-post")
@withTwind()
class CategoryPost extends LitElement {
  @state()
  private category: string = "";

  protected render() {
    return html`
      <div
        class="flex flex-col gap-2 items-center p-2 rounded-xl border-2 border-gray-300"
      >
        <p>Add Category</p>
        <input
          type="text"
          value="${this.category}"
          class="p-2 w-full bg-gray-50 rounded-xl border-2 border-gray-300"
          @input=${(event: Event) =>
            (this.category = (event.target as HTMLInputElement).value)}
        />
        <button
          @click=${this.addItem}
          class="py-2 px-4 w-full bg-gray-50 rounded-xl border-2 border-gray-300 transition-colors hover:bg-gray-200"
        >
          Add category
        </button>
      </div>
    `;
  }
  private addItem() {
    categoryApi.addNewItem({ value: this.category });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "category-post": CategoryPost;
  }
}
