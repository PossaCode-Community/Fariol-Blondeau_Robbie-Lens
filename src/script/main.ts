import "../scss/style.scss";
import "./animation";
import { createIcons, Instagram, Twitter } from "lucide";
import { createGrid, wait } from "../lib/utils";
import tarifs from "../data/tarifs.json";
import type { FormDataProps } from "../types";

createIcons({
  icons: { Instagram, Twitter },
});

const projectGrid = document.querySelector<HTMLDivElement>(
  "[data-grid=project]"
)!;
const aboutGrid = document.querySelector<HTMLDivElement>("[data-grid=about]")!;
const tarifsGrid =
  document.querySelector<HTMLDivElement>("[data-grid=tarifs]")!;
const paysagesGrid = document.querySelector<HTMLDivElement>(
  "[data-grid=paysages]"
)!;
const portraitsGrid = document.querySelector<HTMLDivElement>(
  "[data-grid=portraits]"
)!;

const form = document.querySelector<HTMLFormElement>("form");
const submitButton = document.querySelector<HTMLButtonElement>("button")!;

form?.addEventListener("submit", handleSubmit);

createGrid({
  length: 6,
  path: "./project",
  parentElement: projectGrid,
});

createGrid({
  length: 6,
  path: "../project",
  parentElement: paysagesGrid,
});

createGrid({
  length: 6,
  path: "../portraits",
  parentElement: portraitsGrid,
});

createGrid({
  length: 10,
  parentElement: aboutGrid,
});

for (let tarif of tarifs) {
  const card = document.createElement("div");
  card.classList.add("tarif__card");

  card.innerHTML = `
    <h3 class="tarif__title">${tarif.title}</h3>
    <p class="tarif__description">${tarif.description}</p>
    <p class="tarif__price">${tarif.price}</p>
    <p class="tarif__includes">${tarif.includes}</p>
  `;
  tarifsGrid?.appendChild(card);
}

async function handleSubmit(event: Event) {
  event.preventDefault();
  const form = event.target as HTMLFormElement | null;
  const googlesheet_url = `https://script.google.com/macros/s/${
    import.meta.env.VITE_GOOGLESHEET_ID
  }`;

  if (form) {
    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    submitButton?.setAttribute("disabled", "true");
    submitButton.textContent = "Envoi en cours...";

    if (name && email && message) {
      await sendDataToTheServer({
        url: googlesheet_url,
        data: {
          name,
          email,
          message,
        },
      });
    }

    await wait(3000).then(() => {
      submitButton?.removeAttribute("disabled");
      submitButton.textContent = "Envoyez";
    });

    form.reset();
  }
}

type Props = {
  url: string;
} & FormDataProps;

async function sendDataToTheServer({ url, data }: Props) {
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
      throw new Error("Failed to send data to the server");
    }
  } catch (error) {
    console.error("Failed to send data to the server:", error);
  }
}
