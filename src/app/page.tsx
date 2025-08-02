"use client";

import Link from "next/link";
import {
  FolderArrowDownIcon,
  BuildingStorefrontIcon,
  ArrowRightIcon,
  SparklesIcon,
  ChartBarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

import { StatCard } from "@/components/StatCard";
import { FeatureCard } from "@/components/FeatureCard";

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-violet-800"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-blue-900/30"></div>

      <div className="absolute inset-0 opacity-10 hidden sm:block">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-2xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center px-4 sm:px-6 py-8 sm:py-16 min-h-screen">
        <div className="w-full max-w-6xl text-center">
          <div className="relative mb-8 sm:mb-16 p-6 sm:p-12 rounded-2xl sm:rounded-3xl overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('/images/automation-bg.jpg')",
              }}
            ></div>

            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/60 to-violet-800/70"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 sm:px-4 py-2 mb-6 sm:mb-8">
                <SparklesIcon className="w-4 h-4 text-yellow-300 flex-shrink-0" />
                <span className="text-white/90 text-xs sm:text-sm font-medium">
                  Нова ера автоматизації
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-8 bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent leading-tight">
                Автоматизація
                <br />
                <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                  аптечних даних
                </span>
              </h1>

              <div className="text-base sm:text-lg md:text-xl lg:text-2xl mb-0 max-w-4xl mx-auto text-white/90 leading-relaxed font-light px-2">
                Революційний додаток для{" "}
                <span className="font-semibold text-cyan-300 relative inline-block">
                  миттєвого заповнення Excel-файлів
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-300 to-blue-300"></div>
                </span>{" "}
                даними про аптеки та перегляду інформації у сучасному інтерфейсі
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-16">
            <FeatureCard
              icon={<FolderArrowDownIcon className="w-6 h-6 flex-shrink-0" />}
              title="Швидке завантаження"
              description="Перетягніть Excel-файл і автоматично заповніть усі маркери даними аптек за лічені секунди"
              gradient="from-emerald-400 to-cyan-400"
            />
            <FeatureCard
              icon={<ChartBarIcon className="w-6 h-6 flex-shrink-0" />}
              title="Розумна обробка"
              description="Наші алгоритми аналізують структуру файлу та точно підставляють потрібну інформацію"
              gradient="from-purple-400 to-pink-400"
            />
            <FeatureCard
              icon={
                <BuildingStorefrontIcon className="w-6 h-6 flex-shrink-0" />
              }
              title="Сучасний перегляд"
              description="Переглядайте всі аптеки у вигляді елегантних карток з фільтрами та пошуком"
              gradient="from-blue-400 to-indigo-400"
            />
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-8 sm:mb-12 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Готові розпочати?
                </h3>
                <p className="text-white/70 text-sm sm:text-base">
                  Спробуйте зараз і відчуйте різницю
                </p>
              </div>

              <Link
                href="/upload"
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-sm sm:text-base"
              >
                <span className="relative z-10">Розпочати зараз</span>
                <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12 max-w-2xl mx-auto">
            <StatCard number="10x" label="Швидше" />
            <StatCard number="99%" label="Точність" />
            <StatCard number="24/7" label="Доступність" />
          </div>

          <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
              <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-yellow-300" />
              <span className="text-white font-semibold text-sm sm:text-base">
                Що нас чекає далі
              </span>
            </div>
            <p className="text-white/70 text-center max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-2">
              Незабаром додамо роботу з лікарями, ЛПК-закладами, аналітику в
              реальному часі, інтеграцію з популярними сервісами та багато інших
              корисних функцій
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
