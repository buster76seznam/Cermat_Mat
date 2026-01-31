import { randomInt, toLatex } from '../math-helpers';

// (a + b)^2 or (a - b)^2
const generateFormulaProblem = () => {
  const a = randomInt(1, 5) === 1 ? 'x' : `${randomInt(2, 5)}x`;
  const b = randomInt(1, 10);
  const isPlus = Math.random() > 0.5;
  const sign = isPlus ? '+' : '-';
  
  const question = `Upravte podle vzorce: \\[ (${a} ${sign} ${b})^2 \\]`;
  
  // Example: (2x - 3)^2 = 4x^2 - 12x + 9
  // We won't check string equality, it's hard. We will ask for coefficients or specific term.
  // OR we can make it a multiple choice. Let's do multiple choice for expressions as checking strings is fragile.
  
  // Let's parse 'a' to get coefficient
  const aCoeff = a === 'x' ? 1 : parseInt(a.replace('x', ''));
  
  const term1 = `${aCoeff*aCoeff}x^2`;
  const term2Coeff = 2 * aCoeff * b * (isPlus ? 1 : -1);
  const term2 = term2Coeff === 0 ? '' : (term2Coeff > 0 ? `+ ${term2Coeff}x` : `- ${Math.abs(term2Coeff)}x`);
  const term3 = `+ ${b*b}`;
  
  const correctAnswer = `${term1} ${term2} ${term3}`.replace(/\s+/g, ' ').trim();
  
  // Generate distractors
  const options = new Set([correctAnswer]);
  while (options.size < 4) {
    const wrongSign = isPlus ? '-' : '+';
    // Wrong sign middle
    options.add(`${term1} ${term2.replace('+', '#').replace('-', '+').replace('#', '-')} ${term3}`.replace(/\s+/g, ' ').trim());
    // Missing middle term 2ab (common mistake a^2 + b^2)
    options.add(`${term1} ${term3}`.replace(/\s+/g, ' ').trim());
    // Wrong square of b (e.g. 2*b instead of b^2)
    options.add(`${term1} ${term2} + ${b*2}`.replace(/\s+/g, ' ').trim());
    // Wrong sign of last term
    options.add(`${term1} ${term2} - ${b*b}`.replace(/\s+/g, ' ').trim());
  }
  
  return {
    type: "vyrazy",
    question: question,
    correctAnswer: correctAnswer,
    options: Array.from(options).slice(0, 4).sort(() => Math.random() - 0.5),
    explanation: `Vzorec (A ${sign} B)² = A² ${sign} 2AB + B². Zde A=${a}, B=${b}.`
  };
};

// Vytýkání: 12x^2 - 8x = ?
const generateFactoringExpression = () => {
  // Common factor
  const factorCoeff = randomInt(2, 6);
  const factorVar = Math.random() > 0.5 ? 'x' : '';
  const factor = factorVar ? `${factorCoeff}x` : `${factorCoeff}`;
  
  // Remaining part (ax + b)
  const a = randomInt(1, 5);
  const b = randomInt(1, 5) * (Math.random() > 0.5 ? 1 : -1);
  
  // Expanded: factor * (ax + b)
  // coeff1 * x^(1 or 2) + coeff2 * x^(0 or 1)
  
  const term1Coeff = factorCoeff * a;
  const term2Coeff = factorCoeff * b;
  
  const isQuad = factorVar === 'x'; // if factor has x, term1 is x^2, term2 is x
  
  const term1 = `${term1Coeff}${isQuad ? 'x^2' : 'x'}`;
  const term2 = term2Coeff > 0 ? `+ ${term2Coeff}${isQuad ? 'x' : ''}` : `- ${Math.abs(term2Coeff)}${isQuad ? 'x' : ''}`;
  
  const expression = `${term1} ${term2}`;
  
  const correctAnswer = `${factor}(${a}x ${b>0?'+':'-'} ${Math.abs(b)})`;
  
  // Distractors
  const options = new Set([correctAnswer]);
  while (options.size < 4) {
    options.add(`${factor}(${a}x ${b>0?'-':'+'} ${Math.abs(b)})`); // wrong sign
    options.add(`${factorCoeff}(${a}${isQuad?'x^2':'x'} ${b>0?'+':'-'} ${Math.abs(b)})`); // didn't factor x
    options.add(`${factor}(${a}x)`); // random
  }
  
  return {
    type: "vyrazy",
    question: `Rozložte na součin (vytkněte): \\[ ${expression} \\]`,
    correctAnswer: correctAnswer,
    options: Array.from(options).slice(0, 4).sort(() => Math.random() - 0.5),
    explanation: `Najdeme největšího společného dělitele čísel ${term1Coeff} a ${Math.abs(term2Coeff)} (to je ${factorCoeff}) a proměnných (to je ${factorVar || 'nic'}). Vytkneme ${factor}.`
  };
};

// Find the error (Najdi chybu)
const generateFindErrorProblem = () => {
  const type = randomInt(0, 1);
  
  if (type === 0) {
    // Formula error: (a+b)^2 = a^2 + b^2 (missing middle term) or wrong sign
    const a = "x";
    const b = randomInt(2, 9);
    const isPlus = Math.random() > 0.5;
    const sign = isPlus ? "+" : "-";
    
    // Incorrect expansion
    const errorType = randomInt(0, 2);
    let badRightSide = "";
    let correctOption = "";
    let explanation = "";
    
    const correctMiddle = 2 * b;
    const correctLast = b * b;
    
    if (errorType === 0) {
      // Missing middle term: x^2 + 25
      badRightSide = `x^2 ${sign === '-' ? '-' : '+'} ${correctLast}`;
      correctOption = `Chybí prostřední člen ${isPlus ? '+' : '-'}${correctMiddle}x`;
      explanation = `Vzorec je (A±B)² = A² ± 2AB + B². V úpravě chybí člen 2·x·${b} = ${correctMiddle}x.`;
    } else if (errorType === 1) {
      // Wrong sign in middle: (x-3)^2 = x^2 + 6x + 9
      const wrongSign = isPlus ? "-" : "+";
      badRightSide = `x^2 ${wrongSign} ${correctMiddle}x + ${correctLast}`;
      correctOption = `Prostřední člen má mít opačné znaménko (${sign})`;
      explanation = `V závorce je ${sign}, takže prostřední člen musí být ${sign}2ab.`;
    } else {
      // Wrong sign at end: (x-3)^2 = x^2 - 6x - 9
      badRightSide = `x^2 ${sign} ${correctMiddle}x - ${correctLast}`;
      correctOption = `Poslední člen musí být vždy kladný (+${correctLast})`;
      explanation = `Druhá mocnina reálného čísla (b²) je vždy nezáporná, takže na konci musí být +${correctLast}.`;
    }
    
    return {
      type: "vyrazy",
      question: `Student upravil výraz takto: \\[ (${a} ${sign} ${b})^2 = ${badRightSide} \\] Kde udělal chybu?`,
      correctAnswer: correctOption,
      options: [
        correctOption,
        "Úprava je správná",
        `Chybí člen ${b}x`,
        `Na konci má být ${sign}${b}`
      ].sort(() => Math.random() - 0.5),
      explanation: explanation
    };
  } else {
    // Factoring error: 2x + 6 = 2(x + 6) or 2(x + 3) vs 2(x-3)
    const factor = randomInt(2, 5);
    const val = randomInt(2, 5);
    const correctVal = factor * val; // expression: factor*x + correctVal
    
    const badInner = randomInt(0, 1) === 0 ? val * 2 : val + factor;
    
    return {
      type: "vyrazy",
      question: `Rozhodněte, zda je úprava správná: \\[ ${factor}x + ${correctVal} = ${factor}(x + ${badInner}) \\]`,
      correctAnswer: "Ne, v závorce je chyba",
      options: ["Ano, je to správně", "Ne, v závorce je chyba", "Ne, vytknuté číslo je špatně", "Nelze rozhodnout"],
      explanation: `Zpětným roznásobením ${factor}(x + ${badInner}) dostaneme ${factor}x + ${factor*badInner}, což se nerovná ${factor}x + ${correctVal}. Správně je ${factor}(x + ${val}).`
    };
  }
};

export const generateExpressionProblem = () => {
  const rand = Math.random();
  if (rand < 0.4) {
    return generateFormulaProblem();
  } else if (rand < 0.8) {
    return generateFactoringExpression();
  } else {
    return generateFindErrorProblem();
  }
};
