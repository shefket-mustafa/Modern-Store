import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ShoppingCart, Eye } from 'lucide-react';
import type { Product, Size } from '../types';
import { useToast } from '../hooks/use-toast';
import { Card, CardContent, CardFooter } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';


interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string, size: Size, quantity: number) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedSize) {
      toast({
        title: 'Please select a size',
        variant: 'destructive',
      });
      return;
    }

    onAddToCart(product.id, selectedSize, 1);
    toast({
      title: 'Added to cart',
      description: `${product.name} (${selectedSize})`,
    });
    // setSelectedSize(null);
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300  border-border/50">
      <div 
        className="aspect-square overflow-hidden cursor-pointer relative"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110  transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0  hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
      </div>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
          {product.category} • {product.subcategory.replace('-', ' ')}
        </p>
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        <Select value={selectedSize || undefined} onValueChange={(value) => setSelectedSize(value as Size)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            {product.sizes.map((size) => (
              <SelectItem key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-2 w-full">
          <Button 
            variant="outline"
            className="flex-1 cursor-pointer hover:bg-black hover:text-white transition-colors duration-300"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <Eye className="h-4 w-4 mr-2" />
            Details
          </Button>
          <Button 
          variant="outline"
            className="flex-1 hover:bg-black hover:text-white cursor-pointer transition-colors duration-300"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
