"use client";

import Link from "next/link";
import {
  HomeIcon,
  DocumentArrowUpIcon,
  BuildingStorefrontIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-violet-800 relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-t from-black/40 via-transparent to-blue-900/30 pointer-events-none"></div>
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-24 h-24 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full blur-2xl animate-pulse"></div>
      </div>

      <header className="md:hidden relative z-40 bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-2xl">
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-lg font-bold text-white">Pharmacy Dashboard</h1>
            <p className="text-xs text-white/70">
              Автоматизація аптечних даних
            </p>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6 text-white" />
            ) : (
              <Bars3Icon className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </header>

      <div
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        <nav
          className={`absolute top-0 left-0 h-screen w-80 max-w-[85vw] bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-2xl transform transition-transform duration-500 ease-out flex flex-col ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 border-b border-white/20">
            <h2 className="text-xl font-bold text-white">Pharmacy Dashboard</h2>
            <p className="text-sm text-white/70 mt-1">
              Автоматизація аптечних даних
            </p>
          </div>

          <div className="flex-1 py-6 overflow-y-auto">
            <div className="px-3 space-y-2">
              <NavLink
                href="/"
                icon={<HomeIcon className="w-5 h-5 flex-shrink-0" />}
                label="Головна"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <NavLink
                href="/upload"
                icon={<DocumentArrowUpIcon className="w-5 h-5 flex-shrink-0" />}
                label="Завантажити Excel"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <NavLink
                href="/pharmacies"
                icon={
                  <BuildingStorefrontIcon className="w-5 h-5 flex-shrink-0" />
                }
                label="Аптеки"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </div>

          <div className="p-4 border-t border-white/20">
            <p className="text-xs text-white/50 text-center">
              © 2025 Pharmacy Dashboard
            </p>
          </div>
        </nav>
      </div>

      <div className="flex min-h-screen md:h-screen">
        <nav className="hidden md:flex relative z-10 w-60 bg-white/10 backdrop-blur-lg border-r border-white/20 flex-col shadow-2xl">
          <div className="p-6 border-b border-white/20">
            <h2 className="text-xl font-bold text-white">Pharmacy Dashboard</h2>
            <p className="text-sm text-white/70 mt-1">
              Автоматизація аптечних даних
            </p>
          </div>

          <div className="flex-1 py-6">
            <div className="px-3 space-y-2">
              <NavLink
                href="/"
                icon={<HomeIcon className="w-5 h-5 flex-shrink-0" />}
                label="Головна"
              />
              <NavLink
                href="/upload"
                icon={<DocumentArrowUpIcon className="w-5 h-5 flex-shrink-0" />}
                label="Завантажити Excel"
              />
              <NavLink
                href="/pharmacies"
                icon={
                  <BuildingStorefrontIcon className="w-5 h-5 flex-shrink-0" />
                }
                label="Аптеки"
              />
            </div>
          </div>

          <div className="p-4 border-t border-white/20">
            <p className="text-xs text-white/50 text-center">
              © 2025 Pharmacy Dashboard
            </p>
          </div>
        </nav>
        <main className="relative z-10 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

const NavLink = ({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="flex items-center gap-3 px-3 py-3 text-white/80 rounded-xl hover:bg-white/20 hover:text-white transition-all duration-300 group transform hover:scale-[1.02] hover:translate-x-1"
  >
    <span className="text-white/60 group-hover:text-cyan-300 transition-all duration-300 group-hover:scale-110">
      {icon}
    </span>
    <span className="font-medium">{label}</span>
  </Link>
);
