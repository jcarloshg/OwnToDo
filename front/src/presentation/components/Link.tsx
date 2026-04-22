'use client';

import Link, { LinkProps } from 'next/link';
import { AnchorHTMLAttributes, ReactNode } from 'react';

interface CustomLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  variant?: 'primary' | 'secondary' | 'third';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const CustomLink = ({
  className = '',
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: CustomLinkProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-10 py-4 text-lg',
  };

  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30',
    secondary: 'bg-accent text-white hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/30',
    third: 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md',
  };

  return (
    <Link
      href={props.href}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

CustomLink.displayName = 'CustomLink';

export { CustomLink };
export type { CustomLinkProps };
