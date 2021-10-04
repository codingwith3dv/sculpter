class Stack<T> {
  private _internalArray: Array<T>;
  constructor() {
    this._internalArray = new Array<T>();
  }
  push(item: T) {
    this._internalArray.push(item);
  }
  pop(): T | undefined {
    return this._internalArray.pop();
  }
  peek(): T | null {
    return this._internalArray[this._internalArray.length - 1];
  }
}

export {
  Stack
};