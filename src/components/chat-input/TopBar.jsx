import { useState } from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';
import geminiIcon from '@/assets/gemini-icon.svg';

const TopBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="gap-2 px-4 py-2 rounded-t-[12px] relative flex-nowrap h-[37px] bg-[var(--color-topbar-bg)] mx-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={geminiIcon} alt="Gemini" className="h-5 w-5" />
        </div>
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-slate-600"
          aria-label="Close top bar"
        >
          <Cross2Icon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
