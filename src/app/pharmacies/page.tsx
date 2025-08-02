"use client";
import { useEffect, useMemo, useState } from "react";
import { Building2, Plus, Search } from "lucide-react";

import instance from "@/lib/api";
import { SearchBar } from "@/components/SearchBar";
import { PharmacyCard } from "@/components/PharmacyCard";
import { ErrorMessage } from "@/components/ErrorMessage";
import { PharmacyModal } from "@/components/PharmacyModal";
import { LoadingSpinner } from "@/components/LoadingSpinner";

import { Pharmacy } from "@/types/pharmacy";

export type ModalMode = "view" | "edit" | "create" | "delete";

const PharmacyPage: React.FC = () => {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<ModalMode>("view");

  const fetchPharmacies = async (): Promise<void> => {
    try {
      setLoading(true);
      setError("");
      const response = await instance.get<Pharmacy[]>("/pharmacies");
      setPharmacies(response.data);
    } catch (err) {
      console.error("Error fetching pharmacies:", err);
      setError("Не вдалося завантажити список аптек. Спробуйте пізніше.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPharmacies();
  }, []);

  const filteredPharmacies = useMemo(() => {
    if (!searchTerm.trim()) return pharmacies;

    const searchLower = searchTerm.toLowerCase();
    return pharmacies.filter(
      (pharmacy) =>
        pharmacy.respondent.toLowerCase().includes(searchLower) ||
        pharmacy.pharmacyName.toLowerCase().includes(searchLower) ||
        pharmacy.fullAddress.toLowerCase().includes(searchLower)
    );
  }, [pharmacies, searchTerm]);

  const handlePharmacyClick = (pharmacy: Pharmacy): void => {
    setSelectedPharmacy(pharmacy);
    setModalMode("view");
    setIsModalOpen(true);
  };

  const handleCreateClick = (): void => {
    setSelectedPharmacy(null);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedPharmacy(null);
      setModalMode("view");
    }, 300);
  };

  const handlePharmacyUpdate = (updatedPharmacy: Pharmacy): void => {
    setPharmacies((prev) =>
      prev.map((pharmacy) =>
        pharmacy._id === updatedPharmacy._id ? updatedPharmacy : pharmacy
      )
    );
    setSelectedPharmacy(updatedPharmacy);
  };

  const handlePharmacyCreate = (newPharmacy: Pharmacy): void => {
    setPharmacies((prev) => [newPharmacy, ...prev]);
  };

  const handlePharmacyDelete = (deletedPharmacyId: string): void => {
    setPharmacies((prev) =>
      prev.filter((pharmacy) => pharmacy._id !== deletedPharmacyId)
    );
    setSelectedPharmacy((prev) =>
      prev?._id === deletedPharmacyId ? null : prev
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-6 sm:mb-10">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl sm:rounded-2xl mb-3 sm:mb-6 shadow-2xl">
              <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-2 sm:mb-4 text-center sm:text-left">
              База даних аптек
            </h1>
          </div>
          <p className="text-base sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed px-4">
            Знайдіть інформацію про аптеки, контактні дані та відповідальних
            осіб
          </p>
        </div>

        <div className="flex justify-center items-center">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            resultsCount={filteredPharmacies.length}
            totalCount={pharmacies.length}
          >
            <button
              onClick={handleCreateClick}
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 w-full min-w-fit bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-sm sm:text-lg font-semibold rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Створити нову аптеку</span>
              <span className="sm:hidden">Створити</span>
            </button>
          </SearchBar>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} onRetry={fetchPharmacies} />
        ) : (
          <>
            {!searchTerm && (
              <div className="pl-3 mt-1 mb-10">
                <span className="text-white/60">
                  Всього аптек: {pharmacies.length}
                </span>
              </div>
            )}

            {filteredPharmacies.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPharmacies.map((pharmacy) => (
                  <PharmacyCard
                    key={pharmacy._id}
                    pharmacy={pharmacy}
                    onClick={handlePharmacyClick}
                  />
                ))}
              </div>
            ) : searchTerm ? (
              <div className="text-center py-12">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-md mx-auto">
                  <Search className="w-12 h-12 text-white/40 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Нічого не знайдено
                  </h3>
                  <p className="text-white/60">
                    Спробуйте змінити пошуковий запит
                  </p>
                </div>
              </div>
            ) : null}
          </>
        )}
        <PharmacyModal
          pharmacy={selectedPharmacy}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          mode={modalMode}
          onPharmacyUpdate={handlePharmacyUpdate}
          onPharmacyCreate={handlePharmacyCreate}
          onPharmacyDelete={handlePharmacyDelete}
        />
      </div>
    </div>
  );
};

export default PharmacyPage;
