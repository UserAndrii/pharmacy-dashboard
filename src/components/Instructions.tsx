export const Instructions: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: "Підготуйте Excel файл",
      description:
        "Додайте позначки (@region, @address тощо) в комірки, які потрібно заповнити",
    },
    {
      number: 2,
      title: "Завантажте файл",
      description: "Перетягніть файл або виберіть його через кнопку",
    },
    {
      number: 3,
      title: "Додайте маркери (опціонально)",
      description: "Вкажіть поля для спеціального відмічення в анкетах",
    },
    {
      number: 4,
      title: "Отримайте результат",
      description: "Система автоматично заповнить файл та завантажить його",
    },
  ];

  return (
    <div className="mt-12 bg-gray-50 rounded-2xl p-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Як це працює?
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        {steps.map((step) => (
          <div key={step.number} className="flex items-start gap-3">
            <div className="min-w-6 min-h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              {step.number}
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{step.title}</h4>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
