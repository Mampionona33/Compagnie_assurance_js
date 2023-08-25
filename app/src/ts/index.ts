import * as bootstrap from "bootstrap";
import * as $ from "jquery";
import Table, { RowData } from "./components/Table";
import Modal from "./components/Modal";
import CustomButton from "./components/CustomButton";
import FormAddDriver from "./components/FormAddDriver";

class App {
  private table: Table;
  private modalAjoutConducteur: Modal;
  private tableHeander: Array<string>;
  private root: HTMLElement;
  private addButton: CustomButton;
  private mainContainer: HTMLElement;
  private formAddDriver: FormAddDriver;
  private modalFormAddDriveInputs: object;
  private tableData: Array<RowData>;

  setModalAddDriverInpts(modalFormAddDriveInputs: object): void {
    this.modalFormAddDriveInputs = modalFormAddDriveInputs;
  }

  public getModalAddDriverInpts(): object {
    return this.modalFormAddDriveInputs;
  }

  setRoot(root: HTMLElement) {
    this.root = root;
  }
  getRoot(): HTMLElement {
    return this.root;
  }

  private initializeRoot(): void {
    const root = $("#root");
    if (root) {
      this.setRoot(root);
    }
  }

  private createMainContainer(): void {
    this.mainContainer = document.createElement("div");
    this.mainContainer.classList.add(
      "d-flex",
      "align-items-start",
      "gap-3",
      "flex-column"
    );
  }

  private initialiseTableHeader(): void {
    this.tableHeander = [
      "Nom",
      "Prénom",
      "Date de naissance",
      "Date d'adhésion",
      "Âge",
      "Nombre d'accident",
      "Tarif",
    ];
  }

  private initializeModalAddDriver(): void {
    this.modalAjoutConducteur = new Modal(
      "Ajout conducteur",
      "modal_ajout_conducteur",
      this.saveCandidatToLocalStorage.bind(this)
    );
  }

  private openModalAddDriver(): void {
    this.modalAjoutConducteur.setBody(this.formAddDriver.render());

    this.modalAjoutConducteur.open();
  }

  private initialiseButtonAdd(): void {
    this.addButton = new CustomButton();
    this.addButton.classList.add("btn", "btn-primary");
    this.addButton.setAttribute("data-bs-toggle", "modal");
    this.addButton.setAttribute("data-bs-target", "#modal");
  }

  private initializeFormAddDriver(): void {
    this.formAddDriver = new FormAddDriver();
  }

  private appendTableToMainContainer(): void {
    this.mainContainer.append(this.table.render());
  }

  private handleClickAddButton(): void {
    this.addButton.addEventListener("click", (ev: Event) => {
      ev.preventDefault();
      this.initializeModalAddDriver();
      this.openModalAddDriver();
    });
  }

  private appendAddButtonToMainContainer(): void {
    this.mainContainer.append(this.addButton);
  }
  private appendMainContainerToRoot(): void {
    this.root.append(this.mainContainer);
  }

  private render(): void {
    this.appendMainContainerToRoot();
    this.appendAddButtonToMainContainer();
    this.appendTableToMainContainer();
  }

  private saveCandidatToLocalStorage(): void {
    this.getFormAddDriverInputs();
    this.saveFormAddDriverToLocalStorage();
  }

  private saveFormAddDriverToLocalStorage(): void {
    const newRowData: RowData = {
      nom: this.modalFormAddDriveInputs["nom"],
      prenom: this.modalFormAddDriveInputs["prenom"],
    };

    const savedData = localStorage.getItem("list_drivers");
    let existingData: RowData[] = [];
    if (savedData) {
      existingData = JSON.parse(savedData);
    }

    existingData.push(newRowData);

    localStorage.setItem("list_drivers", JSON.stringify(existingData));
  }

  private getFormAddDriverInputs() {
    const formAddDriver = document.getElementById("modal_ajout_conducteur");
    if (formAddDriver) {
      const inputElements = formAddDriver.querySelectorAll("input");
      const inputValues = {};

      inputElements.forEach((input: HTMLInputElement) => {
        const inputId = input.id;
        const inputValue = input.value;
        inputValues[inputId] = inputValue;
      });

      // console.log("Input values:", inputValues);
      this.setModalAddDriverInpts(inputValues);
    }
  }

  private getListDriversFromLocalstorage() {
    const savedData = localStorage.getItem("list_drivers");
    if (savedData) {
      this.tableData = JSON.parse(savedData);
    }
  }

  private updateTableWithNewData() {
    this.getListDriversFromLocalstorage();
    this.table.setData(this.tableData);
    const tableContainer = document.querySelector(".table-container");
    if (tableContainer) {
      tableContainer.innerHTML = "";
      tableContainer.appendChild(this.table.render());
    }
  }

  private handleDocumentReady(): void {
    $(document).ready(() => {
      this.render();
    });
  }

  constructor() {
    this.tableData = [];
    this.initializeRoot();
    this.getListDriversFromLocalstorage();
    this.createMainContainer();
    this.initialiseTableHeader();
    this.table = new Table(this.tableHeander);
    this.initializeFormAddDriver();
    this.initialiseButtonAdd();
    this.addButton.innerHTML = "Ajout";
    this.handleClickAddButton();
    this.handleDocumentReady();
    this.updateTableWithNewData();
  }
}

const app = new App();
