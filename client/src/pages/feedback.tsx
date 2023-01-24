import { FC } from "react";
import "./feedback.css";
const FeedbackPage: FC = (props) => {
  return (
    <div className="feedback">
      <div className="feedback-contents">
        <form action="/feedback/successful" method="get">
          <div className="form-item">
            <label htmlFor="name-input" className="name">
              Name
            </label>
            <input
              className="name-input"
              id="name-input"
              type="text"
              placeholder="i.e: Joe"
              required
            ></input>
          </div>
          <div className="form-item">
            <label htmlFor="comment-area" className="comment">
              Comment
            </label>
            <div className="comment-position">
              <textarea
                className="comment-area"
                id="comment-area"
                placeholder="it is good..."
                required
                rows={6}
                cols={50}
              ></textarea>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;
