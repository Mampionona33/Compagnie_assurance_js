import * as bootstrap from "bootstrap";
import { Table } from "./ts/components/Table";
import { CustomModal } from "./ts/components/CustomModal";
import { FormAjoutConducteur } from "./ts/components/FormAjoutConducteur";

console.log("Hello World!");

const table = new Table();
table.setHeader([
  "Nom",
  "Prénom",
  "Date de naissance",
  "age",
  "dete optention permis",
  "date d'adhésion",
  "nombre d'accident",
  "tarif",
]);

const showModal = (modalEl: HTMLElement) => {
  const modal = new bootstrap.Modal(modalEl, {
    backdrop: true,
    keyboard: true,
  });
  modalEl.classList.add("show");
  modal.show();
};

const handleClickButtonAdd = (modalEl: HTMLElement) => {
  const bouttonAddConductor = document.querySelector("#table-btn-add");
  if (bouttonAddConductor) {
    bouttonAddConductor.addEventListener("click", (ev: Event) => {
      ev.preventDefault();
      showModal(modalEl);
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#root");
  const modalAddConductorContainer = document.createElement("div");
  modalAddConductorContainer.classList.add("modal");

  const modalAddContent = new CustomModal("Ajout conducteur");
  const formAjoutConducteur = new FormAjoutConducteur();
  modalAddContent.setBody(formAjoutConducteur.render());
  modalAddConductorContainer.innerHTML = modalAddContent.render();

  if (root) {
    root.innerHTML = table.render();
    document.body.appendChild(modalAddConductorContainer);
    handleClickButtonAdd(modalAddConductorContainer);
  }
});
