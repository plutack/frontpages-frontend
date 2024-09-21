import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

// Define the types based on the updated schema
type SearchResultItem = {
  title: string;
  link: string;
  snippet: string;
  tags: string[];
};

type HeadlineData = {
  headline: string;
  result: SearchResultItem[];
};

type NewspaperData = {
  success: boolean;
  data: {
    name: string;
    date: string;
    searchResult: HeadlineData[];
  };
};

const fetchNewspaperDetails = async (id: string): Promise<NewspaperData> => {
  const response = await fetch(`http://localhost:5000/newspapers/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch newspaper details');
  }
  return response.json();
};

const NewspaperDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useQuery<NewspaperData, Error>({
    queryKey: ['newspaperDetail', id],
    queryFn: () => fetchNewspaperDetails(id!),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">Error: {error.message}</div>;
  }

  if (!data || !data.success || !data.data) {
    console.log(data);
    return <div className="text-center mt-8">No data available for this newspaper.</div>;
  }

  const { name, date, searchResult } = data.data;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2 text-center">{name}</h1>
      <h2 className="text-xl mb-6 text-center text-gray-600">{date}</h2>

      <Accordion type="single" collapsible className="w-full">
        {searchResult.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg font-semibold">
              {item.headline}
            </AccordionTrigger>
            <AccordionContent>
              {item.result.map((result, resultIndex) => (
                <Card key={resultIndex} className="mb-4">
                  <CardHeader>
                    <CardTitle>
                      <a href={result.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {result.title}
                      </a>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2">{result.snippet}</p>
                    <div className="flex flex-wrap gap-2">
                      {result.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default NewspaperDetail;