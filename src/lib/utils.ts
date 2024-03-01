import type { FormDataProps, GridProps } from "@/types/index";

export function wait(ms: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

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
      image.setAttribute("loading", "lazy");

      parentElement?.appendChild(image);
    });
}

export async function sendDataToTheServer({
  url,
  data,
}: {
  url: string;
} & FormDataProps) {
  try {
    const formData = new URLSearchParams();

    formData.append("name", String(data.name));
    formData.append("email", String(data.email));
    formData.append("message", String(data.message));

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(
        `Error while trying to request the server, ${response.status}`
      );
    }
  } catch (error) {
    console.error(`Failed to send data to the server, ${error}`);
  }
}
