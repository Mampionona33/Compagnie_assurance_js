export class FormAjoutConducteur {
    private nom: string;
    private prenom: string; // Corrigé : changé 'premom' en 'prenom'
    private dateDeNaissance: Date;
    private dateAdhesion: Date;
  
    constructor() {
      this.nom = "";
      this.prenom = ""; // Corrigé : changé 'premom' en 'prenom'
      this.dateDeNaissance = new Date();
      this.dateAdhesion = new Date();
    }
  
    public getNom(): string {
      return this.nom;
    }
  
    public setNom(nom: string): void {
      this.nom = nom;
    }
  
    public getPrenom(): string { // Méthode ajoutée pour obtenir le prénom
      return this.prenom;
    }
  
    public setPrenom(prenom: string): void { // Méthode ajoutée pour définir le prénom
      this.prenom = prenom;
    }

  
    public render(): string {
      return `
        <div class="container">
            <div class="row">
                <div class="col-sm-6">
                    <label for="nom" class="form-label">Nom</label>
                    <input type="text" value="${this.nom}"  class="form-control" id="nom" placeholder="Nom">
                </div>
                <div class="col-sm-6">
                    <label for="prenom" class="form-label">Prénom</label>
                    <input type="text" value="${this.prenom}" class="form-control" id="prenom" placeholder="Prénom">
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <label for="dateDeNaissance" class="form-label">Date de naissance</label>
                    <input type="date" class="form-control" id="dateDeNaissance" value="${this.dateDeNaissance.toISOString().split('T')[0]}">
                </div>
                <div class="col-sm-6">
                    <label for="dateAdhesion" class="form-label">Date d'adhésion</label>
                    <input type="date" class="form-control" id="dateAdhesion" value="${this.dateAdhesion.toISOString().split('T')[0]}">
                </div>
            </div>
        </div>
        
      `;
    }
  }
  