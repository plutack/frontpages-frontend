import { useQuery } from "@tanstack/react-query";
import { PaperDetailsType } from "@/types";
import PaperCard from "@/components/paper-card";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const fetchPapers = async (): Promise<PaperDetailsType[]> => {
  const baseUrl = "http://localhost:5000";
  const response = await fetch(`${baseUrl}/newspapers`);
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

function Home() {
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
      <div className="text-red-500 flex justify-center">
        {error instanceof Error ? error.message : "Something went wrong"}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <div className="text-center mt-8">No papers available at the moment.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Today's Papers</h1>
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

export default Home;