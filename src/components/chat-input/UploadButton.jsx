import { PlusIcon } from '@radix-ui/react-icons';

const UploadButton = ({ onClick, disabled }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-8 h-8 shrink-0 self-end rounded-xl transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      aria-label="Upload image or document"
    >
      <PlusIcon className="mx-auto h-5 w-5" />
    </button>
  );
};

export default UploadButton;
