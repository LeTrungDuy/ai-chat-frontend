import { useState, useRef, useEffect } from 'react';
import TopBar from './chat-input/TopBar';
import SelectedFilesList from './chat-input/SelectedFilesList';
import PromptTextarea from './chat-input/PromptTextarea';
import UploadButton from './chat-input/UploadButton';
import GenerateButton from './chat-input/GenerateButton';
import { formatFileSize, getFileKey } from '../utils/formatters';
import { MAX_UPLOAD_FILE_SIZE_BYTES, MAX_UPLOAD_FILE_SIZE_MB } from '../utils/constants';

const ChatInput = ({ onSendMessage, disabled, hasMessages = false }) => {
  const [input, setInput] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileError, setFileError] = useState('');
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 240)}px`;
    }
  }, [input]);

  const handleSend = () => {
    if ((input.trim() || selectedFiles.length > 0) && !disabled) {
      onSendMessage(input, selectedFiles);
      setInput('');
      setSelectedFiles([]);
      setFileError('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    // Send on Enter, but not Shift+Enter
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePickFile = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const validFiles = files.filter((file) => file.size <= MAX_UPLOAD_FILE_SIZE_BYTES);
      const oversizedFiles = files.filter((file) => file.size > MAX_UPLOAD_FILE_SIZE_BYTES);

      if (oversizedFiles.length > 0) {
        const oversizedNames = oversizedFiles
          .map((file) => `${file.name} (${formatFileSize(file.size)})`)
          .join(', ');
        setFileError(`File quá lớn (> ${MAX_UPLOAD_FILE_SIZE_MB}MB): ${oversizedNames}`);
      } else {
        setFileError('');
      }

      if (validFiles.length === 0) {
        e.target.value = '';
        return;
      }

      setSelectedFiles((prev) => {
        const map = new Map(prev.map((file) => [getFileKey(file), file]));
        validFiles.forEach((file) => {
          map.set(getFileKey(file), file);
        });
        return Array.from(map.values());
      });
    }

    e.target.value = '';
  };

  const handleRemoveFile = (fileToRemove) => {
    const fileToRemoveKey = getFileKey(fileToRemove);
    setSelectedFiles((prev) => prev.filter((file) => getFileKey(file) !== fileToRemoveKey));

    setFileError('');
  };

  const canSend = (input.trim() || selectedFiles.length > 0) && !disabled;
  const shouldShowGenerate = Boolean(input.trim() || selectedFiles.length > 0);

  return (
    <div className="flex flex-col py-6 border-t border-gray-200">
      <TopBar />
      <SelectedFilesList files={selectedFiles} onRemoveFile={handleRemoveFile} />
      <div className="rounded-[14px] bg-white flex flex-col transition-colors duration-300 ease-in-out shadow-none p-3 pb-1.5 border border-[var(--color-input-border)]">
        <PromptTextarea
          textareaRef={textareaRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        <div className="flex justify-between">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            multiple
            accept="image/*,.pdf,.doc,.docx,.txt,.md"
            onChange={handleFileChange}
            disabled={disabled}
          />
          <UploadButton onClick={handlePickFile} disabled={disabled} />
          <GenerateButton
            onClick={handleSend}
            canSend={canSend}
            visible={shouldShowGenerate}
            hasMessages={hasMessages}
          />
        </div>

        {fileError && <p className="mt-2 text-xs font-medium text-red-600">{fileError}</p>}
      </div>
      <p className="text-xs text-gray-500 text-center">
        Free Research Preview. AI may make mistakes.
      </p>
    </div>
  );
};

export default ChatInput;
