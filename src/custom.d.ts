declare module "*.svg" {
  const cssString: string;
  export default cssString;
}

declare module "*.inline.svg" {
  const content: string;
  export default content;
}
