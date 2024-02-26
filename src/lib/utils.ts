import type { GridProps } from "../types";

export function createGrid({ length = 0, path, parentElement }: GridProps) {
  Array.from({ length })
    .fill(null)
    .forEach((_, index) => {
      const image = document.createElement("img") as HTMLImageElement;

      if (path) {
        image.src = `${path}/${index + 1}.png`;
      } else {
        image.src = "../about-image.png";
      }

      image.alt = path ? `Project image ${index + 1}` : "About image";

      parentElement?.appendChild(image);
    });
}

export function wait(ms: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
