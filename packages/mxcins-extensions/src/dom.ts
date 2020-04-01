// 2020-04-01 13:57:56 for IE TypeError remove();
(() => {
  function remove(this: Element | Text) {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  }
  if (!Element.prototype.remove) {
    Element.prototype.remove = remove;
  }
  if (Text && !Text.prototype.remove) {
    Text.prototype.remove = remove;
  }
})();
