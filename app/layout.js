import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner"
import { CartProvider } from '@/providers/cart-provider'
import './globals.css'


export const metadata ={
  title: 'ورق العنب المميز - Waraq Al Ainab',
  description: 'منتجات ورق العنب المطبوخ الجاهز بجودة عالية مستوحى من الطبيعة والأطعمة الشرقية الأصيلة',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body dir="rtl">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
          {children}
          </CartProvider>
              <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}