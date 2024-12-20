"use client";
import React, { FC, useState, useRef } from "react";

const Accordion: FC<{ title: string; content: string }> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white shadow-md rounded-md mb-4">
      <button
        className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
        onClick={toggleAccordion}
      >
        <span className="text-gray-800 font-bold">{title}</span>
        <svg
          className={`h-6 w-6 text-gray-400 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0",
        }}
      >
        <div className="px-6 py-4 text-gray-600">{content}</div>
      </div>
    </div>
  );
};

export default Accordion;
