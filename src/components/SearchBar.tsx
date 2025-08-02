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
    <div className="relative w-full px-3">
      <div className="relative flex items-center justify-center gap-3">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
        <input
          type="text"
          placeholder="Пошук за назвою аптеки, відповідальною особою або адресою..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-lg"
        />
        {children}
      </div>
      {searchTerm && (
        <div className="pl-3 mt-1 mb-10">
          <span className="text-white/70 text-sm">
            Знайдено {resultsCount} з {totalCount} аптек
          </span>
        </div>
      )}
    </div>
  );
};
