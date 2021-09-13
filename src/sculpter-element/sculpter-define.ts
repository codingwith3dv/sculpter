type CustomElementConstructor<Type> = {
  new (...args: unknown[]): Type;
};

function defineCustomElement<Type extends HTMLElement>(
  componentName: string,
  component: CustomElementConstructor<Type>
): CustomElementConstructor<Type> {
  window.customElements.define(componentName, component);
  return component;
}

const sculpterDefine = 
  (componentName: string) =>
    (component: CustomElementConstructor<HTMLElement>): void => {
      defineCustomElement(componentName, component);
    };

export {
  sculpterDefine
};