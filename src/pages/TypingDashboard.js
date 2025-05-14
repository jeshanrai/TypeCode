import React, { useState, useEffect, useRef } from 'react';

const defaultText = `In an era dominated by technology and rapid communication, the ability to type efficiently is more valuable than ever. Whether you are sending emails, coding software, or composing essays, fast and accurate typing can drastically improve productivity and workflow. This typing test is designed to help you gauge and enhance your typing skills. Focus on accuracy first, then work on improving your speed. With practice and patience, anyone can become a proficient typist.`;

export default function TypingDashboard() {
  const [text] = useState(localStorage.getItem('customText') || defaultText);
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [timer, setTimer] = useState(parseInt(localStorage.getItem('customTime')) || 60);
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
        textContainerRef.current.scrollTo({
          top: span.offsetTop - 50,
          behavior: 'smooth'
        });
      }
    }
  }, [input]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!startTime) setStartTime(Date.now());
    if (value.length > text.length) return;
    setInput(value);
    if (value === text) setIsFinished(true);
  };

  const resetTest = () => {
    setInput('');
    setStartTime(null);
    setIsFinished(false);
    setTimer(parseInt(localStorage.getItem('customTime')) || 60);
  };

  const getWPM = () => {
    if (!startTime) return 0;
    const elapsedMinutes = (Date.now() - startTime) / 60000;
    const correctChars = input.split('').filter((ch, i) => ch === text[i]).length;
    return Math.round((correctChars / 5) / elapsedMinutes);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-6">
      <div className="text-center mb-6">
        <h1 className="text-5xl font-bold mb-2 text-yellow-400">Typing Test</h1>
        <p className="text-lg text-neutral-400">Test and improve your typing speed in real-time</p>
      </div>

      <div className="w-full max-w-4xl bg-neutral-800 rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-neutral-400">
            Time Left: <span className="font-bold text-white">{timer}s</span>
          </span>
          <button
            onClick={resetTest}
            className="text-sm px-4 py-2 rounded bg-yellow-400 text-black font-semibold hover:bg-yellow-300"
          >
            Restart
          </button>
        </div>

        <div
          ref={textContainerRef}
          className="h-36 overflow-hidden relative text-3xl leading-[2.3rem] font-mono bg-neutral-700 rounded-md px-4 py-3 whitespace-pre-wrap break-words"
        >
          <div className="relative">
            {text.split('').map((char, index) => {
              let className = 'text-neutral-500';
              if (index < input.length) {
                className = input[index] === char ? 'text-white' : 'text-red-500';
              }
              return (
                <span
                  key={index}
                  data-index={index}
                  className={`${className} inline-block relative`}
                >
                  {char === ' ' ? '\u00A0' : char}
                  {index === input.length && !isFinished && (
                    <span className="absolute left-0 right-0 text-yellow-400 top-full text-base leading-none">
                      _
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        </div>

        <input
          ref={inputRef}
          className="mt-6 w-full text-lg px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-md text-white focus:outline-none"
          value={input}
          onChange={handleInputChange}
          disabled={isFinished}
          placeholder="Start typing..."
        />

        {isFinished && (
          <div className="mt-6 text-lg text-center space-y-2 text-neutral-300">
            <p>
              WPM: <span className="font-bold text-white">{getWPM()}</span>
            </p>
            <p>
              Characters Typed: <span className="font-bold text-white">{input.length}</span>
            </p>
            <p>
              Correct Characters:{' '}
              <span className="font-bold text-white">
                {input.split('').filter((ch, i) => ch === text[i]).length}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
