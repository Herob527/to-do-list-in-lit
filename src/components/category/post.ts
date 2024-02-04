import { LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { withTwind } from "src/utils/twindDecorator";

@customElement("category-post")
@withTwind()
class CategoryPost extends LitElement {}

declare global {
  interface HTMLElementTagNameMap {
    "category-post": CategoryPost;
  }
}
