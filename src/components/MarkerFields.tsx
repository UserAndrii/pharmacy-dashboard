import { useMemo } from "react";
import { Plus, X } from "lucide-react";
import { Pharmacy } from "@/types/pharmacy";

const AVAILABLE_MARKERS: (keyof Omit<Pharmacy, "_id">)[] = [
  "experience",
  "ageCategory",
  "position",
  "pharmacyType",
  "dailyPatients",
  "employeeCount",
  "institutionType",
  "dosageForm",
  "manufacturer",
];

interface MarkerFieldsProps {
  markerFields: string[];
  onAddField: () => void;
  onRemoveField: (index: number) => void;
  onUpdateField: (index: number, value: string) => void;
  onSetAllFields?: (fields: string[]) => void;
}

export const MarkerFields: React.FC<MarkerFieldsProps> = ({
  markerFields,
  onAddField,
  onRemoveField,
  onUpdateField,
  onSetAllFields,
}) => {
  const handleAddAll = () => {
    onSetAllFields?.(AVAILABLE_MARKERS as string[]);
  };

  const allAdded = useMemo(
    () => AVAILABLE_MARKERS.every((m) => markerFields.includes(m as string)),
    [markerFields]
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Поля маркерів (опціонально)
      </h2>
      <p className="text-gray-600 mb-6">
        Додайте назви полів для спеціального відмічення. Система знайде
        відповідні значення в комірках та відмітить сусідні комірки зліва цифрою
        &quot;1&quot;
      </p>

      <div className="space-y-3">
        {markerFields.map((field, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="flex-1">
              <select
                value={field}
                onChange={(e) => onUpdateField(index, e.target.value)}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 ${
                  field &&
                  AVAILABLE_MARKERS.includes(
                    field as keyof Omit<Pharmacy, "_id">
                  )
                    ? "text-black"
                    : "text-gray-500"
                }`}
              >
                <option value="">Виберіть поле маркера</option>
                {AVAILABLE_MARKERS.map((marker) => (
                  <option key={marker} value={marker}>
                    {marker}
                  </option>
                ))}
              </select>
            </div>

            {markerFields.length > 1 && (
              <button
                type="button"
                onClick={() => onRemoveField(index)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={onAddField}
          disabled={allAdded}
          className={`inline-flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
            allAdded
              ? "text-gray-400 border-gray-300 cursor-not-allowed"
              : "text-blue-600 border-blue-300 hover:bg-blue-50"
          }`}
        >
          <Plus className="w-4 h-4" />
          Додати поле маркера
        </button>

        <button
          type="button"
          onClick={handleAddAll}
          disabled={allAdded}
          className={`inline-flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
            allAdded
              ? "text-gray-400 border-gray-300 cursor-not-allowed"
              : "text-green-600 border-green-300 hover:bg-green-50"
          }`}
        >
          <Plus className="w-4 h-4" />
          Додати всі маркери
        </button>
      </div>
    </div>
  );
};
