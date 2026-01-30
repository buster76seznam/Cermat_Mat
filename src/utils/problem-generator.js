import { generateFractionProblem } from './generators/fractions';
import { generateEquationProblem } from './generators/equations';
import { generateWordProblem } from './generators/word-problems';
import { randomElement } from './math-helpers';

// Hlavní rozcestník pro generování úloh
export const generateProblem = (topicId) => {
  switch (topicId) {
    case 'zlomky':
      return generateFractionProblem(3); // Hard mode
    case 'rovnice':
      return generateEquationProblem();
    case 'slovni':
      return generateWordProblem();
    case 'procenta':
      // Placeholder - prozatím vrátí zlomek, než implementujeme procenta
      // V reálu by tu byl generatePercentProblem()
      return generateFractionProblem(2); 
    case 'vyrazy':
      // Placeholder
      return generateEquationProblem(); 
    case 'geometrie':
      // Placeholder
      return generateFractionProblem(1);
    case 'minicermat':
      // Mix všeho
      const types = ['zlomky', 'rovnice', 'slovni'];
      return generateProblem(randomElement(types));
    default:
      return generateFractionProblem(1);
  }
};
