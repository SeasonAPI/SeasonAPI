import { FC, useState } from "react";
import NavigationBar from "../components/navigation";
import "./GetAPIKeyPage.css";

const GetAPIKeyPage: FC = (props) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="GetAPIKeyPage">
      <NavigationBar />
      <h1 className="text1">SeasonAPI Key Generator</h1>
      <p className="text2">
        Fill the form below and click the button to get yourself a nice valid
        API Key.
      </p>

      <form method="post" action="/api/keys">
        <div className="form-item">
          <label htmlFor="name" className="Label1">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="Input1"
            placeholder="i.e: Joe"
            required
          />
        </div>
        <button type="submit" className="Button1">
          Get Key
        </button>
      </form>
    </div>
  );
};

export default GetAPIKeyPage;
