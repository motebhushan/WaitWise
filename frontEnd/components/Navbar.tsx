"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ticket, Menu, X, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "glass m-4 rounded-2xl py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
            <Ticket className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            WaitWise
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="/#how-it-works" className="hover:text-primary transition-colors">How it Works</Link>
          <Link href="/#about" className="hover:text-primary transition-colors">About</Link>
          <div className="flex items-center gap-3 ml-4">
            <Button className="rounded-full px-6 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
              Get Token
            </Button>
            <Link href="/admin">
              <Button variant="outline" className="rounded-full border-primary/20 hover:bg-primary/5">
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 p-6 glass rounded-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
          <Link href="/#features" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
          <Link href="/#how-it-works" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>How it Works</Link>
          <Button className="w-full rounded-xl">Get Token</Button>
          <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)}>
            <Button variant="outline" className="w-full rounded-xl">Admin Portal</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};
