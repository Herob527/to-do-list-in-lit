import { css, unsafeCSS, type CSSResultGroup } from "lit";
import style from "@unocss/reset/tailwind.css?inline";

export const defaultStyle = (customCss: CSSResultGroup | number = 0) => css`
  ${unsafeCSS(style)};
  @unocss-placeholder;
  ${customCss}
`;
