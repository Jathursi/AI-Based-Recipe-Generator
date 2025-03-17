// // import React from 'react'
// import Link from 'next/link';
// import './globals.css'

// export default function Layout({ children }) {
//   return (
//     <html lang="en" suppressHydrationWarning={true}>
//       <body className=' min-h-screen flex flex-col justify-between'>
//         <header className='bg-gray-800 text-white p-4'>
//           <nav>
//             <ul className='flex space-x-4'>
//               <li>
//                 <Link href='/'>
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link href='/about'>
//                   About
//                 </Link>
//               </li>
//             </ul>
//           </nav>
//         </header>
//         <main className='min-h-screen'>{children}</main>
//         <footer className='bg-gray-800 text-white p-4'>
//           <p>Footer</p>
//         </footer>
//       </body>
//     </html>
//   )
// }
// src/app/layout.js
import Link from 'next/link';
import './globals.css'
export default function Layout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className=' min-h-screen flex flex-col justify-between'>
        <header>
          <nav className="flex bg-gradient-to-r from-emerald-500 to-lime-600 items-center justify-between p-4 shadow-2xl">
            <div className='text-2xl'>
              <h2>Grandma&apos;s</h2>
            </div>
            <div className="flex items-center gap-5 mx-4">
              <Link href="/">Main</Link> 
              <Link href="/about">About</Link>
              <Link href="/meal">About</Link>
            </div>
          </nav>
        </header>
        <main className='min-h-screen'>{children}</main>
        <footer className='bg-gradient-to-l from-emerald-500 to-lime-300 pt-1 flex justify-end h-[30px]'>
          <p className='mx-5'>&copy; 2025 Jathursika Velummylum</p>
        </footer>
      </body>
    </html>
  );
}
