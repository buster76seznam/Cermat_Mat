import { generateFractionProblem } from './generators/fractions';
import { generateEquationProblem } from './generators/equations';
import { generateWordProblem } from './generators/word-problems';
import { generateGeometryProblem } from './generators/geometry';
import { generatePercentProblem } from './generators/percentages';
import { generateExpressionProblem } from './generators/expressions';
import { randomElement } from './math-helpers';

// Hlavní rozcestník pro generování úloh
export const generateProblem = (topicId) => {
  switch (topicId) {
    case 'zlomky':
      return generateFractionProblem(3); // Hard mode
    case 'rovnice':
      // Občas přidáme slovní úlohu řešenou rovnicí (pokud padne v generateEquationProblem nebo zde)
      // Pro teď necháme čistě rovnice, jak je definováno v equations.js
      return generateEquationProblem();
    case 'slovni':
      return generateWordProblem();
    case 'procenta':
      return generatePercentProblem();
    case 'vyrazy':
      return generateExpressionProblem();
    case 'geometrie':
      return generateGeometryProblem();
    case 'minicermat':
      // Mix všeho
      const types = ['zlomky', 'rovnice', 'slovni', 'procenta', 'vyrazy', 'geometrie'];
      return generateProblem(randomElement(types));
    default:
      return generateFractionProblem(1);
  }
};
