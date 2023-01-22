import { FC, Suspense } from "react";
import { FetchSeason } from "../components/fetchSeason";
const ShowExample: FC = (props) => {
  return (
    <div className="showExample">
      <Suspense fallback={<h1>Loading Data</h1>}>
        <FetchSeason />
      </Suspense>
    </div>
  );
};

export default ShowExample;
