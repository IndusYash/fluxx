// components/SectionWrapper.tsx
import { ReactNode } from 'react';

interface SectionWrapperProps {
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  cta?: ReactNode;
  background?: string;
  headerClassName?: string;
  pb?: string;
}

export default function SectionWrapper({
  title,
  description,
  children,
  cta,
  background = "",
  headerClassName = "",
  pb = "pb-24 sm:pb-28",
}: SectionWrapperProps) {
  return (
    <section className={`${pb} ${background}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER BLOCK */}
        <div className={`max-w-3xl mb-8 text-center ${headerClassName}`}>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-lg text-gray-400 leading-relaxed">
              {description}
            </p>
          )}
          {cta && <div className="mt-6">{cta}</div>}
        </div>
        
        {/* CONTENT SLOT */}
        {children}
      </div>
    </section>
  );
}
