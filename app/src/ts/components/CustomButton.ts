class CustomButton extends HTMLButtonElement {
    constructor() {
        super();
    }
}

customElements.define('custom-button', CustomButton, { extends: 'button' });

export default CustomButton;
