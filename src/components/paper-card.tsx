import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { PaperDetailsType } from "@/types";

function PaperCard(paper: PaperDetailsType) {
  return (
    <Card>
      <CardContent>
        <img src={paper.paperLink} alt={paper.paperName} />
      </CardContent>
      <CardFooter>
        <CardDescription>{paper.paperName}</CardDescription>
      </CardFooter>
    </Card>
  );
}

export default PaperCard;
