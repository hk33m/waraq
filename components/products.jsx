'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { toast } from "sonner"
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { products } from '@/data/products';
import {useCartStore} from '@/stores/cartStore'


export default function Products() {
  const addToCart = useCartStore((state) => state.addToCart);
 const cartItems = useCartStore((state) => state.cartItems);
  const [productsList, setProductsList] = useState(
  products.map((product) => ({
    ...product,
    quantity: 1,
  }))
);

const increaseQuantity = (id) => {
  setProductsList((prev) =>
    prev.map((product) =>
      product.id === id
        ? {
            ...product,
            quantity: product.quantity + 1,
          }
        : product
    )
  );
};

const decreaseQuantity = (id) => {
  setProductsList((prev) =>
    prev.map((product) =>
      product.id === id
        ? {
            ...product,
            quantity:
              product.quantity > 1
                ? product.quantity - 1
                : 1,
          }
        : product
    )
  );
};

 const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };


  return (
    <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6" >
            منتجاتنا المميزة
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            تشكيلة فاخرة من ورق العنب المطبوخ بأفضل الوصفات الشرقية الأصيلة
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {productsList.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group h-full flex flex-col"
            >
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-border">
                {product.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-bold">
                      {product.badge}
                    </span>
                  </div>
                )}

                <div className="relative w-full h-64 overflow-hidden bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                      {product.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-2" >
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-accent text-sm">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-lg">
                          {i < Math.floor(product.rating) ? '★' : '☆'}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="text-3xl font-bold text-primary mb-6">
                    {product.price} ر.س
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() => decreaseQuantity(product.id)}
                        className="p-2 hover:bg-muted transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-semibold">
                       {product.quantity}
                      </span>
                      <button
                       onClick={() => increaseQuantity(product.id)}
                        className="p-2 hover:bg-muted transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <Button
                      onClick={() => {
  const existingItem = cartItems.find(
    (item) => item.id === product.id
  );

  if (existingItem) {
    toast.info(`${product.name} موجود بالفعل في السلة`);
  } else {
    addToCart(product);
    toast.success(`${product.name} تم إضافته إلى السلة`);
  }
}}
                      className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      أضف للسلة
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12 border border-primary/20"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4" >
              عروض خاصة للطلبات الكبيرة
            </h3>
            <p className="text-muted-foreground mb-6 text-lg">
              احصل على خصم 25% على الطلبات التي تتجاوز 500 ريال
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3">
              اتصل بنا للمزيد من التفاصيل
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
