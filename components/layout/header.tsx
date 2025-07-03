'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Menu, X, LogOut, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { VoiceSearch } from '@/components/ui/voice-search';
import { LanguageSelector } from '@/components/ui/language-selector';
import { useCartStore } from '@/lib/store/cart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const totalItems = useCartStore((state) => state.getTotalItems());
  const { data: session } = useSession();

  const navigation = [
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Categories', href: '/categories' },
    { name: 'For Farmers', href: '/farmers' },
    { name: 'About', href: '/about' },
  ];

  const handleVoiceSearch = (transcript: string) => {
    setSearchQuery(transcript);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo1.png"
            alt="AgriLink Logo"
            width={180}
            height={60}
            className="h-20 w-auto"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <div className="relative w-full flex gap-2">
            <div className="relative flex-1"></div>
            <VoiceSearch onResult={handleVoiceSearch} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <LanguageSelector />

          {/* Cart */}
      <Link href="/cart">
  <Button
    variant="ghost"
    size="sm"
    className="relative group p-2 rounded-full hover:bg-green-100 transition-colors"
    aria-label="View cart"
  >
    <span className="sr-only">View cart</span>
    <ShoppingCart className="h-6 w-6 text-green-700 group-hover:text-red-600 transition-colors" />
    {totalItems > 0 && (
      <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-green-600 text-white border-2 border-white shadow">
        {totalItems}
      </Badge>
    )}
  </Button>
</Link>
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="sm" className="p-0 rounded-full">
      {session?.user?.image ? (
        <Image
          src={session.user.image}
          alt={session.user.email || "User"}
          width={36}
          height={36}
          className="rounded-full border border-green-200 shadow-sm object-cover"
        />
      ) : (
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-green-100 border border-green-200">
          <span className="text-green-700 font-bold text-lg">
            {session?.user?.email
              ? session.user.email.charAt(0).toUpperCase()
              : <Mail className="h-5 w-5" />}
          </span>
        </div>
      )}
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="min-w-[180px] rounded-xl shadow-lg">
    {!session ? (
      <DropdownMenuItem asChild>
        <Link href="/auth/signup" className="font-semibold text-green-700">
          Sign up
        </Link>
      </DropdownMenuItem>
    ) : (
      <>
        <DropdownMenuItem disabled className="flex items-center gap-2">
          {session.user?.image && (
            <Image
              src={session.user.image}
              alt={session.user.email || "User"}
              width={24}
              height={24}
              className="rounded-full"
            />
          )}
      
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/orders">My Orders</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => signOut()}
          className="flex items-center gap-2 text-red-600"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </>
    )}
  </DropdownMenuContent>
</DropdownMenu>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Mobile Search with Voice */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for fresh produce..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <VoiceSearch onResult={handleVoiceSearch} />
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}