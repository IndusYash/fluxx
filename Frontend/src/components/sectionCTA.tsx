// components/SectionCTA.tsx
import { Link } from 'react-router-dom';

interface SectionCTAProps {
  to: string;
  label: string;
  variant?: 'primary' | 'outline'; // default = primary
}

export default function SectionCTA({ to, label, variant = 'primary' }: SectionCTAProps) {
  const baseClasses = `
    inline-flex items-center justify-center
    rounded-md px-5 py-3 font-medium
    transition
  `;

  const variantClasses =
    variant === 'primary'
      ? 'bg-primary text-black hover:brightness-110'
      : 'border border-border hover:bg-card';

  return (
    <Link to={to} className={`${baseClasses} ${variantClasses}`}>
      {label}
    </Link>
  );
}
