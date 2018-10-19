const _appVersion = navigator.appVersion.toLowerCase();

/**
 * global (node or window)
 */
export const $WINDOW = global;

/**
 * レイアウト変更のしきい値
 */
export const BREAK_POINT = 768;

/**
 * window の高さを取得
 */
export function getWindowHeight() {
  return $WINDOW.height();
}

/**
 * window の幅を取得
 */
export function getWindowWidth() {
  return $WINDOW.width();
}

/**
 * window の 縦 スクロール量を取得
 */
export function getPageYOffset() {
  return $WINDOW.scrollTop();
}

/**
 * window の 横 スクロール量を取得
 */
export function getPageXOffset() {
  return $WINDOW.scrollLeft();
}

/**
 * Windowsかどうか
 */
export function isWindows() {
  return _appVersion.match(/windows/);
}

/**
 * Windows標準ブラウザかどうか
 */
export function isWindowsBasicBrowser() {
  return (_appVersion.indexOf('msie') != -1 || _appVersion.indexOf('trident') != -1 || _appVersion.indexOf('edge') != -1);
}

/**
 * モバイル表示かどうか
 */
export function isMobile() {
  return $WINDOW.width() <= BREAK_POINT;
}