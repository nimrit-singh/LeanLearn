import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Formula = () => {
  const initialSlots = {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null
  };

  const [slots, setSlots] = useState(initialSlots);
  const initialItems = ["Force", "Mass", "Acceleration", "=", "x"];
  const [items, setItems] = useState(initialItems);
  const [draggedItem, setDraggedItem] = useState(null);
  const [activeSlot, setActiveSlot] = useState(null);

  const handleDrag = (event, info, item) => {
    const dropZones = document.querySelectorAll('.drop-zone');
    const point = { x: info.point.x, y: info.point.y };
    
    // Find the drop zone under the cursor
    const hoveredZone = Array.from(dropZones).find(zone => {
      const rect = zone.getBoundingClientRect();
      return (
        point.x >= rect.left &&
        point.x <= rect.right &&
        point.y >= rect.top &&
        point.y <= rect.bottom
      );
    });

    if (hoveredZone) {
      setActiveSlot(parseInt(hoveredZone.dataset.slot));
    } else {
      setActiveSlot(null);
    }
  };

  const handleDragStart = (event, info, item) => {
    setDraggedItem(item);
  };

  const handleDragEnd = (event, info, item) => {
    if (activeSlot !== null && !slots[activeSlot]) {
      setSlots(prev => ({ ...prev, [activeSlot]: item }));
      setItems(prev => prev.filter(i => i !== item));
    }
    setDraggedItem(null);
    setActiveSlot(null);
  };

  const resetSlots = () => {
    setSlots(initialSlots);
    setItems(initialItems);
    setDraggedItem(null);
    setActiveSlot(null);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl mb-6 text-white">Complete this formula</h1>

      {/* Formula Area */}
      <div className="flex gap-5 w-[500px] h-[80px] justify-center items-center m-4">
        {Object.keys(slots).map((key) => (
          <motion.div
            key={key}
            data-slot={key}
            animate={{
              scale: activeSlot === Number(key) ? 1.05 : 1,
              borderColor: activeSlot === Number(key) ? "#60A5FA" : "#2563EB"
            }}
            className={`drop-zone text-white text-2xl ${
              slots[Number(key)] 
                ? "bg-green-500/30 border-green-500" 
                : activeSlot === Number(key)
                ? "bg-blue-400/40 border-blue-500"
                : "bg-blue-500/30 border-blue-500"
            }  h-full w-full p-3 flex border-2 rounded-xl justify-center items-center`}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={slots[Number(key)] || (activeSlot === Number(key) ? 'hover' : 'empty')}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                {slots[Number(key)] || 
                 (activeSlot === Number(key) && draggedItem ? draggedItem : "Drop Here")}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Draggable Elements */}
      <div className="flex gap-3">
        {items.map((item, index) => (
          <motion.div
            key={index}
            drag
            dragSnapToOrigin
            dragElastic={0.2}
            dragTransition={{ 
              bounceStiffness: 300,
              bounceDamping: 20
            }}
            whileDrag={{ 
              scale: 1.1,
              zIndex: 50,
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
            }}
            onDrag={(e, info) => handleDrag(e, info, item)}
            onDragStart={(e, info) => handleDragStart(e, info, item)}
            onDragEnd={(e, info) => handleDragEnd(e, info, item)}
            className="text-white text-2xl bg-gray-700/30 cursor-pointer border-gray-700 h-fit w-fit p-3 flex border-2 rounded-xl justify-center items-center"
          >
            {item}
          </motion.div>
        ))}
      </div>

      {/* Reset Button */}
      <button
        onClick={resetSlots}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
      >
        Reset Formula
      </button>
    </div>
  );
};

export default Formula;