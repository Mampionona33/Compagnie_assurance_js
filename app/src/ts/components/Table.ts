export interface TableRowData {
  [key: string]: any;
  // Ajoutez d'autres propriétés ici
}

interface TableOptions<T extends TableRowData> {
  headers: string[];
  data: T[];
}

class Table<T extends TableRowData> {
  private tableElement: HTMLTableElement;
  private tableOptions: TableOptions<T>;

  constructor(options: TableOptions<T>) {
    this.tableOptions = options;

    this.tableElement = document.createElement("table");
    this.tableElement.classList.add(
      "table",
      "table-bordered",
      "table-striped",
      "shadow-sm"
    );
  }

  private initializeTableHeader(): void {
    const theadElement = document.createElement("thead");
    theadElement.classList.add("text-capitalize", "table-dark", "align-top");

    const headerRow = document.createElement("tr");
    this.tableOptions.headers.forEach((headerText) => {
      const thElement = document.createElement("th");
      thElement.textContent = headerText;
      headerRow.appendChild(thElement);
    });
    console.log(headerRow);

    theadElement.appendChild(headerRow);
    this.tableElement.appendChild(theadElement);
  }

  private renderNoDataRow(): HTMLTableRowElement {
    const rowElement = document.createElement("tr");
    const cellElement = document.createElement("td");
    cellElement.colSpan = this.tableOptions.headers.length;
    cellElement.innerHTML = "<div>Aucune donnée trouvée</div>";
    rowElement.appendChild(cellElement);
    return rowElement;
  }

  public render(): HTMLElement {
    const containerElement = document.createElement("div");
    const tbodyElement = document.createElement("tbody");

    if (this.tableOptions.data.length === 0) {
      tbodyElement.appendChild(this.renderNoDataRow());
    } else {
      this.tableOptions.data.forEach((rowData) => {
        const rowElement = document.createElement("tr");
        Object.values(rowData).forEach((cellData) => {
          const cellElement = document.createElement("td");
          cellElement.textContent = cellData.toString();
          rowElement.appendChild(cellElement);
        });
        tbodyElement.appendChild(rowElement);
      });
    }

    this.tableElement.innerHTML = "";
    this.initializeTableHeader();
    this.tableElement.appendChild(tbodyElement);
    containerElement.appendChild(this.tableElement);

    return containerElement;
  }
}

export default Table;
