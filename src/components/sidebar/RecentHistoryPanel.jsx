import { useState } from 'react';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import ConversationHistoryItem from './ConversationHistoryItem';
import HistorySearchInput from './HistorySearchInput';

const RecentHistoryPanel = ({
  isOpen,
  isMobile = false,
  onClose,
  conversations,
  activeConversationId,
  loading,
  onSelectConversation,
  onDeleteConversation,
}) => {
  const [search, setSearch] = useState('');

  const filteredConversations = conversations.filter((conversation) => {
    if (!search.trim()) return true;
    const query = search.toLowerCase();
    return (
      (conversation.title || '').toLowerCase().includes(query) ||
      (conversation.lastMessage || '').toLowerCase().includes(query)
    );
  });

  return (
    <aside
      className={`flex flex-col overflow-hidden bg-white ${
        isMobile
          ? 'h-full w-full'
          : `border-r border-gray-200 shadow-[8px_0_24px_rgba(16,24,40,0.08)] transition-all duration-300 ease-in-out ${
              isOpen ? 'w-[320px] opacity-100' : 'pointer-events-none w-0 opacity-0'
            }`
      }`}
    >
      <div className="flex items-center justify-between border-b border-gray-200 px-3 py-3">
        <h2 className="text-sm font-semibold text-gray-900">Recent</h2>
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-100"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        <HistorySearchInput value={search} onChange={(e) => setSearch(e.target.value)} />

        {conversations.length === 0 ? (
          <p className="px-2 py-4 text-sm text-gray-500">
            There is no conversation history available.
          </p>
        ) : filteredConversations.length === 0 ? (
          <p className="px-2 py-4 text-sm text-gray-500">No conversations match your search.</p>
        ) : (
          <ul className="space-y-2">
            {filteredConversations.map((conversation) => (
              <ConversationHistoryItem
                key={conversation.conversationId}
                conversation={conversation}
                isActive={activeConversationId === conversation.conversationId}
                loading={loading}
                onSelectConversation={onSelectConversation}
                onDeleteConversation={onDeleteConversation}
              />
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default RecentHistoryPanel;
