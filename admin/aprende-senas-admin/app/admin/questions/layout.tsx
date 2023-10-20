import '../../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Sidebar from '../components/LayoutComponents/Sidebar'
import Encapsulation from '../components/LayoutComponents/Encapsulation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Encapsulation>
        <div className="flex">
          <Sidebar selection={1} />
          {children}
        </div>
        </Encapsulation>
      </body>
    </html >
  )
}
