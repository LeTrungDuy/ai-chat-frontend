import MessageItem from './MessageItem';
import TypingIndicator from './TypingIndicator';

const MessageList = ({ messages, loading, messagesEndRef }) => {
  return (
    <div className="h-full min-h-0 overflow-y-auto px-4 py-6">
      {messages.length === 0 && !loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Start a new conversation</h2>
            <p className="text-gray-600">Ask me anything to get started</p>
          </div>
        </div>
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
