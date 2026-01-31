import { randomInt, simplifyFraction, toLatex } from '../math-helpers';

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
    question: `Řešte rovnici v R: \\[${eqTex}\\]`,
    correctAnswer: String(xVal),
    inputMode: 'text',
    explanation: `Roznásobte závorky (každý s každým). Členy s x^2 se odečtou. Dále řešíme jako lineární rovnici.`,
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
  
  // 30% Standard linear equation (multiple choice)
  // 15% Standard linear equation (text input)
  // 20% Equation with product expansion (text input)
  // 15% Equation with factoring (text input)
  // 20% System of 2 equations (text input)
  
  if (rand < 0.3) {
    return generateLinearEquation(false); // Multiple choice
  } else if (rand < 0.45) {
    return generateLinearEquation(true); // Text input
  } else if (rand < 0.65) {
    return generateProductEquation();
  } else if (rand < 0.8) {
    return generateFactoringEquation();
  } else {
    return generateSystemOfEquations();
  }
};
