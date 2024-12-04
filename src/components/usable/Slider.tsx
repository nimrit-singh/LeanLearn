// Slider.tsx
import React from 'react';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ value, onChange }) => {
  return (
    <input
      type="range"
      min="0"
      max="60"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="slider w-[90%]"
      style={{ '--value': `${(value / 60) * 100}%` } as React.CSSProperties}
    />
  );
};

export default Slider;