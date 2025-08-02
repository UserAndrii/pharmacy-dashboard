import { CreatePharmacyData } from "@/types/pharmacy";

interface FormFieldProps {
  label: string;
  name: keyof CreatePharmacyData;
  value: string;
  onChange: (name: keyof CreatePharmacyData, value: string) => void;
  disabled?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  placeholder?: string;
  type?: "text" | "tel";
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  disabled = false,
  icon: Icon,
  placeholder,
  type = "text",
}) => {
  return (
    <div className="space-y-2">
      <label className="text-white/80 text-sm font-medium">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Icon className="w-4 h-4 text-white/60" />
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full pl-10 pr-2 py-2 rounded-lg border transition-all duration-200 ${
            disabled
              ? "bg-white/5 border-white/10 text-white/70 cursor-not-allowed"
              : "bg-white/10 border-white/20 text-white placeholder-white/50 focus:bg-white/15 focus:border-cyan-400 focus:outline-none"
          }`}
        />
      </div>
    </div>
  );
};
