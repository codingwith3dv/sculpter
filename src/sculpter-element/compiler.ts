import { SculpterElement } from './sculpter-element';
import { ComponentOptions } from './options';
import { Tokenizer } from '../sculpter-parser/tokenizer';
import { Parser } from '../sculpter-parser/parser';

class Compiler {
  static compileComponent<T extends typeof SculpterElement>(
    component: T,
    options: ComponentOptions
  ): void {
    const htmlTokens = new Tokenizer().tokenize(options.templateUrl);
    const compiledElement = new Parser().parse(htmlTokens);
    if(compiledElement) {
      component.prototype.shadowRoot.appendChild(compiledElement as Node);
    }
  }
}

export {
  Compiler
};