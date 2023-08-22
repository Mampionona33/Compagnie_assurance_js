export class Table {
  header: Array<string> = [];

  constructor() {
    this.header = [];
  }

  setHeader(header: Array<string>): void {
    this.header = header;
  }

  getHeader(): Array<string> {
    return this.header;
  }

  formatHeader(): string {
    const formattedHeader = this.header
      .map((column) => `<th>${column}</th>`)
      .join("");
    return `<tr>${formattedHeader}</tr>`;
  }

  render(): string {
    const headerRow = this.formatHeader();
    return `
      <table>
        <thead>
          ${headerRow}
        </thead>
        <tbody>
          <!-- TODO: Ajouter les lignes de données ici -->
        </tbody>
      </table>
    `;
  }
}
