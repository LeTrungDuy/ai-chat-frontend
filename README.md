# AI Chat Frontend

A production-ready chatbot web application built with ReactJS, TailwindCSS, and modern frontend patterns.

## Features

- 💬 Real-time chat interface with ChatGPT-like UI
- 🔄 Conversation persistence with localStorage
- 📱 Fully responsive mobile-friendly design
- ⌨️ Keyboard shortcuts (Enter to send, Shift+Enter for newline)
- 📋 Copy message button for AI responses
- ✨ Markdown rendering for AI responses
- ⏳ Loading indicators and error handling
- 🎨 Clean, modern UI with Tailwind CSS
- 🏗️ Clean architecture with modular components

## Project Structure

```
src/
├── components/
│   ├── ChatContainer.jsx      # Main container component
│   ├── ChatHeader.jsx         # Header with title and new chat button
│   ├── ChatInput.jsx          # Input textarea and send button
│   ├── MessageList.jsx        # Message list container
│   ├── MessageItem.jsx        # Individual message bubble
│   └── TypingIndicator.jsx    # Loading state indicator
├── hooks/
│   └── useChat.js             # Custom hook for chat state management
├── services/
│   └── chatService.js         # API service for chat endpoints
├── utils/
│   └── constants.js           # Constants and configuration
├── App.jsx                    # Main App component
├── main.jsx                   # React entry point
└── index.css                  # Global styles with Tailwind
```

## Prerequisites

- Node.js (v16+)
- npm or yarn
- Backend API running on `http://localhost:3000`

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## API Integration

The app connects to a backend API at `http://localhost:3000` with the following endpoints:

### POST /chat

Send a message and get a response

**Request:**

```json
{
  "message": "string",
  "conversationId": "string (optional)"
}
```

### GET /chat/:conversationId

Fetch conversation history

**Response:**

```json
[
  { "role": "user|model", "content": "string" },
  { "role": "user|model", "content": "string" }
]
```

## Usage

1. Start the backend API on port 3000
2. Run `npm run dev` to start the frontend
3. Open http://localhost:5173 in your browser
4. Start chatting!

### Keyboard Shortcuts

- **Enter**: Send message
- **Shift + Enter**: New line in message
- **✕ New Chat**: Start a new conversation

## Features Explained

### Message Persistence

- Conversation ID is saved to localStorage
- Messages are automatically saved and restored on page reload
- Clear chat to start fresh

### Markdown Rendering

- AI responses support markdown formatting
- Code blocks, links, lists, and text styling are rendered

### Error Handling

- Network errors are caught and displayed
- Timeout after 30 seconds of no response
- User-friendly error messages
- Failed messages don't get saved

### Responsive Design

- Mobile-friendly layout
- Adapts to all screen sizes
- Touch-friendly buttons and inputs

## Technologies Used

- **React 18** - UI Framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **markdown-it** - Markdown rendering
- **Fetch API** - HTTP requests (no axios needed)

## Performance Optimizations

- Auto-scroll with smooth behavior
- Textarea auto-resizes based on content
- Efficient state management with React hooks
- Lazy message rendering
- Optimized event handlers with useCallback

## License

MIT
