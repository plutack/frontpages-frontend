import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { PaperDetailsType } from "@/types";

function PaperDetails({ paperName, paperLink }: PaperDetailsType) {
  return (
    <Card>
      <CardContent>
        <img src={paperLink} alt={paperName} />
      </CardContent>
      <CardFooter>
        <CardTitle>{paperName}</CardTitle>
      </CardFooter>
    </Card>
  );
}

export default PaperDetails;
