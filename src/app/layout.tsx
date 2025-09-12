// These styles apply to every route in the application
import '@/styles/global.css'
import Header from '@/components/common/layout/Header';
// import Sidebar from '@/components/common/layout/Sidebar';
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
       <Header />
      <body>{children}</body>
    </html>
  )
}