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
      .map((column) => `<th scope="col">${column}</th>`)
      .join("");
    return `<tr>${formattedHeader}</tr>`;
  }

  render(): string {
    const headerRow = this.formatHeader();
    return `
    <div class="table-responsive">
      <table class="table table-bordered table-striped shadow-sm">
        <thead class="text-capitalize table-dark">
          ${headerRow}
        </thead>
        <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        </tbody>
      </table>
    </div>
    `;
  }
}
