import Link from 'next/link';
import './globals.css'
export default function Layout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className=' min-h-screen flex flex-col justify-between'>
        <header>
          <nav className="flex 
            bg-green-900 text-white
            items-center justify-between p-4 shadow-2xl">
            {/* gradient-to-r from-emerald-500 to-lime-300 */}
            <div className='text-2xl'>
              <h2>Grandma&apos;s</h2>
            </div>
            <div className="flex items-center gap-5 mx-4">
              <Link href="/">Main</Link> 
              <Link href="/about">About</Link>
              {/* <Link href='/mine'>Yours</Link> */}
              {/* <Link href="/meal">About</Link> */}
              {/* <Link href="/">Main</Link> */}
            </div>
          </nav>
        </header>
        <main className='min-h-screen'>{children}</main>
        <footer className='bg-green-900 text-white pt-1 flex justify-end h-[30px]'>
          <p className='mx-5'>&copy; 2025 Jathursika Velummylum</p>
        </footer>
      </body>
    </html>
  );
}
