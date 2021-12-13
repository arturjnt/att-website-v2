import en from "../data/locales/en.json";
import pt from "../data/locales/pt.json";

const findProp = (obj, prop) => {
  if (typeof obj == "undefined") return null;
  prop = prop.split(".");
  for (var i = 0; i < prop.length; i++) {
    if (typeof obj[prop[i]] == "undefined") return null;
    obj = obj[prop[i]];
  }
  return obj;
};

const T = (LANG, CODE) => {
  return LANG === "pt" ? findProp(pt, CODE) : findProp(en, CODE);
};

export default T;
