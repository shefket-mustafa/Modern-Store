import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import type { Size } from '../types';
import { useToast } from '../hooks/use-toast';
import { mockProducts } from '../data/mockProducts';
import { Button } from '../components/ui/button';

interface ProductDetailProps {
  onAddToCart: (productId: string, size: Size, quantity: number) => void;
}

export const ProductDetail = ({ onAddToCart }: ProductDetailProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const product = mockProducts.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: 'Please select a size',
        variant: 'destructive',
      });
      return;
    }

    onAddToCart(product.id, selectedSize, quantity);
    toast({
      title: 'Added to cart',
      description: `${product.name} (${selectedSize}) x${quantity}`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
              {product.category} • {product.subcategory.replace('-', ' ')}
            </p>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
          </div>

          <div>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Select Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? 'default' : 'outline'}
                  onClick={() => setSelectedSize(size)}
                  className="min-w-[60px]"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Quantity</h3>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>

          <Button
            size="lg"
            className="w-full"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>
    </div>
  );
};
