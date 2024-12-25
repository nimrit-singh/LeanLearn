import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import leanLearnLogo from '../../assets/images/Logo.png';

interface Choice {
  id: number;
  text: string;
}

interface FillBlankPart {
  option: string;
  continuation: string;
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

const AddQuestion: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [questionType, setQuestionType] = useState<'MCQs' | 'Fill in the blank'>('MCQs');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

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
  const [fillBlankParts, setFillBlankParts] = useState<FillBlankPart[]>([
    { option: '', continuation: '' }
  ]);

  const topics = [
    { value: 'gravitation', label: 'Gravitation' },
    { value: 'topic2', label: 'Topic 2' },
    { value: 'topic3', label: 'Topic 3' },
    { value: 'topic4', label: 'Topic 4' },
    { value: 'topic5', label: 'Topic 5' },
  ];

  const navigationItems = [
    { id: 'home', label: 'Home', path: '/teacher/home' },
    { id: 'quiz', label: 'Quiz', path: '/teacher/quiz' },
    { id: 'question-bank', label: 'Question Bank', path: '/teacher/question-bank' },
    { id: 'reports', label: 'Reports', path: '/teacher/reports' }
  ];

  const addChoice = () => {
    if (choices.length < 4) {
      const newId = Math.max(...choices.map(c => c.id)) + 1;
      setChoices([...choices, { id: newId, text: '' }]);
    }
  };

  const addFillBlankPart = () => {
    setFillBlankParts([...fillBlankParts, { option: '', continuation: '' }]);
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
            setImageUrls(prev => [...prev, reader.result as string]);
          } else {
            alert('You can only upload a maximum of 5 images.');
          }
        };
        reader.readAsDataURL(file);
      }
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

  const handleSubmit = async () => {
    try {
      if (questionType === 'MCQs') {
        if (!questionData.question.trim()) {
          alert('Please enter a question');
          return;
        }

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
          class_: "8",
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
      } else {
        if (fillBlankParts.some(part => !part.option || !part.continuation)) {
          alert('Please fill in all fields');
          return;
        }

        const fullQuestion = fillBlankParts.reduce((acc, part, idx) => {
          if (idx === 0) {
            return `${questionData.question} ${part.option} ${part.continuation}`;
          }
          return `${acc} ${part.option} ${part.continuation}`;
        }, '');

        const fillBlankData: FillBlankQuestionData = {
          id: String(Date.now()),
          class_: "8",
          subject: "Physics",
          topic: questionData.topic,
          question: fullQuestion,
          choices: fillBlankParts.map(part => part.option),
          answers: fillBlankParts.map(part => part.option),
          resource: [""],
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
      }

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
      <div className={`${
        isSidebarOpen ? 'w-64' : 'w-20'
      } bg-[#111111] transition-all duration-300 ease-in-out`}>
        <div className={`p-4 flex ${isSidebarOpen ? 'gap-2' : 'justify-center'} items-center`}>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white hover:text-gray-300 focus:outline-none"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          {isSidebarOpen && <img src={leanLearnLogo} alt="LeanLearn" className="h-8 pl-4 md:pl-12" />}
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
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      <div className="flex-1 flex">
        <div className="flex-1 p-6">
          <div className="bg-[#111111] rounded-lg p-6">
            <div className="mb-4">
              
              {questionType === 'MCQs' ? (
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
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <span className="text-white">1.</span>
                    <input
                      type="text"
                      placeholder="Your question here"
                      value={questionData.question}
                      onChange={(e) => setQuestionData({...questionData, question: e.target.value})}
                      className="flex-1 bg-transparent text-white border-none focus:outline-none text-lg"
                    />
                  </div>
                  {fillBlankParts.map((part, index) => (
                    <div key={index} className="flex items-center gap-4 ml-6">
                      <input
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        value={part.option}
                        onChange={(e) => {
                          const newParts = [...fillBlankParts];
                          newParts[index].option = e.target.value;
                          setFillBlankParts(newParts);
                        }}
                        className="bg-[#1A1A1A] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#21B6F8] w-32"
                      />
                      <input
                        type="text"
                        placeholder="Continue here"
                        value={part.continuation}
                        onChange={(e) => {
                          const newParts = [...fillBlankParts];
                          newParts[index].continuation = e.target.value;
                          setFillBlankParts(newParts);
                        }}
                        className="flex-1 bg-[#1A1A1A] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#21B6F8]"
                      />
                    </div>
                  ))}
                  <div className="ml-6">
                    <button
                      onClick={addFillBlankPart}
                      className="text-[#21B6F8] text-sm hover:underline"
                    >
                      Add Option
                    </button>
                  </div>
                </div>
              )}
             <button className="text-[#21B6F8] text-sm hover:underline ml-6 mt-2">
  <input
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    style={{ display: 'none' }} // Hide the default file input
    id="image-upload"
    multiple // Allow multiple file selection
  />
  <label htmlFor="image-upload">Add Image</label>
</button>

<div className="mt-4 flex flex-wrap gap-4">
  {imageUrls.map((url, index) => (
    <img key={index} src={url} alt={`Uploaded ${index + 1}`} className="max-w-full h-auto w-32" />
  ))}
</div>
            </div>

            {questionType === 'MCQs' && (
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
            )}
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
            <label className="text-white text-sm">Select the topic for your question</label>
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
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value as 'MCQs' | 'Fill in the blank')}
              className="w-full bg-[#111111] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#21B6F8]"
            >
              <option value="MCQs">MCQs</option>
              <option value="Fill in the blank">Fill in the blank</option>
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