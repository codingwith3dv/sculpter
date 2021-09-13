import {
  SculpterElement,
} from './sculpter-element/sculpter-element.js';

import {
  sculpterDefine
} from './sculpter-element/sculpter-define.js';

@sculpterDefine('a-component')
class A extends SculpterElement {
  constructor() {
    super();
    const shadow = this.attachShadow({mode: 'open'});
    
    const content = document.createElement('p');
    content.innerHTML = 'Hello futher mucker';
    shadow.appendChild(content);
  }
}