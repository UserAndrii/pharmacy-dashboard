import { CheckCircle, Upload } from "lucide-react";
import { FileFormatInfo } from "./FileFormatInfo";

interface FileUploadZoneProps {
  file: File | null;
  isDragOver: boolean;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileRemove: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  file,
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
  onFileRemove,
  fileInputRef,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Вибір файлу</h2>

      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
          isDragOver
            ? "border-blue-400 bg-blue-50"
            : file
            ? "border-green-400 bg-green-50"
            : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={onFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        {file ? (
          <div className="space-y-4">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
            <div>
              <p className="text-lg font-medium text-green-700">{file.name}</p>
              <p className="text-sm text-green-600">
                Розмір: {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              type="button"
              onClick={onFileRemove}
              className="text-sm text-red-600 hover:text-red-700 underline"
            >
              Видалити файл
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className="w-12 h-12 text-gray-400 mx-auto" />
            <div>
              <p className="text-lg font-medium text-gray-700">
                Перетягніть файл сюди або натисніть для вибору
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Підтримуються файли .xlsx та .xls (макс. 10MB)
              </p>
            </div>
          </div>
        )}
      </div>

      <FileFormatInfo />
    </div>
  );
};
