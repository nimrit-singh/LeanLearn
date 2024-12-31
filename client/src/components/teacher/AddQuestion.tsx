import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import leanLearnLogo from '../../assets/images/Logo.png';
import { formulaQuestionApi } from '../../lib/api/questions';

interface Choice {
  id: number;
  text: string;
}

interface MCQQuestionData {
  id: string;
  class_: string;
  subject: string;
  topic: string;
  question: string;
  options: string[];
  answers: string[];
  resource: string[];
  used: boolean;
}

interface FillBlankQuestionData {
  id: string;
  class_: string;
  subject: string;
  topic: string;
  question: string;
  choices: string[];
  answers: string[];
  resource: string[];
  used: boolean;
}

interface TrueFalseQuestionData {
  id: string;
  class_: string;
  subject: string;
  topic: string;
  question: string;
  answer: string;
  resource: string;
  used: boolean;
}

interface FormulaQuestionData {
  id: string;
  class_: string;
  subject: string;
  topic: string;
  question: string;
  quantities: {
    name: string;
    symbol: string;
    isUnknown: boolean;
  }[];
  formula: string;
  options: string[];
  answers: string[];
  resource: string[];
  used: boolean;
}

const AddQuestion: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [questionType, setQuestionType] = useState<'MCQs' | 'Fill in the blank' | 'True/False' | 'Create Formula'>('MCQs');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>(() => {
    const savedImages = localStorage.getItem('imageUrls');
    return savedImages ? JSON.parse(savedImages) : [];
  });

  const [questionData, setQuestionData] = useState({
    question: '',
    topic: 'gravitation',
    class_: '8',
    subject: 'Physics',
    options: ['', ''],
    answers: [''],
    resource: [''],
    used: true
  });

  const [choices, setChoices] = useState<Choice[]>([
    { id: 1, text: '' },
    { id: 2, text: '' }
  ]);

  const [isRandomized, setIsRandomized] = useState(false);
  const [selectedSequence, setSelectedSequence] = useState<Array<{
    type: 'quantity' | 'operator';
    value: string;
    symbol?: string;
  }>>([]);

  const [formulaOptions, setFormulaOptions] = useState<Array<{
    id: number;
    sequence: Array<{
      type: 'quantity' | 'operator';
      value: string;
      symbol?: string;
    }>;
  }>>([{ id: 1, sequence: [] }]);
  
  const [correctFormulaIndex, setCorrectFormulaIndex] = useState<number | null>(null);

  const classes = [
    { value: '8', label: 'Class 8' },
    { value: '9', label: 'Class 9' },
    { value: '10', label: 'Class 10' },
    { value: '11', label: 'Class 11' },
    { value: '12', label: 'Class 12' },
  ];

  const topics = [
    { value: 'gravitation', label: 'Gravitation' },
    { value: 'topic2', label: 'Topic 2' },
    { value: 'topic3', label: 'Topic 3' },
    { value: 'topic4', label: 'Topic 4' },
    { value: 'topic5', label: 'Topic 5' },
  ];

  const navigationItems = [
    { 
      id: 'home',
      label: 'Home',
      icon: <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.0919 3.49605C13.9146 2.83595 15.0854 2.83595 15.9081 3.49605L23.6581 9.71438C24.1903 10.1414 24.5 10.7869 24.5 11.4693V22.7497C24.5 23.9923 23.4926 24.9997 22.25 24.9997H19.25C18.0074 24.9997 17 23.9923 17 22.7497V16.7497C17 16.3355 16.6642 15.9997 16.25 15.9997H12.75C12.3358 15.9997 12 16.3355 12 16.7497V22.7497C12 23.9923 10.9926 24.9997 9.75 24.9997H6.75C5.50736 24.9997 4.5 23.9923 4.5 22.7497V11.4693C4.5 10.7869 4.80967 10.1414 5.34191 9.71438L13.0919 3.49605Z" fill="currentColor"/>
      </svg>,
      path: '/teacher/home'
    },
    { 
      id: 'quiz',
      label: 'Quiz',
      icon: <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.5 2.75C0.5 1.23122 1.73122 0 3.25 0H19.75C21.2688 0 22.5 1.23122 22.5 2.75V11.4995C22.0384 11.1527 21.5355 10.858 21 10.6241V2.75C21 2.05964 20.4404 1.5 19.75 1.5H3.25C2.55964 1.5 2 2.05964 2 2.75V19.25C2 19.9404 2.55964 20.5 3.25 20.5H11.1241C11.358 21.0355 11.6527 21.5384 11.9995 22H3.25C1.73122 22 0.5 20.7688 0.5 19.25V2.75Z" fill="currentColor"/>
      </svg>,
      path: '/teacher/dashboard'
    },
    {
      id: 'question-bank',
      label: 'Question Bank',
      icon: <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.49951 5H8.48951C9.54333 5 10.4076 5.8164 10.484 6.85081L10.4895 7V25C10.4895 26.0538 9.67311 26.9181 8.6387 26.9945L8.48951 27H6.49951C5.44569 27 4.5814 26.1836 4.505 25.1492L4.49951 25V7C4.49951 5.94618 5.31591 5.08188 6.35032 5.00549L6.49951 5Z" fill="currentColor"/>
      </svg>,
      path: '/teacher/question-bank'
    },
    { 
      id: 'reports',
      label: 'Reports',
      icon: <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.5 3C0.5 1.34314 1.84315 0 3.5 0C5.15685 0 6.5 1.34315 6.5 3V21C6.5 22.6569 5.15685 24 3.5 24C1.84315 24 0.5 22.6569 0.5 21V3Z" fill="currentColor"/>
      </svg>,
      path: '/teacher/reports'
    }
  ];

  const addChoice = () => {
    if (choices.length < 4) {
      const newId = choices.length > 0 ? Math.max(...choices.map(c => c.id)) + 1 : 1;
      const newChoices = [...choices, { id: newId, text: '' }];
      setChoices(newChoices);
      setQuestionData(prev => ({
        ...prev,
        options: newChoices.map(c => c.text)
      }));
    }
  };

  const handleChoiceChange = (id: number, text: string) => {
    setChoices(choices.map(choice => 
      choice.id === id ? { ...choice, text } : choice
    ));
    setQuestionData({
      ...questionData,
      options: choices.map(c => c.text)
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImageUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onloadend = () => {
          if (newImageUrls.length + imageUrls.length < 5) {
            newImageUrls.push(reader.result as string);
            const updatedImageUrls = [...imageUrls, reader.result as string];
            setImageUrls(updatedImageUrls);
            localStorage.setItem('imageUrls', JSON.stringify(updatedImageUrls));
          } else {
            alert('You can only upload a maximum of 5 images.');
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const removeImage = (index: number) => {
    const updatedImageUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(updatedImageUrls);
    localStorage.setItem('imageUrls', JSON.stringify(updatedImageUrls));
  };

  const [customQuantity, setCustomQuantity] = useState({ name: '', symbol: '' });
  const renderFormulaContent = () => {
    const operators = ['+', '-', '*', '/', '=', '^'];
  
    const handleSelect = (type: 'quantity' | 'operator', value: string, symbol?: string) => {
      setSelectedSequence([...selectedSequence, { type, value, symbol }]);
    };
  
    const addCustomQuantity = () => {
      if (!customQuantity.name || !customQuantity.symbol) {
        alert('Please enter both name and symbol for the quantity');
        return;
      }
      handleSelect('quantity', customQuantity.name, customQuantity.symbol);
      setCustomQuantity({ name: '', symbol: '' });
    };
  
    const removeLastItem = () => {
      setSelectedSequence(selectedSequence.slice(0, -1));
    };
  
    const clearSequence = () => {
      setSelectedSequence([]);
    };
  
    const addFormulaOption = () => {
      if (selectedSequence.length === 0) {
        alert('Please build a formula first');
        return;
      }
      
      if (formulaOptions.length >= 4) {
        alert('Maximum 4 options allowed');
        return;
      }
  
      const newId = formulaOptions.length > 0 ? 
        Math.max(...formulaOptions.map(opt => opt.id)) + 1 : 1;
      setFormulaOptions([...formulaOptions, {
        id: newId,
        sequence: [...selectedSequence]
      }]);
      clearSequence();
    };
  

    return (
      <div className="space-y-6 ml-6">
        <div className="bg-[#1A1A1A] p-6 rounded-lg border border-gray-700">
          {/* Current Formula Display */}
          <div className="mb-6 p-4 bg-[#111111] rounded-lg min-h-[60px] flex items-center">
            <div className="flex flex-wrap gap-2">
              {selectedSequence.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded bg-[#21B6F8] text-white"
                >
                  {item.type === 'quantity' ? item.symbol : item.value}
                </span>
              ))}
            </div>
          </div>
  
          {/* Add Custom Quantity */}
          <div className="mb-6">
            <h3 className="text-white text-sm mb-3">Add Quantity</h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={customQuantity.name}
                onChange={(e) => setCustomQuantity({ ...customQuantity, name: e.target.value })}
                placeholder="Quantity Name (e.g., Force)"
                className="flex-1 bg-[#111111] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#21B6F8]"
              />
              <input
                type="text"
                value={customQuantity.symbol}
                onChange={(e) => setCustomQuantity({ ...customQuantity, symbol: e.target.value })}
                placeholder="Symbol (e.g., F)"
                className="w-24 bg-[#111111] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#21B6F8]"
              />
              <button
                onClick={addCustomQuantity}
                className="px-4 py-2 bg-[#21B6F8] text-white rounded hover:bg-opacity-90"
              >
                Add
              </button>
            </div>
          </div>
  
          {/* Operators */}
          <div className="mb-6">
            <h3 className="text-white text-sm mb-3">Operators</h3>
            <div className="flex flex-wrap gap-2">
              {operators.map((op) => (
                <button
                  key={op}
                  onClick={() => handleSelect('operator', op)}
                  className="px-4 py-2 rounded bg-[#111111] text-white hover:bg-[#21B6F8] transition-colors"
                >
                  {op}
                </button>
              ))}
            </div>
          </div>
  
          {/* Control Buttons */}
          <div className="flex gap-3">
            <button
              onClick={removeLastItem}
              disabled={selectedSequence.length === 0}
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Undo Last
            </button>
            <button
              onClick={clearSequence}
              disabled={selectedSequence.length === 0}
              className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear All
            </button>
            <button
              onClick={addFormulaOption}
              className="px-4 py-2 rounded bg-[#21B6F8] text-white hover:bg-opacity-90"
            >
              Add as Option
            </button>
          </div>
        </div>
  
        {/* Formula Options */}
        <div className="space-y-4 bg-[#1A1A1A] p-4 rounded-lg border border-gray-700">
          <h4 className="text-white text-md">Formula Options</h4>
          {formulaOptions.length > 0 && formulaOptions.map((option) => (
            <div key={option.id} className="flex items-center gap-3">
              <input
                type="radio"
                name="correctFormula"
                checked={correctFormulaIndex === option.id}
                onChange={() => setCorrectFormulaIndex(option.id)}
                className="w-4 h-4 text-[#21B6F8] bg-transparent border-gray-600 focus:ring-[#21B6F8]"
              />
              <div className="flex-1 bg-[#111111] text-white px-4 py-2 rounded-lg">
                {option.sequence.map((item, index) => (
                  <span key={index} className="mx-1">
                    {item.type === 'quantity' ? item.symbol : item.value}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderQuestionContent = () => {
    if (questionType === 'True/False') {
      return (
        <div className="space-y-4 ml-6">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="answer"
              checked={selectedAnswer === 1}
              onChange={() => setSelectedAnswer(1)}
              className="w-4 h-4 text-[#21B6F8] bg-transparent border-gray-600 focus:ring-[#21B6F8]"
            />
            <div className="flex-1 bg-[#1A1A1A] text-white px-4 py-2 rounded-lg border border-gray-700">
              True
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="answer"
              checked={selectedAnswer === 2}
              onChange={() => setSelectedAnswer(2)}
              className="w-4 h-4 text-[#21B6F8] bg-transparent border-gray-600 focus:ring-[#21B6F8]"
            />
            <div className="flex-1 bg-[#1A1A1A] text-white px-4 py-2 rounded-lg border border-gray-700">
              False
            </div>
          </div>
        </div>
      );
    }

    if (questionType === 'Create Formula') {
      return renderFormulaContent();
    }
    
    if (questionType === 'MCQs') {
      return (
        <div className="space-y-4 ml-6">
          {choices.map((choice) => (
            <div key={choice.id} className="flex items-center gap-3">
              <input
                type="radio"
                name="answer"
                checked={selectedAnswer === choice.id}
                onChange={() => setSelectedAnswer(choice.id)}
                className="w-4 h-4 text-[#21B6F8] bg-transparent border-gray-600 focus:ring-[#21B6F8]"
              />
              <input
                type="text"
                value={choice.text}
                onChange={(e) => handleChoiceChange(choice.id, e.target.value)}
                placeholder="Your Choice here"
                className="flex-1 bg-[#1A1A1A] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#21B6F8]"
              />
            </div>
          ))}
          {choices.length < 4 && (
            <button
              type="button"
              onClick={() => addChoice()}
              className="text-[#21B6F8] text-sm hover:underline"
            >
              Add Choice
            </button>
          )}
        </div>
      );
    }

    if (questionType === 'Fill in the blank') {
      return (
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <span className="text-white">1.</span>
            <div className="flex-1 space-y-4">
              <div className="relative">
                <textarea
                  placeholder="Start your question here"
                  value={questionData.question}
                  onChange={(e) => setQuestionData({...questionData, question: e.target.value})}
                  className="w-full bg-transparent text-white border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:border-[#21B6F8] min-h-[100px] resize-none"
                />
                <button
                  onClick={() => {
                    const textarea = document.querySelector('textarea');
                    const cursorPosition = textarea?.selectionStart || 0;
                    const currentText = questionData.question;
                    const newText = `${currentText.slice(0, cursorPosition)} _____ ${currentText.slice(cursorPosition)}`;
                    setQuestionData({...questionData, question: newText});
                  }}
                  className="absolute bottom-2 right-2 text-[#21B6F8] text-sm hover:underline"
                  type="button"
                >
                  Add Blank
                </button>
              </div>
              <div className="space-y-3">
                {choices.map((choice) => (
                  <div key={choice.id} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="answer"
                      checked={selectedAnswer === choice.id}
                      onChange={() => setSelectedAnswer(choice.id)}
                      className="w-4 h-4 text-[#21B6F8] bg-transparent border-gray-600 focus:ring-[#21B6F8]"
                    />
                    <input
                      type="text"
                      value={choice.text}
                      onChange={(e) => handleChoiceChange(choice.id, e.target.value)}
                      placeholder="Your Option here"
                      className="flex-1 bg-[#1A1A1A] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#21B6F8]"
                    />
                  </div>
                ))}
                {choices.length < 4 && (
                  <button
                    onClick={addChoice}
                    className="text-[#21B6F8] text-sm hover:underline"
                  >
                    Add Option
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const handleSubmit = async () => {
    try {
      if (!questionData.question.trim()) {
        alert('Please enter a question');
        return;
      }

      if (questionType === 'MCQs') {
        if (choices.some(c => !c.text.trim())) {
          alert('Please fill in all choices');
          return;
        }

        if (selectedAnswer === null) {
          alert('Please select an answer');
          return;
        }

        const mcqData: MCQQuestionData = {
          id: String(Date.now()),
          class_: questionData.class_,
          subject: "Physics",
          topic: questionData.topic,
          question: questionData.question,
          options: choices.map(c => c.text),
          answers: [choices.find(c => c.id === selectedAnswer)?.text || ""],
          resource: imageUrls.length > 0 ? imageUrls : ["", ""],
          used: true
        };

        const response = await fetch('https://lean-learn-backend-ai.onrender.com/mcqquestion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mcqData)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else if (questionType === 'Fill in the blank') {
        if (!questionData.question.includes('_')) {
          alert('Please add at least one blank in your question');
          return;
        }

        if (choices.some(c => !c.text.trim())) {
          alert('Please fill in all options');
          return;
        }

        if (selectedAnswer === null) {
          alert('Please select the correct answer');
          return;
        }

        const fillBlankData: FillBlankQuestionData = {
          id: String(Date.now()),
          class_: questionData.class_,
          subject: "Physics",
          topic: questionData.topic,
          question: questionData.question,
          choices: choices.map(c => c.text),
          answers: [choices.find(c => c.id === selectedAnswer)?.text || ""],
          resource: imageUrls.length > 0 ? imageUrls : [""],
          used: true
        };

        const response = await fetch('https://lean-learn-backend-ai.onrender.com/fillquestion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fillBlankData)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else if (questionType === 'True/False') {
        const tfData: TrueFalseQuestionData = {
          id: String(Date.now()),
          class_: questionData.class_,
          subject: "Physics",
          topic: questionData.topic,
          question: questionData.question,
          answer: selectedAnswer === 1 ? "True" : "False",
          resource: imageUrls.length > 0 ? imageUrls[0] : "",
          used: true
        };

        const response = await fetch('https://lean-learn-backend-ai.onrender.com/tfquestion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(tfData)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else if (questionType === 'Create Formula') {
        if (formulaOptions.length < 2) {
          alert('Please add at least two formula options');
          return;
        }
      
        if (correctFormulaIndex === null) {
          alert('Please select the correct formula');
          return;
        }
        
        try {
          const correctOption = formulaOptions.find(opt => opt.id === correctFormulaIndex);
          const formulaData: FormulaQuestionData = {
            id: String(Date.now()),
            class_: questionData.class_,
            subject: 'Physics',
            topic: questionData.topic,
            question: questionData.question,
            quantities: selectedSequence
              .filter(item => item.type === 'quantity')
              .map(item => ({
                name: item.value,
                symbol: item.symbol || '',
                isUnknown: false
              })),
            formula: correctOption ? correctOption.sequence.map(item => 
              item.type === 'quantity' ? item.symbol || item.value : item.value
            ).join(' ') : "",
            options: formulaOptions.map(opt => 
              opt.sequence.map(item => 
                item.type === 'quantity' ? item.symbol || item.value : item.value
              ).join(' ')
            ),
            answers: [correctOption ? correctOption.sequence.map(item => 
              item.type === 'quantity' ? item.symbol || item.value : item.value
            ).join(' ') : ""],
            resource: [""],
            used: true
          };
      
          const result = await formulaQuestionApi.create(formulaData);
          console.log('Creation successful:', result);

          setQuestionData({
            question: '',
            topic: 'gravitation',
            class_: '8',
            subject: 'Physics',
            options: ['', ''],
            answers: [''],
            resource: [''],
            used: true
          });
          setSelectedSequence([]);
          setFormulaOptions([{ id: 1, sequence: [] }]);
          setCorrectFormulaIndex(null);
          navigate('/teacher/question-bank');

        } catch (error) {
          console.error('Error saving formula question:', error);
          alert('Failed to save formula question: ' + 
            (error instanceof Error ? error.message : 'Unknown error'));
        }
      }

      localStorage.removeItem('imageUrls');
      navigate('/teacher/question-bank');
    } catch (error) {
      console.error('Error saving question:', error);
      if (error instanceof Error) {
        alert(`Failed to save question: ${error.message}`);
      } else {
        alert('Failed to save question');
      }
    }
  };

  return (
    <>
      <div className="md:hidden flex items-center absolute p-4 pl-8 z-20">
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="text-white hover:text-gray-300 focus:outline-none"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        )}
      </div>
      <div className="flex min-h-screen bg-black">
        <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#111111] transition-all duration-300 sidebar-main ease-in-out ${isSidebarOpen ? 'block' : 'hidden md:block'}`}>
          <div className={`p-4 flex side-bar-header ${isSidebarOpen ? 'gap-2' : 'justify-center'} items-center`}>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-white hover:text-gray-300 focus:outline-none hidden md:block"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
            {isSidebarOpen && <img src={leanLearnLogo} alt="LeanLearn" className="h-8 pl-4 md:pl-12" onClick={() => navigate('/')} />}
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="text-white hover:text-gray-300 focus:outline-none block md:hidden"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <nav className="mt-8 flex flex-col gap-2 px-3">
            {navigationItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center ${isSidebarOpen ? 'gap-3 px-4' : 'justify-center'} py-2 rounded-md ${
                  item.id === 'question-bank' 
                    ? 'bg-[#21B6F8] text-black'
                    : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'
                }`}
              >
                {item.icon}
                {isSidebarOpen && <span>{item.label}</span>}
              </div>
            ))}
        </nav>
        </div>

        <div className="flex-1 flex main-content-wrap page-content-quiz">
          <div className="flex-1 p-2 md:p-6 pb-4">
            <div className="bg-[#111111] rounded-lg p-6">
              <div className="mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-white">1.</span>
                  <textarea
                    placeholder="Your question here"
                    value={questionData.question}
                    onChange={(e) => setQuestionData({...questionData, question: e.target.value})}
                    className="w-full bg-transparent text-white border-none focus:outline-none text-lg resize-none"
                    rows={3}
                  />
                </div>

                <button className="text-[#21B6F8] text-sm hover:underline ml-6 mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }} 
                    id="image-upload"
                    multiple 
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">Add Image</label>
                </button>

                <div className="mt-4 flex flex-wrap gap-4">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <img src={url} alt={`Uploaded ${index + 1}`} className="max-w-full h-20 w-20 md:h-32 md:w-32 p-3 object-cover" />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-3 right-0 text-red-500 rounded-full p-1"
                        title="Remove Image"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {renderQuestionContent()}
            </div>

            <div className="flex justify-end mt-6 sm:mb-10">
              <button
                onClick={handleSubmit}
                className="bg-[#21B6F8] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Save Question
              </button>
            </div>
          </div>

          <div className="w-full md:w-80 bg-black border-l border-gray-800 p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-white text-sm">Select Class</label>
              <select
                value={questionData.class_}
                onChange={(e) => setQuestionData({...questionData, class_: e.target.value})}
                className="w-full bg-[#111111] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#21B6F8]"
              >
                {classes.map(classOption => (
                  <option key={classOption.value} value={classOption.value}>
                    {classOption.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-white text-sm">Select Topic</label>
              <select
                value={questionData.topic}
                onChange={(e) => setQuestionData({...questionData, topic: e.target.value})}
                className="w-full bg-[#111111] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#21B6F8]"
              >
                {topics.map(topic => (
                  <option key={topic.value} value={topic.value}>
                    {topic.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-white text-sm">Question Type</label>
              <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value as 'MCQs' | 'Fill in the blank' | 'True/False' | 'Create Formula')}
                className="w-full bg-[#111111] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#21B6F8]"
              >
                <option value="MCQs">MCQs</option>
                <option value="Fill in the blank">Fill in the blank</option>
                <option value="True/False">True/False</option>
                <option value="Create Formula">Create Formula</option>
              </select>
            </div>

            <div className="border-t border-gray-800 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-white">Settings</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Randomize</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isRandomized}
                      onChange={(e) => setIsRandomized(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#21B6F8]"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddQuestion;