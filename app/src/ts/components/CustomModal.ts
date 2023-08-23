export class CustomModal {
  title: string;
  body?: string;

  constructor(title: string) {
    this.title = title;
  }

  setTitle(title: string): void {
    this.title = title;
  }

  setBody(body: string): void {
    this.body = body;
  }

  getTitle(): string {
    return this.title;
  }

  render(): string {
    return `
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">${this.title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              ${this.body ? this.body : null}
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" id="btn_save" class="btn btn-primary">Save changes</button>
          </div>
          </div>
      </div>
    `;
  }
}
