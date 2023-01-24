import "../App.css";
import NavigationBar from "../components/navigation";

function MainPage() {
  return (
    <div className="App">
      <div className="contents">
        <NavigationBar />
        <div className="imgs">
          <img
            className="img1"
            alt="bg"
            src="https://cdn.discordapp.com/attachments/999649912511807552/1063392620895809618/147-1477581_clip-art-green-ball-removebg-preview.png"
          />
          <img
            className="img2"
            alt="bg2"
            src="https://cdn.discordapp.com/attachments/999649912511807552/1063394075174248508/red-circle-removebg-preview.png"
          />
        </div>
        <div className="texts">
          <div className="sapi">
            <h1 className="sapi-text">SeasonAPI</h1>
            <h1 className="sapi-desc">Always get the current season</h1>
          </div>
        </div>
        <div className="buttons">
          <a href="/api/keys">
            <button className="gapikey" type="button">
              Get API Key
            </button>
          </a>
          <a href="/docs">
            <button className="docs" type="button">
              Documentation
            </button>
          </a>
          <a href="/example">
            <button className="demo" type="button">
              Demo
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
