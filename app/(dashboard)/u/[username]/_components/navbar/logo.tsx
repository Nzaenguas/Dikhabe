"use client";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/components/ui/theme-provider";

const THEMES = ["light", "dark", "system"] as const;
type Theme = typeof THEMES[number];

export const Logo = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  function changeTheme(t: Theme) {
    setTheme(t);
    setOpen(false); // close menu on theme change if you want
  }

  return (
    <div className="relative flex items-center gap-2 pt-4 z-50 font-montserrat">
      {/* Icon toggles menu */}
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

      {/* Text is a link to home */}
      <Link href="/">
        <span className="text-white font-semibold text-4xl antialiased cursor-pointer select-none">
          Dikhabe
        </span>
      </Link>

      {/* Portal dialog */}
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
                <div className="w-full text-left px-2 py-2 rounded hover:bg-white/10 cursor-pointer">
                  Home
                </div>
              </Link>
              <Link href="/about" onClick={() => setOpen(false)}>
                <div className="w-full text-left px-2 py-2 mt-2 rounded hover:bg-white/10 cursor-pointer">
                  About
                </div>
              </Link>

              {/* Theme selector */}
              <div className="mt-4 border-t border-white/20 pt-2">
                <p className="mb-2 font-semibold">Theme</p>
                {THEMES.map((t) => (
                  <button
                    key={t}
                    onClick={() => changeTheme(t)}
                    className={`w-full text-left px-2 py-1 rounded hover:bg-white/10 cursor-pointer ${
                      theme === t ? "bg-white/20" : ""
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Background overlay to close menu */}
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
