import { useState } from "react";
import "./App.css";
import { getValue } from "@testing-library/user-event/dist/utils";
import { type } from "@testing-library/user-event/dist/type";

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

const Counter = () => {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const handleReset = () => {
    setCount(0);
    setStep(1);
  };

  const date = new Date("June 21 2027");
  date.setDate(date.getDate() + count);
  return (
    <div>
      <div>
        <input
          type="range"
          min={1}
          max={10}
          value={step}
          onChange={(e) => {
            setStep(Number(e.target.value));
          }}
        />
        <span>Step {step}</span>
        <button
          className="minus"
          onClick={() => {
            setStep((c) => {
              if (c > 1) {
                return c - 1;
              } else {
                return c;
              }
            });
          }}
        >
          -
        </button>
        <button
          className="plus"
          onClick={() => {
            setStep((c) => c + 1);
          }}
        >
          +
        </button>
      </div>
      <div>
        <span>Count {count}</span>
        <button
          className="minus"
          onClick={() => {
            setCount((c) => c - step);
          }}
        >
          -
        </button>
        <input
          type="text"
          onChange={(e) => {
            setCount(Number(e.target.value));
          }}
          value={count}
        />
        <button
          className="plus"
          onClick={() => {
            setCount((c) => c + Number(step));
          }}
        >
          +
        </button>
      </div>
      <div className="message">
        <span>
          {count === 0
            ? "Today is "
            : count > 0
            ? `${count} days from today is `
            : `${Math.abs(count)} days ago was `}
        </span>
        <span>{date.toDateString()}</span>
      </div>
      <div>
        {step !== 1 || count !== 0 ? (
          <button onClick={() => handleReset()}>Reset</button>
        ) : null}
      </div>
    </div>
  );
};

export default App;
