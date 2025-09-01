import Image from "next/image";
import LogoImage from "@/public/image3.png";
import SignIn from "./sign-in";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 py-2 bg-slate-900/80 backdrop-blur-md border-blue-800/30 shadow-lg">
      <Link 
        href={"/"} 
        className="flex flex-col items-center gap-2 group transition-all duration-300"
      >
        <div className="relative overflow-hidden rounded-md transition-all duration-500 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-cyan-500/20">
          <Image 
            src={LogoImage} 
            alt="Logo" 
            width={80} 
            height={80} 
            className="w-12 md:w-14 rounded-md"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-cyan-400/0 group-hover:from-blue-500/20 group-hover:to-cyan-400/20 transition-all duration-500"></div>
        </div>
        <h1 className="font-semibold group-hover:scale-105 duration-500 text-[7px] md:text-[8px] bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          Interview SideKick
        </h1>
      </Link>
      
      <div className="flex items-center gap-4 md:gap-6">
        <Link href={"/my-interviews"} className="text-white hover:underline">My Interviews</Link>
        <div className="flex items-center">
          <SignIn />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;