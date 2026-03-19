import { useChat } from '../hooks/useChat';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import ConversationSidebar from './ConversationSidebar';

const ChatContainer = () => {
  const {
    messages,
    conversations,
    conversationId,
    loading,
    error,
    sendMessage,
    loadConversation,
    removeConversation,
    clearConversation,
    messagesEndRef,
  } = useChat();

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-app-bg)]">
      <ConversationSidebar
        conversations={conversations}
        activeConversationId={conversationId}
        loading={loading}
        onSelectConversation={loadConversation}
        onDeleteConversation={removeConversation}
        onNewChat={clearConversation}
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Header */}
        <div className="px-4 md:px-8">
          <ChatHeader />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-4 md:mx-8 mt-4 p-4 bg-red-100 border border-red-400 rounded-lg">
            <p className="text-red-800 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Messages Container */}
        <div className="flex min-h-0 flex-1 flex-col max-w-2xl mx-auto w-full px-4 md:px-8">
          <MessageList messages={messages} loading={loading} messagesEndRef={messagesEndRef} />
        </div>

        {/* Input Container */}
        <div className="z-10 max-w-2xl mx-auto w-full bg-[var(--color-app-bg)] px-4 pb-4 md:px-8 md:pb-8">
          <ChatInput
            onSendMessage={sendMessage}
            disabled={loading}
            hasMessages={messages.length > 0}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
