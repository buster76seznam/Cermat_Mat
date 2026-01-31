import { randomInt, toLatex } from '../math-helpers';

// Helper: Generates perimeter/area problem for 2D shapes
const generate2DProblem = () => {
  const shapes = [
    { name: 'čtverec', type: 'square' },
    { name: 'obdélník', type: 'rectangle' },
    { name: 'trojúhelník', type: 'triangle' }
  ];
  
  const shape = shapes[randomInt(0, shapes.length - 1)];
  const isArea = Math.random() > 0.5; // Area vs Perimeter
  
  let question, answer, explanation, sideA, sideB;
  
  if (shape.type === 'square') {
    sideA = randomInt(2, 12);
    if (isArea) {
      // Obsah čtverce
      question = `Vypočítejte obsah čtverce o straně a = ${sideA} cm.`;
      answer = sideA * sideA;
      explanation = `Obsah čtverce S = a · a = ${sideA} · ${sideA} = ${answer} cm².`;
    } else {
      // Obvod čtverce
      question = `Vypočítejte obvod čtverce o straně a = ${sideA} cm.`;
      answer = 4 * sideA;
      explanation = `Obvod čtverce o = 4 · a = 4 · ${sideA} = ${answer} cm.`;
    }
  } else if (shape.type === 'rectangle') {
    sideA = randomInt(2, 12);
    sideB = randomInt(2, 12);
    if (isArea) {
      question = `Vypočítejte obsah obdélníku o stranách a = ${sideA} cm, b = ${sideB} cm.`;
      answer = sideA * sideB;
      explanation = `Obsah obdélníku S = a · b = ${sideA} · ${sideB} = ${answer} cm².`;
    } else {
      question = `Vypočítejte obvod obdélníku o stranách a = ${sideA} cm, b = ${sideB} cm.`;
      answer = 2 * (sideA + sideB);
      explanation = `Obvod obdélníku o = 2 · (a + b) = 2 · (${sideA} + ${sideB}) = ${answer} cm.`;
    }
  } else if (shape.type === 'triangle') {
    // Pro trojúhelník zjednodušíme - pravoúhlý pro obsah, obecný pro obvod (ale zadáme strany)
    if (isArea) {
      // Obsah pravoúhlého trojúhelníku
      sideA = randomInt(2, 10) * 2; // Aby bylo dělitelné 2
      sideB = randomInt(2, 10);
      question = `Vypočítejte obsah pravoúhlého trojúhelníku s odvěsnami a = ${sideA} cm, b = ${sideB} cm.`;
      answer = (sideA * sideB) / 2;
      explanation = `Obsah pravoúhlého trojúhelníku S = (a · b) / 2 = (${sideA} · ${sideB}) / 2 = ${answer} cm².`;
    } else {
      // Obvod
      sideA = randomInt(3, 10);
      sideB = randomInt(3, 10);
      const sideC = randomInt(Math.abs(sideA - sideB) + 1, sideA + sideB - 1); // Trojúhelníková nerovnost
      question = `Vypočítejte obvod trojúhelníku o stranách a = ${sideA} cm, b = ${sideB} cm, c = ${sideC} cm.`;
      answer = sideA + sideB + sideC;
      explanation = `Obvod trojúhelníku o = a + b + c = ${sideA} + ${sideB} + ${sideC} = ${answer} cm.`;
    }
  }
  
  return {
    type: "geometrie",
    question: question,
    correctAnswer: String(answer),
    inputMode: 'text',
    explanation: explanation
  };
};

// Helper: Generates volume/surface problem for 3D shapes
const generate3DProblem = () => {
  const shapes = [
    { name: 'krychle', type: 'cube' },
    { name: 'kvádr', type: 'cuboid' }
  ];
  
  const shape = shapes[randomInt(0, shapes.length - 1)];
  const taskType = randomInt(0, 2); // 0 = Volume, 1 = Surface Area, 2 = Properties (edges/vertices)
  
  let question, answer, explanation, a, b, c;
  
  if (shape.type === 'cube') {
    a = randomInt(2, 10);
    if (taskType === 0) {
      question = `Vypočítejte objem krychle o hraně a = ${a} cm.`;
      answer = a * a * a;
      explanation = `Objem krychle V = a³ = ${a} · ${a} · ${a} = ${answer} cm³.`;
    } else if (taskType === 1) {
      question = `Vypočítejte povrch krychle o hraně a = ${a} cm.`;
      answer = 6 * a * a;
      explanation = `Povrch krychle S = 6 · a² = 6 · ${a} · ${a} = ${answer} cm².`;
    } else {
      const props = [
        { q: 'počet vrcholů', a: 8 },
        { q: 'počet hran', a: 12 },
        { q: 'počet stěn', a: 6 }
      ];
      const p = props[randomInt(0, 2)];
      question = `Určete ${p.q} krychle.`;
      answer = p.a;
      explanation = `Krychle má ${p.a} ${p.q.replace('počet ', '')}.`;
    }
  } else {
    // Cuboid
    a = randomInt(2, 8);
    b = randomInt(2, 8);
    c = randomInt(2, 8);
    if (taskType === 0) {
      question = `Vypočítejte objem kvádru o rozměrech a = ${a} cm, b = ${b} cm, c = ${c} cm.`;
      answer = a * b * c;
      explanation = `Objem kvádru V = a · b · c = ${a} · ${b} · ${c} = ${answer} cm³.`;
    } else if (taskType === 1) {
      question = `Vypočítejte povrch kvádru o rozměrech a = ${a} cm, b = ${b} cm, c = ${c} cm.`;
      answer = 2 * (a*b + b*c + a*c);
      explanation = `Povrch kvádru S = 2(ab + bc + ac) = 2(${a}·${b} + ${b}·${c} + ${a}·${c}) = ${answer} cm².`;
    } else {
       const props = [
        { q: 'počet vrcholů', a: 8 },
        { q: 'počet hran', a: 12 },
        { q: 'počet stěn', a: 6 }
      ];
      const p = props[randomInt(0, 2)];
      question = `Určete ${p.q} kvádru.`;
      answer = p.a;
      explanation = `Kvádr má ${p.a} ${p.q.replace('počet ', '')}.`;
    }
  }
  
  return {
    type: "geometrie",
    question: question,
    correctAnswer: String(answer),
    inputMode: 'text',
    explanation: explanation
  };
};

export const generateGeometryProblem = () => {
  if (Math.random() > 0.4) {
    return generate2DProblem();
  } else {
    return generate3DProblem();
  }
};
