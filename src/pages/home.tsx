import PaperDetails from "@/components/paper-details";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { PaperDetailsType } from "@/types";

const FOUR_HOURS_IN_MS = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
const REFRESH_BUFFER = 5 * 60 * 1000; // 5 minutes buffer

const fetchPapers = async (): Promise<{
  papers: PaperDetailsType[];
  timestamp: number;
}> => {
  const response = await fetch("your-api-endpoint");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const papers = await response.json();
  return { papers, timestamp: Date.now() };
};

function Home() {
  const { data, isLoading, error, refetch, dataUpdatedAt } = useQuery({
    queryKey: ["papers"],
    queryFn: fetchPapers,
    staleTime: FOUR_HOURS_IN_MS - REFRESH_BUFFER,
    gcTime: FOUR_HOURS_IN_MS,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    initialDataUpdatedAt() {
      return Date.now() - FOUR_HOURS_IN_MS;
    },
  });

  const [lastUpdateTime, setLastUpdateTime] = useState<number | null>(null);

  useEffect(() => {
    if (dataUpdatedAt) {
      setLastUpdateTime(dataUpdatedAt);
    }
  }, [dataUpdatedAt]);

  useEffect(() => {
    const checkForUpdate = () => {
      if (lastUpdateTime) {
        const timeSinceLastUpdate = Date.now() - lastUpdateTime;
        if (timeSinceLastUpdate >= FOUR_HOURS_IN_MS - REFRESH_BUFFER) {
          refetch();
        }
      }
    };

    const intervalId = setInterval(checkForUpdate, REFRESH_BUFFER);
    return () => clearInterval(intervalId);
  }, [lastUpdateTime, refetch]);

  const handleManualRefresh = () => {
    refetch();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <h1>Papers</h1>
      <Button onClick={handleManualRefresh}>Refresh Papers</Button>
      {lastUpdateTime && (
        <p>Last updated: {new Date(lastUpdateTime).toLocaleString()}</p>
      )}
      <div className="paper-grid">
        {data?.papers.map((paper) => (
          <PaperDetails
            key={paper.paperName}
            paperName={paper.paperName}
            paperLink={paper.paperLink}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;