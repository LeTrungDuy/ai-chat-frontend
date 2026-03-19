import { useState, useEffect, useRef, useCallback } from 'react';
import {
  sendMessage,
  getConversation,
  getConversations,
  deleteConversation,
} from '../services/chatService';
import { MESSAGES_STORAGE_KEY, CONVERSATION_ID_KEY } from '../utils/constants';

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const refreshConversations = useCallback(async (limit = 30) => {
    try {
      const data = await getConversations(limit);
      setConversations(Array.isArray(data?.items) ? data.items : []);
    } catch (err) {
      console.error('Failed to load conversation list:', err);
    }
  }, []);

  // Initialize from localStorage and fetch latest list for sidebar.
  useEffect(() => {
    refreshConversations(30);

    const savedConversationId = localStorage.getItem(CONVERSATION_ID_KEY);
    const savedMessages = localStorage.getItem(MESSAGES_STORAGE_KEY);

    if (savedConversationId) {
      setConversationId(savedConversationId);

      if (savedMessages) {
        try {
          setMessages(JSON.parse(savedMessages));
        } catch (e) {
          console.error('Failed to parse saved messages:', e);
        }
      }
    }
  }, [refreshConversations]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Save conversationId to localStorage whenever it changes
  useEffect(() => {
    if (conversationId) {
      localStorage.setItem(CONVERSATION_ID_KEY, conversationId);
    }
  }, [conversationId]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getErrorMessage = (err) => {
    if (err?.name === 'AbortError') {
      return 'Request timeout. Please try again.';
    }

    if (err?.status === 400) {
      return 'Invalid request. Please check your message or file and try again.';
    }

    if (err?.status === 429) {
      return 'Too many requests. Please wait a moment and try again.';
    }

    if (err?.status >= 500) {
      return 'Server error. Please try again later.';
    }

    return err?.message || 'Failed to send message. Please try again.';
  };

  /**
   * Send a message and handle the response
   * @param {string} userMessage - The user's message
   * @param {File[]} files - Optional files attached to the message
   */
  const handleSendMessage = useCallback(
    async (userMessage, files = []) => {
      const normalizedMessage = userMessage?.trim() || '';
      const hasFiles = Array.isArray(files) && files.length > 0;

      if (!normalizedMessage && !hasFiles) return;

      setError(null);
      setLoading(true);

      const userMessageEntry = {
        role: 'user',
        content: normalizedMessage,
      };

      if (hasFiles) {
        userMessageEntry.attachments = files.map((file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
        }));
      }

      // Add user message to UI immediately
      setMessages((prev) => [...prev, userMessageEntry]);

      try {
        const response = await sendMessage(normalizedMessage, conversationId, files);
        const nextConversationId = response?.conversationId || conversationId;

        // Update conversationId if it's new
        if (nextConversationId && nextConversationId !== conversationId) {
          setConversationId(nextConversationId);
        }

        // Add AI response to messages
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: response.reply || '',
          },
        ]);

        refreshConversations(30);
      } catch (err) {
        setError(getErrorMessage(err));
        // Remove the user message if sending failed
        setMessages((prev) => prev.slice(0, -1));
      } finally {
        setLoading(false);
      }
    },
    [conversationId, refreshConversations]
  );

  /**
   * Load conversation history
   * @param {string} convId - The conversation ID to load
   */
  const loadConversation = useCallback(async (convId) => {
    setLoading(true);
    setError(null);

    try {
      const conversation = await getConversation(convId);
      const history = Array.isArray(conversation?.messages) ? conversation.messages : [];

      // Map API format to frontend format
      const formattedMessages = history.map((msg) => ({
        role: msg.role === 'model' ? 'assistant' : msg.role,
        content: msg.content,
      }));

      setMessages(formattedMessages);
      setConversationId(conversation?.conversationId || convId);
    } catch (err) {
      if (err?.status === 404) {
        setError('Conversation not found.');
      } else {
        setError('Failed to load conversation history.');
      }
      console.error('Load conversation error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Clear current conversation
   */
  const clearConversation = useCallback(() => {
    setMessages([]);
    setConversationId(null);
    setError(null);
    localStorage.removeItem(MESSAGES_STORAGE_KEY);
    localStorage.removeItem(CONVERSATION_ID_KEY);
  }, []);

  const removeConversation = useCallback(
    async (targetConversationId) => {
      if (!targetConversationId) return;

      setError(null);

      try {
        await deleteConversation(targetConversationId);
      } catch (err) {
        // 404 means item is already gone on server; remove from UI anyway.
        if (err?.status !== 404) {
          setError(err?.message || 'Failed to delete conversation.');
          return;
        }
      }

      setConversations((prev) =>
        prev.filter((item) => item.conversationId !== targetConversationId)
      );

      if (conversationId === targetConversationId) {
        setMessages([]);
        setConversationId(null);
        localStorage.removeItem(MESSAGES_STORAGE_KEY);
        localStorage.removeItem(CONVERSATION_ID_KEY);
      }
    },
    [conversationId]
  );

  return {
    messages,
    conversations,
    conversationId,
    loading,
    error,
    sendMessage: handleSendMessage,
    loadConversation,
    removeConversation,
    refreshConversations,
    clearConversation,
    messagesEndRef,
  };
};
