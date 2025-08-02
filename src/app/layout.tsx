import "./globals.css";
import Link from "next/link";
import { Inter } from "next/font/google";
import {
  HomeIcon,
  DocumentArrowUpIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";

import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pharmacy Dashboard",
  description: "Excel automation and pharmacy management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        <div className="flex h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-violet-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-blue-900/30"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-2xl"></div>
            <div className="absolute bottom-32 left-20 w-40 h-40 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full blur-3xl"></div>
          </div>

          <nav className="relative z-10 w-60 bg-white/10 backdrop-blur-lg border-r border-white/20 flex flex-col shadow-2xl">
            <div className="p-6 border-b border-white/20">
              <h2 className="text-xl font-bold text-white">
                Pharmacy Dashboard
              </h2>
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
                  icon={
                    <DocumentArrowUpIcon className="w-5 h-5 flex-shrink-0" />
                  }
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
      </body>
    </html>
  );
}

// Navigation Link Component
const NavLink = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <Link
    href={href}
    className="flex items-center gap-3 px-3 py-3 text-white/80 rounded-xl hover:bg-white/20 hover:text-white transition-all duration-200 group"
  >
    <span className="text-white/60 group-hover:text-cyan-300 transition-colors">
      {icon}
    </span>
    <span className="font-medium">{label}</span>
  </Link>
);
