import { CustomModal } from "./CustomModal";

export class Table {
  header: Array<string> = [];
  modalAdd: CustomModal;

  setHeader(header: Array<string>): void {
    this.header = header;
  }

  setModalAdd(modalAdd: CustomModal): void {
    this.modalAdd = modalAdd;
  }

  getModalAdd(): CustomModal {
    return this.modalAdd;
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
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <button type="button" id="table-btn-add" class="btn btn-primary d-flex gap-1" data-bs-toggle="modal" data-bs-target="#modal">
          <span class="material-icons-outlined">
              add_circle_outline
          </span>
          Ajouter
        </button>
      </div>
      <div class="table-responsive">
        <table class="table table-bordered table-striped shadow-sm">
          <thead class="text-capitalize table-dark align-top">
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
              <td> <input name="nbAccident" type="number" value=0 style="border:none; background-color:transparent; outline:none"/></td>
              <td>vert</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    `;
  }
}
