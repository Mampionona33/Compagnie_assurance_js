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
            <td>Mark</td>
            <td>Otto</td>
            <td>22/05/1989</td>
            <td>34</td>
            <td>2015</td>
            <td>2015</td>
            <td> <input name="nbAccident" type="text" value=0 style="border:none; background-color:transparent; outline:none"/></td>
            <td>vert</td>
          </tr>
        </tbody>
      </table>
    </div>
    `;
  }
}
