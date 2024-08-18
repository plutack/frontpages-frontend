import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { PaperDetailsType } from "@/types";
import PaperCard from "@/components/paper-card";
import { Loader2 } from "lucide-react";

const FOUR_HOURS_IN_MS = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
const REFRESH_BUFFER = 5 * 60 * 1000; // 5 minutes buffer

const fetchPapers = async (): Promise<{
  papers: PaperDetailsType[];
  timestamp: number;
}> => {
  const response = await fetch(`${process.env.API_URL}/today`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  console.log("API response:", data);
  if (data.success === false) {
    throw new Error(data.message);
  }
  if (!data.papers || !Array.isArray(data.papers)) {
    throw new Error("Invalid data format");
  }
  return data;
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

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-15 h-15 animate-spin" />
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 flex justify-center">
        {error instanceof Error ? error.message : "Something went wrong"}
      </div>
    );

  if (!data || !data.papers || data.papers.length === 0) {
    return <div>No papers available at the moment.</div>;
  }

  return (
    <div>
      <Button onClick={handleManualRefresh}>Refresh Papers</Button>
      {lastUpdateTime && (
        <p>Last updated: {new Date(lastUpdateTime).toLocaleString()}</p>
      )}

      <h1>Today's Papers</h1>
      <div className="grid gap-4 items-center justify-center md:grid-cols-2 lg:grid-cols-3">
        {data.papers.map((paper) => (
          <PaperCard key={paper.paperName} {...paper} />
        ))}
      </div>
    </div>
  );
}

export default Home;
