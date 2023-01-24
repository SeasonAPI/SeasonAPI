import { FC, useState } from "react";
import "./navigation.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faEllipsisV);

const NavigationBar: FC = (props) => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <>
      <div className="nav">
        <div className={`nav-container ${isNavVisible ? "show" : ""}`}>
          <a href="/">Home</a>
          <a href="/example">Demo</a>
          <a href="/docs">Documentation</a>
        </div>
        <div
          className={`nav-toggle ${isNavVisible ? "hide" : ""}`}
          onClick={toggleNav}
        >
          <FontAwesomeIcon icon={faEllipsisV} className="icon" />
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
