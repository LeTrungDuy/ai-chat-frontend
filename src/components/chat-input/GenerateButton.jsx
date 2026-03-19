import { MagicWandIcon, PaperPlaneIcon } from '@radix-ui/react-icons';

const GenerateButton = ({ onClick, canSend, visible, hasMessages = false }) => {
  const Icon = hasMessages ? PaperPlaneIcon : MagicWandIcon;
  const label = hasMessages ? 'Send' : 'Generate';

  return (
    <div className="flex w-[124px] justify-end">
      <button
        type="button"
        onClick={onClick}
        disabled={!canSend}
        className={`flex h-10 items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-xs text-white font-semibold transition-all duration-200 hover:bg-blue-700 disabled:opacity-50 ${
          visible ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'
        }`}
        title={`${label} message (or press Enter)`}
      >
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </button>
    </div>
  );
};

export default GenerateButton;
