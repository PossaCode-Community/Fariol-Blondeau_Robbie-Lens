import "../scss/style.scss";
import "./animation";
import { createIcons, Instagram, Twitter } from "lucide";
import { createGrid, wait } from "../lib/utils";
import tarifs from "../data/tarifs.json";

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

form?.addEventListener("submit", handleSubmit);

async function handleSubmit(event: Event) {
  event.preventDefault();
  const form = event.target as HTMLFormElement | null;

  if (form) {
    // const formData = new FormData(form);

    await wait(3000);
    // TODO: Send data to the database

    form.reset();
  }
}
