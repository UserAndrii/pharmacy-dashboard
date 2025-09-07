import instance from "@/lib/api";
import { CreatePharmacyData, Pharmacy } from "@/types/pharmacy";
import {
  Briefcase,
  Building2,
  Calendar,
  Edit2,
  Globe,
  MapPin,
  Phone,
  Save,
  Trash,
  User,
  Users,
  X,
  XCircle,
  AlertTriangle,
  Pill,
  Factory,
} from "lucide-react";
import { useEffect, useState } from "react";
import { FormField } from "./FormField";
import { ModalMode } from "@/app/pharmacies/page";

const initialFormData = {
  city: "",
  region: "",
  respondent: "",
  fullAddress: "",
  pharmacyName: "",
  address: "",
  edrpou: "",
  phone: "",
  experience: "",
  position: "",
  ageCategory: "",
  pharmacyType: "",
  dailyPatients: "",
  employeeCount: "",
  institutionType: "",
  institutionName: "",
  dosageForm: "",
  manufacturer: "",
};

interface PharmacyModalProps {
  pharmacy: Pharmacy | null;
  isOpen: boolean;
  onClose: () => void;
  mode: ModalMode;
  onPharmacyUpdate: (pharmacy: Pharmacy) => void;
  onPharmacyCreate: (pharmacy: Pharmacy) => void;
  onPharmacyDelete: (deletedPharmacyId: string) => void;
}

export const PharmacyModal: React.FC<PharmacyModalProps> = ({
  pharmacy,
  isOpen,
  onClose,
  mode: initialMode,
  onPharmacyUpdate,
  onPharmacyCreate,
  onPharmacyDelete,
}) => {
  const [mode, setMode] = useState<ModalMode>(initialMode);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  const [formData, setFormData] = useState<CreatePharmacyData>(initialFormData);

  useEffect(() => {
    setMode(initialMode);
    if (initialMode === "create") {
      setFormData(initialFormData);
    } else if (pharmacy) {
      setFormData({
        city: pharmacy.city,
        region: pharmacy.region,
        respondent: pharmacy.respondent,
        fullAddress: pharmacy.fullAddress,
        pharmacyName: pharmacy.pharmacyName,
        address: pharmacy.address,
        edrpou: pharmacy.edrpou,
        phone: pharmacy.phone,
        experience: pharmacy.experience,
        position: pharmacy.position,
        ageCategory: pharmacy.ageCategory,
        pharmacyType: pharmacy.pharmacyType,
        dailyPatients: pharmacy.dailyPatients,
        employeeCount: pharmacy.employeeCount,
        institutionType: pharmacy.institutionType,
        institutionName: pharmacy.institutionName,
        dosageForm: pharmacy.dosageForm,
        manufacturer: pharmacy.manufacturer,
      });
    }
    setError("");
    setShowDeleteConfirm(false);
  }, [pharmacy, initialMode]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showDeleteConfirm) {
          setShowDeleteConfirm(false);
        } else {
          handleClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, showDeleteConfirm]);

  const handleClose = () => {
    setMode(initialMode);
    setError("");
    setShowDeleteConfirm(false);
    onClose();
  };

  const handleFieldChange = (name: keyof CreatePharmacyData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setMode("edit");
    setError("");
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    setError("");

    if (pharmacy) {
      try {
        const response = await instance.delete<Pharmacy>(
          `/pharmacies/${pharmacy._id}`
        );
        if (response) {
          onPharmacyDelete(pharmacy._id);
          handleClose();
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Error deleting pharmacy:", err);
        setError(err.response?.data?.message || "Помилка при видаленні аптеки");
      } finally {
        setLoading(false);
        setShowDeleteConfirm(false);
      }
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  const handleCancel = () => {
    if (pharmacy) {
      setFormData({
        city: pharmacy.city,
        region: pharmacy.region,
        respondent: pharmacy.respondent,
        fullAddress: pharmacy.fullAddress,
        pharmacyName: pharmacy.pharmacyName,
        address: pharmacy.address,
        edrpou: pharmacy.edrpou,
        phone: pharmacy.phone,
        experience: pharmacy.experience,
        position: pharmacy.position,
        ageCategory: pharmacy.ageCategory,
        pharmacyType: pharmacy.pharmacyType,
        dailyPatients: pharmacy.dailyPatients,
        employeeCount: pharmacy.employeeCount,
        institutionType: pharmacy.institutionType,
        institutionName: pharmacy.institutionName,
        dosageForm: pharmacy.dosageForm,
        manufacturer: pharmacy.manufacturer,
      });
    }
    setMode("view");
    setError("");
  };

  const validateForm = (): boolean => {
    const requiredFields: (keyof CreatePharmacyData)[] = [
      "pharmacyName",
      "respondent",
      "phone",
      "address",
      "city",
      "region",
    ];

    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        setError(`Поле "${getFieldLabel(field)}" є обов'язковим`);
        return false;
      }
    }
    return true;
  };

  const getFieldLabel = (field: keyof CreatePharmacyData): string => {
    const labels: Record<keyof CreatePharmacyData, string> = {
      pharmacyName: "Назва аптеки",
      respondent: "Відповідальна особа",
      phone: "Телефон",
      address: "Адреса",
      city: "Місто",
      region: "Регіон",
      fullAddress: "Повна адреса",
      edrpou: "ЄДРПОУ",
      experience: "Досвід роботи",
      position: "Посада",
      ageCategory: "Вікова категорія",
      pharmacyType: "Тип аптеки",
      dailyPatients: "Денна кількість пацієнтів",
      employeeCount: "Кількість співробітників",
      institutionType: "Тип лікувальної установи",
      institutionName: "Назва лікувальної установи",
      dosageForm: "Лікарська форма препарату",
      manufacturer: "Виробник лікарських засобів",
    };
    return labels[field];
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      if (mode === "create") {
        const response = await instance.post<Pharmacy>("/pharmacies", formData);
        onPharmacyCreate(response.data);
        handleClose();
      } else if (mode === "edit" && pharmacy) {
        const response = await instance.patch<Pharmacy>(
          `/pharmacies/${pharmacy._id}`,
          formData
        );
        onPharmacyUpdate(response.data);
        setMode("view");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error saving pharmacy:", err);
      setError(err.response?.data?.message || "Помилка при збереженні даних");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const isEditable = mode === "edit" || mode === "create";
  const showActionButtons = mode === "edit" || mode === "create";

  const formFields = [
    {
      name: "pharmacyName" as const,
      label: "Назва аптеки",
      icon: Building2,
      placeholder: "Введіть назву аптеки",
    },
    {
      name: "pharmacyType" as const,
      label: "Тип аптеки",
      icon: Briefcase,
      placeholder: "Мережева аптека, Приватна аптека",
    },
    {
      name: "respondent" as const,
      label: "Відповідальна особа",
      icon: User,
      placeholder: "ПІБ відповідальної особи",
    },
    {
      name: "position" as const,
      label: "Посада",
      icon: Briefcase,
      placeholder: "Посада відповідальної особи",
    },
    {
      name: "phone" as const,
      label: "Телефон",
      icon: Phone,
      placeholder: "063-030-1943",
      type: "tel" as const,
    },
    {
      name: "city" as const,
      label: "Місто",
      icon: Building2,
      placeholder: "Назва міста",
    },
    {
      name: "region" as const,
      label: "Регіон",
      icon: Globe,
      placeholder: "Назва регіону",
    },
    {
      name: "address" as const,
      label: "Адреса",
      icon: MapPin,
      placeholder: "Вулиця, номер будинку",
    },
    {
      name: "fullAddress" as const,
      label: "Повна адреса",
      icon: MapPin,
      placeholder: "Повна адреса з індексом",
    },
    {
      name: "edrpou" as const,
      label: "ЄДРПОУ",
      icon: Briefcase,
      placeholder: "Код ЄДРПОУ",
    },
    {
      name: "experience" as const,
      label: "Досвід роботи",
      icon: Calendar,
      placeholder: "1-3, 5-10, 10+",
    },
    {
      name: "ageCategory" as const,
      label: "Вікова категорія",
      icon: User,
      placeholder: "18-30, 31-45, 46-60, 60+",
    },
    {
      name: "dailyPatients" as const,
      label: "Денна кількість пацієнтів",
      icon: Users,
      placeholder: "10-20, 20-30, 30+",
    },
    {
      name: "employeeCount" as const,
      label: "Кількість співробітників",
      icon: Users,
      placeholder: "1-2, 3-5, 5+",
    },
    {
      name: "institutionType" as const,
      label: "Тип лікувальної установи",
      icon: Building2,
      placeholder: "Лікарня, Поліклініка, Немає",
    },
    {
      name: "institutionName" as const,
      label: "Назва лікувальної установи",
      icon: Building2,
      placeholder: "Введіть назву ЛПУ",
    },
    {
      name: "dosageForm" as const,
      label: "Лікарська форма препарату",
      icon: Pill,
      placeholder: "Оральний розчин, Ін'єкційний розчин, Капсули",
    },
    {
      name: "manufacturer" as const,
      label: "Виробник лікарських засобів",
      icon: Factory,
      placeholder: "Вітчизняний, Імпортний, Не має значення",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={showDeleteConfirm ? undefined : handleClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-3xl shadow-2xl w-full max-w-4xl transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6 border-b border-white/10 rounded-t-3xl z-50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  {mode === "create"
                    ? "Створити нову аптеку"
                    : formData.pharmacyName || "Аптека"}
                </h2>
                {mode !== "create" && (
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium rounded-full">
                    {formData.pharmacyType}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {showActionButtons && (
                  <div className="hidden md:flex items-center justify-end gap-4 pr-3">
                    {mode === "edit" && (
                      <button
                        onClick={handleCancel}
                        disabled={loading}
                        className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Скасувати
                      </button>
                    )}

                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[120px] justify-center"
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          {mode === "create" ? "Створити" : "Зберегти"}
                        </>
                      )}
                    </button>
                  </div>
                )}
                {mode === "view" && (
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={handleEdit}
                      className="p-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 transition-colors text-cyan-400"
                    >
                      <Edit2 className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleDeleteClick}
                      className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 transition-colors text-red-400"
                    >
                      <Trash className="w-6 h-6" />
                    </button>
                  </div>
                )}
                <button
                  onClick={handleClose}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formFields.map((field) => (
                <FormField
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  value={formData[field.name]}
                  onChange={handleFieldChange}
                  disabled={!isEditable}
                  icon={field.icon}
                  placeholder={field.placeholder}
                  type={field.type}
                />
              ))}
            </div>

            {showActionButtons && (
              <div className="flex items-center justify-end gap-4 pr-3 mt-6 md:hidden">
                {mode === "edit" && (
                  <button
                    onClick={handleCancel}
                    disabled={loading}
                    className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    Скасувати
                  </button>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[120px] justify-center"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      {mode === "create" ? "Створити" : "Зберегти"}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleDeleteCancel}
          />
          <div className="relative bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-md border border-red-500/30">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-red-500/20 rounded-full">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Підтвердження видалення
                </h3>
                <p className="text-gray-300 text-sm">
                  Цю дію неможливо скасувати
                </p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-300">
                Ви впевнені, що хочете видалити аптеку{" "}
                <span className="font-semibold text-white">
                  {formData.pharmacyName}
                </span>
                ?
              </p>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={handleDeleteCancel}
                disabled={loading}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Скасувати
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={loading}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[100px] justify-center"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Trash className="w-4 h-4" />
                    Видалити
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
