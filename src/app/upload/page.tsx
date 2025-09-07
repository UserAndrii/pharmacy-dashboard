"use client";
import React, { useState, useRef } from "react";
import { FileSpreadsheet, Download, Loader2 } from "lucide-react";

import instance from "@/lib/api";
import { FileUploadZone } from "@/components/FileUploadZone";
import { MarkerFields } from "@/components/MarkerFields";
import { ProgressBar } from "@/components/ProgressBar";
import { AlertMessage } from "@/components/AlertMessage";
import { Instructions } from "@/components/Instructions";

import { UploadProgress } from "@/types/uploadProgress";

const UploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [markerFields, setMarkerFields] = useState<string[]>([""]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (selectedFile: File): void => {
    setError("");
    setSuccess(false);

    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];

    if (
      !validTypes.includes(selectedFile.type) &&
      !selectedFile.name.match(/\.(xlsx|xls)$/i)
    ) {
      setError("Будь ласка, виберіть файл Excel (.xlsx або .xls)");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("Розмір файлу не повинен перевищувати 10MB");
      return;
    }

    setFile(selectedFile);
  };

  const handleFileRemove = (): void => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const addMarkerField = (): void => {
    setMarkerFields([...markerFields, ""]);
  };

  const removeMarkerField = (index: number): void => {
    if (markerFields.length > 1) {
      setMarkerFields(markerFields.filter((_, i) => i !== index));
    }
  };

  const updateMarkerField = (index: number, value: string): void => {
    const updated = [...markerFields];
    updated[index] = value;
    setMarkerFields(updated);
  };

  const setAllMarkerFields = (fields: string[]): void => {
    setMarkerFields(fields);
  };

  const handleSubmit = async (): Promise<void> => {
    if (!file) {
      setError("Будь ласка, виберіть файл для завантаження");
      return;
    }

    setIsUploading(true);
    setError("");
    setSuccess(false);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const validMarkerFields = markerFields.filter(
        (field) => field.trim() !== ""
      );
      if (validMarkerFields.length > 0) {
        formData.append("markerFieldNames", validMarkerFields.join(","));
      }

      const response = await instance.post("/excel/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
        onUploadProgress: (progressEvent: UploadProgress) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          }
        },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "filled-pharmacies.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setSuccess(true);
      setFile(null);
      setMarkerFields([""]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Upload error:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Помилка при завантаженні файлу. Спробуйте ще раз."
      );
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <FileSpreadsheet className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Завантаження Excel файлу
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Завантажте ваш Excel файл з позначеними комірками (@region,
            @address, @phone тощо) для автоматичного заповнення даними аптек з
            бази даних
          </p>
        </div>

        <div className="space-y-8">
          <FileUploadZone
            file={file}
            isDragOver={isDragOver}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onFileSelect={handleFileSelect}
            onFileRemove={handleFileRemove}
            fileInputRef={fileInputRef}
          />

          <MarkerFields
            markerFields={markerFields}
            onAddField={addMarkerField}
            onRemoveField={removeMarkerField}
            onUpdateField={updateMarkerField}
            onSetAllFields={setAllMarkerFields}
          />

          <ProgressBar isUploading={isUploading} progress={uploadProgress} />

          {error && <AlertMessage type="error" message={error} />}

          {success && (
            <AlertMessage
              type="success"
              message="Файл успішно оброблено та завантажено на ваш комп'ютер."
            />
          )}

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!file || isUploading}
              className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Обробка файлу...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Завантажити та обробити
                </>
              )}
            </button>
          </div>
        </div>

        <Instructions />
      </div>
    </div>
  );
};

export default UploadPage;
