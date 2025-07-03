'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PriceChartProps {
  productName: string;
  currentPrice: number;
  data: Array<{
    date: string;
    price: number;
    volume?: number;
  }>;
}

export function PriceChart({ productName, currentPrice, data }: PriceChartProps) {
  // Calculate price trend
  const previousPrice = data[data.length - 2]?.price || currentPrice;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = ((priceChange / previousPrice) * 100).toFixed(2);
  const isPositive = priceChange >= 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{productName} - Price Trends</CardTitle>
          <div className="flex items-center space-x-2">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
            <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{priceChangePercent}%
            </span>
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-primary">
            ${currentPrice.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">per lb</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date" 
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis 
                fontSize={12}
                domain={['dataMin - 0.5', 'dataMax + 0.5']}
                tickFormatter={(value) => `$${value.toFixed(2)}`}
              />
              <Tooltip 
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-600">7-day avg</p>
            <p className="font-semibold">
              ${(data.slice(-7).reduce((sum, item) => sum + item.price, 0) / Math.min(7, data.length)).toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">30-day high</p>
            <p className="font-semibold text-green-600">
              ${Math.max(...data.slice(-30).map(item => item.price)).toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">30-day low</p>
            <p className="font-semibold text-red-600">
              ${Math.min(...data.slice(-30).map(item => item.price)).toFixed(2)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}