import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { withTwind } from "src/utils/twindDecorator";
import { Task } from "@lit/task";

@customElement("remaining-space")
@withTwind()
class RemainingSpace extends LitElement {
  private _getEstimate = new Task(this, {
    task: async () => {
      const estimate = await navigator.storage.estimate();
      console.log(estimate);
      return estimate;
    },
    args: () => [],
  });
  constructor() {
    super();
    window.addEventListener("storage", () => {
      this._getEstimate.run();
    });
  }
  render() {
    console.log("test");
    return this._getEstimate.render({
      pending: () =>
        html` <p>Local storage usage in kB</p>
          <p
            class="py-2 px-4 w-full bg-gray-50 rounded-xl border-2 border-gray-300"
          >
            Calculating...
          </p>`,
      complete: (estimate) =>
        estimate?.usage && estimate?.quota
          ? html`<p>Local storage usage in kB</p>
              <p
                class="py-2 px-4 w-full bg-gray-50 rounded-xl border-2 border-gray-300"
              >
                ${(estimate.usage / 1024 ** 2).toFixed(2)} kB used
              </p>`
          : null,
      error: () => html`<p>Error</p>`,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "remaining-space": RemainingSpace;
  }
}
