import { TrashIcon } from '@radix-ui/react-icons';
import { formatDateTime } from '../../utils/tools';

const ConversationHistoryItem = ({
  conversation,
  isActive,
  loading,
  onSelectConversation,
  onDeleteConversation,
}) => {
  const title = conversation.title || 'New conversation';
  const preview = conversation.lastMessage || 'No messages yet';

  return (
    <li>
      <div
        className={`group w-full rounded-xl border px-3 py-2 text-left transition-colors ${
          isActive
            ? 'border-blue-300 bg-blue-50'
            : 'border-transparent bg-gray-50 hover:border-gray-200 hover:bg-gray-100'
        }`}
      >
        <div className="flex items-start gap-2">
          <button
            type="button"
            onClick={() => onSelectConversation(conversation.conversationId)}
            disabled={loading}
            className="min-w-0 flex-1 text-left disabled:cursor-not-allowed disabled:opacity-60"
          >
            <p className="truncate text-sm font-medium text-gray-900">{title}</p>
            <p className="mt-1 truncate text-xs text-gray-600">{preview}</p>
            <p className="mt-1 text-[11px] text-gray-400">
              {formatDateTime(conversation.updatedAt)}
            </p>
          </button>

          <button
            type="button"
            onClick={() => onDeleteConversation(conversation.conversationId)}
            className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-gray-400 opacity-0 transition-all duration-150 hover:bg-red-50 hover:text-red-600 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200 group-hover:opacity-100"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default ConversationHistoryItem;
