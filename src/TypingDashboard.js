import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { motion } from 'framer-motion';

const sampleText = `In an era dominated by technology and rapid communication, the ability to type efficiently is more valuable than ever. Whether you are sending emails, coding software, or composing essays, fast and accurate typing can drastically improve productivity and workflow. This typing test is designed to help you gauge and enhance your typing skills. Focus on accuracy first, then work on improving your speed. With practice and patience, anyone can become a proficient typist.`;

export default function TypingDashboard() {
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [timer, setTimer] = useState(60);
  const inputRef = useRef();
  const textContainerRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    let interval;
    if (startTime && !isFinished) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setIsFinished(true);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime, isFinished]);

  useEffect(() => {
    if (textContainerRef.current) {
      const span = textContainerRef.current.querySelector(`span[data-index='${input.length}']`);
      if (span) {
        span.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [input]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!startTime) setStartTime(Date.now());
    if (value.length > sampleText.length) return;
    setInput(value);
    if (value === sampleText) {
      setIsFinished(true);
    }
  };

  const resetTest = () => {
    setInput('');
    setStartTime(null);
    setIsFinished(false);
    setTimer(60);
  };

  const getWPM = () => {
    if (!startTime) return 0;
    const elapsedMinutes = (Date.now() - startTime) / 60000;
    const correctChars = input.split('').filter((ch, i) => ch === sampleText[i]).length;
    return Math.round((correctChars / 5) / elapsedMinutes);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Typing Speed Test</h1>
        <p className="text-md text-gray-500">Improve your accuracy and speed with this live typing challenge</p>
      </div>
      <Card className="w-full max-w-4xl shadow-2xl rounded-2xl border border-gray-300 bg-white">
        <CardContent className="p-6 sm:p-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">Time Left: <span className="font-semibold text-gray-800">{timer}s</span></span>
            <Button variant="outline" onClick={resetTest}>Restart</Button>
          </div>

          <div
            ref={textContainerRef}
            className="bg-gray-100 p-4 rounded-md h-32 text-3xl font-medium leading-snug overflow-y-hidden relative"
            style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}
          >
            {sampleText.split('').map((char, index) => {
              let className = 'text-gray-400';
              if (index < input.length) {
                className = input[index] === char ? 'text-gray-900' : 'text-red-500';
              }
              const isCurrent = index === input.length;
              return (
                <motion.span
                  key={index}
                  data-index={index}
                  className={`${className} transition-all duration-75 inline relative`}
                >
                  {char}
                  {isCurrent && !isFinished && (
                    <span className="absolute bottom-0 left-0 text-gray-300 animate-pulse">
                      _
                    </span>
                  )}
                </motion.span>
              );
            })}
          </div>

          <Input
            ref={inputRef}
            className="mt-6 text-lg p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={input}
            onChange={handleInputChange}
            disabled={isFinished}
            placeholder="Start typing here..."
          />

          {isFinished && (
            <div className="mt-6 text-lg text-center space-y-2">
              <p className="text-gray-700">WPM: <span className="font-bold text-gray-900">{getWPM()}</span></p>
              <p className="text-gray-700">Characters Typed: <span className="font-bold text-gray-900">{input.length}</span></p>
              <p className="text-gray-700">Correct Characters: <span className="font-bold text-gray-900">{input.split('').filter((ch, i) => ch === sampleText[i]).length}</span></p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
