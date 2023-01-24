import React, { useState, useEffect, FC } from "react";
import "./blinkingCaret.css";

interface BlinkingCaretProps {
  caretPosition: number;
}

const BlinkingCaret: FC<BlinkingCaretProps> = (props: any) => {
  const [animation, setAnimation] = useState("blink 1s ease-in-out infinite");
  const caretPosition = props.caretPosition;

  return (
    <div className="cursor-caret">
      <div
        className={`caret ${animation ? "visible" : "hidden"}`}
        style={{
          position: "absolute",
          left: `${caretPosition}ch`,
          top: "-115px",
          animation: animation,
        }}
      >
        |
      </div>
    </div>
  );
};
export default BlinkingCaret;
