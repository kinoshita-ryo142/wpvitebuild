import * as React from 'react';
import Button from './button';

export default function BackToTop() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <Button
        aria-label="ページトップへ戻る"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="shadow-lg"
      >
        ↑ トップ
      </Button>
    </div>
  );
}
