export function splitPath(path: string): string[] {
  const trimmedPath = path.charAt(0) === "/" ? path.substr(1) : path;
  return (trimmedPath.slice(-1) === "/"
    ? trimmedPath.slice(0, -1)
    : trimmedPath
  ).split("/");
}

export function trimMarkdownPath(path: string): string {
  return (
    "/" +
    path
      .replace(".mdx", "")
      .replace(".md", "")
      .replace("index", "")
      .replace(/\/$/, "")
  );
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
