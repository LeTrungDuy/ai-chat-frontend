import { useEffect, useRef, useState } from 'react';
import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';
import MarkdownIt from 'markdown-it';
import { formatFileSize } from '../utils/tools';

const md = new MarkdownIt({
  breaks: true,
  linkify: true,
});

const MessageItem = ({ role, content, attachments = [] }) => {
  const isUser = role === 'user';
  const [copied, setCopied] = useState(false);
  const copiedTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) {
        clearTimeout(copiedTimeoutRef.current);
      }
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);

      if (copiedTimeoutRef.current) {
        clearTimeout(copiedTimeoutRef.current);
      }

      copiedTimeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 1500);
    });
  };

  return (
    <div className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`group relative max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-xl px-4 py-3 ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-100 text-gray-900 rounded-bl-none pr-10'
        }`}
      >
        {isUser ? (
          <div className="space-y-2">
            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {attachments.map((file, index) => (
                  <div
                    key={`${file.name}-${file.size}-${index}`}
                    className="rounded-lg bg-white/15 px-2.5 py-1.5 text-xs"
                  >
                    <p className="truncate max-w-[180px] font-medium">{file.name}</p>
                    <p className="opacity-85">{formatFileSize(file.size)}</p>
                  </div>
                ))}
              </div>
            )}
            {content && (
              <p className="text-sm md:text-base whitespace-pre-wrap break-words">{content}</p>
            )}
          </div>
        ) : (
          <div className="text-sm md:text-base space-y-2">
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{
                __html: md.render(content),
              }}
            />
            <button
              type="button"
              onClick={handleCopy}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 opacity-0 shadow-sm transition-all duration-200 ease-out hover:bg-gray-100 hover:text-gray-700 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 group-hover:opacity-100"
              aria-label={copied ? 'Copied' : 'Copy message'}
            >
              {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
