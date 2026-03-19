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
- 📎 File attachment UI (image preview + file type icons)
- 🔐 Sign In / Sign Up modals (UI)
- 💎 Pricing modal with Plus and Max plans (UI)
- 🎨 Clean, modern UI with Tailwind CSS
- 🏗️ Clean architecture with modular components

## Feature Status

- ✅ Chat messaging flow (send/receive)
- ✅ Conversation history in localStorage
- ✅ Markdown rendering + copy response action
- ✅ Attachment display in input/message UI
- ✅ Sign In / Sign Up / Pricing modal UI
- 🚧 Google authentication integration: Coming soon
- 🚧 Email authentication integration: Coming soon
- 🚧 Upgrade checkout / payment integration: Coming soon

## Project Structure

```
src/
├── assets/
│   ├── gemini-icon.svg
│   ├── google-icon.svg
│   ├── pdf-icon.svg
│   ├── template-icon.svg
│   ├── txt-icon.svg
│   └── word-icon.svg
├── components/
│   ├── ChatContainer.jsx      # Main chat page container
│   ├── ChatHeader.jsx         # Header with Sign Up action
│   ├── ChatInput.jsx          # Input area and send flow
│   ├── MessageItem.jsx        # Individual message bubble
│   ├── MessageList.jsx        # Message list + typing state
│   ├── TypingIndicator.jsx    # Typing/loading indicator
│   ├── chat/
│   │   ├── ChatConversationActions.jsx
│   │   └── MessageListEmptyState.jsx
│   ├── chat-input/
│   │   ├── AttachedFileTile.jsx
│   │   ├── GenerateButton.jsx
│   │   ├── ListAttachedFile.jsx
│   │   ├── PromptTextarea.jsx
│   │   ├── SelectedFilesList.jsx
│   │   ├── TopBar.jsx
│   │   └── UploadButton.jsx
│   ├── modals/
│   │   ├── PricingModal.jsx
│   │   ├── SignInModal.jsx
│   │   └── SignUpModal.jsx
│   └── sidebar/
│       ├── ChatSidebar.jsx
│       ├── ConversationHistoryItem.jsx
│       ├── HistorySearchInput.jsx
│       ├── RecentHistoryPanel.jsx
│       └── SidebarRailButton.jsx
├── hooks/
│   └── useChat.js             # Chat state management
├── services/
│   └── chatService.js         # API communication layer
├── utils/
│   ├── constants.js           # Shared constants
│   └── tools.js               # Reusable format/helper utilities
├── App.jsx                    # App root component
├── favicon.svg                # App favicon
├── index.css                  # Global Tailwind styles
└── main.jsx                   # React entry point
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

### Authentication & Upgrade

- Sign In and Sign Up modal UI are implemented
- Pricing modal with Plus/Max plans is implemented
- Google / Email auth logic: Coming soon
- Billing and upgrade payment flow: Coming soon

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
