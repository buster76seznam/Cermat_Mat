export const topics = [
  {
    id: "zlomky",
    title: "Zlomky & Desetinná čísla",
    description: "Složité operace se zlomky, převody, složené zlomky",
    icon: "Calculator",
    questions: [
      {
        id: 1,
        question: "Vypočítejte: \\(\\frac{2}{3} + \\frac{1}{6}\\)",
        options: ["5/6", "1/2", "3/9", "4/6"],
        correctAnswer: "5/6",
        explanation: "Převedeme na společného jmenovatele 6: 4/6 + 1/6 = 5/6"
      },
      {
        id: 2,
        question: "Které číslo je větší: 0,75 nebo 4/5?",
        options: ["0,75", "4/5", "Jsou stejná", "Nelze určit"],
        correctAnswer: "4/5",
        explanation: "4/5 = 0,8. Tedy 0,8 > 0,75"
      }
    ]
  },
  {
    id: "rovnice",
    title: "Lineární rovnice",
    description: "Rovnice se zlomky, závorky, neznámá ve jmenovateli",
    icon: "Binary",
    questions: [
      {
        id: 1,
        question: "Řešte rovnici: \\(2x + 5 = 15\\)",
        options: ["x = 5", "x = 10", "x = 2", "x = 7.5"],
        correctAnswer: "x = 5",
        explanation: "2x = 10 -> x = 5"
      }
    ]
  },
  {
    id: "procenta",
    title: "Procenta & Poměry",
    description: "Složené úroky, slevy, poměry stran",
    icon: "Percent",
    questions: [
      {
        id: 1,
        question: "Kolik je 20% z 150?",
        options: ["30", "20", "15", "50"],
        correctAnswer: "30",
        explanation: "0.20 * 150 = 30"
      }
    ]
  },
  {
    id: "vyrazy",
    title: "Výrazy & Algebra",
    description: "Faktorizace, vzorce, mocniny a odmocniny",
    icon: "Sigma",
    questions: [
      {
        id: 1,
        question: "Zjednodušte: \\((a+b)^2 - (a-b)^2\\)",
        options: ["4ab", "2a^2 + 2b^2", "0", "2ab"],
        correctAnswer: "4ab",
        explanation: "a^2+2ab+b^2 - (a^2-2ab+b^2) = 4ab"
      }
    ]
  },
  {
    id: "geometrie",
    title: "Geometrie základy",
    description: "Pythagorova věta, tělesa, obvody a obsahy",
    icon: "Triangle",
    questions: [
      {
        id: 1,
        question: "Jaký je obsah čtverce o straně 6 cm?",
        options: ["36 cm²", "24 cm²", "12 cm²", "48 cm²"],
        correctAnswer: "36 cm²",
        explanation: "S = a*a = 6*6 = 36"
      }
    ]
  },
  {
    id: "slovni",
    title: "Slovní úlohy",
    description: "Vícečástkové úlohy - automaty, směsi, rychlost",
    icon: "BookOpen",
    questions: [
      {
        id: 1,
        question: "Petr jde rychlostí 5 km/h, Pavel jede na kole 15 km/h. Pavel vyjel o hodinu později. Kdy Petra dohoní?",
        options: ["Za 30 minut", "Za 1 hodinu", "Za 1.5 hodiny", "Nikdy"],
        correctAnswer: "Za 30 minut",
        explanation: "Slovní úloha na pohyb."
      }
    ]
  }
];
