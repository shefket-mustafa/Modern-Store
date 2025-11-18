import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import type { Product, Size } from '../types';
import { useToast } from '../hooks/use-toast';
import { Button } from '../components/ui/button';
import { useUser } from '../hooks/useUser';

interface ProductDetailProps {
  onAddToCart: (product: Product, size: Size, quantity: number) => void;
}

export const ProductDetail = ({ onAddToCart }: ProductDetailProps) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const {user} = useUser()
  
  useEffect(() => {
    const fetchDetails = async() => {
      try{
        const response = await fetch(`${BASE_URL}/items/${id}`)
        const data = await response.json();
        setProduct(data);
      }catch(err){
        console.error("Failed to load item details: ", err)
      }
    }

    fetchDetails()
  },[BASE_URL, id]);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button
        className='cursor-pointer border'
        onClick={() => navigate('/')}
        >Back to Home</Button>
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

     if(!user){
      setSelectedSize(null);
      toast({
        title: 'Please login to add items to cart',
        variant: 'destructive',
      });
      return;
    }

    onAddToCart(product, selectedSize, quantity);
    toast({
      title: 'Added to cart',
      description: `${product.name} (${selectedSize}) x${quantity}`,
    });
    setSelectedSize(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6 cursor-pointer border hover:bg-black hover:text-white transition-colors duration-300"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square overflow-hidden rounded-lg">
          <img
            src={product.imageUrl}
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
                  className={`min-w-[60px] cursor-pointer ${selectedSize === size ? "bg-black text-white" : ""} hover:bg-black hover:text-white transition-colors duration-300`}
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
              className='cursor-pointer hover:bg-black hover:text-white transition-colors duration-300'
                variant="outline"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
              <Button
              className='cursor-pointer hover:bg-black hover:text-white transition-colors duration-300'
                variant="outline"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>

          <Button
            size="lg"
            className="cursor-pointer border hover:bg-black hover:text-white transition-colors duration-300"
            onClick={handleAddToCart}
            disabled={product.stockQuantity <= 0}
          >
            {product.stockQuantity > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>
    </div>
  );
};
