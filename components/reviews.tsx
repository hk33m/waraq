'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

export default function Reviews() {
  const reviews = [
    {
      name: 'فاطمة السعيد',
      role: 'ربة منزل',
      content: 'منتج ممتاز جداً! الطعم رائع والجودة عالية جداً. أطفالي يحبونه كثيراً ويطلبون منه في كل مرة.',
      rating: 5,
      avatar: '👩',
    },
    {
      name: 'محمد الدعيع',
      role: 'صاحب مطعم',
      content: 'استخدمت المنتج في مطعمي وكان رد فعل الزبائن رائع جداً. جودة عالية وسعر منافس للغاية.',
      rating: 5,
      avatar: '👨',
    },
    {
      name: 'نور الهاشمي',
      role: 'طالبة جامعية',
      content: 'حل سريع وسهل للوجبات الصحية! توفيت لي وقتاً كثيراً في الطبخ وطعمه لذيذ جداً.',
      rating: 4.5,
      avatar: '👧',
    },
    {
      name: 'عائشة البلوي',
      role: 'خبيرة طبخ',
      content: 'كمتخصصة في المطبخ الشرقي، أستطيع تأكيد أن هذا المنتج يحافظ على النكهة الأصيلة بشكل رائع.',
      rating: 5,
      avatar: '👩‍🍳',
    },
    {
      name: 'سامي الرويلي',
      role: 'موظف',
      content: 'يستحق التوصية 100%. منتج عالي الجودة وخدمة العملاء ممتازة جداً وسريعة الرد.',
      rating: 5,
      avatar: '👨‍💼',
    },
    {
      name: 'ليلى المطيري',
      role: 'صاحبة عمل',
      content: 'استخدمه في حفلاتي وضيوفي يسألون عنه دائماً! منتج متميز حقاً.',
      rating: 4.8,
      avatar: '👩‍🎨',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="reviews" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-cairo font-semibold text-lg mb-3">⭐ آراء عملائنا</p>
          <h2 className="font-playfair font-bold text-4xl md:text-5xl text-foreground mb-4">
            يثق بنا آلاف العملاء
          </h2>
          <p className="text-muted-foreground font-cairo max-w-2xl mx-auto">
            اقرأ ما يقوله عملاؤنا الراضون عن منتجاتنا الفاخرة
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-card rounded-2xl p-6 border border-border hover:border-primary transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 text-primary/20 opacity-50" size={32} />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(review.rating) ? 'fill-accent text-accent' : 'text-muted'}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-foreground font-cairo text-sm leading-relaxed mb-6">
                {review.content}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <span className="text-3xl">{review.avatar}</span>
                <div>
                  <p className="font-cairo font-semibold text-foreground text-sm">
                    {review.name}
                  </p>
                  <p className="text-xs text-muted-foreground font-cairo">
                    {review.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-wrap justify-center gap-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-2xl">✓</span>
            </div>
            <div>
              <p className="font-cairo font-semibold text-foreground">10K+ عميل</p>
              <p className="text-xs text-muted-foreground font-cairo">راضون تماماً</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-2xl">🏆</span>
            </div>
            <div>
              <p className="font-cairo font-semibold text-foreground">تقييم 4.9★</p>
              <p className="text-xs text-muted-foreground font-cairo">من أصل 5</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-2xl">🚚</span>
            </div>
            <div>
              <p className="font-cairo font-semibold text-foreground">توصيل سريع</p>
              <p className="text-xs text-muted-foreground font-cairo">في كل الدول</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
