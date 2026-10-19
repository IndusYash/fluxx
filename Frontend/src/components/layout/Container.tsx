import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className = "", ...props }: ContainerProps) {
  return (
    <div
      className={`w-full max-w-[1440px] 2xl:max-w-[1800px] mx-auto px-[var(--gutter)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

