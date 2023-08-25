import * as bootstrap from "bootstrap";
import * as $ from "jquery";
import Table from "./components/Table";
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
  private modalFormAddDriveInputs : object;

  setModalAddDriverInpts(modalFormAddDriveInputs:object):void{
    this.modalFormAddDriveInputs = modalFormAddDriveInputs;
  }

  public getModalAddDriverInpts():object{
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
    console.log("Sauvegarde dans le localStorage effectuée");
    this.getFormAddDriverInputs();
    console.log(this.modalFormAddDriveInputs);
    
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
  

  private handleDocumentReady(): void {
    $(document).ready(() => {
      this.render();
    });
  }

  constructor() {
    this.initializeRoot();
    this.createMainContainer();
    this.initialiseTableHeader();
    this.table = new Table(this.tableHeander);
    this.initializeFormAddDriver();
    this.initialiseButtonAdd();
    this.addButton.innerHTML = "Ajout";
    this.handleClickAddButton();
    this.handleDocumentReady();
  }
}

const app = new App();
