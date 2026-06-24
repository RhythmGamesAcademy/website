import Link from 'next/link';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

export default function Button({
  href,
  onClick,
  children,
  variant = 'primary',
  className = '',
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center px-5 py-2.5 font-semibold text-sm transition-all duration-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-purple)]';

  let variantClasses = '';
  if (variant === 'primary') {
    variantClasses =
      'bg-[var(--color-accent-purple)] text-white hover:bg-[var(--color-accent-pink)] shadow-sm hover:shadow-md';
  } else if (variant === 'secondary') {
    variantClasses =
      'bg-[var(--color-accent-blush)] text-[var(--color-accent-pink)] border border-[var(--color-accent-pink)] hover:bg-[var(--color-accent-pink)] hover:text-white';
  } else if (variant === 'outline') {
    variantClasses =
      'bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-accent-purple)] hover:text-[var(--color-accent-purple)]';
  }

  const classes = `${baseClasses} ${variantClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
