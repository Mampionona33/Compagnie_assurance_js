export interface RowData {
  nom: string;
  prenom: string;
  // Ajoutez d'autres propriétés ici
}

class Table {
  private data: RowData[] = [];
  private tableElement: HTMLTableElement;

  constructor(private headers: string[]) {
    this.tableElement = document.createElement("table");
    this.tableElement.classList.add(
      "table",
      "table-bordered",
      "table-striped",
      "shadow-sm"
    );

    this.initializeTableHeader();
  }

  private initializeTableHeader(): void {
    const theadElement = document.createElement("thead");
    theadElement.classList.add("text-capitalize", "table-dark", "align-top");

    const headerRow = document.createElement("tr");
    this.headers.forEach((headerText) => {
      const thElement = document.createElement("th");
      thElement.textContent = headerText;
      headerRow.appendChild(thElement);
    });

    theadElement.appendChild(headerRow);
    this.tableElement.appendChild(theadElement);
  }

  public setData(data: RowData[]) {
    this.data = data;
  }

  private renderNoDataRow(): HTMLTableRowElement {
    const rowElement = document.createElement("tr");
    const cellElement = document.createElement("td");
    cellElement.colSpan = this.headers.length;
    cellElement.innerHTML = "<div>Aucune donnée trouvée</div>";
    rowElement.appendChild(cellElement);
    return rowElement;
  }

  public render(): HTMLElement {
    const containerElement = document.createElement("div");
    const tbodyElement = document.createElement("tbody");

    if (this.data.length === 0) {
      tbodyElement.appendChild(this.renderNoDataRow());
    } else {
      this.data.forEach((rowData) => {
        const rowElement = document.createElement("tr");
        Object.values(rowData).forEach((cellData) => {
          const cellElement = document.createElement("td");
          cellElement.textContent = cellData;
          rowElement.appendChild(cellElement);
        });
        tbodyElement.appendChild(rowElement);
      });
    }

    const theadElement = document.createElement("thead");
    const headerRow = document.createElement("tr");
    this.headers.forEach((headerText) => {
      const thElement = document.createElement("th");
      thElement.textContent = headerText;
      headerRow.appendChild(thElement);
    });
    theadElement.appendChild(headerRow);

    this.tableElement.innerHTML = "";
    this.tableElement.appendChild(theadElement);
    this.tableElement.appendChild(tbodyElement);
    containerElement.appendChild(this.tableElement);

    return containerElement;
  }
}

export default Table;
