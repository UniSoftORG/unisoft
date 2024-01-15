
export enum ElementTags  {
  Article = "article",
  Data = "data",
  Main = "main",
  Div = "div",
  Li = "li",
  Section = "section",
  Button = "button",
  Nav = "nav",
  Form = "form",
  Ul = "ul",
  Header = "header",
  Aside = "aside",
  Footer = "footer",
}

export enum TextTags {
  Span = "span",
  Paragraph = "p",
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6"
}
export type ElementTag = ElementTags | TextTags;
