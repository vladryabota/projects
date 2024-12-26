import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const App = () => {
  const skillsObj = [
    {
      skill: "programming",
      level: "high",
      color: "green",
    },
    {
      skill: "cooking",
      level: "mid",
      color: "yellow",
    },
    {
      skill: "writing music",
      level: "mid",
      color: "blue",
    },
    {
      skill: "relationships",
      level: "beginner lvl 1",
      color: "blue",
    },
  ];
  const mySkillnames = [
    "huge dick",
    "3.4k MMR beast",
    "Best programmer in the game",
    "Funny",
  ];
  const VladsSkillnames = [
    "huge dick",
    "top 1000 EU player",
    "Best programmer ingeneer in the game",
    "Funnyass",
  ];
  return (
    <div className="wrapper">
      <Card
        name="VladIsLove RiaboCop"
        description="I am high MMR dota2 player. I love bitches, bitches love me"
        skills={skillsObj}
        img="./Jack_kahuna.jpg"
      />
      {/* <Card
        name="VladIsLove Pizzarenko"
        description="I am high MMR dota2 player Top 1000. I love bitches, bitches love me"
        skills={VladsSkillnames}
        img="./Kame-Sennin_First_Appearance.jpg"
      /> */}
    </div>
  );
};

const Card = (props) => {
  const { skills } = props;
  return (
    <div className="card_wrapper">
      <div className="image_wrapper">
        <img src={props.img} alt="suck cock"></img>
      </div>
      <CardContent
        name={props.name}
        description={props.description}
        skills={skills}
      />
    </div>
  );
};

const CardContent = (props) => {
  const { skills } = props;
  return (
    <div className="content">
      <p className="name">{props.name}</p>
      <p className="description">{props.description}</p>
      <SkillsList skills={skills} />
    </div>
  );
};

const SkillsList = (props) => {
  const { skills } = props;
  return (
    <div>
      <h2>Skills:</h2>
      <div className="skills_list">
        {skills.map((skillName, index) => (
          <Skill key={index} skillObj={skillName} />
        ))}
      </div>
    </div>
  );
};

const Skill = ({ skillObj }) => {
  const { skill, color, level } = skillObj;
  const className =
    skill === "huge dick" ? "dick" : skill === "Funny" ? "funnyass" : "basic";
  return (
    <div style={{ color: color }} className={`skill ${className}`}>
      {skill} level:{level}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
