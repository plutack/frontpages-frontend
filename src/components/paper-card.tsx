import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { PaperDetailsType } from "@/types";

function PaperCard(paper: PaperDetailsType) {
  const getPaperDisplayName = (name: string): string => {
    switch (name) {
      case "guardian":
        return "The Guardian";
      case "tribune":
        return "Tribune";
      case "daily_trust":
        return "Daily Trust";
      case "vanguard":
        return "Vanguard";
      default:
        return name.charAt(0).toUpperCase() + name.slice(1).replace(/_/g, " ");
    }
  };

  return (
    <Card>
      <CardContent>
        <img src={paper.link} alt={paper.name} />
      </CardContent>
      <CardFooter className="flex justify-center">
        <CardDescription className="text-center w-full">
          {getPaperDisplayName(paper.name)}
        </CardDescription>
      </CardFooter>
    </Card>
  );
}

export default PaperCard;