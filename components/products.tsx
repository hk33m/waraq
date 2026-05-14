'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCartContext } from '@/providers/cart-provider';
import Image from 'next/image';
import { toast } from "sonner"
import { ShoppingCart, Plus, Minus } from 'lucide-react';

const PRODUCTS = [
  {
    id: '1',
    name: 'ورق العنب الكلاسيكي',
    category: 'كلاسيكي',
    price: 45,
    image: '/product-classic.jpg',
    description: 'وصفة تقليدية بمكونات فاخرة',
    rating: 4.8,
    reviews: 245,
    badge: 'الأكثر مبيعاً',
  },
  {
    id: '2',
    name: 'ورق العنب العضوي',
    category: 'عضوي',
    price: 55,
    image: '/product-organic.jpg',
    description: 'مكونات طبيعية 100% عضوية',
    rating: 4.9,
    reviews: 189,
    badge: 'عضوي معتمد',
  },
  {
    id: '3',
    name: 'ورق العنب الحار',
    category: 'حار',
    price: 50,
    image: '/product-spiced.jpg',
    description: 'بنكهات شرقية حارة مميزة',
    rating: 4.7,
    reviews: 156,
    badge: 'حار ومميز',
  },
  {
    id: '4',
    name: 'ورق العنب الفاخر',
    category: 'فاخر',
    price: 75,
    image: '/product-premium.jpg',
    description: 'اختيار فاخر من أجود الأوراق',
    rating: 5.0,
    reviews: 98,
    badge: 'فاخر',
  },
  {
    id: '5',
    name: 'عبوة العائلة',
    category: 'عائلي',
    price: 120,
    image: '/product-family.jpg',
    description: 'تشكيلة متنوعة للعائلة الكريمة',
    rating: 4.9,
    reviews: 203,
    badge: 'توفير 15%',
  },
  {
    id: '6',
    name: 'صندوق الهدية الفاخر',
    category: 'هدايا',
    price: 85,
    image: '/product-gift.jpg',
    description: 'تغليف فاخر مثالي للهدايا',
    rating: 4.8,
    reviews: 142,
    badge: 'للهدايا',
  },
  {
    id: '7',
    name: 'حصص فردية فاخرة',
    category: 'مقبلات',
    price: 35,
    image: '/product-mini.jpg',
    description: 'حصص صغيرة أنيقة للضيافة',
    rating: 4.6,
    reviews: 127,
    badge: 'مقبلات',
  },
  {
    id: '8',
    name: 'ورق العنب النباتي',
    category: 'نباتي',
    price: 50,
    image: '/product-vegan.jpg',
    description: 'نسخة نباتية صحية لذيذة',
    rating: 4.7,
    reviews: 94,
    badge: 'نباتي',
  },
  {
    id: '9',
    name: 'عبوة الجملة',
    category: 'جملة',
    price: 280,
    image: '/product-bulk.jpg',
    description: 'تعبئة كبيرة للمطاعم والفعاليات',
    rating: 4.9,
    reviews: 67,
    badge: 'توفير 20%',
  },
];

export default function Products() {
  const { addToCart } = useCartContext();
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});

  const handleAddToCart = (product: (typeof PRODUCTS)[0], quantity: number) => {
    if (quantity > 0) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      }, quantity);
      
      setSelectedQuantities(prev => ({
        ...prev,
        [product.id]: 1,
      }));
      toast.success(`تم إضافتها الى السلة ( ${product.name} )`, {
        description: '',
      });
    }
  };

  const getQuantity = (productId: string) => selectedQuantities[productId] || 1;

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
          {PRODUCTS.map((product) => (
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
                        onClick={() => setSelectedQuantities(prev => ({
                          ...prev,
                          [product.id]: Math.max(1, (prev[product.id] || 1) - 1),
                        }))}
                        className="p-2 hover:bg-muted transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-semibold">
                        {getQuantity(product.id)}
                      </span>
                      <button
                        onClick={() => setSelectedQuantities(prev => ({
                          ...prev,
                          [product.id]: (prev[product.id] || 1) + 1,
                        }))}
                        className="p-2 hover:bg-muted transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <Button
                      onClick={() => handleAddToCart(product, getQuantity(product.id))}
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
