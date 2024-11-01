import React, { useState, createContext, useContext } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

// Accordion State
const AccordionContext = createContext();

export const Accordion = ({ children }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <AccordionContext.Provider value={{ openIndex, toggleItem }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
};

export const AccordionItem = ({ children, index }) => {
  const { openIndex, toggleItem } = useContext(AccordionContext);
  const isOpen = openIndex === index;

  return (
    <div className={`accordion-item ${isOpen ? "active" : ""}`}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { isOpen, toggleItem, index })
      )}
    </div>
  );
};

export const AccordionTitle = ({ children, index, toggleItem }) => (
  <div className="accordion-title" onClick={() => toggleItem(index)}>
    {children}
    <IoChevronDownOutline />
  </div>
);

export const AccordionContent = ({ children, isOpen }) => (
  <div className={`accordion-content ${isOpen ? "open" : ""}`}>
    <div className="p-5">{isOpen && children}</div>
  </div>
);
