import { ArrowLeftIcon } from '@radix-ui/react-icons';

const ChatConversationActions = ({ hasMessages, onBack }) => {
  if (!hasMessages) return null;

  return (
    <div className="mt-3 mx-auto w-full max-w-2xl px-8">
      <button
        type="button"
        onClick={onBack}
        className="flex h-9 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 text-xs font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back
      </button>
    </div>
  );
};

export default ChatConversationActions;
