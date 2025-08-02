import { Search } from "lucide-react";
import { ReactNode } from "react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  resultsCount: number;
  totalCount: number;
  children?: ReactNode;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  resultsCount,
  totalCount,
  children,
}) => {
  return (
    <div className="relative w-full px-3 sm:px-4">
      <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder="Пошук за назвою аптеки, відповідальною особою або адресою..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 sm:pl-12 pr-4 sm:pr-6 py-3 sm:py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl sm:rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-sm sm:text-lg"
          />
        </div>
        <div className="flex-shrink-0">{children}</div>
      </div>
      {searchTerm && (
        <div className="pl-3 mt-2 sm:mt-3 mb-6 sm:mb-10">
          <span className="text-white/70 text-xs sm:text-sm">
            Знайдено {resultsCount} з {totalCount} аптек
          </span>
        </div>
      )}
    </div>
  );
};
