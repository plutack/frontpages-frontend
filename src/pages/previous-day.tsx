import { useQuery } from "@tanstack/react-query";
import { PaperDetailsType } from "@/types";
import PaperCard from "@/components/paper-card";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const getYesterdayDate = () => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };

const fetchPapers = async (): Promise<PaperDetailsType[]> => {
  const baseUrl = "https://frontpagesapi.talut.tech";
  const response = await fetch(`${baseUrl}/newspapers?date=${getYesterdayDate()}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  if (!data.success) {
    throw new Error("API request was not successful");
  }
  if (!Array.isArray(data.result)) {
    throw new Error("Invalid data format");
  }
  return data.result;
};





function Yesterday() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["papers"],
    queryFn: fetchPapers,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-15 h-15 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 flex flex-col items-center justify-center h-screen">
        Something went wrong. Please try again later.
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-screen">
        <p>No papers available at the moment.</p>
      </div>
    );
  }
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Yesterday's Papers</h1>
      <div className="grid gap-4 items-center justify-center md:grid-cols-2 lg:grid-cols-3">
        {data.map((paper) => (
          <Link key={paper.id} to={`/newspapers/${paper.id}`} className="no-underline">
            <div className="cursor-pointer transition-transform hover:scale-105">
              <PaperCard {...paper} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Yesterday;