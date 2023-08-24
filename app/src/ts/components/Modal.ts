import * as bootstrap from "bootstrap";
import * as $ from "jquery";

class Modal {
  private modal: HTMLDivElement;
  private title: string;
  private body: HTMLElement;
  private modalContainer: bootstrap.Modal | null;
  private id: string;

  public setBody(body: HTMLElement): void {
    this.body = body;
    this.render();
  }

  public getBody(): HTMLElement {
    return this.body;
  }

  constructor(title: string, id: string) {
    this.id = id;
    this.title = title;
    this.modal = document.createElement("div");
    this.modal.className = "modal fade";
    this.modal.setAttribute("id", this.id);
    document.body.appendChild(this.modal);
    this.render();
    this.modalContainer = new bootstrap.Modal(this.modal, {
      backdrop: true,
      keyboard: true,
    });
    this.destroy();
  }

  public open() {
    this.modalContainer?.show();
  }

  private destroy(): void {
    this.modal.addEventListener("hidden.bs.modal", () => {
      this.modal.remove();
      this.modalContainer = null; // Remove the modalContainer reference
    });
  }

  public render(): HTMLElement {
    this.modal.innerHTML = `
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="modal_title">${this.title}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  ${this.body ? this.body.innerHTML : ""}
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" id="btn_save" class="btn btn-primary">Save changes</button>
              </div>
          </div>
      </div>
    `;
    return this.modal;
  }
}

export default Modal;
