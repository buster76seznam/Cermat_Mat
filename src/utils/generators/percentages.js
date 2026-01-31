import { randomInt } from '../math-helpers';

// X% of Y
const generateBasicPercent = () => {
  // We want nice numbers.
  // X should be common percent (10, 20, 25, 50, 75, 1, 5, 100, 200)
  const percents = [1, 5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 100, 150, 200];
  const X = percents[randomInt(0, percents.length - 1)];
  const Y = randomInt(1, 20) * 10; // 10, 20 ... 200
  
  const answer = (X / 100) * Y;
  
  return {
    type: "procenta",
    question: `Vypočítejte ${X} % z ${Y}.`,
    correctAnswer: String(answer),
    inputMode: 'text',
    explanation: `1 % z ${Y} je ${Y/100}. ${X} % je tedy ${X} · ${Y/100} = ${answer}.`
  };
};

// X is Y% of Z? (Find base or find percent)
const generateReversePercent = () => {
  const mode = randomInt(0, 1); // 0 = Find %, 1 = Find Base
  
  if (mode === 0) {
    // Kolik % je A z B?
    // Make sure result is integer
    const B = randomInt(1, 20) * 10; // Base
    const percent = [10, 20, 25, 50, 75][randomInt(0, 4)];
    const A = (percent / 100) * B;
    
    return {
      type: "procenta",
      question: `Kolik procent je ${A} z ${B}?`,
      correctAnswer: String(percent),
      inputMode: 'text',
      explanation: `Část ku celku: ${A} / ${B} = ${A/B}. To je ${percent} %.`
    };
  } else {
    // A je X % z kolika?
    const percent = [10, 20, 25, 50][randomInt(0, 3)];
    const Base = randomInt(2, 20) * 10;
    const A = (percent / 100) * Base;
    
    return {
      type: "procenta",
      question: `Číslo ${A} je ${percent} % z neznámého čísla. Určete toto číslo.`,
      correctAnswer: String(Base),
      inputMode: 'text',
      explanation: `${percent} % je ${A}. 1 % je ${A/percent}. 100 % je ${100 * (A/percent)}.`
    };
  }
};

// Price change
const generatePriceChange = () => {
  const price = randomInt(1, 50) * 100; // 100, 200 ... 5000
  const changePercent = [10, 15, 20, 25, 30, 50][randomInt(0, 5)];
  const isIncrease = Math.random() > 0.5;
  
  let newPrice, question, explanation;
  
  if (isIncrease) {
    newPrice = price * (1 + changePercent/100);
    question = `Boty stály ${price} Kč a byly zdraženy o ${changePercent} %. Kolik stojí nyní?`;
    explanation = `Zdražení o ${changePercent} % znamená novou cenu 100 + ${changePercent} = ${100+changePercent} % původní ceny. ${price} · ${1 + changePercent/100} = ${newPrice}.`;
  } else {
    newPrice = price * (1 - changePercent/100);
    question = `Tričko stálo ${price} Kč a bylo zlevněno o ${changePercent} %. Kolik stojí nyní?`;
    explanation = `Sleva ${changePercent} % znamená, že platíme ${100-changePercent} % původní ceny. ${price} · ${1 - changePercent/100} = ${newPrice}.`;
  }
  
  return {
    type: "procenta",
    question: question,
    correctAnswer: String(newPrice),
    inputMode: 'text',
    explanation: explanation
  };
};

// Word problems (Slovní úlohy)
const generatePercentWordProblem = () => {
  const type = randomInt(0, 2);
  
  if (type === 0) {
    // Classroom: Total students, % of girls/boys
    const total = randomInt(2, 6) * 5; // 10, 15, ... 30
    const percentGirls = [20, 40, 50, 60, 80][randomInt(0, 4)];
    const girls = (percentGirls / 100) * total;
    const boys = total - girls;
    
    const askGirls = Math.random() > 0.5;
    
    return {
      type: "procenta",
      question: `Ve třídě je ${total} žáků. ${percentGirls} % z nich jsou dívky. Kolik je ve třídě ${askGirls ? 'dívek' : 'chlapců'}?`,
      correctAnswer: String(askGirls ? girls : boys),
      inputMode: 'text',
      explanation: `${percentGirls} % z ${total} = ${girls} dívek. Chlapců je ${total} - ${girls} = ${boys}.`
    };
  } else if (type === 1) {
    // Reading: Pages total, % read
    const pages = randomInt(1, 5) * 50; // 50, 100, ... 250
    const percentRead = [10, 20, 25, 50, 75][randomInt(0, 4)];
    const pagesRead = (percentRead / 100) * pages;
    const pagesLeft = pages - pagesRead;
    
    return {
      type: "procenta",
      question: `Kniha má ${pages} stran. Petr přečetl ${percentRead} %. Kolik stran mu zbývá přečíst?`,
      correctAnswer: String(pagesLeft),
      inputMode: 'text',
      explanation: `Přečetl ${percentRead} % z ${pages} = ${pagesRead} stran. Zbývá ${pages} - ${pagesRead} = ${pagesLeft}.`
    };
  } else {
    // Survey/Goal: Target, % reached
    const goal = randomInt(1, 10) * 1000; // 1000 ... 10000
    const percentDone = [10, 20, 25, 50][randomInt(0, 3)];
    const done = (percentDone / 100) * goal;
    
    return {
      type: "procenta",
      question: `Cílová částka sbírky je ${goal} Kč. Zatím se vybralo ${percentDone} %. Kolik korun se vybralo?`,
      correctAnswer: String(done),
      inputMode: 'text',
      explanation: `${percentDone} % z ${goal} = ${done} Kč.`
    };
  }
};

export const generatePercentProblem = () => {
  const rand = Math.random();
  if (rand < 0.3) {
    return generateBasicPercent();
  } else if (rand < 0.5) {
    return generateReversePercent();
  } else if (rand < 0.75) {
    return generatePriceChange();
  } else {
    return generatePercentWordProblem();
  }
};
