/**
 * ユーティリティクラス
 *
 * @class Nodefest.Utils
 * @static
 */
Nodefest.Utils = {

  /**
   * fromからtoまでの間のランダムな整数を返す
   *
   * @method getRand
   * @static
   * @param {Number} from
   * @param {Number} to
   * @return {Number}
   */
  getRand: function(from, to) {
    return from + Math.floor( Math.random() * (to - from + 1) );
  }
};
