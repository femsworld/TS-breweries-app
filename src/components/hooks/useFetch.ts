import { useEffect, useState } from "react";
import { BreweryPage } from "../Details";

interface FetchProps {
  url: string;
}

interface errorState {
  message: string;
}

export const useFetch = ({url}: FetchProps) => {
  const [breweries, setBreweries] = useState<BreweryPage>();
  const [error, setError] = useState<errorState>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(response => response.json())
       
      .then(data => {
        data.length ? setBreweries(data) : setError(data)
      })
      
      .finally(() => setLoading(false));
  }, [url]);

  return { breweries, error, loading};
};