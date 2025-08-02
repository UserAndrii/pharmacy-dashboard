export const FeatureCard = ({
  icon,
  title,
  description,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) => (
  <div className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
    <div
      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} mb-6 shadow-lg group-hover:shadow-xl transition-shadow flex-shrink-0`}
    >
      <div className="text-white">{icon}</div>
    </div>
    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-300 transition-colors">
      {title}
    </h3>
    <div className="text-white/70 leading-relaxed">{description}</div>
  </div>
);
