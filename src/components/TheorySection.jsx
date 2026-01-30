import React from 'react';
import { BookOpen } from 'lucide-react';
import MathText from './MathText';

const TheorySection = ({ onBack }) => {
  const topics = [
    {
      title: "Zlomky a operace s nimi",
      content: `
### Základní pravidla
- **Sčítání/Odčítání**: Musíme převést na společného jmenovatele.
  \\[ \\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd} \\]
- **Násobení**: Násobíme čitatele čitatelem a jmenovatele jmenovatelem.
  \\[ \\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d} \\]
- **Dělení**: Násobíme převrácenou hodnotou druhého zlomku.
  \\[ \\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c} \\]

### Složené zlomky
Složený zlomek odstraníme tak, že čitatele vydělíme jmenovatelem (vnější krát vnější, vnitřní krát vnitřní).
\\[ \\frac{\\frac{a}{b}}{\\frac{c}{d}} = \\frac{a \\cdot d}{b \\cdot c} \\]
      `
    },
    {
      title: "Lineární rovnice",
      content: `
### Postup řešení
1. **Odstraníme zlomky**: Celou rovnici vynásobíme nejmenším společným násobkem jmenovatelů.
2. **Odstraníme závorky**: Roznásobíme členy.
3. **Převedeme neznámé**: Vše s \\(x\\) dáme na jednu stranu, čísla na druhou.
4. **Vydělíme koeficientem**: Získáme samotné \\(x\\).

### Příklad
\\[ 2(x - 3) = \\frac{x}{2} + 1 \\]
Vynásobíme 2:
\\[ 4(x - 3) = x + 2 \\]
Roznásobíme:
\\[ 4x - 12 = x + 2 \\]
Převedeme:
\\[ 3x = 14 \\Rightarrow x = \\frac{14}{3} \\]
      `
    }
    // Další témata by následovala...
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={onBack}
        className="mb-8 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-sm"
      >
        ← Zpět na hlavní menu
      </button>

      <div className="space-y-12 pb-20">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">Teoretický základ</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Kompletní přehled látky potřebné k přijímacím zkouškám.
          </p>
        </div>

        <div className="grid gap-8">
          {topics.map((topic, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <BookOpen size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{topic.title}</h2>
              </div>
              <div className="prose prose-slate max-w-none text-slate-600">
                 {/* Simple render - in production use a markdown parser */}
                 <div className="whitespace-pre-wrap leading-relaxed">
                   <MathText text={topic.content} />
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TheorySection;
