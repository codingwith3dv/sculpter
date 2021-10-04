import { Token, TokenTypes } from './token';
import { Stack } from './stack';

class Parser {
  parse(
    tokens: Array<Token>
  ): Node | null {
    const elementsStack = new Stack<Element>();
    for (let i = 0; i < tokens.length; i++) {
      const currentToken = tokens[i];
      if(currentToken.type === TokenTypes.START_TAG) {
        // add to stack and append to current parent
        // if no parent then set parent to self
        const element = document.createElement(currentToken.value);
        elementsStack.push(element);
      } else if(currentToken.type === TokenTypes.TEXT) {
        // append text/data to current element
        const lastElement = elementsStack.peek();
        if(lastElement)
          lastElement.innerHTML = (currentToken.value || '');
      } else if(currentToken.type === TokenTypes.END_TAG) {
        // remove from stack
        elementsStack.pop();
      }
    }
    return elementsStack.peek();
  }
}

export {
  Parser
};