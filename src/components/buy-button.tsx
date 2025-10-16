"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart } from "lucide-react";

interface BuyButtonProps {
  bookTitle: string;
}

export default function BuyButton({ bookTitle }: BuyButtonProps) {
  const { toast } = useToast();

  const handlePurchase = () => {
    toast({
      title: "Purchase Successful!",
      description: `You've purchased "${bookTitle}". It has been sent to your Kindle.`,
    });
  };

  return (
    <Button size="lg" className="w-full" onClick={handlePurchase}>
      <ShoppingCart className="mr-2 h-5 w-5" /> One-Click Purchase
    </Button>
  );
}
