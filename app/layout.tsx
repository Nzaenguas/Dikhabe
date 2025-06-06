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
  <html lang="en" className="h-full w-full bg-zinc-700 dark" suppressHydrationWarning>
    <body className="h-auto w-full bg-zinc-700">
      <ThemeProvider 
        attribute="class" 
        defaultTheme="dark"
        forcedTheme="dark" 
        storageKey="Dikhabe-theme"
      >
        <Toaster theme="light" position="bottom-center"/>
        {children}
      </ThemeProvider>
      <div id="portal-root" />
    </body>
  </html>
</ClerkProvider>

  );
}
