import { Pharmacy } from "@/types/pharmacy";
import { ChevronRight, MapPin, Phone, User } from "lucide-react";

interface PharmacyCardProps {
  pharmacy: Pharmacy;
  onClick: (pharmacy: Pharmacy) => void;
}

export const PharmacyCard: React.FC<PharmacyCardProps> = ({
  pharmacy,
  onClick,
}) => {
  return (
    <div
      className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer"
      onClick={() => onClick(pharmacy)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">
            {pharmacy.pharmacyName}
          </h3>
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-medium rounded-full">
            {pharmacy.pharmacyType}
          </span>
        </div>
        <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-cyan-300 transform group-hover:translate-x-1 transition-all duration-300" />
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-white/90 font-medium">{pharmacy.respondent}</p>
          <p className="text-white/60 text-sm">{pharmacy.position}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex-shrink-0">
          <Phone className="w-4 h-4 text-white" />
        </div>
        <span className="text-white/80">{pharmacy.phone}</span>
      </div>

      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex-shrink-0 mt-0.5">
          <MapPin className="w-4 h-4 text-white" />
        </div>
        <span className="text-white/70 text-sm leading-relaxed">
          {pharmacy.fullAddress}
        </span>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};
