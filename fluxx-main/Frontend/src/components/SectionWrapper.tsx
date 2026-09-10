// components/SectionWrapper.tsx
import { ReactNode } from 'react';

interface SectionWrapperProps {
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  cta?: ReactNode;
  background?: string; // e.g. "bg-card/60" or "bg-muted/50"
}

export default function SectionWrapper({
  title,
  description,
  children,
  cta,
  background = "",
}: SectionWrapperProps) {
  return (
    <section className={`section ${background}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER BLOCK */}
        <div className="max-w-3xl mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
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
