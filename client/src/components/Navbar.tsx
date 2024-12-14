// import { Link } from "react-router-dom";
// import { logo } from "../assets";
// // import { navLinks } from "../constants";
// import { useState } from "react";
// import clsx from "clsx";



// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const handleSidebar = () => {
//     if (isOpen) {
//       setIsOpen(false)
//     }
//     else {
//       setIsOpen(true)
//     }
//   }
//   return (
//     <nav className="w-full text-text h-[72px] p-10 flex items-center justify-around fixed top-0 right-0 left-0 z-10 bg-white  max-md:justify-between">
//       <div className="flex items-center gap-1">
//         <h1 className="text-3xl font-semibold font-mono text-brand">Ghuma</h1>
//         <img src={logo} alt="logo" className="w-10 h-10" />
//       </div>
//       <nav className="max-md:hidden">
//         <ul className="flex  gap-10">
//           {
//             navLinks.map((link) => (
//               <Link className="navs" key={link.name} to={link.path}>
//                 <li>{link.name}</li>
//               </Link>
//             ))
//           }
//         </ul>
//       </nav>
//       <nav className="max-md:hidden">
//         <ul className="flex gap-5 items-center">
//           <Link to='/sign-in'>
//             <button className="navs">
//               Sign In
//             </button></Link>
//           <Link to='/sign-up'>
//             <button className="bg-brand-light hover:opacity-80 tranimate text-white rounded-xl px-4 py-2 ">
//               Sign Up
//             </button>
//           </Link>
//         </ul>
//       </nav>
//       <button onClick={handleSidebar} className="text-text hidden max-md:block">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
//         </svg>
//       </button>

//       <aside className={clsx(`hidden max-md:block fixed h-full right-0 top-0 w-[300px] bg-white p-10 pt-5`,
//         { 'transform translate-x-0': isOpen },
//         { 'transform translate-x-full': !isOpen }
//       )}>
//         <div className="flex items-center justify-between ">
//           <div className="flex items-center gap-1">
//             <img src={logo} alt="logo" className="w-10 h-10" />
//           </div>
//           <button onClick={handleSidebar} className="text-text">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>
//         <nav className="">
//           <ul className="flex flex-col gap-5 mt-5">
//             {
//               navLinks.map((link) => (
//                 <Link className="navs" key={link.name} to={link.path}>
//                   <li>{link.name}</li>
//                 </Link>
//               ))
//             }
//           </ul>
//         </nav>
//         <nav>
//           <ul className="flex flex-col gap-5 mt-5">
//             <Link to='/sign-in'>
//               <button className="navs">
//                 Sign In
//               </button></Link>
//             <Link to='/sign-up'>
//               <button className="navs">
//                 Sign Up
//               </button>
//             </Link>
//           </ul>
//         </nav>
//       </aside>
//     </nav >
//   )
// }
