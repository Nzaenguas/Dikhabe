import Image from "next/image";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";

const font = Poppins ({

    subsets: ['latin'],
    weight: ['200', '300', '400', '700', '800', '900'],
})

export const Logo = () => {
  return (
    <Link href="/">
    <div className="flex items-center gap-x-4 hover:opacity-75 
    transition">
    <div className="bg-white rounded-full p-1 mr-12 shrink-0 lg:mr-0 lg:shrink">
      <Image
        src="/logo.jpg"
        alt="Dikhabe"
        width={45}
        height={45}
        className="rounded-full p-1"
      />
    </div>
  
    <div className={cn(
      "hidden lg:block",
      font.className)}>
    <p className="text-lg text-white">
        Dikhabe
    </p>
    <p className="text-gray-400 text-xs">
      Let’s make your life easier!
    </p>
    </div>
  </div>
  </Link>
    );  
};
