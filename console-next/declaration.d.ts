declare namespace SvgPanZoom {
  export interface Instance {}
}

declare namespace React {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: import("styled-components").CSSProp;
  }
}

declare module "graphiql-code-exporter/lib/snippets";
declare module "graphiql-code-exporter";
