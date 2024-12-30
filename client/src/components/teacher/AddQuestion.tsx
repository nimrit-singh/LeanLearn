import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import leanLearnLogo from '../../assets/images/Logo.png';
import {formulaQuestionApi } from '../../lib/api/questions';

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
  const [quantities, setQuantities] = useState<{
    name: string;
    symbol: string;
    value?: number;
    isUnknown?: boolean;
  }[]>([]);
  const [selectedOperator, setSelectedOperator] = useState('+');

  const commonQuantities = {
    'Force': 'F',
    'Mass': 'm',
    'Acceleration': 'a',
    'Velocity': 'v',
    'Time': 't',
    'Distance': 's',
    'Energy': 'E',
    'Power': 'P',
    'Momentum': 'p',
    'Gravity': 'g'
  };

  const operators = ['+', '-', '*', '/', '=', '(', ')'];

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
      icon: (
        <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.0919 3.49605C13.9146 2.83595 15.0854 2.83595 15.9081 3.49605L23.6581 9.71438C24.1903 10.1414 24.5 10.7869 24.5 11.4693V22.7497C24.5 23.9923 23.4926 24.9997 22.25 24.9997H19.25C18.0074 24.9997 17 23.9923 17 22.7497V16.7497C17 16.3355 16.6642 15.9997 16.25 15.9997H12.75C12.3358 15.9997 12 16.3355 12 16.7497V22.7497C12 23.9923 10.9926 24.9997 9.75 24.9997H6.75C5.50736 24.9997 4.5 23.9923 4.5 22.7497V11.4693C4.5 10.7869 4.80967 10.1414 5.34191 9.71438L13.0919 3.49605ZM14.9694 4.666C14.6951 4.44597 14.3049 4.44597 14.0306 4.666L6.28064 10.8843C6.10322 11.0267 6 11.2418 6 11.4693V22.7497C6 23.1639 6.33579 23.4997 6.75 23.4997H9.75C10.1642 23.4997 10.5 23.1639 10.5 22.7497V16.7497C10.5 15.5071 11.5074 14.4997 12.75 14.4997H16.25C17.4926 14.4997 18.5 15.5071 18.5 16.7497V22.7497C18.5 23.1639 18.8358 23.4997 19.25 23.4997H22.25C22.6642 23.4997 23 23.1639 23 22.7497V11.4693C23 11.2418 22.8968 11.0267 22.7194 10.8843L14.9694 4.666Z" fill="white"/>
        </svg>
      ),
      path: '/teacher/home'
    },
    { 
      id: 'quiz',
      label: 'Quiz',
      icon: (
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.5 2.75C0.5 1.23122 1.73122 0 3.25 0H19.75C21.2688 0 22.5 1.23122 22.5 2.75V11.4995C22.0384 11.1527 21.5355 10.858 21 10.6241V2.75C21 2.05964 20.4404 1.5 19.75 1.5H3.25C2.55964 1.5 2 2.05964 2 2.75V19.25C2 19.9404 2.55964 20.5 3.25 20.5H11.1241C11.358 21.0355 11.6527 21.5384 11.9995 22H3.25C1.73122 22 0.5 20.7688 0.5 19.25V2.75ZM4.25 12.9981L12.0009 12.9981C11.654 13.4596 11.3591 13.9625 11.1249 14.4981L4.25 14.4981C3.83579 14.4981 3.5 14.1623 3.5 13.7481C3.5 13.3339 3.83579 12.9981 4.25 12.9981ZM3.5 17.7511C3.5 17.3369 3.83579 17.0011 4.25 17.0011L9.75231 17.0011C10.1665 17.0011 10.5023 17.3369 10.5023 17.7511C10.5023 18.1653 10.1665 18.5011 9.75231 18.5011L4.25 18.5011C3.83578 18.5011 3.5 18.1653 3.5 17.7511ZM9.00167 2.99966C9.303 2.99972 9.57504 3.18012 9.69235 3.45768L12.4408 9.96057C12.6021 10.3421 12.4235 10.7821 12.042 10.9434C11.6605 11.1046 11.2204 10.9261 11.0592 10.5445L10.6184 9.50171H7.38208L6.94073 10.5448C6.77932 10.9263 6.33923 11.1047 5.95775 10.9433C5.57628 10.7819 5.39789 10.3418 5.5593 9.96029L8.31081 3.45741C8.42823 3.1799 8.70034 2.9996 9.00167 2.99966ZM8.01677 8.00171H9.98444L9.00114 5.67524L8.01677 8.00171ZM15.25 2.99991C15.6642 2.99991 16 3.33569 16 3.74991V5H17.2501C17.6643 5 18.0001 5.33579 18.0001 5.75C18.0001 6.16421 17.6643 6.5 17.2501 6.5H16V7.7476C16 8.16181 15.6642 8.4976 15.25 8.4976C14.8358 8.4976 14.5 8.16181 14.5 7.7476V6.5H13.2524C12.8382 6.5 12.5024 6.16421 12.5024 5.75C12.5024 5.33579 12.8382 5 13.2524 5H14.5V3.74991C14.5 3.33569 14.8358 2.99991 15.25 2.99991ZM24.5 17.5C24.5 21.0899 21.5899 24 18 24C14.4101 24 11.5 21.0899 11.5 17.5C11.5 13.9101 14.4101 11 18 11C21.5899 11 24.5 13.9101 24.5 17.5ZM18.5 13.5C18.5 13.2239 18.2761 13 18 13C17.7239 13 17.5 13.2239 17.5 13.5V17H14C13.7239 17 13.5 17.2239 13.5 17.5C13.5 17.7761 13.7239 18 14 18H17.5V21.5C17.5 21.7761 17.7239 22 18 22C18.2761 22 18.5 21.7761 18.5 21.5V18H22C22.2761 18 22.5 17.7761 22.5 17.5C22.5 17.2239 22.2761 17 22 17H18.5V13.5Z" fill="white"/>
        </svg>
      ),
      path: '/teacher/dashboard'
    },
    {
      id: 'question-bank',
      label: 'Question Bank',
      icon: (
        <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.49951 5H8.48951C9.54333 5 10.4076 5.8164 10.484 6.85081L10.4895 7V25C10.4895 26.0538 9.67311 26.9181 8.6387 26.9945L8.48951 27H6.49951C5.44569 27 4.5814 26.1836 4.505 25.1492L4.49951 25V7C4.49951 5.94618 5.31591 5.08188 6.35032 5.00549L6.49951 5H8.48951H6.49951ZM13.4945 5H15.4895C16.5433 5 17.4076 5.8164 17.484 6.85081L17.4895 7V25C17.4895 26.0538 16.6731 26.9181 15.6387 26.9945L15.4895 27H13.4945C12.4397 27 11.5763 26.1836 11.5 25.1492L11.4945 25V7C11.4945 5.94618 12.31 5.08188 13.3452 5.00549L13.4945 5H15.4895H13.4945ZM22.6301 7.0264C23.4734 7.0264 24.2458 7.56409 24.523 8.38602L24.5691 8.5434L28.4291 24.0264C28.6849 25.0487 28.1025 26.0847 27.1166 26.4099L26.9731 26.4514L25.0101 26.9404C24.8481 26.9804 24.6851 27.0004 24.5251 27.0004C23.6809 27.0004 22.9093 26.4618 22.6322 25.6406L22.5861 25.4834L18.7251 10.0004C18.4702 8.97617 19.0527 7.94101 20.0386 7.6168L20.1821 7.5754L22.1451 7.0864C22.3071 7.0464 22.4701 7.0264 22.6301 7.0264ZM8.48951 6.5H6.49951C6.25507 6.5 6.05013 6.67778 6.0076 6.91043L5.99951 7V25C5.99951 25.2444 6.17729 25.4494 6.40994 25.4919L6.49951 25.5H8.48951C8.73484 25.5 8.93909 25.3222 8.98145 25.0896L8.98951 25V7C8.98951 6.75556 8.81252 6.55062 8.57935 6.50809L8.48951 6.5ZM15.4895 6.5H13.4945C13.2492 6.5 13.0449 6.67778 13.0026 6.91043L12.9945 7V25C12.9945 25.2444 13.1715 25.4494 13.4047 25.4919L13.4945 25.5H15.4895C15.7348 25.5 15.9391 25.3222 15.9815 25.0896L15.9895 25V7C15.9895 6.75556 15.8125 6.55062 15.5794 6.50809L15.4895 6.5ZM22.6301 8.5264L22.5686 8.53015L22.5071 8.5414L20.5451 9.0304C20.3069 9.08996 20.1516 9.31149 20.1671 9.5475L20.1811 9.6364L24.0411 25.1204C24.1061 25.3804 24.3381 25.5004 24.5251 25.5004L24.5865 25.4965L24.6471 25.4844L26.6101 24.9954C26.8483 24.9358 27.0036 24.7151 26.9881 24.4786L26.9741 24.3894L23.1131 8.9054C23.0481 8.6444 22.8171 8.5264 22.6301 8.5264Z" fill="white"/>
        </svg>
      ),
      path: '/teacher/question-bank'
    },
    { 
      id: 'reports',
      label: 'Reports',
      icon: (
        <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.5 3C0.5 1.34314 1.84315 0 3.5 0C5.15685 0 6.5 1.34315 6.5 3V21C6.5 22.6569 5.15685 24 3.5 24C1.84315 24 0.5 22.6569 0.5 21V3ZM3.5 2C2.94771 2 2.5 2.44772 2.5 3V21C2.5 21.5523 2.94772 22 3.5 22C4.05229 22 4.5 21.5523 4.5 21V3C4.5 2.44772 4.05228 2 3.5 2ZM8.5 9C8.5 7.34315 9.84315 6 11.5 6C13.1569 6 14.5 7.34315 14.5 9V21C14.5 22.6569 13.1569 24 11.5 24C9.84315 24 8.5 22.6569 8.5 21V9ZM11.5 8C10.9477 8 10.5 8.44772 10.5 9V21C10.5 21.5523 10.9477 22 11.5 22C12.0523 22 12.5 21.5523 12.5 21V9C12.5 8.44772 12.0523 8 11.5 8ZM19.5 12C17.8431 12 16.5 13.3431 16.5 15V21C16.5 22.6569 17.8431 24 19.5 24C21.1569 24 22.5 22.6569 22.5 21V15C22.5 13.3431 21.1569 12 19.5 12ZM18.5 15C18.5 14.4477 18.9477 14 19.5 14C20.0523 14 20.5 14.4477 20.5 15V21C20.5 21.5523 20.0523 22 19.5 22C18.9477 22 18.5 21.5523 18.5 21V15Z" fill="white"/>
        </svg>
      ),
      path: '/teacher/reports'
    }
  ];

  const addChoice = () => {
    if (choices.length < 4) {
      const newId = Math.max(...choices.map(c => c.id)) + 1;
      setChoices([...choices, { id: newId, text: '' }]);
    }
  };

  const addQuantity = () => {
    setQuantities([...quantities, { name: '', symbol: '', isUnknown: false }]);
  };

  const removeQuantity = (index: number) => {
    const newQuantities = quantities.filter((_, i) => i !== index);
    setQuantities(newQuantities);
  };

  const handleQuantitySelect = (index: number, quantityName: string) => {
    const symbol = commonQuantities[quantityName as keyof typeof commonQuantities];
    const newQuantities = [...quantities];
    newQuantities[index] = {
      ...newQuantities[index],
      name: quantityName,
      symbol: symbol
    };
    setQuantities(newQuantities);
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

  const handleChoiceChange = (id: number, text: string) => {
    setChoices(choices.map(choice => 
      choice.id === id ? { ...choice, text } : choice
    ));
    setQuestionData({
      ...questionData,
      options: choices.map(c => c.text)
    });
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
      return (
        <div className="space-y-6 ml-6">
          <div className="space-y-4 bg-[#1A1A1A] p-4 rounded-lg border border-gray-700">
            <h3 className="text-white text-lg mb-4">Formula Builder</h3>
            
            {quantities.map((quantity, index) => (
              <div key={index} className="flex items-center gap-4">
                <select
                  value={quantity.name}
                  onChange={(e) => handleQuantitySelect(index, e.target.value)}
                  className="bg-[#111111] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#21B6F8]"
                >
                  <option value="">Select Quantity</option>
                  {Object.keys(commonQuantities).map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
                
                <div className="flex items-center gap-2 text-white">
                  <span>Symbol: {quantity.symbol}</span>
                </div>
                
                <label className="flex items-center gap-2 text-white">
                  <input
                    type="checkbox"
                    checked={quantity.isUnknown}
                    onChange={(e) => {
                      const newQuantities = [...quantities];
                      newQuantities[index] = {
                        ...newQuantities[index],
                        isUnknown: e.target.checked
                      };
                      setQuantities(newQuantities);
                    }}
                    className="rounded border-gray-700"
                  />
                  Unknown
                </label>
                
                <button
                  onClick={() => removeQuantity(index)}
                  className="text-red-500 hover:text-red-400"
                >
                  Remove
                </button>
              </div>
            ))}
            
            <button
              onClick={addQuantity}
              className="px-4 py-2 bg-[#21B6F8] text-white rounded hover:bg-opacity-90"
            >
              Add Quantity
            </button>

            <div className="flex gap-2 mt-4">
              {operators.map(op => (
                <button
                  key={op}
                  onClick={() => setSelectedOperator(op)}
                  className={`px-3 py-1 rounded ${
                    selectedOperator === op
                      ? 'bg-[#21B6F8] text-white'
                      : 'bg-[#111111] text-white hover:bg-opacity-90'
                  }`}
                >
                  {op}
                </button>
              ))}
            </div>

            <div className="mt-4 p-3 bg-[#111111] rounded">
              <p className="text-gray-300">Formula Preview:</p>
              <div className="mt-2 font-mono text-white">
                {quantities.map(q => q.symbol).join(' ' + selectedOperator + ' ')}
              </div>
            </div>
          </div>
        </div>
      );
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
              onClick={addChoice}
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
          </div></div>
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
        if (quantities.length < 2) {
          alert('Please add at least two quantities');
          return;
        }
      
        if (!quantities.some(q => q.isUnknown)) {
          alert('Please mark at least one quantity as unknown');
          return;
        }
      
        if (!questionData.question.trim()) {
          alert('Please enter a question');
          return;
        }
      
        try {
          const formulaData = {
            id: String(Date.now()),
            class_: questionData.class_,
            subject: 'Physics',
            topic: questionData.topic,
            question: questionData.question,
            quantities: quantities.map(q => ({
              name: q.name,
              symbol: q.symbol,
              isUnknown: Boolean(q.isUnknown)
            })),
            formula: quantities.map(q => q.symbol).join(' ' + selectedOperator + ' '),
            // Add the required fields that were missing
            options: [""], // Empty array as it's not used for formula questions
            answers: [""], // Empty array as it's not used for formula questions
            resource: [""], // Empty array as per the API requirement
            used: true
          };
      
          console.log('Submitting formula data:', formulaData);
      
          const result = await formulaQuestionApi.create(formulaData);
          console.log('Creation successful:', result);
      
          // Clear the form after successful submission
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
          setQuantities([]);
          setSelectedOperator('+');
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
    <div className="flex min-h-screen bg-black">
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#111111] transition-all duration-300 ease-in-out`}>
        <div className={`p-4 flex ${isSidebarOpen ? 'gap-2' : 'justify-center'} items-center`}>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white hover:text-gray-300 focus:outline-none"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          {isSidebarOpen && <img src={leanLearnLogo} alt="LeanLearn" className="h-8 pl-4 md:pl-12" onClick={() => navigate('/')} />}
        </div>

        <nav className="mt-8 flex flex-col gap-2 px-3">
          {navigationItems.map((item) => (
            <a
              key={item.id}
              href={item.path}
              className={`flex items-center ${
                isSidebarOpen ? 'gap-3 px-4' : 'justify-center'
              } py-2 rounded-md ${
                item.id === 'question-bank'
                  ? 'bg-[#21B6F8] text-black'
                  : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'
              }`}
            >
              {item.icon}
              {isSidebarOpen && <span>{item.label}</span>}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex-1 flex">
        <div className="flex-1 p-6">
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
                    <img src={url} alt={`Uploaded ${index + 1}`} className="max-w-full h-32 w-32 p-3 object-cover" />
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

          <div className="flex justify-end mt-6">
            <button
              onClick={handleSubmit}
              className="bg-[#21B6F8] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Save Question
            </button>
          </div>
        </div>

        <div className="w-80 bg-black border-l border-gray-800 p-6 space-y-4">
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
  );
};

export default AddQuestion;