import Table, { TableRowData } from "./components/Table";

interface IDrivers extends TableRowData {
  id: number;
  nom: string;
  prenom: string;
  dateDeNaissance: Date | string;
  dateAdhesion: Date | string;
  age?: number;
  numberAccident?: number;
  tarif?: string;
}
class DriverTable extends Table<IDrivers> {
    
}
