import MessageItem from './MessageItem';
import TypingIndicator from './TypingIndicator';
import MessageListEmptyState from './chat/MessageListEmptyState';

const MessageList = ({ messages, loading, messagesEndRef }) => {
  return (
    <div className="h-full min-h-0 overflow-y-auto px-4 py-6">
      {messages.length === 0 && !loading ? (
        <MessageListEmptyState />
      ) : (
        <div>
          {messages.map((message, index) => (
            <MessageItem
              key={index}
              role={message.role}
              content={message.content}
              attachments={message.attachments || []}
            />
          ))}
          {loading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default MessageList;
