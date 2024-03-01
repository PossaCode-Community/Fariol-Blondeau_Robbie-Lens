import "@/scss/style.scss";
import "@/script/animation";

import { createIcons, Instagram, Twitter } from "lucide";

import { createGrid, sendDataToTheServer, wait } from "@/lib/utils";
import tarifs from "@/data/tarifs.json";

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

const form = document.querySelector<HTMLFormElement>("form");
const submitButton = document.querySelector<HTMLButtonElement>("button")!;

form?.addEventListener("submit", handleSubmit);

async function handleSubmit(event: Event) {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const GOOGLESHEET_URL = `https://script.google.com/macros/s/${
    import.meta.env.VITE_GOOGLESHEET_ID
  }/exec`;

  const formData = new FormData(form);

  const name = formData.get("name")!;
  const email = formData.get("email")!;
  const message = formData.get("message")!;

  submitButton?.setAttribute("disabled", "true");
  submitButton.textContent = "Envoi en cours...";

  await wait(3000)
    .then(async () => {
      await sendDataToTheServer({
        url: GOOGLESHEET_URL,
        data: { name, email, message },
      });
    })
    .then(() => {
      submitButton?.removeAttribute("disabled");
      submitButton.textContent = "Envoyez";
    })
    .finally(() => {
      form.reset();
    });
}
