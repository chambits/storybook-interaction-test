import { CardContent } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";
import type { Review } from "@/types";

interface ReviewProps {
  reviews: Review[];
}
export const Reviews = ({ reviews }: ReviewProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <Badge variant="outline" className="px-3 py-1">
          {reviews.length} Reviews
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {reviews.map((review, index) => (
          <Card key={index}>
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{review.author}</CardTitle>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-current text-yellow-500 mr-1" />
                  <span>{review.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
