import * as React from 'react';
import Button from './button';

type DialogProps = {
  title?: string;
  description?: string;
  trigger?: React.ReactNode;
  children?: React.ReactNode;
};

export default function Dialog({ title, description, trigger, children }: DialogProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)} className="inline-block">
        {trigger ?? <Button>Open</Button>}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="bg-white rounded-lg p-6 z-10 w-[90%] max-w-lg shadow-lg">
            {title && <h3 className="text-lg font-bold mb-2">{title}</h3>}
            {description && <p className="text-sm text-slate-600 mb-4">{description}</p>}
            <div>{children}</div>
            <div className="mt-4 flex justify-end">
              <Button onClick={() => setOpen(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
