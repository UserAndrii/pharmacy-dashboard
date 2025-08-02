import { Loader2 } from "lucide-react";

interface ProgressBarProps {
  isUploading: boolean;
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  isUploading,
  progress,
}) => {
  if (!isUploading) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-3">
        <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
        <span className="font-medium text-gray-900">Завантаження файлу...</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-gray-600 mt-2">{progress}% завершено</p>
    </div>
  );
};
