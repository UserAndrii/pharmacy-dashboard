export const StatCard = ({
  number,
  label,
}: {
  number: string;
  label: string;
}) => (
  <div className="text-center">
    <div className="text-3xl font-black text-white mb-2 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
      {number}
    </div>
    <div className="text-white/60 text-sm font-medium">{label}</div>
  </div>
);
