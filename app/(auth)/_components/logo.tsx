import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';

const font = Poppins ({

    subsets: ['latin'],
    weight: ['200', '300', '400', '700', '800', '900'],
})
export const Logo = () => {
    return (
        <div className="flex flex-col items-center gap-y-4">
            <div className="bg-white rounded-full p-1">
                <Image
                    src="/logo.jpg"
                    alt="Dikhabe"
                    height="80"
                    width="80"
                    className="rounded-full"
                />
            </div>
            <div className={cn(
                "flex flex-col items-center", 
                font.className)}>
                <p className="text-xl font-montserrat font-semibold">
                    Dikhabe
                </p>
                <p className="text-sm text-mutes-foreground">
                    Let&apos;s make your life easier!
                </p>
            </div>
        </div>
    );
};