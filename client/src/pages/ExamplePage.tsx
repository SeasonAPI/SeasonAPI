import { FC } from "react";
import "./examplePage.css";

const ExamplePage: FC = (props) => {
  return (
    <div className="app">
      <form action="/example/season" method="get">
        <div className="form-item">
          <label htmlFor="pole" className="pole">
            Pole:{" "}
          </label>
          <input
            className="poleInput"
            placeholder="Enter your pole here"
            type="text"
            name="pole"
          />
        </div>
      </form>
    </div>
  );
};

export default ExamplePage;
