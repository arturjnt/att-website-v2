import en from "../data/locales/en.json";
import pt from "../data/locales/pt.json";

const findProp = (obj, prop, defval) => {
  if (typeof defval == "undefined") defval = null;
  prop = prop.split(".");
  for (var i = 0; i < prop.length; i++) {
    if (typeof obj[prop[i]] == "undefined") return defval;
    obj = obj[prop[i]];
  }
  return obj;
};

const T = (LANG, CODE) => {
  return findProp(eval(LANG).default, CODE);
};

export default T;
