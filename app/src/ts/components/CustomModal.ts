export class CustomModal {
  title: string;
  body?: string;
  buttonSave: HTMLButtonElement | null;

  constructor(title: string) {
    this.title = title;
  }

  setButtonSave(buttonSave: HTMLButtonElement | null): void {
    this.buttonSave = buttonSave;
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

  getButtonSave(): HTMLButtonElement | null {
    return this.buttonSave;
  }

  public hanldeClicSave() {
    this.setButtonSave(document.querySelector("#btn_save"));
    const formContainer = document.createElement("form");
    if (this.buttonSave) {
      this.buttonSave?.addEventListener("click", (ev: Event) => {
        ev.preventDefault();
        formContainer.id = "custom_modal_id";
        formContainer.innerHTML = this.body ? this.body : "";
        console.log(formContainer);

        // return formContainer;
      });
    }
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
