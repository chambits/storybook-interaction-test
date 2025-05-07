// src/features/restaurants/Menu.tsx
import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import { CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Minus, Plus } from "lucide-react";
import type { MenuItem, Restaurant } from "@/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface OrderItem extends MenuItem {
  quantity: number;
}

interface MenuProps {
  restaurant: Restaurant;
}

export default function Menu({ restaurant }: MenuProps) {
  const { menu, id, name } = restaurant;
  const navigate = useNavigate();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const addItemToOrder = (item: MenuItem) => {
    setOrderItems((prev) => {
      const existingItem = prev.find(
        (orderItem) => orderItem.name === item.name
      );

      if (existingItem) {
        return prev.map((orderItem) =>
          orderItem.name === item.name
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const removeItemFromOrder = (item: MenuItem) => {
    setOrderItems((prev) => {
      const existingItem = prev.find(
        (orderItem) => orderItem.name === item.name
      );

      if (existingItem && existingItem.quantity > 1) {
        return prev.map((orderItem) =>
          orderItem.name === item.name
            ? { ...orderItem, quantity: orderItem.quantity - 1 }
            : orderItem
        );
      } else {
        return prev.filter((orderItem) => orderItem.name !== item.name);
      }
    });
  };

  const getItemQuantity = (item: MenuItem): number => {
    const orderItem = orderItems.find(
      (orderItem) => orderItem.name === item.name
    );
    return orderItem ? orderItem.quantity : 0;
  };

  const calculateTotal = (): number => {
    return orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handlePlaceOrder = () => {
    if (orderItems.length === 0) {
      alert("Please select at least one item");
      return;
    }

    // Store order in sessionStorage
    sessionStorage.setItem(
      "currentOrder",
      JSON.stringify({
        restaurantId: id,
        restaurantName: name,
        items: orderItems,
        total: calculateTotal(),
      })
    );

    navigate("/checkout");
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Menu</CardTitle>
          <Badge variant="outline" className="px-3 py-1">
            {menu.length} Items
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {menu.map((item, index) => {
            const quantity = getItemQuantity(item);

            return (
              <div
                key={index}
                className="flex justify-between items-center p-3 border-b last:border-0"
                data-testid={`menu-item-${index}`}
              >
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                  <p className="font-medium mt-1">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={quantity === 0}
                    onClick={() => removeItemFromOrder(item)}
                    data-testid={`decrease-${index}`}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span data-testid={`quantity-${index}`}>{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addItemToOrder(item)}
                    data-testid={`increase-${index}`}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div>
          <p className="text-muted-foreground">
            {orderItems.length > 0
              ? `${orderItems.reduce(
                  (total, item) => total + item.quantity,
                  0
                )} items selected`
              : "No items selected"}
          </p>
          {orderItems.length > 0 && (
            <p className="font-bold text-lg">
              Total: ${calculateTotal().toFixed(2)}
            </p>
          )}
        </div>
        <Button
          onClick={handlePlaceOrder}
          className="gap-2"
          disabled={orderItems.length === 0}
          data-testid="place-order-button"
        >
          <ShoppingBag className="h-5 w-5" />
          Place Order
        </Button>
      </CardFooter>
    </Card>
  );
}
