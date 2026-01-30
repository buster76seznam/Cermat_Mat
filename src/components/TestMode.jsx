import React, { useState, useEffect } from 'react';
import { generateProblem } from '../utils/problem-generator';
import MathText from './MathText';
import { Clock, AlertTriangle, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

const TestMode = ({ topic, onExit }) => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({}); // { qIndex: { subId: answer } }
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isFinished, setIsFinished] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);

  // Inicializace testu
  useEffect(() => {
    const newQuestions = [];
    for (let i = 0; i < 15; i++) {
      const q = generateProblem(topic.id === 'otestuj' ? 'minicermat' : topic.id);
      newQuestions.push(q);
    }
    setQuestions(newQuestions);
  }, [topic]);

  // Časovač
  useEffect(() => {
    if (isFinished) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          finishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  const finishTest = () => {
    setIsFinished(true);
  };

  const handleAnswer = (qIndex, subId, answer) => {
    if (isFinished) return;
    setUserAnswers(prev => ({
      ...prev,
      [qIndex]: {
        ...prev[qIndex],
        [subId]: answer
      }
    }));
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const calculateScore = () => {
    let correct = 0;
    let total = 0;
    questions.forEach((q, idx) => {
      if (q.questions) {
        // Multi-part question
        q.questions.forEach(subQ => {
          total++;
          if (userAnswers[idx]?.[subQ.id] === subQ.correctAnswer) correct++;
        });
      } else {
        // Single question
        total++;
        if (userAnswers[idx]?.['default'] === q.correctAnswer) correct++;
      }
    });
    return { correct, total };
  };

  if (questions.length === 0) return <div className="p-8 text-center">Generuji test...</div>;

  if (isFinished) {
    const { correct, total } = calculateScore();
    const timeTaken = 25 * 60 - timeLeft;

    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center space-y-4">
          <h2 className="text-3xl font-bold">Výsledky testu</h2>
          <div className="text-5xl font-bold text-primary mb-4">
            {Math.round((correct / total) * 100)}%
          </div>
          <div className="grid grid-cols-3 gap-4 text-slate-600">
            <div className="bg-slate-50 p-4 rounded-xl">
              <div className="text-sm">Správně</div>
              <div className="text-2xl font-bold text-green-600">{correct} / {total}</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl">
              <div className="text-sm">Čas</div>
              <div className="text-2xl font-bold text-blue-600">{formatTime(timeTaken)}</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl">
              <div className="text-sm">Hodnocení</div>
              <div className="font-medium">
                {correct/total > 0.8 ? "Výborně!" : correct/total > 0.5 ? "Dobrá práce" : "Je třeba zabrat"}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold">Detailní přehled odpovědí</h3>
          {questions.map((q, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500">
                  {idx + 1}
                </div>
                <div className="flex-grow space-y-4">
                  {q.scenario && <div className="text-slate-700 italic mb-4">{q.scenario}</div>}
                  
                  {q.questions ? (
                    // Multi-part
                    <div className="space-y-6">
                      {q.questions.map((subQ) => {
                        const userAns = userAnswers[idx]?.[subQ.id];
                        const isCorrect = userAns === subQ.correctAnswer;
                        return (
                          <div key={subQ.id} className="space-y-2">
                            <div className="font-medium"><MathText text={subQ.text} /></div>
                            <div className={`p-3 rounded-lg border flex justify-between items-center ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                              <span>Tvoje odpověď: <MathText text={userAns || "Neodpovězeno"} /></span>
                              {isCorrect ? <CheckCircle2 className="text-green-600" /> : <XCircle className="text-red-600" />}
                            </div>
                            {!isCorrect && (
                              <div className="text-sm text-green-700 font-medium pl-3">
                                Správně: <MathText text={subQ.correctAnswer} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    // Single question
                    <div className="space-y-2">
                      <div className="font-medium text-lg"><MathText text={q.question} /></div>
                      <div className={`p-3 rounded-lg border flex justify-between items-center ${userAnswers[idx]?.['default'] === q.correctAnswer ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                        <span>Tvoje odpověď: <MathText text={userAnswers[idx]?.['default'] || "Neodpovězeno"} /></span>
                        {userAnswers[idx]?.['default'] === q.correctAnswer ? <CheckCircle2 className="text-green-600" /> : <XCircle className="text-red-600" />}
                      </div>
                      {userAnswers[idx]?.['default'] !== q.correctAnswer && (
                        <div className="text-sm text-green-700 font-medium pl-3">
                          Správně: <MathText text={q.correctAnswer} />
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="mt-4 pt-4 border-t border-slate-100 text-slate-600 text-sm">
                    <strong>Vysvětlení: </strong> <MathText text={q.explanation} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center pt-8 pb-16">
          <button onClick={onExit} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors">
            Zpět na hlavní menu
          </button>
        </div>
      </div>
    );
  }

  // Renderování probíhajícího testu
  const currentQ = questions[currentQIndex];

  return (
    <div className="max-w-3xl mx-auto pb-20">
      {/* Sticky Header with Timer */}
      <div className="sticky top-0 bg-slate-50/95 backdrop-blur py-4 z-10 flex justify-between items-center border-b border-slate-200 mb-6">
        <div className="font-bold text-lg text-slate-700">
          Otázka {currentQIndex + 1} / 15
        </div>
        <div className={`flex items-center gap-2 font-mono text-xl font-bold ${timeLeft < 300 ? 'text-red-600' : 'text-slate-900'}`}>
          <Clock size={20} />
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 min-h-[400px] flex flex-col">
        {currentQ.scenario && (
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-900 mb-6 text-lg">
            <MathText text={currentQ.scenario} />
          </div>
        )}

        <div className="flex-grow space-y-8">
          {currentQ.questions ? (
            // Multi-part question
            currentQ.questions.map((subQ, idx) => (
              <div key={subQ.id} className="space-y-3">
                <h3 className="font-medium text-lg"><span className="font-bold mr-2">{String.fromCharCode(97 + idx)})</span> <MathText text={subQ.text} /></h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {subQ.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => handleAnswer(currentQIndex, subQ.id, opt)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        userAnswers[currentQIndex]?.[subQ.id] === opt
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <MathText text={opt} />
                    </button>
                  ))}
                </div>
              </div>
            ))
          ) : (
            // Single question
            <div className="space-y-6">
              <h2 className="text-2xl font-medium leading-relaxed">
                <MathText text={currentQ.question} block />
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {currentQ.options.map((opt, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => handleAnswer(currentQIndex, 'default', opt)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      userAnswers[currentQIndex]?.['default'] === opt
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <MathText text={opt} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4">
        <div className="max-w-3xl mx-auto flex justify-between">
          <button
            onClick={() => setCurrentQIndex(Math.max(0, currentQIndex - 1))}
            disabled={currentQIndex === 0}
            className="px-6 py-2 rounded-lg font-medium text-slate-600 disabled:opacity-30"
          >
            Předchozí
          </button>
          
          {currentQIndex === questions.length - 1 ? (
            <button
              onClick={finishTest}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-2 rounded-lg font-medium flex items-center gap-2"
            >
              Ukončit test
            </button>
          ) : (
            <button
              onClick={() => setCurrentQIndex(Math.min(questions.length - 1, currentQIndex + 1))}
              className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800 flex items-center gap-2"
            >
              Další <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestMode;
