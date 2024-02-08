import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";

import { Task } from "@lit/task";
import style from "@unocss/reset/tailwind.css?inline";

@customElement("remaining-space")
class RemainingSpace extends LitElement {
  static styles = css`
    ${unsafeCSS(style)};
    @unocss-placeholder;
  `;
  @state()
  storage: StorageEstimate | null = null;
  private _getEstimate = new Task(this, {
    task: async () => {
      const estimate = await navigator.storage.estimate();
      this.storage = estimate;
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
    return this._getEstimate.render({
      pending: () =>
        this.storage?.usage !== undefined
          ? html`<p>Local storage usage in kB</p>
              <p
                class="py-2 px-4 w-full bg-gray-50 rounded-xl border-2 border-gray-300"
              >
                ~${(Math.ceil(this.storage.usage / 1024 ** 2 / 5) * 5).toFixed(
                  2,
                )}
                kB used
              </p>`
          : html`<p>Local storage usage in kB</p>
              <p
                class="py-2 px-4 w-full bg-gray-50 rounded-xl border-2 border-gray-300"
              >
                Estimating...
              </p> `,
      complete: (estimate) =>
        estimate?.usage !== undefined && estimate?.quota !== undefined
          ? html`<p>Local storage usage in kB</p>
              <p
                class="py-2 px-4 w-full bg-gray-50 rounded-xl border-2 border-gray-300"
              >
                ~${(Math.ceil(estimate.usage / 1024 ** 2 / 2) * 2).toFixed(2)}
                kB used
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
