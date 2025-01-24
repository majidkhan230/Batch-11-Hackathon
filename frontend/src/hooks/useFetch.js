import { getReq } from "@/api";
import { useEffect, useState } from "react";

export const useFetch = (url, dependencies = []) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      try {
        const res = await getReq(url);
        setData(res?.data || null);
        setError(null); 
      } catch (error) {
        setError(error.message || "An error occurred");
        setData(null); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, ...dependencies]);

  return { data, loading, error };
};
