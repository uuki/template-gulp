import BezierEasing from 'bezier-easing'

/**
 * asyncForeach
 */
export async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

/**
 * setCookie
 */
export function setCookie(expire_hour, name, value=1) {
  const expire = new Date();
  expire.setTime(expire.getTime() + 1000 * 3600 * expire_hour);
  document.cookie = `${ name }=${value}; expires=${ expire.toUTCString() }`;
}

/**
 * getCookie
 */
export function getCookie(name) {
  let result = null;

  const cookieName = name + '=';
  const allcookies = document.cookie;

  const position = allcookies.indexOf( cookieName );
  if( position != -1 ) {
      const startIndex = position + cookieName.length;

      let endIndex = allcookies.indexOf( ';', startIndex );
      if( endIndex == -1 ) {
          endIndex = allcookies.length;
      }

      result = decodeURIComponent(
          allcookies.substring( startIndex, endIndex ) );
  }

  return result;
}

/**
 * throttle
 */
export function throttle(func, wait = 100) {
  let timer = null;
  return function(...args) {
    if (timer === null) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, wait);
    }
  };
}

/**
 * generateCubicBezier
 */
export function generateCubicBezier(x1, y1, x2, y2, step) {
    const table = generateTable(x1, x2, step);
    const tableSize = table.length;
    cubicBezier.getT = getT;
    cubicBezier.table = table;
    return cubicBezier;
    function cubicBezier(x) {
        if (x <= 0) {
          return 0;
        }
        if (1 <= x) {
          return 1;
        }
        return getCoordinate(y1, y2, getT(x));
    }
    function getT(x) {
        let xt1, xt0;
        if (x < 0.5) {
            for (let i = 1; i < tableSize; i++) {
                xt1 = table[i];
                if (x <= xt1[0]) {
                    xt0 = table[i - 1];
                    break;
                }
            }
        } else {
            for (let i = tableSize - 1; i--;) {
                xt1 = table[i];
                if (xt1[0] <= x) {
                    xt0 = table[i + 1];
                    break;
                }
            }
        }
        return xt0[1] + (x - xt0[0]) * (xt1[1] - xt0[1]) / (xt1[0] - xt0[0]);
    }
    function getCoordinate(z1, z2, t) {
        return (3 * z1 - 3 * z2 + 1) * t * t * t + (-6 * z1 + 3 * z2) * t * t + 3 * z1 * t;
    }
    function generateTable(x1, x2, step) {
        step = step || 1 / 30;
        const table = [[0, 0]];
        for (let t = step, previousX = 0; t < 1; t += step) {
            const x = getCoordinate(x1, x2, t);
            if (previousX < x) {
                table.push([x, t]);
                previousX = x;
            }
        }
        table.push([1, 1]);
        return table;
    }
}

/**
 * easing
 */
// Cubic
export function easeInCubic() { return BezierEasing(0.550, 0.055, 0.675, 0.190); }
export function easeOutCubic() { return BezierEasing(0.215, 0.610, 0.355, 1.000); }
export function easeInOutCubic() { return BezierEasing(0.645, 0.045, 0.355, 1.000); }

// Circ
export function easeInCirc() { return BezierEasing(0.600, 0.040, 0.980, 0.335); }
export function easeOutCirc() { return BezierEasing(0.075, 0.820, 0.165, 1.000); }
export function easeInOutCirc() { return BezierEasing(0.785, 0.135, 0.150, 0.860); }

// Expo
export function easeInExpo() { return BezierEasing(0.950, 0.050, 0.795, 0.035); }
export function easeOutExpo() { return BezierEasing(0.190, 1.000, 0.220, 1.000); }
export function easeInOutExpo() { return BezierEasing(1.000, 0.000, 0.000, 1.000); }

// Quad
export function easeInQuad() { return BezierEasing(0.550, 0.085, 0.680, 0.530); }
export function easeOutQuad() { return BezierEasing(0.250, 0.460, 0.450, 0.940); }
export function easeInOutQuad() { return BezierEasing(0.455, 0.030, 0.515, 0.955); }

// Quart
export function easeInQuart() { return BezierEasing(0.895, 0.030, 0.685, 0.220); }
export function easeOutQuart() { return BezierEasing(0.165, 0.840, 0.440, 1.000); }
export function easeInOutQuart() { return BezierEasing(0.770, 0.000, 0.175, 1.000); }

// Quint
export function easeInQuint() { return BezierEasing(0.755, 0.050, 0.855, 0.060); }
export function easeOutQuint() { return BezierEasing(0.230, 1.000, 0.320, 1.000); }
export function easeInOutQuint() { return BezierEasing(0.860, 0.000, 0.070, 1.000); }

// Sine
export function easeInSine() { return BezierEasing(0.470, 0.000, 0.745, 0.715); }
export function easeOutSine() { return BezierEasing(0.390, 0.575, 0.565, 1.000); }
export function easeInOutSine() { return BezierEasing(0.445, 0.050, 0.550, 0.950); }

// Back
export function easeInBack() { return BezierEasing(0.600, -0.280, 0.735, 0.045); }
export function easeOutBack() { return BezierEasing(0.175, 0.885, 0.320, 1.275); }
export function easeInOutBack() { return BezierEasing(0.680, -0.550, 0.265, 1.550); }