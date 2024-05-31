export {}

declare global {
  interface Array<T> {
    remove(v: T): Array<T>;
    replace(search: T, replace: T): Array<T>;
  }
}

Object.defineProperty(Array.prototype, "remove", {
  enumerable : false,
  value: function(this, v: unknown) {
    const index = this.indexOf(v);
    if (index >= 0) {
      this.splice(index, 1);
    }
  }
});

Object.defineProperty(Array.prototype, 'replace', {
  value: function (search: unknown, replacement: unknown) {
    const index = this.indexOf(search);
    if (index!== -1) {
      this[index] = replacement;
    }
    return this;
  },
  writable: true,
  configurable: true,
  enumerable: false
});