import React, { useState, useEffect } from 'react';
import { generateProblem } from '../utils/problem-generator';
import MathText from './MathText';
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft, HelpCircle, SkipForward } from 'lucide-react';

const PracticeMode = ({ topic, onBack }) => {
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswers, setUserAnswers] = useState({}); // { subId: answer }
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null); // null, true, false
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });

  // Načtení nové úlohy
  const loadNewProblem = () => {
    const newProblem = generateProblem(topic.id);
    setCurrentProblem(newProblem);
    resetState();
  };

  const resetState = () => {
    setUserAnswers({});
    setShowExplanation(false);
    setIsCorrect(null);
  };

  // Načtení první úlohy
  useEffect(() => {
    loadNewProblem();
  }, [topic]);

  const handleSkip = () => {
    // Přeskočení se nepočítá do statistik, nebo se počítá jako špatně? 
    // Uživatel chtěl jen "přeskočit", obvykle to znamená bez penalty, ale pro učení je lepší vědět.
    // Zde implementuji čisté přeskočení (bez změny skóre).
    loadNewProblem();
  };

  const handleNext = () => {
    loadNewProblem();
  };

  const handleAnswer = (subId, answer) => {
    if (showExplanation) return; // Už vyhodnoceno
    
    setUserAnswers(prev => ({
      ...prev,
      [subId]: answer
    }));
  };

  const checkAnswers = () => {
    if (!currentProblem) return;

    let allCorrect = true;
    if (currentProblem.questions) {
      // Multi-part
      currentProblem.questions.forEach(q => {
        if (userAnswers[q.id] !== q.correctAnswer) allCorrect = false;
      });
    } else {
      // Single
      if (userAnswers['default'] !== currentProblem.correctAnswer) allCorrect = false;
    }

    setIsCorrect(allCorrect);
    
    // Aktualizace statistik
    setStats(prev => ({
      correct: allCorrect ? prev.correct + 1 : prev.correct,
      wrong: !allCorrect ? prev.wrong + 1 : prev.wrong
    }));
  };
  
  // Zkontroluje, zda jsou všechny otázky zodpovězeny
  const isAllAnswered = () => {
    if (!currentProblem) return false;
    if (currentProblem.questions) {
      return currentProblem.questions.every(q => userAnswers[q.id]);
    }
    return !!userAnswers['default'];
  };

  if (!currentProblem) return <div className="p-8 text-center">Generuji úlohu...</div>;

  return (
    <div className="max-w-3xl mx-auto pb-24">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft size={16} className="mr-2" /> Zpět na výběr
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
          <span className="font-semibold text-slate-700">{topic.title}</span>
          <div className="flex gap-4 text-sm font-medium">
            <span className="text-green-600 flex items-center gap-1">
              <CheckCircle2 size={16} /> Správně {stats.correct}
            </span>
            <span className="text-red-600 flex items-center gap-1">
              <XCircle size={16} /> Špatně {stats.wrong}
            </span>
          </div>
        </div>

        <div className="p-8">
          {/* Scenario for word problems */}
          {currentProblem.scenario && (
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-blue-900 mb-8 text-lg leading-relaxed shadow-sm">
              <MathText text={currentProblem.scenario} />
            </div>
          )}

          {/* Questions Area */}
          <div className="space-y-8">
            {currentProblem.questions ? (
              // Multi-part
              currentProblem.questions.map((subQ, idx) => {
                const isAnswered = !!userAnswers[subQ.id];
                const isEvaluated = isCorrect !== null;
                
                return (
                  <div key={subQ.id} className="space-y-3">
                    <h3 className="font-medium text-lg text-slate-800">
                      <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(97 + idx)})</span> 
                      <MathText text={subQ.text} />
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {subQ.options.map((opt, optIdx) => {
                        let btnClass = "p-4 rounded-xl border-2 text-left transition-all relative ";
                        
                        if (isEvaluated) {
                          if (opt === subQ.correctAnswer) {
                            btnClass += "border-green-500 bg-green-50 text-green-700";
                          } else if (userAnswers[subQ.id] === opt) {
                            btnClass += "border-red-500 bg-red-50 text-red-700";
                          } else {
                            btnClass += "border-slate-100 opacity-50";
                          }
                        } else {
                          if (userAnswers[subQ.id] === opt) {
                            btnClass += "border-primary bg-primary/5 text-primary ring-1 ring-primary";
                          } else {
                            btnClass += "border-slate-100 hover:border-slate-300 hover:bg-slate-50";
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleAnswer(subQ.id, opt)}
                            disabled={isEvaluated}
                            className={btnClass}
                          >
                            <MathText text={opt} />
                            {isEvaluated && opt === subQ.correctAnswer && <CheckCircle2 className="absolute right-4 top-4 text-green-600" size={20} />}
                            {isEvaluated && userAnswers[subQ.id] === opt && opt !== subQ.correctAnswer && <XCircle className="absolute right-4 top-4 text-red-600" size={20} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            ) : (
              // Single question
              <div className="space-y-6">
                <h2 className="text-2xl font-medium leading-relaxed text-center py-4">
                  <MathText text={currentProblem.question} block />
                </h2>
                <div className="grid grid-cols-1 gap-3 max-w-xl mx-auto">
                  {currentProblem.options.map((opt, optIdx) => {
                    let btnClass = "p-4 rounded-xl border-2 text-left transition-all relative flex items-center justify-between ";
                    
                    if (isCorrect !== null) {
                       if (opt === currentProblem.correctAnswer) {
                        btnClass += "border-green-500 bg-green-50 text-green-700";
                      } else if (userAnswers['default'] === opt) {
                        btnClass += "border-red-500 bg-red-50 text-red-700";
                      } else {
                        btnClass += "border-slate-100 opacity-50";
                      }
                    } else {
                      if (userAnswers['default'] === opt) {
                        btnClass += "border-primary bg-primary/5 text-primary ring-1 ring-primary";
                      } else {
                        btnClass += "border-slate-100 hover:border-slate-300 hover:bg-slate-50";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleAnswer('default', opt)}
                        disabled={isCorrect !== null}
                        className={btnClass}
                      >
                        <span className="text-lg font-medium"><MathText text={opt} /></span>
                        {isCorrect !== null && opt === currentProblem.correctAnswer && <CheckCircle2 className="text-green-600" size={24} />}
                        {isCorrect !== null && userAnswers['default'] === opt && opt !== currentProblem.correctAnswer && <XCircle className="text-red-600" size={24} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Explanation Section */}
          {showExplanation && (
            <div className="mt-8 p-6 bg-amber-50 text-amber-900 rounded-xl border border-amber-100 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-start gap-3">
                <HelpCircle className="flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold mb-2 text-lg">Vysvětlení postupu</h4>
                  <div className="leading-relaxed">
                    <MathText text={currentProblem.explanation} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-wrap gap-4 justify-between items-center sticky bottom-0">
          <div className="flex gap-2">
            {isCorrect === null && (
              <button 
                onClick={handleSkip}
                className="px-4 py-2 text-slate-500 font-medium hover:text-slate-800 hover:bg-slate-200/50 rounded-lg flex items-center gap-2 transition-colors"
              >
                <SkipForward size={18} />
                Přeskočit
              </button>
            )}
          </div>

          <div className="flex gap-3">
            {isCorrect === null ? (
              <button
                onClick={checkAnswers}
                disabled={!isAllAnswered()}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-2 rounded-lg font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Zkontrolovat odpovědi
              </button>
            ) : (
              <>
                {!showExplanation && (
                  <button
                    onClick={() => setShowExplanation(true)}
                    className="px-6 py-2 border-2 border-slate-200 text-slate-700 font-medium rounded-lg hover:border-slate-300 hover:bg-slate-50"
                  >
                    Zobrazit vysvětlení
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="bg-slate-900 text-white px-8 py-2 rounded-lg font-medium hover:bg-slate-800 shadow-sm flex items-center gap-2"
                >
                  Další příklad <ArrowRight size={18} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeMode;
