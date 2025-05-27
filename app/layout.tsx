import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Metadata } from "next";
import { Toaster } from "sonner"

export const metadata: Metadata = {
  title: "Dikhabe",
  description: "Description",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
  <html lang="en" className="h-full w-full" suppressHydrationWarning>
    <body className="h-full w-full bg-indigo-800">
      <ThemeProvider 
        attribute="class" 
        defaultTheme="light"
        forcedTheme="light" 
        storageKey="Dikhabe-theme"
      >
        <Toaster theme="light" position="bottom-center"/>
        {children}
      </ThemeProvider>
    </body>
  </html>
</ClerkProvider>

  );
}
