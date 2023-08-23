import * as bootstrap from "bootstrap";
import { Table } from "./ts/components/Table";
import { CustomModal } from "./ts/components/CustomModal";
import { FormAjoutConducteur } from "./ts/components/FormAjoutConducteur";
import * as $ from "jquery";

class App {
  formAjoutConducteur: FormAjoutConducteur;
  modal;

  constructor() {
    console.log("Hello World!");
    this.formAjoutConducteur = new FormAjoutConducteur();
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

    const modalAddConductorContainer = document.createElement("div");
    modalAddConductorContainer.classList.add("modal");
    modalAddConductorContainer.id = "modal";

    const modalAddContent = new CustomModal("Ajout conducteur");
    // const formAjoutConducteur = new FormAjoutConducteur();
    modalAddContent.setBody(this.formAjoutConducteur.render());
    modalAddConductorContainer.innerHTML = modalAddContent.render();

    const bouttonAddConductor = document.querySelector("#table-btn-add");
    if (bouttonAddConductor) {
      bouttonAddConductor.addEventListener(
        "click",
        this.handleButtonClick.bind(this, modalAddConductorContainer)
      );
    }

    document.addEventListener("DOMContentLoaded", () => {
      const root = document.querySelector("#root");

      if (root) {
        root.innerHTML = table.render();
        document.body.appendChild(modalAddConductorContainer);
        this.handleClickModalSave();
      }
    });
  }

  showModal(modalEl) {
    this.modal = new bootstrap.Modal(modalEl, {
      backdrop: true,
      keyboard: true,
    });
    modalEl.classList.add("show");
    this.modal.show();
  }

  handleButtonClick(modalEl, ev) {
    ev.preventDefault();
    this.showModal(modalEl);
  }


  handleClickModalSave() {
    const saveButton = document.querySelector("#btn_save");
    if (saveButton) {
      saveButton.addEventListener("click", () => {
        const nomInput = document.getElementById("nom") as HTMLInputElement;
        const prenomInput = document.getElementById("prenom") as HTMLInputElement;
  
        const name = nomInput.value;
        const prenom = prenomInput.value;
  
        console.log(name, prenom);
      });
    }
  }
  
  
}

const app = new App();
