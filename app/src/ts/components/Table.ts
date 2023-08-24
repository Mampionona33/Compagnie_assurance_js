interface RowData {
  nom: string;
  prenom: string;
  // Ajoutez d'autres propriétés ici
}

class Table {
  private data: RowData[] = [];
  private tableElement: HTMLTableElement;

  constructor(private headers: string[]) {
    this.tableElement = document.createElement('table');
    this.tableElement.classList.add('table', 'table-bordered', 'table-striped', 'shadow-sm');

    this.initializeTableHeader();
  }

  private initializeTableHeader(): void {
    const theadElement = document.createElement('thead');
    theadElement.classList.add('text-capitalize', 'table-dark', 'align-top');

    const headerRow = document.createElement('tr');
    this.headers.forEach(headerText => {
      const thElement = document.createElement('th');
      thElement.textContent = headerText;
      headerRow.appendChild(thElement);
    });

    theadElement.appendChild(headerRow);
    this.tableElement.appendChild(theadElement);
  }

  public setData(data: RowData[]) {
    this.data = data;
  }

  public render(): HTMLElement {
    const tbodyElement = document.createElement('tbody');

    this.data.forEach(rowData => {
      const rowElement = document.createElement('tr');
      Object.values(rowData).forEach(cellData => {
        const cellElement = document.createElement('td');
        cellElement.textContent = cellData;
        rowElement.appendChild(cellElement);
      });
      tbodyElement.appendChild(rowElement);
    });

    this.tableElement.appendChild(tbodyElement);
    return this.tableElement;
  }
}

export default Table;
