import { API_BASE_URL, CHAT_ENDPOINT, REQUEST_TIMEOUT } from '../utils/constants';

const ensureOk = async (response) => {
  if (response.ok) return;

  let errorMessage = `API Error: ${response.status}`;

  try {
    const errorData = await response.json();
    if (errorData?.message) {
      errorMessage = errorData.message;
    }
  } catch {
    // Keep fallback message if response is not JSON.
  }

  const error = new Error(errorMessage);
  error.status = response.status;
  throw error;
};

/**
 * Send a message to the chat API
 * @param {string} message - The user message
 * @param {string} conversationId - Optional conversation ID to continue existing conversation
 * @param {File[]} files - Optional files to send with the message
 * @returns {Promise<{conversationId: string, reply: string, metadata: object}>}
 */
export const sendMessage = async (message, conversationId = null, files = []) => {
  const hasFiles = Array.isArray(files) && files.length > 0;
  const trimmedMessage = message?.trim() || '';

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    let response;

    if (hasFiles) {
      const formData = new FormData();
      formData.append('message', trimmedMessage);

      if (conversationId) {
        formData.append('conversationId', conversationId);
      }

      files.forEach((file) => {
        formData.append('files', file);
      });

      response = await fetch(`${API_BASE_URL}${CHAT_ENDPOINT}`, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });
    } else {
      const payload = {
        message: trimmedMessage,
      };

      if (conversationId) {
        payload.conversationId = conversationId;
      }

      response = await fetch(`${API_BASE_URL}${CHAT_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
    }

    await ensureOk(response);

    const data = await response.json();
    return data;
  } finally {
    clearTimeout(timeout);
  }
};

/**
 * Fetch conversation history
 * @param {string} conversationId - The conversation ID to fetch
 * @returns {Promise<{conversationId: string, messages: Array, count: number}>}
 */
export const getConversation = async (conversationId) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(`${API_BASE_URL}${CHAT_ENDPOINT}/${conversationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    await ensureOk(response);

    const data = await response.json();
    return data;
  } finally {
    clearTimeout(timeout);
  }
};

/**
 * Fetch latest conversation history list for sidebar
 * @param {number} limit - Number of history items
 * @returns {Promise<{items: Array, count: number}>}
 */
export const getConversations = async (limit = 30) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const safeLimit = Math.max(1, Math.min(200, Number(limit) || 30));
    const response = await fetch(`${API_BASE_URL}${CHAT_ENDPOINT}?limit=${safeLimit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    await ensureOk(response);

    const data = await response.json();
    return data;
  } finally {
    clearTimeout(timeout);
  }
};

/**
 * Delete a conversation and all related messages
 * @param {string} conversationId - Conversation ID to delete
 * @returns {Promise<object>} - Backend delete response
 */
export const deleteConversation = async (conversationId) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(`${API_BASE_URL}${CHAT_ENDPOINT}/${conversationId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    await ensureOk(response);

    const data = await response.json();
    return data;
  } finally {
    clearTimeout(timeout);
  }
};
