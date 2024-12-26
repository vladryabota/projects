import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <TextExpander buttonState={"showmore"}>
        jsadoia kasdkaopsdka paskopdasopdksaopkdopsakdopas
        kopkasopkdopaskdasodkasopjd aopjs askodoapkd apksopdak
      </TextExpander>
      <TextExpander buttonState={"showall"}>
        askdopak spkdaposkdasopk daspokdopsakdopasksdopakop askdpoak
        dopaspodkasopkd poaskpokdap[dsap[ kpas[kdlp[saksdp[asks[d]]]]]]
      </TextExpander>
      <TextExpander buttonState={"showless"}>
        aslpd saldwlrplgsp psdplfspdlflslfpds 21931 ksdao dao1p l
        askdspadkasopkd
      </TextExpander>
    </div>
  );
}

const TextExpander = ({ children, buttonState }) => {
  const [butState, setButState] = useState(buttonState);

  const handleClick = () => {
    butState == "showmore"
      ? setButState("expanded")
      : butState == "showless"
      ? setButState("hidden")
      : butState == "showall"
      ? setButState("hideall")
      : butState == "hideall"
      ? setButState("showall")
      : butState == "showless"
      ? setButState("showmore")
      : butState == "expanded"
      ? setButState("hidden")
      : butState == "hidden"
      ? setButState("expanded")
      : setButState("none");
  };
  return (
    <div
      className={
        butState === "showmore"
          ? "hidden"
          : butState === "showless"
          ? "expanded"
          : butState === "showall"
          ? "allvisible"
          : butState === "hideall"
          ? "allhidden"
          : butState === "expanded"
          ? "expanded"
          : butState === "hidden"
          ? "hidden"
          : "none"
      }
    >
      {children}
      <Button
        className={
          butState === "showmore"
            ? "hidden"
            : butState === "showless"
            ? "expanded"
            : butState === "showall"
            ? "allvisible"
            : butState === "hideall"
            ? "allhidden"
            : butState === "expanded"
            ? "expanded"
            : butState === "hidden"
            ? "hidden"
            : "none"
        }
        click={handleClick}
      >
        {butState === "showmore"
          ? "Show more"
          : butState === "showless"
          ? "Show less"
          : butState === "showall"
          ? "Show all"
          : butState === "hideall"
          ? "Hide all"
          : butState === "expanded"
          ? "Show less"
          : butState === "hidden"
          ? "Show more"
          : "None"}
      </Button>
    </div>
  );
};

const Button = ({ children, click, className }) => {
  return (
    <button onClick={click} className={className}>
      {children}
    </button>
  );
};

export default App;
