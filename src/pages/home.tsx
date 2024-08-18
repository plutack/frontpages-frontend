// import { useQuery } from "@tanstack/react-query";
// import { Button } from "@/components/ui/button";
// import { useState, useEffect } from "react";
import { useState } from "react";
import { PaperDetailsType } from "@/types";
import PaperCard from "@/components/paper-card";
import { Loader2 } from "lucide-react";

// const FOUR_HOURS_IN_MS = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
// const REFRESH_BUFFER = 5 * 60 * 1000; // 5 minutes buffer

// const fetchPapers = async (): Promise<{
//   papers: PaperDetailsType[];
//   timestamp: number;
// }> => {
//   const response = await fetch("http://localhost:8000/api/today");
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   const papers = await response.json();
//   return { papers, timestamp: Date.now() };
// };

// Add this dummy data array
const dummyPapers: PaperDetailsType[] = [
  {
    paperName: "Advances in Quantum Computing",
    paperLink:
      "https://res.cloudinary.com/ds7ljkyco/image/upload/v1723976519/guardian-18-08-2024.jpg",
  },
  {
    paperName: "Machine Learning in Healthcare",
    paperLink:
      "https://res.cloudinary.com/ds7ljkyco/image/upload/v1723976542/vanguard-18-08-2024.png",
  },
  {
    paperName: "Sustainable Energy Technologies",
    paperLink:
      "https://res.cloudinary.com/ds7ljkyco/image/upload/v1723976542/vanguard-18-08-2024.png",
  },
  {
    paperName: "Artificial Intelligence Ethics",
    paperLink:
      "https://res.cloudinary.com/ds7ljkyco/image/upload/v1723976528/tribune-18-08-2024.jpg",
  },
  {
    paperName: "Blockchain Applications in Finance",
    paperLink:
      "https://res.cloudinary.com/ds7ljkyco/image/upload/v1723976542/vanguard-18-08-2024.png",
  },
];

function Home() {
  // Comment out the useQuery hook
  /*
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
  */

  // Use useState with dummy data instead
  // const [papers, setPapers] = useState<PaperDetailsType[]>(dummyPapers);
  const [papers] = useState<PaperDetailsType[]>(dummyPapers);

  // Comment out the useEffect hooks and handleManualRefresh function
  /*
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
  */

  // Keep the loading and error states for consistency
  const isLoading = false;
  // const error = null;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-48 h-48 animate-spin" />
      </div>
    );
  // if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <h1>Papers</h1>
      {/* Comment out the Refresh button and last updated time */}
      {/*
      <Button onClick={handleManualRefresh}>Refresh Papers</Button>
      {lastUpdateTime && (
        <p>Last updated: {new Date(lastUpdateTime).toLocaleString()}</p>
      )}
      */}
      <h1>Today's Papers</h1>
      <div className="grid  gap-4 md:grid-cols-2 lg:grid-cols-3">
        {papers.map((paper) => (
          <PaperCard key={paper.paperName} {...paper} />
        ))}
      </div>
    </div>
  );
}

export default Home;
