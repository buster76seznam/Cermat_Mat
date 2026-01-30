import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const MathText = ({ text, block = false }) => {
  if (!text) return null;
  if (typeof text !== 'string') return <span>{text}</span>;

  // Detekce, zda text neobsahuje explicitní oddělovače, ale vypadá jako LaTeX (např. v odpovědích)
  // Hledáme běžné příkazy jako \frac, \sqrt, ^, nebo { }
  const hasDelimiters = text.includes('\\(') || text.includes('\\[');
  // Robustnější detekce LaTeXu: hledá zpětné lomítko následované písmenem (příkaz) nebo ^
  const looksLikeMath = /\\([a-zA-Z]+)/.test(text) || text.includes('^') || text.includes('{');

  if (!hasDelimiters && looksLikeMath) {
    return block ? <BlockMath>{text}</BlockMath> : <InlineMath>{text}</InlineMath>;
  }

  // Standardní parser pro text smíchaný s LaTeXem
  const parts = text.split(/(\\\(.*?\\\)|\\\[.*?\\\])/g);

  return (
    <span className={block ? "block my-4" : ""}>
      {parts.map((part, index) => {
        if (part.startsWith('\\(') && part.endsWith('\\)')) {
          const content = part.slice(2, -2);
          return <InlineMath key={index}>{content}</InlineMath>;
        } else if (part.startsWith('\\[') && part.endsWith('\\]')) {
          const content = part.slice(2, -2);
          return <BlockMath key={index}>{content}</BlockMath>;
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};

export default MathText;
