import '@/styles/global.css'
import Header from '@/components/common/layout/Header';

 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
       
      <body>
      {children}</body>
    </html>
  )
}