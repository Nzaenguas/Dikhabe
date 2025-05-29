"use client";

import { 
  Home, 
  Info, 
  HelpCircle,
  LogIn, 
  UserPlus 
} from "lucide-react";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { useUser, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export const Logo = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user } = useUser(); // Clerk user

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative flex items-center gap-2 pt-4 z-50 font-montserrat">
      {/* Toggle button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-white rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ width: 56, height: 56 }}
        aria-expanded={open}
        aria-controls="logo-dialog"
        aria-label="Toggle menu"
      >
        <Image
          src="/logo.jpg"
          alt="Dikhabe"
          width={45}
          height={45}
          className="rounded-full"
        />
      </button>

      {/* Brand name */}
      <Link href="/">
        <span className="text-white font-semibold text-4xl antialiased cursor-pointer select-none">
          Dikhabe
        </span>
      </Link>

      {/* Portal Dialog */}
      {open &&
        ReactDOM.createPortal(
          <>
            <div
              id="logo-dialog"
              className="fixed top-[80px] left-[50px] bg-zinc-900 border border-white/10 text-white p-4 rounded-xl w-48 shadow-xl z-[1000]"
              role="dialog"
              aria-modal="true"
            >
              <Link href="/" onClick={() => setOpen(false)}>
                <div className="w-full text-left px-2 py-2 rounded hover:bg-white/10 cursor-pointer flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Home
                </div>
              </Link>

              <Link href="/about" onClick={() => setOpen(false)}>
                <div className="w-full text-left px-2 py-2 mt-2 rounded hover:bg-white/10 cursor-pointer flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  About
                </div>
              </Link>

              <Link href="/help" onClick={() => setOpen(false)}>
                <div className="w-full text-left px-2 py-2 mt-2 rounded hover:bg-white/10 cursor-pointer flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Help
                </div>
              </Link>


              <div className="mt-4 border-t border-white/20 pt-2">
                {!user ? (
                  <>
                    <SignUpButton mode="modal">
                      <div className="w-full text-left px-2 py-1 rounded hover:bg-white/10 cursor-pointer flex items-center gap-2">
                        <UserPlus className="w-4 h-4" />
                        <span>Register</span>
                      </div>
                    </SignUpButton>
                    <SignInButton mode="modal">
                      <div className="w-full text-left px-2 py-1 mt-1 rounded hover:bg-white/10 cursor-pointer flex items-center gap-2">
                        <LogIn className="w-4 h-4" />
                        <span>Login</span>
                      </div>
                    </SignInButton>
                  </>
                ) : (
                  <div className="px-2 py-1 mt-1 rounded hover:bg-white/10 cursor-pointer flex items-center justify-between">
                    <span className="text-sm">Signed in</span>
                    <UserButton afterSignOutUrl="/" />
                  </div>
                )}
              </div>
            </div>

            <div
              className="fixed inset-0 z-[900]"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
          </>,
          document.getElementById("portal-root")!
        )}
    </div>
  );
};
