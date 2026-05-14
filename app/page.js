'use client';

import { useState } from 'react';
import Header from '@/components/header'
import Hero from '@/components/hero'
import Products from '@/components/products'
import Features from '@/components/features'
import Reviews from '@/components/reviews'
import Contact from '@/components/contact'
import Footer from '@/components/footer'
import { CartDrawer } from '@/components/cart-drawer'

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <Hero />
      <Products />
      <Features />
      <Reviews />
      <Contact />
      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </main>
  )
}
