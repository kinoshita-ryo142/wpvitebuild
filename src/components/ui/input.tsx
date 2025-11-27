import * as React from 'react';
import clsx from 'clsx';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={clsx('w-full px-3 py-2 border rounded-md text-sm bg-white text-slate-800 placeholder:text-slate-400', className)}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
