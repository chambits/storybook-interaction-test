import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import type { MenuItem } from "@/types";

interface MenuProps {
  menu: MenuItem[];
}

export default function Menu({ menu }: MenuProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Menu</h2>
        <Badge variant="outline" className="px-3 py-1">
          {menu.length} Items
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {menu.map((item, index) => (
          <Card key={index}>
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <span className="font-medium">${item.price.toFixed(2)}</span>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
