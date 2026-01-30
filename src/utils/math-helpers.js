// Největší společný dělitel
export const gcd = (a, b) => {
  return b === 0 ? a : gcd(b, a % b);
};

// Nejmenší společný násobek
export const lcm = (a, b) => {
  return (a * b) / gcd(a, b);
};

// Zjednodušení zlomku
export const simplifyFraction = (num, den) => {
  if (den === 0) return { num: 0, den: 1 }; // Ochrana proti dělení nulou
  const common = gcd(Math.abs(num), Math.abs(den));
  let n = num / common;
  let d = den / common;
  if (d < 0) {
    n = -n;
    d = -d;
  }
  return { num: n, den: d };
};

// Náhodné číslo v rozsahu
export const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Náhodný prvek z pole
export const randomElement = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Formátování zlomku do LaTeXu
export const toLatex = (num, den) => {
  if (den === 1) return `${num}`;
  if (num === 0) return "0";
  return `\\frac{${num}}{${den}}`;
};
