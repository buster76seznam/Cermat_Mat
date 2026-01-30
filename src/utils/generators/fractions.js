import { randomInt, simplifyFraction, toLatex, gcd, lcm } from '../math-helpers';

// Generuje operaci se zlomky: (a/b OP c/d)
// Difficulty 1: Jednoduché sčítání/odčítání
// Difficulty 2: Násobení/dělení, větší čísla
// Difficulty 3: Složené zlomky, tři operandy, závorky
export const generateFractionProblem = (difficulty = 1) => {
  // Pro Cermat úroveň chceme vyšší obtížnost rovnou
  // Příklad: (2/3 - 4/5) * 15/8
  
  const type = randomInt(1, 3); // 1: Basic op, 2: Expression, 3: Compound fraction
  
  if (type === 1) {
    // Basic: a/b + c/d
    const n1 = randomInt(1, 9) * (Math.random() > 0.5 ? 1 : -1);
    const d1 = randomInt(2, 9);
    const n2 = randomInt(1, 9);
    const d2 = randomInt(2, 9);
    const op = randomInt(0, 1) === 0 ? '+' : '-';
    
    const problemTex = `${toLatex(n1, d1)} ${op} ${toLatex(n2, d2)}`;
    
    // Výpočet
    let resNum, resDen;
    if (op === '+') {
      resNum = n1 * d2 + n2 * d1;
    } else {
      resNum = n1 * d2 - n2 * d1;
    }
    resDen = d1 * d2;
    
    const simplified = simplifyFraction(resNum, resDen);
    const correct = toLatex(simplified.num, simplified.den);
    
    return {
      type: "zlomky",
      question: `Vypočítejte: \\(${problemTex}\\)`,
      correctAnswer: correct,
      explanation: `Převedeme na společného jmenovatele a sečteme/odečteme čitatele.`,
      options: generateOptions(simplified.num, simplified.den)
    };
  } else if (type === 2) {
    // Expression: (a/b + c/d) * e/f
    const n1 = randomInt(1, 5);
    const d1 = randomInt(2, 5);
    const n2 = randomInt(1, 5);
    const d2 = randomInt(2, 5);
    const n3 = randomInt(1, 5);
    const d3 = randomInt(2, 5);
    
    const problemTex = `\\left(${toLatex(n1, d1)} - ${toLatex(n2, d2)}\\right) \\cdot ${toLatex(n3, d3)}`;
    
    // (n1/d1 - n2/d2) * n3/d3
    // (n1*d2 - n2*d1)/(d1*d2) * n3/d3
    const subNum = n1 * d2 - n2 * d1;
    const subDen = d1 * d2;
    
    const finalNum = subNum * n3;
    const finalDen = subDen * d3;
    
    const simplified = simplifyFraction(finalNum, finalDen);
    const correct = toLatex(simplified.num, simplified.den);
    
    return {
      type: "zlomky",
      question: `Vypočítejte: \\(${problemTex}\\)`,
      correctAnswer: correct,
      explanation: "Nejdříve vypočítáme závorku (převedením na společného jmenovatele) a výsledek vynásobíme.",
      options: generateOptions(simplified.num, simplified.den)
    };
  } else {
    // Compound fraction (složený zlomek)
    // (a/b) / (c/d - e/f)
    const n1 = randomInt(1, 6);
    const d1 = randomInt(2, 6);
    
    const n2 = randomInt(1, 4);
    const d2 = randomInt(2, 4);
    const n3 = randomInt(1, 4);
    const d3 = randomInt(2, 4);
    
    // Ensure denominator isn't zero
    if (n2*d3 - n3*d2 === 0) { n3++; } 
    
    const problemTex = `\\frac{${toLatex(n1, d1)}}{${toLatex(n2, d2)} - ${toLatex(n3, d3)}}`;
    
    // num: n1/d1
    // den: (n2*d3 - n3*d2) / (d2*d3)
    const denNum = n2 * d3 - n3 * d2;
    const denDen = d2 * d3;
    
    // (n1/d1) * (denDen/denNum)
    const finalNum = n1 * denDen;
    const finalDen = d1 * denNum;
    
    const simplified = simplifyFraction(finalNum, finalDen);
    const correct = toLatex(simplified.num, simplified.den);
    
    return {
      type: "zlomky",
      question: `Vypočítejte: \\(${problemTex}\\)`,
      correctAnswer: correct,
      explanation: "Vypočítáme jmenovatele hlavního zlomku a poté provedeme dělení (násobení převrácenou hodnotou).",
      options: generateOptions(simplified.num, simplified.den)
    };
  }
};

const generateOptions = (num, den) => {
  const correct = toLatex(num, den);
  const options = new Set([correct]);
  
  while (options.size < 4) {
    // Generování falešných odpovědí
    // Chyba znaménka
    if (Math.random() > 0.5) options.add(toLatex(-num, den));
    // Převrácená hodnota
    if (Math.random() > 0.5 && num !== 0) options.add(toLatex(den, num));
    // Chyba v čitateli
    options.add(toLatex(num + randomInt(-2, 2), den));
    // Chyba ve jmenovateli
    options.add(toLatex(num, den + randomInt(-2, 2)));
    
    // Random nesmysl
    options.add(toLatex(randomInt(1, 10), randomInt(2, 10)));
  }
  
  // Převést Set na pole a zamíchat
  return Array.from(options).slice(0, 4).sort(() => Math.random() - 0.5);
};
