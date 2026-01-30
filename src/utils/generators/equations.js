import { randomInt, simplifyFraction, toLatex, gcd } from '../math-helpers';

// Generuje lineární rovnici
export const generateEquationProblem = () => {
  // Šablona: a(x + b) + c/d * x = e
  // Nebo: a(b - c*x) = d - e*x
  
  // Zvolíme si řešení x předem, aby vycházelo "hezky" (celé číslo nebo x.5)
  const xVal = randomInt(-5, 5); 
  
  // Generujeme koeficienty pro levou stranu
  // Tvar: A * (B - C*x)
  const A = randomInt(2, 4);
  const B = randomInt(1, 5);
  // C bude zlomek, např. 3/4
  const C_num = randomInt(1, 3);
  const C_den = [2, 4][randomInt(0, 1)]; // jmenovatel 2 nebo 4 pro "Cermat feel"
  
  // Levá strana hodnota pro dané x
  // L = A * (B - (C_num/C_den) * xVal)
  const L_val = A * (B - (C_num / C_den) * xVal);
  
  // Pravá strana: D - E*x
  // E bude zlomek, např. 5/4
  const E_num = randomInt(1, 5);
  const E_den = [2, 4][randomInt(0, 1)];
  
  // Musíme dopočítat D, aby L_val = D - (E_num/E_den) * xVal
  // D = L_val + (E_num/E_den) * xVal
  const D_val = L_val + (E_num / E_den) * xVal;
  
  // Aby to byla validní úloha, D_val by mělo být rozumné číslo (ne 12.87321)
  // Pokud není, zkusíme znovu (rekurze) nebo zaokrouhlíme/upravíme zadání.
  // Pro jednoduchost zde, pokud D_val není celé nebo "půlkové" číslo, zkusíme vygenerovat znovu.
  if (!Number.isInteger(D_val * 4)) {
    return generateEquationProblem();
  }
  
  // Sestavení LaTeX stringu
  const C_tex = toLatex(C_num, C_den);
  const E_tex = toLatex(E_num, E_den);
  
  // Formátování D (pokud je zlomek)
  const D_frac = simplifyFraction(Math.round(D_val * 4), 4);
  const D_tex = toLatex(D_frac.num, D_frac.den);
  
  const equationTex = `${A}\\left(${B} - ${C_tex}x\\right) = ${D_tex} - ${E_tex}x`;
  
  return {
    type: "rovnice",
    question: `Řešte rovnici v R: \\[${equationTex}\\]`,
    correctAnswer: `x = ${xVal}`,
    explanation: `Roznásobíme závorku, převedeme neznámou na jednu stranu a čísla na druhou. Pozor na znaménka. Výsledek je x = ${xVal}.`,
    options: generateEquationOptions(xVal)
  };
};

const generateEquationOptions = (xVal) => {
  const opts = new Set([`x = ${xVal}`]);
  while (opts.size < 4) {
    opts.add(`x = ${xVal + randomInt(-3, 3)}`);
    opts.add(`x = ${-xVal}`);
    opts.add(`x = ${xVal + 0.5}`);
    if (xVal !== 0) opts.add(`x = ${1/xVal}`);
  }
  return Array.from(opts).slice(0, 4).sort(() => Math.random() - 0.5);
};
