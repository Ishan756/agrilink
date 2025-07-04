'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Star, MapPin, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/lib/store/cart';
import { toast } from 'sonner';
import Image from 'next/image';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: { current: number; base: number };
    image: string;
    category: string;
    farmer: { name: string; rating: number };
    stock: { quantity: number; unit: string };
    specifications: { organic: boolean; grade?: string };
    location: { region: string };
    averageRating: number;
  };
  viewMode?: 'grid' | 'list';
}

export function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price.current,
      image: product.image,
      unit: product.stock.unit,
      farmerId: product.farmer.name, // In real app, this would be farmer ID
      farmerName: product.farmer.name
    });
    toast.success(`${product.name} added to cart!`);
  };

  const discountPercent = Math.round(((product.price.base - product.price.current) / product.price.base) * 100);

  if (viewMode === 'list') {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="flex">
          <div className="w-48 h-32 flex-shrink-0">
            <Image
              width={192}
              height={128}
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="flex-1 p-4">
            <div className="flex justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-semibold text-lg hover:text-primary cursor-pointer">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className="shrink-0"
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.averageRating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="h-3 w-3" />
                    <span>{product.location.region}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Truck className="h-3 w-3" />
                    <span>2-day delivery</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">
                      ${product.price.current}/{product.stock.unit}
                    </span>
                    {discountPercent > 0 && (
                      <>
                        <span className="text-sm text-gray-500 line-through">
                          ${product.price.base}
                        </span>
                        <Badge variant="destructive" className="text-xs">
                          {discountPercent}% OFF
                        </Badge>
                      </>
                    )}
                  </div>
                  <Button onClick={handleAddToCart} size="sm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <div className="aspect-square overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.specifications.organic && (
            <Badge className="bg-green-600">Organic</Badge>
          )}
          {discountPercent > 0 && (
            <Badge variant="destructive">{discountPercent}% OFF</Badge>
          )}
        </div>

        {/* Like Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <Link href={`/products/${product.id}`}>
              <h3 className="font-semibold text-lg hover:text-primary cursor-pointer line-clamp-1">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{product.averageRating}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{product.location.region}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-primary">
                  ${product.price.current}
                </span>
                {discountPercent > 0 && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.price.base}
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-500">per {product.stock.unit}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-gray-600">
              by {product.farmer.name}
            </span>
            <Button onClick={handleAddToCart} size="sm" className="w-full">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
           <Link
      href={`/chart/${product.id}`}
      className="block mt-2"
    >
      <Button variant="outline" size="sm" className="w-full">
        📈 View Price Chart
      </Button>
    </Link>
        </div>
      </CardContent>
    </Card>
  );
}