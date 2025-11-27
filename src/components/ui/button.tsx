import * as React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'ghost' | 'outline';
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = 'default', children, ...props }, ref) => {
  const base = 'inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors';
  const variants = {
    default: 'bg-slate-800 text-white hover:bg-slate-900',
    ghost: 'bg-transparent text-slate-800 hover:bg-slate-100',
    outline: 'border border-slate-200 text-slate-800 hover:bg-slate-50'
  }[variant];

  return (
    <button ref={ref} className={clsx(base, variants, className)} {...props}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
