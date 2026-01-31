import { randomInt, toLatex, simplifyFraction, randomElement } from '../math-helpers';

// Helper: Generates a linear equation problem (standard type)
const generateLinearEquation = (inputMode = false) => {
  // Šablona: a(x + b) + c/d * x = e
  // Nebo: a(b - c*x) = d - e*x
  
  const xVal = randomInt(-5, 5); 
  
  // Generujeme koeficienty pro levou stranu
  const A = randomInt(2, 4);
  const B = randomInt(1, 5);
  const C_num = randomInt(1, 3);
  const C_den = [2, 4][randomInt(0, 1)]; 
  
  const L_val = A * (B - (C_num / C_den) * xVal);
  
  const E_num = randomInt(1, 5);
  const E_den = [2, 4][randomInt(0, 1)];
  
  const D_val = L_val + (E_num / E_den) * xVal;
  
  // Check validity
  if (!Number.isInteger(D_val * 4)) {
    return generateLinearEquation(inputMode);
  }
  
  const C_tex = toLatex(C_num, C_den);
  const E_tex = toLatex(E_num, E_den);
  
  const D_frac = simplifyFraction(Math.round(D_val * 4), 4);
  const D_tex = toLatex(D_frac.num, D_frac.den);
  
  const equationTex = `${A}\\left(${B} - ${C_tex}x\\right) = ${D_tex} - ${E_tex}x`;
  
  const problem = {
    type: "rovnice",
    question: `Řešte rovnici v R: \\[${equationTex}\\]`,
    correctAnswer: inputMode ? String(xVal) : `x = ${xVal}`,
    explanation: `Roznásobíme závorku, převedeme neznámou na jednu stranu a čísla na druhou. Pozor na znaménka. Výsledek je x = ${xVal}.`,
  };

  if (inputMode) {
    problem.inputMode = 'text';
  } else {
    problem.options = generateEquationOptions(xVal);
  }

  return problem;
};

// Helper: Generates equation with product expansion (Součin)
const generateProductEquation = () => {
  // (x + a)(x + b) - (x + c)(x + d) = e
  // Expands to: (a+b)x + ab - (c+d)x - cd = e
  // (a+b-c-d)x + ab-cd = e
  
  const xVal = randomInt(-5, 5);
  
  let a, b, c, d, coeffX;
  do {
    a = randomInt(-5, 5);
    b = randomInt(-5, 5);
    c = randomInt(-5, 5);
    d = randomInt(-5, 5);
    coeffX = (a + b) - (c + d);
  } while (coeffX === 0); // Ensure x doesn't disappear
  
  const constantTerm = (a * b) - (c * d);
  const e = coeffX * xVal + constantTerm;
  
  // Format terms: (x + a) -> (x - 2) if a = -2
  const formatBinomial = (val) => {
    if (val === 0) return "x";
    return val > 0 ? `(x + ${val})` : `(x - ${Math.abs(val)})`;
  };
  
  const eqTex = `${formatBinomial(a)}${formatBinomial(b)} - ${formatBinomial(c)}${formatBinomial(d)} = ${e}`;
  
  return {
    type: "rovnice",
    question: `Řešte rovnici (využijte roznásobení): \\[${eqTex}\\]`,
    correctAnswer: String(xVal),
    inputMode: 'text',
    explanation: `Roznásobte závorky (každý s každým). Členy s x^2 se odečtou. Dále řešíme jako lineární rovnici.`,
  };
};

// Helper: Generates equation solvable by factoring (Vytýkání)
const generateFactoringEquation = () => {
  // Pattern: A(x+B) + C(x+B) = D
  // Factors to: (A+C)(x+B) = D
  // x+B = D / (A+C)
  // x = D/(A+C) - B
  
  // Choose solution x
  const xVal = randomInt(-5, 5);
  
  // Choose common factor part (x+B)
  const B = randomInt(-5, 5);
  
  // Choose coefficients A and C
  let A, C;
  do {
    A = randomInt(-5, 5);
    C = randomInt(-5, 5);
  } while (A + C === 0 || A === 0 || C === 0);
  
  // Calculate D
  // D = (A+C) * (xVal + B)
  const D = (A + C) * (xVal + B);
  
  // Format parts
  // A(x+B)
  const formatPart = (coeff, val) => {
    const valStr = val === 0 ? "x" : (val > 0 ? `(x + ${val})` : `(x - ${Math.abs(val)})`);
    if (coeff === 1) return valStr;
    if (coeff === -1) return `-${valStr}`;
    return `${coeff}${valStr}`;
  };
  
  // Construct equation string: A(x+B) + C(x+B) = D
  // Note: Handle signs correctly
  const part1 = formatPart(A, B);
  const part2 = formatPart(C, B);
  
  // If part2 starts with negative, use it directly, else add +
  const part2Str = C < 0 ? part2 : `+ ${part2}`;
  
  const eqTex = `${part1} ${part2Str} = ${D}`;
  
  return {
    type: "rovnice",
    question: `Řešte rovnici (využijte vytýkání): \\[${eqTex}\\]`,
    correctAnswer: String(xVal),
    inputMode: 'text',
    explanation: `Vytkněte společný výraz v závorce. Získáte (${A}+${C})(x${B>0?'+'+B:B}) = ${D}.`,
  };
};

// Helper: Generates system of 2 linear equations (Soustava)
const generateSystemOfEquations = () => {
  const x = randomInt(-5, 5);
  const y = randomInt(-5, 5);
  
  // Eq 1: a1*x + b1*y = c1
  let a1, b1, c1;
  do {
    a1 = randomInt(-5, 5);
    b1 = randomInt(-5, 5);
  } while (a1 === 0 && b1 === 0);
  c1 = a1 * x + b1 * y;
  
  // Eq 2: a2*x + b2*y = c2
  let a2, b2, c2;
  do {
    a2 = randomInt(-5, 5);
    b2 = randomInt(-5, 5);
    // Ensure not parallel/identical (determinant check)
  } while ((a2 === 0 && b2 === 0) || (a1*b2 - a2*b1 === 0));
  c2 = a2 * x + b2 * y;
  
  // Format
  const formatEq = (a, b, c) => {
    // ax + by = c
    let parts = [];
    if (a !== 0) {
      if (a === 1) parts.push("x");
      else if (a === -1) parts.push("-x");
      else parts.push(`${a}x`);
    }
    
    if (b !== 0) {
      const sign = b > 0 ? (parts.length > 0 ? "+" : "") : "-";
      const absB = Math.abs(b);
      const strB = absB === 1 ? "y" : `${absB}y`;
      parts.push(`${sign} ${strB}`);
    } else if (parts.length === 0) {
      return "0 = " + c; // Should not happen given constraints
    }
    
    return `${parts.join(" ")} = ${c}`;
  };
  
  const eq1Tex = formatEq(a1, b1, c1);
  const eq2Tex = formatEq(a2, b2, c2);
  
  return {
    type: "rovnice",
    question: `Řešte soustavu rovnic: \\[ \\begin{cases} ${eq1Tex} \\\\ ${eq2Tex} \\end{cases} \\]`,
    questions: [
      { id: 'x', text: 'Vypočítejte x:', correctAnswer: String(x), inputMode: 'text' },
      { id: 'y', text: 'Vypočítejte y:', correctAnswer: String(y), inputMode: 'text' }
    ],
    explanation: `Vyjádřete jednu neznámou z jedné rovnice a dosaďte do druhé, nebo použijte sčítací metodu. x=${x}, y=${y}.`
  };
};

// Helper: Simple word problems solvable by linear equation
const generateWordEquation = () => {
  const type = randomInt(0, 1); // 0 = Number, 1 = Age/Items
  
  if (type === 0) {
    // Number problem
    const x = randomInt(2, 20);
    const mult = randomInt(2, 5);
    const add = randomInt(1, 20);
    const result = x * mult + add;
    
    return {
      type: "rovnice",
      question: `Myslím si číslo. Když ho vynásobím číslem ${mult} a k výsledku přičtu ${add}, dostanu ${result}. Které číslo si myslím?`,
      correctAnswer: String(x),
      inputMode: 'text',
      explanation: `Sestavíme rovnici: ${mult}x + ${add} = ${result}. ${mult}x = ${result-add}. x = ${x}.`
    };
  } else {
    // Partition problem (Age/Items)
    // "Petr a Pavel mají dohromady N kuliček. Petr má o X více než Pavel."
    // Pavel = x, Petr = x + diff
    // 2x + diff = total
    
    const pavel = randomInt(5, 30);
    const diff = randomInt(1, 10);
    const total = 2 * pavel + diff;
    
    return {
      type: "rovnice",
      question: `Petr a Pavel mají dohromady ${total} kuliček. Petr má o ${diff} více než Pavel. Kolik kuliček má Pavel?`,
      correctAnswer: String(pavel),
      inputMode: 'text',
      explanation: `Pavel má x, Petr má x + ${diff}. Rovnice: x + (x + ${diff}) = ${total}. 2x = ${total-diff}. x = ${pavel}.`
    };
  }
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

// Main generator function
export const generateEquationProblem = () => {
  const rand = Math.random();
  
  // 20% Standard linear equation (multiple choice)
  // 15% Standard linear equation (text input)
  // 15% Equation with product expansion (text input)
  // 15% Equation with factoring (text input)
  // 15% System of 2 equations (text input)
  // 10% Word problem (text input)
  // 10% Check solution (Ano/Ne)
  
  if (rand < 0.2) {
    return generateLinearEquation(false); // Multiple choice
  } else if (rand < 0.35) {
    return generateLinearEquation(true); // Text input
  } else if (rand < 0.50) {
    return generateProductEquation();
  } else if (rand < 0.65) {
    return generateFactoringEquation();
  } else if (rand < 0.80) {
    return generateSystemOfEquations();
  } else if (rand < 0.90) {
    return generateWordEquation();
  } else {
    return generateCheckSolution();
  }
};
