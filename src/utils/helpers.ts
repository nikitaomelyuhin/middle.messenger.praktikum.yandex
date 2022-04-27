export type Indexed<T = any> = {
  [k in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }
  return lhs;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof object !== "object" || object === null) {
    return object;
  }

  if (typeof path !== "string") {
    throw new Error("Path must be a string");
  }

  const result = path.split(".").reduceRight<Indexed>((acc, key) => ({
    [key]: acc,
  }), value as any);
  return merge(object as Indexed, result);
}

export function isPlainObject(value: unknown): value is Indexed {
  return typeof value === "object"
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === "[object Object]";
}

export function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

export function isArrayOrObject(value: unknown): value is [] | Indexed {
  return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: Indexed, rhs: Indexed) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

export function isEmptyObject(obj = {}) {
  if (!Object.keys(obj).length) {
    return true;
  }
  return false;
}

export function getQueryParameterByName(name: string, url = window.location.href) {
  name = name.replace(/[[\]]/g, "\\$&");
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export function formatDate(date: string) {
  interface DateTimeFormatOptions {
    localeMatcher?: "lookup" | "best fit";
    weekday?: "long" | "short" | "narrow";
    era?: "long" | "short" | "narrow";
    year?: "numeric" | "2-digit";
    month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
    day?: "numeric" | "2-digit";
    hour?: "numeric" | "2-digit";
    minute?: "numeric" | "2-digit";
    second?: "numeric" | "2-digit";
    timeZoneName?: "long" | "short";
    formatMatcher?: "basic" | "best fit";
    hour12?: boolean;
    timeZone?: string; // this is more complicated than the others, not sure what I expect here
  }
  const options: DateTimeFormatOptions = {
    month: "short", day: "numeric", hour: "numeric", minute: "numeric", timeZone: "Europe/Moscow",
  };
  const supportDate: Date = new Date(date);
  return supportDate.toLocaleDateString("ru-RU", options);
}