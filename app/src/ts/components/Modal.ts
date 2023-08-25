import * as bootstrap from "bootstrap";

class Modal {
  private modal: HTMLDivElement;
  private title: string;
  private body: HTMLElement;
  private modalContainer: bootstrap.Modal | null;
  private id: string;
  private buttonSave: HTMLElement | null;
  private handleClickSave: CallableFunction;
  private validators: CallableFunction[];

  public setBody(body: HTMLElement): void {
    this.body = body;
    this.render();
  }
  public setHandleClickSave(handleClickSave: CallableFunction): void {
    this.handleClickSave = handleClickSave;
  }

  /**
   * geth
   * HandleClickSave
   */
  public getHandleClickSave(): CallableFunction {
    return this.handleClickSave;
  }

  public getBody(): HTMLElement {
    return this.body;
  }

  public setButtonSave(buttonSave: HTMLElement | null): void {
    this.buttonSave = buttonSave;
  }

  public getButtonSave(): HTMLElement | null {
    return this.buttonSave;
  }

  private initializeButtonSave(): void {
    const btn_save = document.getElementById("btn_save");
    if (btn_save) {
      this.buttonSave = btn_save;
    }
  }

  private validate(validators: CallableFunction[]): boolean {
    try {
      for (const validator of validators) {
        const validationResult = validator();
        if (!validationResult) {
          throw new Error("Validation failed");
        }
      }
      return true; 
    } catch (error) {
      console.error("Validation error:", error);
      return false; 
    }
  }

  constructor(title: string, id: string, handleClickSave: CallableFunction) {
    this.id = id;
    this.title = title;
    this.validators = [];
    this.setHandleClickSave(handleClickSave);
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

  private handleButtonClickSave(): void {
    if (this.buttonSave) {
      this.buttonSave.addEventListener("click", (ev: Event) => {
        ev.preventDefault();
        this.handleClickSave();
        this.modalContainer?.hide();
        window.location.reload();
      });
    }
  }

  private destroy(): void {
    this.modal.addEventListener("hidden.bs.modal", () => {
      this.modal.remove();
      this.modalContainer = null;
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
    this.initializeButtonSave();
    this.buttonSave?.addEventListener("click", () => {
      if (this.validators.length === 0) {
        this.handleButtonClickSave();
      } else {
        const isValid = this.validate(this.validators);
        if (isValid) {
          this.handleButtonClickSave();
        }
      }
    });
    return this.modal;
  }
}

export default Modal;
