import React from "react";
import { useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/Logo.png";
import einstein from "../../assets/Einstein.gif";
import newton from "../../assets/Newton.gif";
import galileo from "../../assets/Galileo.gif";
import raman from "../../assets/CV Raman.gif";
import Formula from "./Formula";
export default function DragnDrop() {
    const dragControls = useDragControls();
    const navigate = useNavigate();
    const companionImages = { 1: einstein, 2: newton, 3: galileo, 4: raman };
    const [companionMessage, setCompanionMessage] = useState<string>("Hi ther this is your study companion");
    const selectedCompanion = 1;
    const [isCorrect, setIsCorrect] = useState(false);
   const [showFeedback, setShowFeedback] = useState(false);
    
    const borderColor = isCorrect ? "border-green-500" : "border-red-500";
  const [loadingCompanionMessage, setLoadingCompanionMessage] = useState(false);
  const [formulaSequence, setFormulaSequence] = useState<
      Array<{
        type: "word" | "operator";
        value: string;
      }>
    >([]);
      const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
      const initialSlots={
        1: null,
        2: null,
        3: null,
        4:null,5:null
      };
      const [slots, setSlots] = useState<{ [key: number]: string | null }>(initialSlots);
    
      // Available draggable items
      const initialItems = ["Force", "Mass", "Acceleration","=","x"];
    
      // Track placed items to prevent duplicates
      const [items, setItems] = useState(initialItems);

      // Track placed items to prevent duplicates
      const placedItems = new Set(Object.values(slots));
    
      // Handle drop event
      const handleDrop = (slotIndex: number, item: string) => {
        if (!placedItems.has(item)) {
          setSlots((prev) => ({ ...prev, [slotIndex]: item }));
          setItems((prev) => prev.filter((i) => i !== item)); // Remove item from available list
        }
      };
    
      // Reset slots and return items to original list
      const resetSlots = () => {
        setSlots(initialSlots);
        setItems(initialItems);
      };
    return (
        <>

            {/* side bar for user */}
            <div className="flex flex-col md:flex-row min-h-screen bg-black">
                <div className="lg:w-[280px] w-full bg-[#101010] p-5 flex flex-col min-h-0 md:h-screen overflow-hidden">
                    <div className="flex items-center justify-start lg:justify-center gap-2 mb-4 md:mt-8">
                        <button onClick={() => navigate("/")} className="flex items-start">
                            <img src={logo} alt="LeanLearn Logo" className="w-[120px]" />
                        </button>
                    </div>
                
                <div
                    className={`flex ${companionMessage && "flex-row-reverse"
                        } lg:flex-col min-h-0 md:flex-grow overflow-hidden  md:justify-between`}
                >
                    {companionMessage ? (
                        <>
                            <div
                                className={`border-2 ${borderColor} relative rounded-lg p-2 lg:p-6 mb-4 max-h-[20vh] lg:max-h-[50vh] custom-scrollbar overflow-y-auto`}
                                style={
                                    {
                                        "--scrollbar-width": "1px",
                                        "--scrollbar-thumb-color": "rgba(255, 255, 255, 0.2)",
                                        "--scrollbar-track-color": "rgba(0, 0, 0, 0.2)",
                                    } as React.CSSProperties
                                }
                            >
                                {/* <div className={`absolute block md:hidden bottom-0 -left-[12px] top-[117px] w-6 h-6   ${borderColor}  bg-[#101113] border-l-2 border-b-2  rotate-45 transform translate-y-3`}></div> */}
                                <div className="space-y-4 re">
                                    {companionMessage.split(".").map((sentence, index) => {
                                        const trimmedSentence = sentence.trim();
                                        if (trimmedSentence) {
                                            return (
                                                <p
                                                    key={index}
                                                    className="text-gray-300 leading-relaxed text-sm tracking-wide"
                                                >
                                                    {trimmedSentence}.
                                                </p>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>

                            </div>

                            {selectedCompanion && (
                                <div className="mt-4 md:mt-0 flex-shrink-0 flex items-end lg:justify-center">
                                    <img
                                        src={
                                            companionImages[
                                            selectedCompanion as keyof typeof companionImages
                                            ]
                                        }
                                        alt="Selected Companion"
                                        className="md:w-full h-[180px] lg:h-auto object-contain md:max-h-[300px]"
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        selectedCompanion && (
                            <div className="flex-shrink-0 flex lg:justify-center md:mt-auto">
                                <img
                                    src={
                                        companionImages[
                                        selectedCompanion as keyof typeof companionImages
                                        ]
                                    }
                                    alt="Selected Companion"
                                    className="md:w-full h-[180px] object-contain lg:h-auto md:max-h-[300px]"
                                />
                            </div>
                        )
                    )}
                </div>
</div>
                {/* --finished component */}




                <div className="flex-1 overflow-y-auto">
                    <div className="h-auto lg:h-screen flex items-start lg:items-center p-3 lg:p-8">
                        <div className="max-w-4xl mx-auto w-full">
                            <div className="mb-8">
                           <Formula/>
                            </div>




                            <div className="flex justify-between items-center">




                            <div className="flex gap-3">
                {!showFeedback && (
                  <button
                    onClick={()=>{}}
                    className="px-6 py-2 rounded-lg bg-[#101113] text-white hover:bg-[#1A1A1A] transition-colors"
                  >
                    Skip
                  </button>
                )}
                {!showFeedback ? (
                  <button
                    onClick={()=>{}} //handleSubmitAnswers
                    disabled={true
                        ? formulaSequence.length === 0
                        : selectedAnswers.length === 0
                    }
                    className="px-6 py-2 rounded-lg bg-[#00A3FF] text-white hover:bg-[#0086CC] transition-colors disabled:opacity-50"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    disabled={loadingCompanionMessage}
                    onClick={()=>{}} //handlenext
                    className="px-6 py-2 rounded-lg bg-[#00A3FF] text-white hover:bg-[#0086CC] transition-colors"
                  >
                    Next
                  </button>
                )}
              </div>






                            </div>





                        </div></div></div>

            </div>

        </>

    );
}