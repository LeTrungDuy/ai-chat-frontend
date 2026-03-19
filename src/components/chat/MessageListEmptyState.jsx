const MessageListEmptyState = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Start a new conversation</h2>
        <p className="text-gray-600">Ask me anything to get started</p>
      </div>
    </div>
  );
};

export default MessageListEmptyState;
