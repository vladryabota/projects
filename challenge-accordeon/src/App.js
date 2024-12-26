import "./App.css";
import { useState } from "react";

const faqs = [
  {
    title: "Where are the chairs assembled?",
    text: "Lorem ipsum dolor adasjdiajd asiodaoijsdjoisaoidja asdaj asidoiajoid asjd oijasidoiasjjido",
  },
  {
    title: "How long do iahve to wait for my chair to be repared?",
    text: "Lorem ipsum dolor adasjdiajd asiodaoijsdjoisaoidja asdaj asidoiajoid asjd oijasidoiasjjido",
  },
  {
    title: "Do you ship to countries outside of EU?",
    text: "Lorem ipsum dolor adasjdiajd asiodaoijsdjoisaoidja asdaj asidoiajoid asjd oijasidoiasjjido",
  },
];

function App() {
  return (
    <div className="App">
      <Accordeon data={faqs} />
    </div>
  );
}

const Accordeon = ({ data }) => {
  const [curOpen, setCurOpen] = useState(null);

  return (
    <div className="accordeon">
      {data.map((el, i) => (
        <Item
          curOpen={curOpen}
          onOpen={setCurOpen}
          num={i < 9 ? `0${i + 1}` : i + 1}
          title={el.title}
          key={i}
        >
          {el.text}
        </Item>
      ))}
      <Item
        curOpen={curOpen}
        onOpen={setCurOpen}
        num={22}
        title="Test 1"
        key="test 1"
      >
        <p> Thinking in react allows</p>
        <ul>
          <li>Think complex</li>
          <li>Reuse components</li>
        </ul>
      </Item>
    </div>
  );
};

const Item = ({ num, title, curOpen, onOpen, children }) => {
  const isOpen = num === curOpen;

  const handleToggle = () => {
    onOpen(isOpen ? null : num);
  };

  return (
    <div className={`item ${isOpen ? "opened" : ""}`} onClick={handleToggle}>
      <div className="number">{num}</div>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen ? <div className="content-box">{children}</div> : ""}
    </div>
  );
};

export default App;
