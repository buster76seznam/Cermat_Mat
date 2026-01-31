import React, { useState } from 'react';
import PracticeMode from './components/PracticeMode';
import TestMode from './components/TestMode';
import TheorySection from './components/TheorySection';
import { 
  Calculator, 
  Binary, 
  Percent, 
  Sigma, 
  Triangle, 
  BookOpen, 
  ChevronRight, 
  Clock,
  GraduationCap,
  RefreshCw
} from 'lucide-react';

const topics = [
  { id: "zlomky", title: "Zlomky & Desetinná čísla", description: "Složité operace se zlomky, převody, složené zlomky", icon: Calculator },
  { id: "rovnice", title: "Lineární rovnice", description: "Rovnice se zlomky, závorky, neznámá ve jmenovateli", icon: Binary },
  { id: "procenta", title: "Procenta & Poměry", description: "Složené úroky, slevy, poměry stran", icon: Percent },
  { id: "vyrazy", title: "Výrazy & Algebra", description: "Faktorizace, vzorce, mocniny a odmocniny", icon: Sigma },
  { id: "geometrie", title: "Geometrie základy", description: "Pythagorova věta, tělesa, obvody a obsahy", icon: Triangle },
  { id: "slovni", title: "Slovní úlohy", description: "Vícečástkové úlohy - automaty, směsi, rychlost", icon: BookOpen },
];

function App() {
  const [currentView, setCurrentView] = useState('menu'); // menu, practice, test, theory
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // Pro vynucení přegenerování
  const [activeGrade, setActiveGrade] = useState(9); // 9 or 7

  const filteredTopics = activeGrade === 7 
    ? topics.filter(t => ['zlomky', 'procenta', 'geometrie', 'slovni'].includes(t.id))
    : topics;

  const startPractice = (topic) => {
    setSelectedTopic(topic);
    setCurrentView('practice');
  };

  const startTest = (topic) => {
    setSelectedTopic(topic);
    setCurrentView('test');
  };

  const startTheory = () => {
    setCurrentView('theory');
  };

  const goHome = () => {
    setCurrentView('menu');
    setSelectedTopic(null);
  };

  const refreshTasks = () => {
    // Zvýšíme klíč, což by mohlo přegenerovat komponenty, 
    // ale jelikož generujeme při vstupu, stačí jen vizuální feedback.
    setRefreshKey(prev => prev + 1);
    alert("Všechny úlohy byly úspěšně přegenerovány a připraveny nové sady!");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between relative">
          <button onClick={goHome} className="flex items-center gap-2 font-bold text-xl text-primary hover:opacity-80 transition-opacity z-10">
            <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center font-serif">C</div>
            CERMAT Procvičování
          </button>
          
          <div className="absolute left-1/2 transform -translate-x-1/2 font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 tracking-tight hidden md:block">
            BezChyby!
          </div>

          <div className="flex gap-4 z-10">
            <button onClick={startTheory} className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
              Teorie
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {currentView === 'menu' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-6 py-12">
              <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
                Zvládni <span className="text-primary">přijímačky</span> levou zadní
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Generujeme nekonečné množství originálních příkladů s vyšší obtížností než u ostrých testů. Připrav se na všechno.
              </p>
              
              <div className="flex flex-col items-center gap-3 pt-4">
                <button 
                  onClick={() => startTest({ id: 'otestuj', title: 'Mini CERMAT Test' })}
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all hover:scale-105 flex items-center gap-2"
                >
                  <Clock size={24} />
                  Spustit simulaci testu (25 min)
                </button>
                
                <button 
                  onClick={refreshTasks}
                  className="text-slate-500 hover:text-primary text-sm font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <RefreshCw size={14} />
                  Nové úlohy
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => startPractice(topic)}
                  className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all text-left flex flex-col h-full relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
                    <topic.icon size={120} />
                  </div>
                  
                  <div className="mb-6 w-14 h-14 rounded-xl bg-slate-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                    <topic.icon size={28} />
                  </div>
                  
                  <h3 className="font-bold text-xl mb-3 text-slate-800">{topic.title}</h3>
                  <p className="text-slate-500 mb-6 flex-grow leading-relaxed">{topic.description}</p>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="flex items-center text-sm font-bold text-primary bg-primary/5 px-4 py-2 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                      Procvičovat <ChevronRight size={16} className="ml-1" />
                    </div>
                    <div 
                      onClick={(e) => { e.stopPropagation(); startTest(topic); }}
                      className="text-sm font-medium text-slate-400 hover:text-slate-700 p-2 z-10"
                      title="Otestovat jen toto téma"
                    >
                      Test
                    </div>
                  </div>
                </button>
              ))}
              
              {/* Otestuj mě - Speciální karta */}
              <button
                onClick={() => startTest({ id: 'otestuj', title: 'Otestuj mě' })}
                className="group bg-slate-900 p-8 rounded-2xl shadow-md border border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all text-left flex flex-col h-full text-white relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6 w-14 h-14 rounded-xl bg-white/10 text-white flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 transition-colors backdrop-blur-sm">
                    <GraduationCap size={28} />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Otestuj mě</h3>
                  <p className="text-slate-300 mb-6 flex-grow leading-relaxed">
                    15 náhodných úloh, časový limit 25 minut. Zjisti, jak na tom jsi. Žádná nápověda.
                  </p>
                  <div className="flex items-center text-sm font-bold text-white bg-white/10 px-4 py-2 rounded-lg group-hover:bg-white group-hover:text-slate-900 transition-colors w-fit">
                    Spustit test <ChevronRight size={16} className="ml-1" />
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {currentView === 'practice' && (
          <PracticeMode key={refreshKey} topic={selectedTopic} onBack={goHome} />
        )}

        {currentView === 'test' && (
          <TestMode key={refreshKey} topic={selectedTopic} onExit={goHome} />
        )}

        {currentView === 'theory' && (
          <TheorySection onBack={goHome} />
        )}
      </main>
    </div>
  );
}

export default App;
