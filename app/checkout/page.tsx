'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCartContext } from '@/providers/cart-provider';
import Image from 'next/image';
import { ArrowRight, Download } from 'lucide-react';
import Link from 'next/link';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  notes: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCartContext();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderReceipt, setOrderReceipt] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateReceiptImage = async (customerInfo: FormData) => {
    const receiptHtml = `
      <div style="width: 600px; padding: 40px; background: white; font-family: 'Cairo', sans-serif; direction: rtl; text-align: right; border: 2px solid #5a7d6f;">
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #5a7d6f; padding-bottom: 20px;">
          <h1 style="color: #5a7d6f; margin: 0; font-size: 32px;">ورق العنب المميز</h1>
          <p style="color: #a89968; margin: 5px 0 0 0; font-size: 14px;">طلب جديد</p>
        </div>

        <div style="margin-bottom: 20px;">
          <p style="margin: 5px 0; font-size: 14px;"><strong>اسم العميل:</strong> ${customerInfo.name}</p>
          <p style="margin: 5px 0; font-size: 14px;"><strong>رقم الهاتف:</strong> ${customerInfo.phone}</p>
          <p style="margin: 5px 0; font-size: 14px;"><strong>البريد الإلكتروني:</strong> ${customerInfo.email}</p>
          <p style="margin: 5px 0; font-size: 14px;"><strong>العنوان:</strong> ${customerInfo.address}</p>
          <p style="margin: 5px 0; font-size: 14px;"><strong>المدينة:</strong> ${customerInfo.city}</p>
        </div>

        <div style="margin-bottom: 20px; border: 1px solid #e8e0d5; padding: 15px; border-radius: 8px;">
          <h2 style="color: #5a7d6f; font-size: 16px; margin: 0 0 15px 0;">تفاصيل الطلب</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #f5f3f0; border-bottom: 2px solid #5a7d6f;">
                <th style="padding: 10px; text-align: right; font-size: 12px;">المنتج</th>
                <th style="padding: 10px; text-align: center; font-size: 12px;">الكمية</th>
                <th style="padding: 10px; text-align: center; font-size: 12px;">السعر</th>
                <th style="padding: 10px; text-align: center; font-size: 12px;">الإجمالي</th>
              </tr>
            </thead>
            <tbody>
              ${cart.items.map(item => `
                <tr style="border-bottom: 1px solid #e8e0d5;">
                  <td style="padding: 10px; text-align: right; font-size: 12px;">${item.name}</td>
                  <td style="padding: 10px; text-align: center; font-size: 12px;">${item.quantity}</td>
                  <td style="padding: 10px; text-align: center; font-size: 12px;">${item.price} ر.س</td>
                  <td style="padding: 10px; text-align: center; font-size: 12px; font-weight: bold;">${item.price * item.quantity} ر.س</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div style="background: #f5f3f0; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px;">
            <span>المجموع الفرعي:</span>
            <span style="font-weight: bold;">${cart.total} ر.س</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px;">
            <span>الشحن:</span>
            <span style="font-weight: bold; color: #a89968;">مجاني</span>
          </div>
          <div style="border-top: 2px solid #d4c4b0; padding-top: 8px; display: flex; justify-content: space-between; font-size: 16px;">
            <span style="font-weight: bold;">الإجمالي:</span>
            <span style="font-weight: bold; color: #5a7d6f; font-size: 18px;">${cart.total} ر.س</span>
          </div>
        </div>

        ${customerInfo.notes ? `
          <div style="background: #fffaf5; padding: 15px; border-right: 4px solid #a89968; margin-bottom: 20px; border-radius: 4px;">
            <p style="margin: 0 0 8px 0; color: #5a7d6f; font-weight: bold; font-size: 12px;">ملاحظات العميل:</p>
            <p style="margin: 0; font-size: 13px; color: #2d2520;">${customerInfo.notes}</p>
          </div>
        ` : ''}

        <div style="text-align: center; padding-top: 20px; border-top: 2px solid #e8e0d5; color: #7a6f66; font-size: 12px;">
          <p style="margin: 0;">شكراً لطلبك معنا</p>
          <p style="margin: 5px 0 0 0;">سيتم التواصل معك قريباً للتأكيد والتوصيل</p>
        </div>
      </div>
    `;

    const element = document.createElement('div');
    element.innerHTML = receiptHtml;
    document.body.appendChild(element);

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
      });
      document.body.removeChild(element);
      return canvas.toDataURL('image/jpeg', 0.95);
    } catch (error) {
      console.error('Error generating receipt:', error);
      document.body.removeChild(element);
      return null;
    }
  };

  const sendWhatsAppMessage = async (receiptImage: string | null) => {
    try {
      let message = `مرحباً! لدي طلب جديد:\\n\\n`;
      message += `*بيانات العميل:*\\n`;
      message += `الاسم: ${formData.name}\\n`;
      message += `الهاتف: ${formData.phone}\\n`;
      message += `البريد: ${formData.email}\\n`;
      message += `العنوان: ${formData.address}\\n`;
      message += `المدينة: ${formData.city}\\n\\n`;
      message += `*تفاصيل الطلب:*\\n`;

      cart.items.forEach(item => {
        message += `${item.name} × ${item.quantity} = ${item.price * item.quantity} ر.س\\n`;
      });

      message += `\\n*الإجمالي: ${cart.total} ر.س*\\n`;

      if (formData.notes) {
        message += `\\nملاحظات: ${formData.notes}\\n`;
      }

      const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '967775591565';
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank');
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Generate receipt image
      const receiptImage = await generateReceiptImage(formData);
      if (receiptImage) {
        setOrderReceipt(receiptImage);
      }

      // Send to WhatsApp
      await sendWhatsAppMessage(receiptImage);

      // Clear cart
      clearCart();
    } catch (error) {
      console.error('Error processing order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.items.length === 0 && !orderReceipt) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            سلتك فارغة
          </h1>
          <p className="text-muted-foreground mb-8">لا توجد منتجات في سلتك</p>
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              العودة للمتجر
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (orderReceipt) {
    return (
      <div className="min-h-screen bg-background py-20 px-4" style={{ fontFamily: "'Cairo', sans-serif" }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              تم استقبال طلبك بنجاح!
            </h1>
            <p className="text-xl text-muted-foreground">
              سيتم التواصل معك عبر الواتس للتأكيد والتوصيل
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <img
              src={orderReceipt}
              alt="Order Receipt"
              className="w-full rounded-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              onClick={() => {
                const link = document.createElement('a');
                link.href = orderReceipt;
                link.download = 'order-receipt.jpg';
                link.click();
              }}
              className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-3 flex items-center justify-center gap-2 rounded-lg"
            >
              <Download className="w-5 h-5" />
              تحميل الإيصال
            </Button>
            <Link href="/" className="flex-1">
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 flex items-center justify-center gap-2 rounded-lg"
              >
                <ArrowRight className="w-5 h-5" />
                الاستمرار في التسوق
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4" style={{ fontFamily: "'Cairo', sans-serif" }}>
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif" }}
        >
          اتمام الشراء
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2">الاسم الكامل</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                    placeholder="أدخل اسمك"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">رقم الهاتف</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                    placeholder="05xxxxxxxxx"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">البريد الإلكتروني</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                  placeholder="email@example.com"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2">العنوان</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                    placeholder="عنوان التوصيل"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">المدينة</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="">اختر المدينة</option>
                    <option value="الرياض">الرياض</option>
                    <option value="جدة">جدة</option>
                    <option value="الدمام">الدمام</option>
                    <option value="أخرى">أخرى</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">ملاحظات إضافية</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                  placeholder="أي طلبات أو ملاحظات خاصة..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg"
              >
                {isSubmitting ? 'جاري المعالجة...' : 'اتمام الطلب عبر الواتس'}
              </Button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
              <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                ملخص الطلب
              </h2>

              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {cart.items.map(item => (
                  <div key={item.id} className="flex gap-3 pb-4 border-b border-border">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-muted-foreground mb-1">{item.quantity} × {item.price} ر.س</p>
                      <p className="font-bold text-primary">{item.price * item.quantity} ر.س</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span>المجموع الفرعي:</span>
                  <span className="font-bold">{cart.total} ر.س</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>الشحن:</span>
                  <span className="text-accent font-bold">مجاني</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between text-lg font-bold">
                  <span>الإجمالي:</span>
                  <span className="text-primary">{cart.total} ر.س</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
