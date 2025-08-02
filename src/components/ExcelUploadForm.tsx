"use client";
import { useState } from "react";

import axios from "@/lib/api";

export const ExcelUploadForm = () => {
  const [markerFields, setMarkerFields] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    if (markerFields.trim()) {
      formData.append("markerFieldNames", markerFields);
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/excel/upload", formData, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "filled-pharmacies.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      alert("Помилка під час завантаження");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        accept=".xlsx"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        required
      />
      <input
        type="text"
        placeholder="experience,position,ageCategory"
        value={markerFields}
        onChange={(e) => setMarkerFields(e.target.value)}
        className="border p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Обробка..." : "Завантажити та обробити"}
      </button>
    </form>
  );
};
