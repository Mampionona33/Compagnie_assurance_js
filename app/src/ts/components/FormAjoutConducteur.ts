export class FormAjoutConducteur {
  constructor() {}

  public render(): string {
    return `
    <div class="container">
        <div class="row">
            <div class="col-sm-6">
                <label for="nom" class="form-label">Nom</label>
                <input type="text" class="form-control" id="nom" placeholder="Nom">
            </div>
            <div class="col-sm-6">
                <label for="prenom" class="form-label">Prénom</label>
                <input type="text" class="form-control" id="prenom" placeholder="Prénom">
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6">
                <label for="dateDeNaissance" class="form-label">Date de naissance</label>
                <input type="date" class="form-control" id="dateDeNaissance" value="2007-01-01" ">
            </div>
            <div class="col-sm-6">
                <label for="dateAdhesion" class="form-label">Date d'adhésion</label>
                <input type="date" class="form-control" id="dateAdhesion" value="2007-01-01">
            </div>
           
        </div>
    </div>

    `;
  }
}
