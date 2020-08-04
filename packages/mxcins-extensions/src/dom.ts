/* eslint-disable unicorn/prefer-node-remove */
import win from './window';
// 2020-04-01 13:57:56 for IE TypeError remove();
// 2020-04-08 20:43:13 for test window is undefined

(() => {
  function remove(this: Element | Text) {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  }

  if (win && win.Element && win.Text) {
    if (!Element.prototype.remove) {
      Element.prototype.remove = remove;
    }
    if (Text && !Text.prototype.remove) {
      Text.prototype.remove = remove;
    }
  }
})();
