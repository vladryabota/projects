import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <FlashCards />
    </div>
  );
}

const qustions = [
  {
    id: 3457,
    question: "What language React is based on?",
    answer: "React",
  },
  {
    id: 3458,
    question: "What are the building block of React?",
    answer: "Components",
  },
  {
    id: 3459,
    question: "What is the name of syntax to describe UI?",
    answer: "JSX",
  },
  {
    id: 3460,
    question: "How to pass data from parent to component?",
    answer: "Props",
  },
];

const FlashCards = () => {
  const [selectedID, setSelectedId] = useState(null);
  const handleClick = (id) => {
    setSelectedId(id !== selectedID ? id : null);
  };
  return (
    <div className="flashcards">
      {qustions.map((question) => {
        return (
          <div
            key={question.id}
            className={question.id === selectedID ? "selected" : null}
            onClick={() => handleClick(question.id)}
          >
            <p>
              {question.id === selectedID ? question.answer : question.question}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default App;
