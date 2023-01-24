import { FC, useState } from "react";
import BlinkingCaret from "../components/blinkingCaret";
import NavigationBar from "../components/navigation";
import "./examplePage.css";

const ExamplePage: FC = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [caretPosition, setCaretPosition] = useState(inputValue.length);
  const handleChange = (event: any) => {
    let caretPosition = event.target.selectionStart;
    setCaretPosition(caretPosition);
  };
  const [isFocus, setIsFocus] = useState(false);
  const handleFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    setIsFocus(false);
  };

  return (
    <div className="app">
      <NavigationBar />
      <form action="/example/season" method="get">
        <div className="form-item">
          <label htmlFor="pole" className="pole">
            Pole:{" "}
          </label>
          <input
            className="poleInput"
            placeholder="Enter your pole here"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text"
            name="pole"
          />
        </div>
      </form>
      <BlinkingCaret caretPosition={caretPosition} />
    </div>
  );
};

export default ExamplePage;
