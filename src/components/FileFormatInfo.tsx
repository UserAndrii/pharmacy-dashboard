export const FileFormatInfo: React.FC = () => {
  const cellLabels = [
    "@city",
    "@region",
    "@respondent",
    "@pharmacyName",
    "@fullAddress",
    "@address",
    "@edrpou",
    "@phone",
    "@experience",
    "@position",
    "@ageCategory",
    "@pharmacyType",
    "@dailyPatients",
    "@employeeCount",
    "@institutionType",
    "@institutionName",
    "@dosageForm",
    "@manufacturer",
  ];

  return (
    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
      <h3 className="font-medium text-blue-900 mb-2">
        Формат позначених комірок:
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-blue-700">
        {cellLabels.map((label) => (
          <div key={label}>{label}</div>
        ))}
      </div>
    </div>
  );
};
