import { sculpterDefine, SculpterElement } from './sculpter-element/sculpter-define';
import { Tokenizer } from './sculpter-parser/tokenizer';

export {
  SculpterElement,
  sculpterDefine
};

@sculpterDefine({
  name: 'b-component',
  templateUrl: '<p>Hello World</p>',
  stylesUrl: ''
})
class A extends SculpterElement {
  constructor() {
    super();
  }
}