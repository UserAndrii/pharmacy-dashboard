import { AlertCircle, CheckCircle } from "lucide-react";

interface AlertMessageProps {
  type: "error" | "success";
  message: string;
  title?: string;
}

export const AlertMessage: React.FC<AlertMessageProps> = ({
  type,
  message,
  title,
}) => {
  const isError = type === "error";
  const bgColor = isError ? "bg-red-50" : "bg-green-50";
  const borderColor = isError ? "border-red-200" : "border-green-200";
  const iconColor = isError ? "text-red-500" : "text-green-500";
  const titleColor = isError ? "text-red-700" : "text-green-700";
  const messageColor = isError ? "text-red-600" : "text-green-600";

  const Icon = isError ? AlertCircle : CheckCircle;
  const defaultTitle = isError ? "Помилка" : "Успішно!";

  return (
    <div className={`${bgColor} border ${borderColor} rounded-xl p-4`}>
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <p className={`${titleColor} font-medium`}>{title || defaultTitle}</p>
      </div>
      <p className={`${messageColor} mt-1`}>{message}</p>
    </div>
  );
};
