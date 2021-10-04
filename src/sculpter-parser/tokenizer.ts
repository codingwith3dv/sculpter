import {
  Token,
  TokenTypes,
  TokenizerState
} from './token';

class Tokenizer {
  private index!: number;
  private html!: string;
  private state!: TokenizerState;
  private tokens!: Array<Token>;
  private currentToken!: Token;
  private reset(): void {
    this.index = 0;
    this.html = '';
    this.state = TokenizerState.DATA;
    this.tokens = new Array<Token>();
  }
  private advance(): string {
    const char = this.getCurrentChar();
    this.index++;
    return char;
  }
  private setState(state: TokenizerState): void {
    this.state = state;
  }
  private getCurrentChar(): string {
    return this.html.charAt(this.index);
  }
  private markTextBegin(): void {
    this.currentToken = {
      value: '',
      type: TokenTypes.TEXT,
      children: []
    };
    this.tokens.push(this.currentToken);
  }
  private markStartTagBegin(): void {
    this.currentToken = {
      value: '',
      type: TokenTypes.START_TAG,
      children: []
    };
    this.tokens.push(this.currentToken);
  }
  private markEndTagBegin(): void {
    this.currentToken = {
      value: '',
      type: TokenTypes.END_TAG,
      children: []
    };
    this.tokens.push(this.currentToken);
  }
  private appendTokenValue(value: string): void {
    this.currentToken.value += value;
  }
  constructor() {
    this.reset();
  }
  tokenize(input: string): Array<Token> {
    this.reset();
    this.html = input;
    while(this.index < this.html.length) {
      this.parseOperations[this.state].call(this);
    }
    return this.tokens;
  }
  private parseOperations: {[state in TokenizerState]: (this: Tokenizer) => void} = {
    data: function() {
      const char = this.getCurrentChar();
      
      if(char === '<') {
        this.setState(TokenizerState.TAG_OPEN);
        this.advance();
      } else {
        this.setState(TokenizerState.TEXT);
        this.markTextBegin();
      }
    },
    text: function() {
      const char = this.getCurrentChar();
      
      if(char === '<') {
        this.setState(TokenizerState.TAG_OPEN);
        this.advance();
      } else {
        this.advance();
        this.appendTokenValue(char);
      }
    },
    tagOpen: function () {
      const char = this.advance();
      
      if(char === '/') {
        this.setState(TokenizerState.END_TAG_OPEN);
      } else {
        this.setState(TokenizerState.TAG_NAME);
        this.markStartTagBegin();
        this.appendTokenValue(char);
      }
    },
    tagName: function () {
      const char = this.advance();
      
      if(char === '>') {
        this.setState(TokenizerState.DATA);
      } else {
        this.appendTokenValue(char);
      }
    },
    endTagOpen: function() {
      const char = this.advance();
      
      this.setState(TokenizerState.END_TAG_NAME);
      this.markEndTagBegin();
      this.appendTokenValue(char);
    },
    endTagName: function() {
      const char = this.advance();
      
      if(char === '>') {
        this.setState(TokenizerState.DATA);
      } else {
        this.appendTokenValue(char);
      }
    }
  };
}

export {
  Tokenizer
};