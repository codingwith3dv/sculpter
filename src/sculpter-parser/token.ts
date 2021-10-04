const enum TokenTypes {
  START_TAG,
  END_TAG,
  TEXT
}

interface Token {
  value: string,
  type: TokenTypes,
  children: Array<Token | string>
}

const enum TokenizerState {
  DATA = 'data',
  TEXT = 'text',
  TAG_OPEN = 'tagOpen',
  TAG_NAME = 'tagName',
  END_TAG_OPEN = 'endTagOpen',
  END_TAG_NAME = 'endTagName',
}

export {
  TokenTypes,
  Token,
  TokenizerState
};