"use client";
import { Building2, Plus, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

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
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl mb-6 shadow-2xl">
              <Building2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              База даних аптек
            </h1>
          </div>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Знайдіть інформацію про аптеки, контактні дані та відповідальних
            осіб
          </p>
        </div>

        <div className="flex justify-center items-center gap-3">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            resultsCount={filteredPharmacies.length}
            totalCount={pharmacies.length}
          >
            <button
              onClick={handleCreateClick}
              className="inline-flex items-center gap-3 px-6 py-4 min-w-fit bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Створити нову аптеку
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
