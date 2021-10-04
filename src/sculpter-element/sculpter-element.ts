class SculpterElement extends HTMLElement {
  shadowRoot!: ShadowRoot;
  shadowRootOptions: ShadowRootInit = { mode: 'closed' };
  constructor() {
    super();
    this.init();
  }
  private init() {
    this.shadowRoot = this.attachShadow(this.shadowRootOptions);
  }
}

export {
  SculpterElement,
};