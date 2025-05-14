import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../components/ui/Card';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import './TypingDashboard.css';

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
    <div className="typing-dashboard">
      <Card>
        <h2 className="title">Typing Test</h2>
        <p className="subtitle">Time Left: <strong>{timer}s</strong></p>
        <Button onClick={resetTest}>Restart</Button>

        <div className="text-container" ref={textContainerRef}>
          {text.split('').map((char, index) => {
            let className = 'neutral';
            if (index < input.length) {
              className = input[index] === char ? 'correct' : 'incorrect';
            }
            return (
              <span key={index} data-index={index} className={className}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </div>

        <Textarea
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          disabled={isFinished}
          placeholder="Start typing..."
        />

        {isFinished && (
          <Alert>
            <p><strong>Typing Speed:</strong> {getWPM()} WPM</p>
            <p><strong>Characters Typed:</strong> {input.length}</p>
          </Alert>
        )}
      </Card>
    </div>
  );
}
