import { FC } from "react";
import "./docs.css";

const DocumentationPage: FC = (props) => {
  let api_key: string = "{api_key}";
  let pole: string = "{pole}";
  let country: string = "{country}";
  let month: string = "{month}";
  return (
    <div className="docs-page">
      <div className="contents">
        <h1>API Documentation</h1>
        <div className="api-section">
          <h2>Endpoints</h2>
          <div className="endpoint">
            <div className="endpoint-name">
              GET
              <code>
                /api/get-current-season/?api_key={api_key}&pole=${pole}&country=
                {country}
              </code>
            </div>
            <div className="endpoint-description">Get the current season</div>
            <table className="endpoint-parameters">
              <tr>
                <th>Parameter</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
              <tr>
                <td>api_key</td>
                <td>string</td>
                <td>The API Key.</td>
              </tr>
              <tr>
                <td>pole</td>
                <td>string</td>
                <td>The pole you want to get season for.</td>
              </tr>
              <tr>
                <td>country</td>
                <td>string</td>
                <td>The country you want to get season for.</td>
              </tr>
            </table>
          </div>
          <div className="endpoint">
            <div className="endpoint-name">
              GET /api/get-season/custom/?api_key={api_key}&month={month}
              &country=
              {country}
            </div>
            <div className="endpoint-description">
              Get season from specified month and country
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
