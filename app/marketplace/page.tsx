'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ProductCard } from '@/components/marketplace/product-card';
import { FilterSidebar } from '@/components/marketplace/filter-sidebar';


const mockProducts = [
  {
    _id: "1",
    name: "Organic Carrots",
    description: "Crisp, sweet carrots grown in nutrient-rich soil.",
    price: { current: 2.99, base: 3.49 },
    image: "https://images.pexels.com/photos/1431335/pexels-photo-1431335.jpeg?auto=compress&w=400",
    category: "vegetables",
    farmer: { name: "Root & Branch Farm", rating: 4.5 },
    stock: { quantity: 60, unit: "lbs" },
    specifications: { organic: true, grade: "A" },
    location: { region: "Colorado" },
    averageRating: 4.4,
  },
  {
    _id: "2",
    name: "Golden Sweet Corn",
    description: "Fresh, juicy corn harvested this morning.",
    price: { current: 1.99, base: 2.49 },
    image: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=400",
    category: "vegetables",
    farmer: { name: "Sunny Fields Farm", rating: 4.8 },
    stock: { quantity: 120, unit: "lbs" },
    specifications: { organic: true, grade: "A" },
    location: { region: "Iowa" },
    averageRating: 4.7,
  },
  {
    _id: "3",
    name: "Red Apples",
    description: "Crisp, juicy apples from the orchard.",
    price: { current: 3.49, base: 3.99 },
    image: "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&w=400",
    category: "fruits",
    farmer: { name: "Apple Valley", rating: 4.6 },
    stock: { quantity: 80, unit: "lbs" },
    specifications: { organic: false, grade: "B" },
    location: { region: "Washington" },
    averageRating: 4.5,
  },
 
];
// Remove mockProducts and use API data

export default function MarketplacePage() {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<any>({});

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        const combined = [...mockProducts, ...(Array.isArray(data) ? data : [])];
        setAllProducts(combined);
        setProducts(combined);
      });
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterProducts({ ...activeFilters, search: query });
  };

  const handleSort = (sortValue: string) => {
    setSortBy(sortValue);
    const sorted = [...products].sort((a, b) => {
      switch (sortValue) {
        case 'price-low':
          return a.price.current - b.price.current;
        case 'price-high':
          return b.price.current - a.price.current;
        case 'rating':
          return b.averageRating - a.averageRating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
    setProducts(sorted);
  };  
 const filterProducts = (filters: any) => {
  let filtered = [...allProducts];

  // Multiple categories
  if (filters.category && Array.isArray(filters.category) && filters.category.length > 0) {
    filtered = filtered.filter(p => filters.category.includes(p.category.toLowerCase()));
  }

  // Multiple regions
  if (filters.region && Array.isArray(filters.region) && filters.region.length > 0) {
    filtered = filtered.filter(p => filters.region.includes(p.location.region.toLowerCase()));
  }

  // Organic
  if (filters.organic !== undefined) {
    filtered = filtered.filter(p => p.specifications.organic === filters.organic);
  }

  // Price range
  if (filters.priceRange && Array.isArray(filters.priceRange)) {
    filtered = filtered.filter(
      p => p.price.current >= filters.priceRange[0] && p.price.current <= filters.priceRange[1]
    );
  }

  // Search
  if (filters.search) {
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.category.toLowerCase().includes(filters.search.toLowerCase())
    );
  }

  setProducts(filtered);
  setActiveFilters(filters);
};
  useEffect(() => {
  fetch("/api/products")
    .then((res) => res.json())
    .then((data) => {
      // Always show mockProducts + DB products
      const combined = [...mockProducts, ...(Array.isArray(data) ? data : [])];
      setAllProducts(combined);
      setProducts(combined);
    });
}, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketplace</h1>
          <p className="text-gray-600">Discover fresh, quality produce from local farmers</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
          <Select onValueChange={handleSort} value={sortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>

            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'} w-full lg:w-64 shrink-0`}>
            <FilterSidebar
            allProducts={allProducts}
            onFilter={filterProducts}
            activeFilters={activeFilters}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Showing {products.length} products
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Fresh Today</Badge>
                <Badge variant="outline">Local Farmers</Badge>
              </div>
            </div>

        {products.length === 0 ? (
  <Card className="p-8 text-center">
    <CardContent>
      <p className="text-gray-500 mb-4">No products found matching your search.</p>
      <Button onClick={() => handleSearch('')}>Clear Search</Button>
    </CardContent>
  </Card>
) : (
  <div className={
    viewMode === 'grid' 
      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
      : 'space-y-4'
  }>
    {products.map((product) => (
      <ProductCard
        key={product._id || product.id}
        product={product}
        viewMode={viewMode}
      />
    ))}
  </div>
)}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}