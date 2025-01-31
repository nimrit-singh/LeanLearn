import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formulaQuestionApi } from "../../lib/api/questions";
import SideBar from "../ui/SideBar";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { convertToLatex } from "./LatexConverter";

interface Choice {
  id: number;
  text: string;
  imageUrl?: string;
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
  const [questionType, setQuestionType] = useState<
    "MCQs" | "Fill in the blank" | "True/False" | "Create Formula"
  >("MCQs");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [choiceType, setChoiceType] = useState("text");
  const [questionData, setQuestionData] = useState({
    question: "",
    topic: "gravitation",
    class_: "8",
    subject: "Physics",
    options: ["", ""],
    answers: [""],
    resource: [""],
    used: true,
  });
  const [choices, setChoices] = useState<Choice[]>(() => {
    const savedChoices = localStorage.getItem("choices");
    console.log(savedChoices)
    return savedChoices
      ? JSON.parse(savedChoices)
      : [
          { id: 1, text: "", imageUrl: "" },
          { id: 2, text: "", imageUrl: "" },
        ];
  });

  const handleSelectionChange = (e:any) => {
    setChoiceType(e.target.value);
    localStorage.removeItem("choices");
  };
  useEffect(() => {
    localStorage.setItem("choices", JSON.stringify(choices));
  }, [choices]);
  const [isRandomized, setIsRandomized] = useState(false);
  const [quantities, setQuantities] = useState<
    {
      name: string;
      symbol: string;
      value?: number;
      isUnknown?: boolean;
    }[]
  >([]);
  const [operators,setOperators] = useState<
  {
    name: string;
    symbol: string;
  }[]
>([])
const [formula, setFormula]=useState<{
  name: string;
  symbol: string;
}[]>([])
  const [selectedOperator, setSelectedOperator] = useState("+");

  const commonQuantities = {
    Force: "F",
    Mass: "m",
    Acceleration: "a",
    Velocity: "v",
    Time: "t",
    Distance: "s",
    Energy: "E",
    Power: "P",
    Momentum: "p",
    Gravity: "g",
  };

  const commonOperators = {Addition:"+",Subtraction: "-",Multiplication: "X",Division: "/",Equals: "=",
    "Left Paranthesis":"(","Right Paranthesis": ")"};

  const classes = [
    { value: "8", label: "Class 8" },
    { value: "9", label: "Class 9" },
    { value: "10", label: "Class 10" },
    { value: "11", label: "Class 11" },
    { value: "12", label: "Class 12" },
  ];

  const topics = [
    { value: "gravitation", label: "Gravitation" },
    { value: "motion", label: "Motion" },
    {
      value: "forceandnewton'slawsofmotion",
      label: "Force and Newton's laws of motion",
    },
    { value: "Workenergyandpower", label: "Work, Energy and Power" },
    // { value: "topic5", label: "Topic 5" },
  ];

  useEffect(() => {
    localStorage.removeItem("choices");
  }, [questionType]);
  
  const navigationItems = [
    {
      id: "home",
      label: "Home",
      icon: (
        <svg
          width="29"
          height="28"
          viewBox="0 0 29 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.0919 3.49605C13.9146 2.83595 15.0854 2.83595 15.9081 3.49605L23.6581 9.71438C24.1903 10.1414 24.5 10.7869 24.5 11.4693V22.7497C24.5 23.9923 23.4926 24.9997 22.25 24.9997H19.25C18.0074 24.9997 17 23.9923 17 22.7497V16.7497C17 16.3355 16.6642 15.9997 16.25 15.9997H12.75C12.3358 15.9997 12 16.3355 12 16.7497V22.7497C12 23.9923 10.9926 24.9997 9.75 24.9997H6.75C5.50736 24.9997 4.5 23.9923 4.5 22.7497V11.4693C4.5 10.7869 4.80967 10.1414 5.34191 9.71438L13.0919 3.49605ZM14.9694 4.666C14.6951 4.44597 14.3049 4.44597 14.0306 4.666L6.28064 10.8843C6.10322 11.0267 6 11.2418 6 11.4693V22.7497C6 23.1639 6.33579 23.4997 6.75 23.4997H9.75C10.1642 23.4997 10.5 23.1639 10.5 22.7497V16.7497C10.5 15.5071 11.5074 14.4997 12.75 14.4997H16.25C17.4926 14.4997 18.5 15.5071 18.5 16.7497V22.7497C18.5 23.1639 18.8358 23.4997 19.25 23.4997H22.25C22.6642 23.4997 23 23.1639 23 22.7497V11.4693C23 11.2418 22.8968 11.0267 22.7194 10.8843L14.9694 4.666Z"
            fill="white"
          />
        </svg>
      ),
      path: "/teacher/home",
    },
    {
      id: "quiz",
      label: "Quiz",
      icon: (
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 2.75C0.5 1.23122 1.73122 0 3.25 0H19.75C21.2688 0 22.5 1.23122 22.5 2.75V11.4995C22.0384 11.1527 21.5355 10.858 21 10.6241V2.75C21 2.05964 20.4404 1.5 19.75 1.5H3.25C2.55964 1.5 2 2.05964 2 2.75V19.25C2 19.9404 2.55964 20.5 3.25 20.5H11.1241C11.358 21.0355 11.6527 21.5384 11.9995 22H3.25C1.73122 22 0.5 20.7688 0.5 19.25V2.75ZM4.25 12.9981L12.0009 12.9981C11.654 13.4596 11.3591 13.9625 11.1249 14.4981L4.25 14.4981C3.83579 14.4981 3.5 14.1623 3.5 13.7481C3.5 13.3339 3.83579 12.9981 4.25 12.9981ZM3.5 17.7511C3.5 17.3369 3.83579 17.0011 4.25 17.0011L9.75231 17.0011C10.1665 17.0011 10.5023 17.3369 10.5023 17.7511C10.5023 18.1653 10.1665 18.5011 9.75231 18.5011L4.25 18.5011C3.83578 18.5011 3.5 18.1653 3.5 17.7511ZM9.00167 2.99966C9.303 2.99972 9.57504 3.18012 9.69235 3.45768L12.4408 9.96057C12.6021 10.3421 12.4235 10.7821 12.042 10.9434C11.6605 11.1046 11.2204 10.9261 11.0592 10.5445L10.6184 9.50171H7.38208L6.94073 10.5448C6.77932 10.9263 6.33923 11.1047 5.95775 10.9433C5.57628 10.7819 5.39789 10.3418 5.5593 9.96029L8.31081 3.45741C8.42823 3.1799 8.70034 2.9996 9.00167 2.99966ZM8.01677 8.00171H9.98444L9.00114 5.67524L8.01677 8.00171ZM15.25 2.99991C15.6642 2.99991 16 3.33569 16 3.74991V5H17.2501C17.6643 5 18.0001 5.33579 18.0001 5.75C18.0001 6.16421 17.6643 6.5 17.2501 6.5H16V7.7476C16 8.16181 15.6642 8.4976 15.25 8.4976C14.8358 8.4976 14.5 8.16181 14.5 7.7476V6.5H13.2524C12.8382 6.5 12.5024 6.16421 12.5024 5.75C12.5024 5.33579 12.8382 5 13.2524 5H14.5V3.74991C14.5 3.33569 14.8358 2.99991 15.25 2.99991ZM24.5 17.5C24.5 21.0899 21.5899 24 18 24C14.4101 24 11.5 21.0899 11.5 17.5C11.5 13.9101 14.4101 11 18 11C21.5899 11 24.5 13.9101 24.5 17.5ZM18.5 13.5C18.5 13.2239 18.2761 13 18 13C17.7239 13 17.5 13.2239 17.5 13.5V17H14C13.7239 17 13.5 17.2239 13.5 17.5C13.5 17.7761 13.7239 18 14 18H17.5V21.5C17.5 21.7761 17.7239 22 18 22C18.2761 22 18.5 21.7761 18.5 21.5V18H22C22.2761 18 22.5 17.7761 22.5 17.5C22.5 17.2239 22.2761 17 22 17H18.5V13.5Z"
            fill="white"
          />
        </svg>
      ),
      path: "/teacher/dashboard",
    },
    {
      id: "question-bank",
      label: "Question Bank",
      icon: (
        <svg
          width="33"
          height="32"
          viewBox="0 0 33 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.49951 5H8.48951C9.54333 5 10.4076 5.8164 10.484 6.85081L10.4895 7V25C10.4895 26.0538 9.67311 26.9181 8.6387 26.9945L8.48951 27H6.49951C5.44569 27 4.5814 26.1836 4.505 25.1492L4.49951 25V7C4.49951 5.94618 5.31591 5.08188 6.35032 5.00549L6.49951 5H8.48951H6.49951ZM13.4945 5H15.4895C16.5433 5 17.4076 5.8164 17.484 6.85081L17.4895 7V25C17.4895 26.0538 16.6731 26.9181 15.6387 26.9945L15.4895 27H13.4945C12.4397 27 11.5763 26.1836 11.5 25.1492L11.4945 25V7C11.4945 5.94618 12.31 5.08188 13.3452 5.00549L13.4945 5H15.4895H13.4945ZM22.6301 7.0264C23.4734 7.0264 24.2458 7.56409 24.523 8.38602L24.5691 8.5434L28.4291 24.0264C28.6849 25.0487 28.1025 26.0847 27.1166 26.4099L26.9731 26.4514L25.0101 26.9404C24.8481 26.9804 24.6851 27.0004 24.5251 27.0004C23.6809 27.0004 22.9093 26.4618 22.6322 25.6406L22.5861 25.4834L18.7251 10.0004C18.4702 8.97617 19.0527 7.94101 20.0386 7.6168L20.1821 7.5754L22.1451 7.0864C22.3071 7.0464 22.4701 7.0264 22.6301 7.0264ZM8.48951 6.5H6.49951C6.25507 6.5 6.05013 6.67778 6.0076 6.91043L5.99951 7V25C5.99951 25.2444 6.17729 25.4494 6.40994 25.4919L6.49951 25.5H8.48951C8.73484 25.5 8.93909 25.3222 8.98145 25.0896L8.98951 25V7C8.98951 6.75556 8.81252 6.55062 8.57935 6.50809L8.48951 6.5ZM15.4895 6.5H13.4945C13.2492 6.5 13.0449 6.67778 13.0026 6.91043L12.9945 7V25C12.9945 25.2444 13.1715 25.4494 13.4047 25.4919L13.4945 25.5H15.4895C15.7348 25.5 15.9391 25.3222 15.9815 25.0896L15.9895 25V7C15.9895 6.75556 15.8125 6.55062 15.5794 6.50809L15.4895 6.5ZM22.6301 8.5264L22.5686 8.53015L22.5071 8.5414L20.5451 9.0304C20.3069 9.08996 20.1516 9.31149 20.1671 9.5475L20.1811 9.6364L24.0411 25.1204C24.1061 25.3804 24.3381 25.5004 24.5251 25.5004L24.5865 25.4965L24.6471 25.4844L26.6101 24.9954C26.8483 24.9358 27.0036 24.7151 26.9881 24.4786L26.9741 24.3894L23.1131 8.9054C23.0481 8.6444 22.8171 8.5264 22.6301 8.5264Z"
            fill="white"
          />
        </svg>
      ),
      path: "/teacher/question-bank",
    },
    {
      id: "reports",
      label: "Reports",
      icon: (
        <svg
          width="23"
          height="24"
          viewBox="0 0 23 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 3C0.5 1.34314 1.84315 0 3.5 0C5.15685 0 6.5 1.34315 6.5 3V21C6.5 22.6569 5.15685 24 3.5 24C1.84315 24 0.5 22.6569 0.5 21V3ZM3.5 2C2.94771 2 2.5 2.44772 2.5 3V21C2.5 21.5523 2.94772 22 3.5 22C4.05229 22 4.5 21.5523 4.5 21V3C4.5 2.44772 4.05228 2 3.5 2ZM8.5 9C8.5 7.34315 9.84315 6 11.5 6C13.1569 6 14.5 7.34315 14.5 9V21C14.5 22.6569 13.1569 24 11.5 24C9.84315 24 8.5 22.6569 8.5 21V9ZM11.5 8C10.9477 8 10.5 8.44772 10.5 9V21C10.5 21.5523 10.9477 22 11.5 22C12.0523 22 12.5 21.5523 12.5 21V9C12.5 8.44772 12.0523 8 11.5 8ZM19.5 12C17.8431 12 16.5 13.3431 16.5 15V21C16.5 22.6569 17.8431 24 19.5 24C21.1569 24 22.5 22.6569 22.5 21V15C22.5 13.3431 21.1569 12 19.5 12ZM18.5 15C18.5 14.4477 18.9477 14 19.5 14C20.0523 14 20.5 14.4477 20.5 15V21C20.5 21.5523 20.0523 22 19.5 22C18.9477 22 18.5 21.5523 18.5 21V15Z"
            fill="white"
          />
        </svg>
      ),
      path: "/teacher/reports",
    },
  ];

  const addChoice = () => {
    if (choices.length < 4) {
      const newId = Math.max(...choices.map((c) => c.id)) + 1;
      setChoices([...choices, { id: newId, text: "" }]);
    }
  };
  console.log(imageUrls);

  const addQuantity = () => {
    setQuantities([...quantities, { name: "", symbol: "", isUnknown: false }]);
  };
  const removeQuantity = (index: number) => {
    const newQuantities = quantities.filter((_, i) => i !== index);
    setQuantities(newQuantities);
  };
  const addOperator = () => {
    setOperators([...operators, { name: "", symbol: "" }]);
  };
  const removeOperator = (index: number) => {
    const newOperators = operators.filter((_, i) => i !== index);
    setOperators(newOperators);
  };
  const handleQuantitySelect = (index: number, quantityName: string) => {
    const symbol = commonQuantities[quantityName as keyof typeof commonQuantities];
  
    // Update quantities
    const newQuantities = [...quantities];
    newQuantities[index] = {
      ...newQuantities[index],
      name: quantityName,
      symbol: symbol,
    };
  
    // Update formula at the correct position (even index)
    const newFormula = [...formula];
    const formulaIndex = index * 2; // Ensuring quantities go to even indices
    newFormula[formulaIndex] = {
      name: quantityName,
      symbol: symbol,
    };
  
    setQuantities(newQuantities);
    setFormula(newFormula);
  };
  
  const handleOperatorSelect = (index: number, operatorName: string) => {
    const symbol = commonOperators[operatorName as keyof typeof commonOperators];
  
    // Update operators
    const newOperators = [...operators];
    newOperators[index] = {
      ...newOperators[index],
      name: operatorName,
      symbol: symbol,
    };
  
    // Update formula at the correct position (odd index)
    const newFormula = [...formula];
    const formulaIndex = index * 2 + 1; // Ensuring operators go to odd indices
    newFormula[formulaIndex] = {
      name: operatorName,
      symbol: symbol,
    };
  
    setOperators(newOperators);
    setFormula(newFormula);
  };
  
  
  console.log(formula)
  const handleChoiceImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    choiceId: number
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedChoices = choices.map((choice) =>
          choice.id === choiceId
            ? { ...choice, imageUrl: reader.result as string, text: "" }
            : choice
        );
        setChoices(updatedChoices);

        // Update the imageUrls state
        const updatedImageUrls = updatedChoices.map((c) => c.imageUrl || "");
        setImageUrls(updatedImageUrls);

        // Update the question data with the new image URLs
        setQuestionData({
          ...questionData,
          resource: updatedImageUrls,
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageAnswerSelect = (choiceId: number) => {
    if (questionType === "MCQs") {
      // Toggle selection for MCQs
      setSelectedAnswers((prev) =>
        prev.includes(choiceId)
          ? prev.filter((id) => id !== choiceId)
          : [...prev, choiceId]
      );
    } else {
      // Single selection for other question types
      setSelectedAnswer(choiceId);
    }
  };
  const handleChoiceChange = (id: number, text: string) => {
    setChoices(
      choices.map((choice) =>
        choice.id === id ? { ...choice, text, imageUrl: "" } : choice
      )
    );
    setQuestionData({
      ...questionData,
      options: choices.map((c) => c.text),
    });
  };

  const renderQuestionContent = () => {
    if (questionType === "True/False") {
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

    if (questionType === "Create Formula") {
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
                  {Object.keys(commonQuantities).map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
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
                        isUnknown: e.target.checked,
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
            {operators.map((op, index) => (
              <div key={index} className="flex items-center gap-4">
                <select
                  value={op.name}
                  onChange={(e) => handleOperatorSelect(index, e.target.value)}
                  className="bg-[#111111] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#21B6F8]"
                >
                  <option value="">Select Operator</option>
                  {Object.keys(commonOperators).map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-2 text-white">
                  <span>Symbol: {op.symbol}</span>
                </div>
                <button
                  onClick={() => removeOperator(index)}
                  className="text-red-500 hover:text-red-400"
                >
                  Remove
                </button>
              </div>
            ))}
            
  <div className="flex gap-2 mt-4">
  {/* {Object.keys(commonOperators).map((name) => (
                <button
                  key={name}
                  onClick={() => setSelectedOperator(op)}
                  className={`px-3 py-1 rounded ${
                    selectedOperator === op
                      ? "bg-[#21B6F8] text-white"
                      : "bg-[#111111] text-white hover:bg-opacity-90"
                  }`}
                >
                  {op}
                </button>
              ))} */}
            </div>
            <button
              onClick={addQuantity}
              className="px-4 py-2 mr-2 bg-[#21B6F8] text-white rounded hover:bg-opacity-90"
            >
              Add Quantity
            </button>
            <button
              onClick={()=>{addOperator()}}
              className="px-4 py-2 bg-[#21B6F8] text-white rounded hover:bg-opacity-90"
            >
              Add operator
            </button>
          

            <div className="mt-4 p-3 bg-[#111111] rounded">
              <p className="text-gray-300">Formula Preview:</p>
              <div className="mt-2 font-mono text-white">
                {formula.map((q)=>{
                  return(" "+q.symbol+" ")
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (questionType === "MCQs") {
      return (
        <div className="space-y-4 ml-6">
          <span className="text-white mr-1">
            Which Type Of Ans You Want to Upload ?
          </span>
          <select
            value={choiceType}
            onChange={handleSelectionChange}
            className="bg-[#111111] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#21B6F8]"
          >
            <option value="text">Text Based</option>
            <option value="image">Image Based</option>
            <option value="formulae">Formulae Based</option>
          </select>
          {choices.map((choice) => (
            <div key={choice.id} className="flex  gap-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox" // Changed from radio to checkbox
                  name="answer"
                  checked={selectedAnswers.includes(choice.id)}
                  onChange={() => handleImageAnswerSelect(choice.id)}
                  className="w-4 h-4 text-[#21B6F8] bg-transparent border-gray-600 focus:ring-[#21B6F8]"
                />
              </div>
              {choiceType === "text" ? (
                <input
                  type="text"
                  value={choice.text}
                  onChange={(e) =>
                    handleChoiceChange(choice.id, e.target.value)
                  }
                  placeholder="Your Choice here"
                  className="flex-1 bg-[#1A1A1A] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#21B6F8]"
                />
              ) :choiceType === "image"? (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleChoiceImageUpload(e, choice.id)}
                  style={{ display: "none" }}
                  id={`image-upload-${choice.id}`}
                />
              ): (
                <textarea
                className="flex-1 bg-[#1A1A1A] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#21B6F8]"

                rows={2}
                placeholder="Enter an equation, e.g., lim x->0 x^2, |v|, det(A), a x b, [1,2;3,4]"
                value={choice.text}
                onChange={(e) => handleChoiceChange(choice.id,e.target.value)}
              />
              )}
              {choiceType === "image" && (
                <label
                  htmlFor={`image-upload-${choice.id}`}
                  className="text-[#21B6F8] text-sm hover:underline cursor-pointer"
                >
                  Add Image
                </label>
              )}
              {choice.imageUrl && (
                <div className="relative">
                  <img
                    src={choice.imageUrl}
                    alt={`Choice ${choice.id}`}
                    className="max-w-full h-20 w-20 object-cover"
                  />
                  <button
                    onClick={() => {
                      const updatedChoices = choices.map((c) =>
                        c.id === choice.id ? { ...c, imageUrl: "" } : c
                      );
                      setChoices(updatedChoices);
                      const updatedImageUrls = updatedChoices.map(
                        (c) => c.imageUrl || ""
                      );
                      setImageUrls(updatedImageUrls);
                      setQuestionData({
                        ...questionData,
                        resource: updatedImageUrls,
                      });
                    }}
                    className="absolute -top-3 right-0 text-red-500 rounded-full p-1"
                    title="Remove Image"
                  >
                    &times;
                  </button>
                </div>
              )}{choiceType==="formulae" && (
                <div className="mt-4 p-4 border rounded-md bg-gray-100">
                   <InlineMath>{convertToLatex(choice.text)}</InlineMath>
                </div>)

              }
            </div>
          ))}
          {/* {choiceType} */}
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

    if (questionType === "Fill in the blank") {
      return (
        <div className="space-y-4">
      <div className="flex items-start gap-2">
        <span className="text-white">1.</span>
        <div className="flex-1 space-y-4">
          <div className="relative">
            <textarea
              placeholder="Start your question here"
              value={questionData.question}
              onChange={(e) =>
                setQuestionData({
                  ...questionData,
                  question: e.target.value,
                })
              }
              className="w-full bg-transparent text-white border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:border-[#21B6F8] min-h-[100px] resize-none"
            />
            <button
              onClick={() => {
                const textarea = document.querySelector("textarea");
                const cursorPosition = textarea?.selectionStart || 0;
                const currentText = questionData.question;
                const newText = `${currentText.slice(
                  0,
                  cursorPosition
                )} _____ ${currentText.slice(cursorPosition)}`;
                setQuestionData({ ...questionData, question: newText });
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
                  type="checkbox" // Changed from radio to checkbox
                  name="answer"
                  checked={selectedAnswers.includes(choice.id)}
                  onChange={() => {
                    setSelectedAnswers((prev) =>
                      prev.includes(choice.id)
                        ? prev.filter((id) => id !== choice.id)
                        : [...prev, choice.id]
                    );
                  }}
                  className="w-4 h-4 text-[#21B6F8] bg-transparent border-gray-600 focus:ring-[#21B6F8]"
                />
                <input
                  type="text"
                  value={choice.text}
                  onChange={(e) =>
                    handleChoiceChange(choice.id, e.target.value)
                  }
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
      setIsLoading(true);
      if (!questionData.question.trim()) {
        alert("Please enter a question");
        return;
      }

      if (questionType === "MCQs") {
        if (choiceType === "text") {
          if (choices.some((c) => !c.text.trim())) {
            alert("Please fill in all options");
            setIsLoading(false);
            return;
          }
        } else if (choiceType === "image") {
          if (choices.some((c) => !c.imageUrl)) {
            alert("Please upload all images");
            setIsLoading(false);
            return;
          }
        }
        if (selectedAnswers.length === 0) {
          alert("Please select at least one correct answer");
          setIsLoading(false);
          return;
        }

        const mcqData: MCQQuestionData = {
          id: String(Date.now()),
          class_: questionData.class_,
          subject: "Physics",
          topic: questionData.topic,
          question: questionData.question,
          options:
            choiceType === "text" || choiceType === "formulae"
              ? choices.map((c) => c.text || "") // Ensure no undefined values
              : choices.map((c) => c.imageUrl || ""),
          answers: selectedAnswers.map((answerId) => {
            const choice = choices.find((c) => c.id === answerId);
            return choiceType === "text" || choiceType === "formulae"
              ? choice?.text || ""
              : choice?.imageUrl || "";
          }),
          resource: choices.map((c) => c.imageUrl || ""),
          used: true,
        };
        console.log(mcqData);
        const response = await fetch(
          "https://lean-learn-backend-ai-do7a.onrender.com/mcqquestion",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(mcqData),
          }
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else if (questionType === "Fill in the blank") {
        if (!questionData.question.includes("_")) {
          alert("Please add at least one blank in your question");
          setIsLoading(false);
          return;
        }

        if (choices.some((c) => !c.text.trim())) {
          alert("Please fill in all options");
          setIsLoading(false);
          return;
        }

        if (selectedAnswers.length === 0) {
          alert("Please select at least one correct answer");
          setIsLoading(false);
          return;
        }
      

        const fillBlankData: FillBlankQuestionData = {
          id: String(Date.now()),
          class_: questionData.class_,
          subject: "Physics",
          topic: questionData.topic,
          question: questionData.question,
          choices: choices.map((c) => c.text),
          answers: selectedAnswers.map((answerId) => {
            const choice = choices.find((c) => c.id === answerId);
            return choice?.text || "";
          }),
          resource: [""],
          used: true,
        };
        const response = await fetch(
          "https://lean-learn-backend-ai-do7a.onrender.com/fillquestion",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(fillBlankData),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else if (questionType === "True/False") {
        const tfData: TrueFalseQuestionData = {
          id: String(Date.now()),
          class_: questionData.class_,
          subject: "Physics",
          topic: questionData.topic,
          question: questionData.question,
          answer: selectedAnswer === 1 ? "True" : "False",
          resource: "",
          used: true,
        };

        const response = await fetch(
          "https://lean-learn-backend-ai-do7a.onrender.com/tfquestion",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(tfData),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else if (questionType === "Create Formula") {
        if (quantities.length < 2) {
          alert("Please add at least two quantities");
          return;
        }

        if (!quantities.some((q) => q.isUnknown)) {
          alert("Please mark at least one quantity as unknown");
          return;
        }

        if (!questionData.question.trim()) {
          alert("Please enter a question");
          return;
        }

        try {
          const formulaData = {
            id: String(Date.now()),
            class_: questionData.class_,
            subject: "Physics",
            topic: questionData.topic,
            question: questionData.question,
            quantities: quantities.map((q) => ({
              name: q.name,
              symbol: q.symbol,
              isUnknown: Boolean(q.isUnknown),
            })),
            formula: formula,
            // Add the required fields that were missing
            options: [""], // Empty array as it's not used for formula questions
            answers: [""], // Empty array as it's not used for formula questions
            resource: [""], // Empty array as per the API requirement
            used: true,
          };

          console.log("Submitting formula data:", formulaData);

          const result = await formulaQuestionApi.create(formulaData);
          console.log("Creation successful:", result);

          // Clear the form after successful submission
          setQuestionData({
            question: "",
            topic: "gravitation",
            class_: "8",
            subject: "Physics",
            options: ["", ""],
            answers: [""],
            resource: [""],
            used: true,
          });
          setQuantities([]);
          navigate("/teacher/question-bank");
        } catch (error) {
          console.error("Error saving formula question:", error);
          alert(
            "Failed to save formula question: " +
              (error instanceof Error ? error.message : "Unknown error")
          );
        }
      }

      setIsLoading(false);
      localStorage.removeItem("choices");
      navigate("/teacher/question-bank");
    } catch (error) {
      setIsLoading(false);
      console.error("Error saving question:", error);
      if (error instanceof Error) {
        alert(`Failed to save question: ${error.message}`);
      } else {
        alert("Failed to save question");
      }
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-black">
<SideBar navigationItems={navigationItems}/>
        <div className="flex-1 flex  main-content-wrap page-content-quiz">
          <div className="flex-1 p-2 md:p-6 pb-4">
            <div className="bg-[#111111] rounded-lg p-6">
              <div className="mb-4">
                <div className="flex items-start gap-2">
                  <span className="text-white">1.</span>
                  <textarea
                    placeholder="Your question here"
                    value={questionData.question}
                    onChange={(e) =>
                      setQuestionData({
                        ...questionData,
                        question: e.target.value,
                      })
                    }
                    className="w-full bg-transparent text-white border-none focus:outline-none text-lg resize-none"
                    rows={3}
                  />
                </div>
              </div>

              {renderQuestionContent()}
            </div>

            <div className="flex justify-end mt-6 sm:mb-10">
              <button
                onClick={handleSubmit}
                className="bg-[#21B6F8] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
                disabled={isLoading} // Disable the submit button while the question is being saved
              >
                {isLoading ? (
                  <div className="flex items-center gap-2 justify-center">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Saving...
                  </div>
                ) : (
                  "Save Question"
                )}
              </button>
            </div>
          </div>

          <div className="w-full md:w-80 bg-black border-l border-gray-800 p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-white text-sm">Select Class</label>
              <select
                value={questionData.class_}
                onChange={(e) =>
                  setQuestionData({ ...questionData, class_: e.target.value })
                }
                className="w-full bg-[#111111] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#21B6F8]"
              >
                {classes.map((classOption) => (
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
                onChange={(e) =>
                  setQuestionData({ ...questionData, topic: e.target.value })
                }
                className="w-full bg-[#111111] text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-[#21B6F8]"
              >
                {topics.map((topic) => (
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
                onChange={(e) =>
                  setQuestionType(
                    e.target.value as
                      | "MCQs"
                      | "Fill in the blank"
                      | "True/False"
                      | "Create Formula"
                  )
                }
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
