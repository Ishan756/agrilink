'use client';

import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export function FilterSidebar({
  allProducts,
  onFilter,
  activeFilters,
}: {
  allProducts: any[];
  onFilter: (filters: any) => void;
  activeFilters: any;
}) {
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  const categories = [
    { id: 'vegetables', label: 'Vegetables', count: 156 },
    { id: 'fruits', label: 'Fruits', count: 89 },
    { id: 'grains', label: 'Grains & Cereals', count: 45 },
    { id: 'dairy', label: 'Dairy Products', count: 32 },
    { id: 'herbs', label: 'Herbs & Spices', count: 28 },
    { id: 'nuts', label: 'Nuts & Seeds', count: 21 }
  ];

  const attributes = [
    { id: 'organic', label: 'Organic Certified' },
    { id: 'local', label: 'Local (< 50 miles)' },
    { id: 'seasonal', label: 'In Season' },
    { id: 'pesticide-free', label: 'Pesticide Free' },
    { id: 'non-gmo', label: 'Non-GMO' },
    { id: 'heirloom', label: 'Heirloom Varieties' }
  ];

  const regions = [
    { id: 'california', label: 'California' },
    { id: 'oregon', label: 'Oregon' },
    { id: 'washington', label: 'Washington' },
    { id: 'texas', label: 'Texas' },
    { id: 'florida', label: 'Florida' },
    { id: 'new-york', label: 'New York' }
  ];

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    }
  };

  const handleAttributeChange = (attributeId: string, checked: boolean) => {
    if (checked) {
      setSelectedAttributes([...selectedAttributes, attributeId]);
    } else {
      setSelectedAttributes(selectedAttributes.filter(id => id !== attributeId));
    }
  };

  const handleRegionChange = (regionId: string, checked: boolean) => {
    if (checked) {
      setSelectedRegions([...selectedRegions, regionId]);
    } else {
      setSelectedRegions(selectedRegions.filter(id => id !== regionId));
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedAttributes([]);
    setSelectedRegions([]);
    setPriceRange([0, 50]);
  };

useEffect(() => {
  onFilter({
    category: selectedCategories, // always array
    region: selectedRegions.map(r => r.toLowerCase()), // always array, lowercase for matching
    organic: selectedAttributes.includes('organic') ? true : undefined,
    priceRange,
  });
}, [selectedCategories, selectedAttributes, selectedRegions, priceRange]);

  const activeFiltersCount = selectedCategories.length + selectedAttributes.length + selectedRegions.length;

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Active Filters</CardTitle>
              <button
                onClick={clearAllFilters}
                className="text-xs text-primary hover:underline"
              >
                Clear All
              </button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map(categoryId => {
                const category = categories.find(c => c.id === categoryId);
                return (
                  <Badge key={categoryId} variant="secondary" className="text-xs">
                    {category?.label}
                  </Badge>
                );
              })}
              {selectedAttributes.map(attributeId => {
                const attribute = attributes.find(a => a.id === attributeId);
                return (
                  <Badge key={attributeId} variant="secondary" className="text-xs">
                    {attribute?.label}
                  </Badge>
                );
              })}
              {selectedRegions.map(regionId => {
                const region = regions.find(r => r.id === regionId);
                return (
                  <Badge key={regionId} variant="secondary" className="text-xs">
                    {region?.label}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={100}
            min={0}
            step={1}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}+</span>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                />
                <Label htmlFor={category.id} className="text-sm font-normal cursor-pointer">
                  {category.label}
                </Label>
              </div>
              <span className="text-xs text-gray-500">({category.count})</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Separator />

      {/* Attributes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Product Attributes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {attributes.map((attribute) => (
            <div key={attribute.id} className="flex items-center space-x-2">
              <Checkbox 
                id={attribute.id}
                checked={selectedAttributes.includes(attribute.id)}
                onCheckedChange={(checked) => handleAttributeChange(attribute.id, checked as boolean)}
              />
              <Label htmlFor={attribute.id} className="text-sm font-normal cursor-pointer">
                {attribute.label}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Separator />

      {/* Regions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Regions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {regions.map((region) => (
            <div key={region.id} className="flex items-center space-x-2">
              <Checkbox 
                id={region.id}
                checked={selectedRegions.includes(region.id)}
                onCheckedChange={(checked) => handleRegionChange(region.id, checked as boolean)}
              />
              <Label htmlFor={region.id} className="text-sm font-normal cursor-pointer">
                {region.label}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}