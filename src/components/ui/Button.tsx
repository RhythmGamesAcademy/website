import Link from 'next/link';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

export default function Button({ href, onClick, children, variant = 'primary', className = '' }: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center px-4 py-2 font-bold transition-all duration-300 rounded-sm focus:outline-none';
  
  let variantClasses = '';
  if (variant === 'primary') {
    variantClasses = 'bg-transparent border border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-bg-deep shadow-[0_0_10px_rgba(0,240,255,0.3)] hover:shadow-[0_0_20px_rgba(0,240,255,0.6)]';
  } else if (variant === 'secondary') {
    variantClasses = 'bg-transparent border border-accent-pink text-accent-pink hover:bg-accent-pink hover:text-bg-deep shadow-[0_0_10px_rgba(255,45,149,0.3)] hover:shadow-[0_0_20px_rgba(255,45,149,0.6)]';
  } else if (variant === 'outline') {
    variantClasses = 'bg-transparent border border-text-secondary text-text-primary hover:border-text-primary';
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
