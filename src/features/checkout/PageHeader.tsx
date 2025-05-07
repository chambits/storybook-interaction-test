import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  onGoBack: () => void;
}

export function PageHeader({ onGoBack }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-3xl font-bold">Checkout</h2>
      <Button variant="outline" onClick={onGoBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
    </div>
  );
}
