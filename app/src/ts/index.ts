import * as bootstrap from "bootstrap";
import * as $ from "jquery";
import Table, { TableRowData } from "./components/Table";
import Modal from "./components/Modal";
import CustomButton from "./components/CustomButton";
import FormAddDriver from "./components/FormAddDriver";
import { format } from "date-fns";

interface IDrivers extends TableRowData {
  nom: string;
  prenom: string;
  dateDeNaissance: Date | string;
  dateAdhesion: Date | string;
  age?: number;
  numberAccident?: number;
  tarif?: string;
}

class App {
  private table: Table<IDrivers>;
  private modalAjoutConducteur: Modal;
  private tableHeander: Array<string>;
  private root: HTMLElement;
  private addButton: CustomButton;
  private mainContainer: HTMLElement;
  private formAddDriver: FormAddDriver;
  private modalFormAddDriveInputs: object;
  private tableData: Array<IDrivers>;

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

  private verifyAge(date: Date): boolean {
    const currentDate = new Date();
    const ageInMillis = currentDate.getTime() - date.getTime();
    const ageInYears = ageInMillis / (1000 * 60 * 60 * 24 * 365);
    return ageInYears > 15;
  }

  private verifyBirthdayBeforeAdhesion(
    birthday: Date,
    adhesionDate: Date
  ): boolean {
    return birthday < adhesionDate;
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
  private verifyNameNotEmpty(name: string): boolean {
    return name.trim() !== "";
  }

  private saveCandidatToLocalStorage(): void {
    this.getFormAddDriverInputs();

    // Perform the validations
    const isLegalAge = this.verifyAge(
      this.modalFormAddDriveInputs["dateDeNaissance"]
    );
    const isBeforeAdhesion = this.verifyBirthdayBeforeAdhesion(
      this.modalFormAddDriveInputs["dateDeNaissance"],
      this.modalFormAddDriveInputs["dateAdhesion"]
    );
    const isNameNotEmpty = this.verifyNameNotEmpty(
      this.modalFormAddDriveInputs["nom"]
    );

    if (!isLegalAge) {
      alert("Le conducteur doit avoir au moins 16 ans.");
      return;
    }

    if (!isBeforeAdhesion) {
      alert("La date de naissance doit être antérieure à la date d'adhésion.");
      return;
    }

    if (!isNameNotEmpty) {
      alert("Le champ 'Nom' ne peut pas être vide.");
      return;
    }

    this.saveFormAddDriverToLocalStorage();
  }

  private saveFormAddDriverToLocalStorage(): void {
    const newRowData: IDrivers = {
      nom: this.modalFormAddDriveInputs["nom"],
      prenom: this.modalFormAddDriveInputs["prenom"],
      dateDeNaissance: this.modalFormAddDriveInputs["dateDeNaissance"],
      dateAdhesion: this.modalFormAddDriveInputs["dateAdhesion"],
    };

    const savedData = localStorage.getItem("list_drivers");
    let existingData: IDrivers[] = [];
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

        if (input.type === "date") {
          inputValues[inputId] = new Date(inputValue);
        } else {
          inputValues[inputId] = inputValue;
        }
      });

      this.setModalAddDriverInpts(inputValues);
    }
  }

  private getListDriversFromLocalstorage() {
    const savedData = localStorage.getItem("list_drivers");
    if (savedData) {
      this.tableData = JSON.parse(savedData).map((driver) => ({
        ...driver,
        dateDeNaissance: format(new Date(driver.dateDeNaissance), "dd/MM/yyyy"),
        dateAdhesion: format(new Date(driver.dateAdhesion), "dd/MM/yyyy"),
      }));
    }
  }

  private updateTableWithNewData() {
    this.getListDriversFromLocalstorage();

    const formattedData = this.tableData.map((driver) => ({
      ...driver,
      dateDeNaissance: driver.dateDeNaissance,
      dateAdhesion: driver.dateAdhesion,
    }));

    const newTable = new Table<IDrivers>({
      headers: this.tableHeander,
      data: formattedData,
    });

    const tableContainer = document.querySelector(".table-container");
    if (tableContainer) {
      tableContainer.innerHTML = "";
      tableContainer.appendChild(newTable.render());
    }
  }

  private handleDocumentReady(): void {
    $(document).ready(() => {
      this.getListDriversFromLocalstorage();
      this.updateTableWithNewData();
      this.render();
    });
  }

  private render(): void {
    this.appendMainContainerToRoot();
    this.appendAddButtonToMainContainer();
    this.appendTableToMainContainer();
  }

  constructor() {
    this.tableData = [];
    this.initializeRoot();
    this.getListDriversFromLocalstorage();
    this.createMainContainer();
    this.initialiseTableHeader();
    this.table = new Table<IDrivers>({
      headers: this.tableHeander,
      data: this.tableData,
    });
    this.initializeFormAddDriver();
    this.initialiseButtonAdd();
    this.addButton.innerHTML = "Ajout";
    this.handleClickAddButton();
    this.handleDocumentReady();
    this.updateTableWithNewData();
  }
}

const app = new App();
