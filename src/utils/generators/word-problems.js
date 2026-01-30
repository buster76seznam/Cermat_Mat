import { randomInt } from '../math-helpers';

// Slovní úloha - Společná práce (nepřímá úměra)
// "Naši zakázku vyrábí několik automatů..."
export const generateWordProblem = () => {
  // Scénář: N1 strojů udělá práci za T1 hodin.
  // Konstanta práce W = N1 * T1 (strojohodin).
  
  // Generujeme "hezká" čísla
  // Např. W = 720 (dobře dělitelné)
  const W = 120 * randomInt(1, 6); // 120, 240, 360...
  
  // Zadání: N1 strojů ... T1 hodin
  // Najdeme dělitele W
  const divisors = [];
  for(let i=5; i<30; i++) {
    if (W % i === 0) divisors.push(i);
  }
  
  const N1 = divisors[randomInt(0, divisors.length - 1)];
  const T1 = W / N1;
  
  // Otázka 1: Kolik hodin trvá práce pro N2 automatů?
  const N2 = divisors[randomInt(0, divisors.length - 1)];
  const T2 = W / N2; // Musí to vyjít hezky, protože vybíráme z dělitelů
  
  // Otázka 2: Zlomek práce pro N3 automatů za T3 hodin
  // Práce odvedená: P = N3 * T3
  // Zlomek = P / W
  const N3 = randomInt(2, 10);
  const T3 = randomInt(2, 20);
  const P_done = N3 * T3;
  // Simplify fraction P_done / W
  // Aby to nebylo víc než 1, omezíme
  
  // Otázka 3: Složená. Čtvrtina (nebo část) zakázky N4 strojů, zbytek N5 strojů.
  // Celkem čas?
  // W_part1 = W / 4 (např)
  // T_part1 = W_part1 / N4
  // W_part2 = 3/4 W
  // T_part2 = W_part2 / N5
  // Total T = T_part1 + T_part2
  
  // Aby to vyšlo hezky, musíme to napasovat.
  // Zjednodušíme: "Polovinu zakázky dělalo X strojů, druhou polovinu Y strojů"
  const N4 = divisors[randomInt(0, divisors.length - 1)];
  const N5 = divisors[randomInt(0, divisors.length - 1)];
  
  const T_part1 = (W / 2) / N4;
  const T_part2 = (W / 2) / N5;
  const T_total = T_part1 + T_part2;
  
  // Formátování textu
  const scenario = `Naši zakázku vyrábí několik automatů. Automaty vždy pracují společně a navzájem stejným tempem. Kdyby pracovalo ${N1} automatů, vyrobí zakázku přesně za ${T1} hodin.`;
  
  // Vracíme strukturu, která podporuje "3 podotázky"
  return {
    type: "slovni_uloha",
    scenario: scenario,
    questions: [
      {
        id: "q1",
        text: `Vypočtěte, za kolik hodin vyrobí naši zakázku ${N2} automatů.`,
        correctAnswer: `${T2} hodin`,
        options: [`${T2} hodin`, `${T2 + 2} hodin`, `${T2 - 1} hodin`, `${Math.round(T2 * 1.5)} hodin`].sort(() => Math.random() - 0.5)
      },
      {
        id: "q2",
        text: `Vyjádřete zlomkem v základním tvaru, jakou část zakázky vyrobí ${N3} automatů za ${T3} hodin. (Celková práce = ${W} strojohodin)`,
        correctAnswer: `${P_done}/${W} (nutno zkrátit)`, // TODO: Better format
        options: ["1/3", "1/2", "3/5", "2/7"] // Placeholder, real logic needed inside component or better generator
      },
      {
        id: "q3",
        text: `Polovinu zakázky vyrobilo ${N4} automatů, druhou polovinu dokončilo ${N5} automatů. Jak dlouho trvala celá výroba?`,
        correctAnswer: `${T_total} hodin`,
        options: [`${T_total} hodin`, `${T_total + 5} hodin`, `${Math.round(T_total * 0.8)} hodin`, `${T_total * 2} hodin`].sort(() => Math.random() - 0.5)
      }
    ],
    explanation: `Celková práce je konstanta: ${N1} * ${T1} = ${W} strojohodin. \n1) ${W} / ${N2} = ${T2}h. \n2) (${N3}*${T3})/${W}. \n3) Čas = (0.5*${W})/${N4} + (0.5*${W})/${N5}.`
  };
};
