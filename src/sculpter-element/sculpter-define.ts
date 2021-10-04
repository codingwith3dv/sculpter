import { SculpterElement } from './sculpter-element';
import { Compiler } from './compiler';
import { ComponentOptions } from './options';

function defineComponent<T extends { new (...args: unknown[]): SculpterElement }>(
  name: string,
  instanceRef: T
): void {
  window.customElements.define(name, instanceRef);
}

function compileComponent<T extends typeof SculpterElement>(
  options: ComponentOptions,
  component: T
): void {
  // parse HTML and CSS
  // make each element and append it into shadowRoot
  Compiler.compileComponent(component, options);
  // define element
  defineComponent(options.name, component);
}

const sculpterDefine = 
  <T extends typeof SculpterElement>( options: ComponentOptions ) =>
    ( component: T ): void => {
      compileComponent(options, component);
    };

export {
  sculpterDefine,
  SculpterElement
};