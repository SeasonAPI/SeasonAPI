import React, { FC, Suspense } from "react";
import "./fetchSeason.css";
import useSWR from "swr";
import { useSearchParams, useLocation } from "react-router-dom";

const fetcher = async (...args: any) => {
  const res = await fetch.apply(null, args);

  const data = res.json();
  return data;
};
const FetchSeason: FC = (props) => {
  let location = useLocation();
  let searchParams = new URLSearchParams(location.search);
  let Pole = searchParams.get("pole");

  const pole = Pole?.toLowerCase();

  const { data, error } = useSWR(
    `https://seasonapi.iamsohom829.repl.co/api/get-current-season/?api_key=da768dcebb706dd028da555a79308766ece0ef364641115ed6f1be9b96cf406c&country=bd&pole=${pole}`,
    fetcher,
    { suspense: true }
  );

  if (!data?.season && data?.message) {
    return (
      <h1>
        {data?.message} & Status {data?.status}
      </h1>
    );
  }
  if (error) {
    return <h1>There was an error</h1>;
  }
  return (
    <div className="SeasonComponent">
      <h1 className="text">
        Current Season: <a>a</a>
      </h1>
      <h2 className="season-now">{data?.season}</h2>
      <h3 className="footer">{data?.footer}</h3>
    </div>
  );
};

export { FetchSeason };
