class FormAddDriver {
  private container: HTMLElement;
  private body: string;

  private createContainer(): void {
    this.container = document.createElement("div");
    this.container.classList.add("container");
  }

  private createBody(): void {
    this.body = `
            <div class="row">
                <div class="col-sm-6">
                    <label for="nom" class="form-label">Nom</label>
                    <input type="text"  class="form-control" id="nom" placeholder="Nom" required>
                </div>
                <div class="col-sm-6">
                    <label for="prenom" class="form-label">Prénom</label>
                    <input type="text" class="form-control" id="prenom" placeholder="Prénom" required>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <label for="dateDeNaissance" class="form-label">Date de naissance</label>
                    <input type="date" value="2008-01-01" class="form-control" id="dateDeNaissance" >
                </div>
                <div class="col-sm-6">
                    <label for="dateAdhesion" class="form-label">Date d'adhésion</label>
                    <input type="date" value="2008-01-02" class="form-control" id="dateAdhesion">
                </div>
            </div>
    `;
  }

  private insertBodyInContainer(): void {
    this.container.innerHTML = this.body;
  }

  constructor() {
    this.createContainer();
    this.createBody();
    this.insertBodyInContainer();
  }

  public render(): HTMLElement {
    return this.container;
  }
}

export default FormAddDriver;
