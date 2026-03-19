import { CrossCircledIcon, FileIcon, ImageIcon } from '@radix-ui/react-icons';
import pdfIcon from '@/assets/pdf-icon.svg';
import txtIcon from '@/assets/txt-icon.svg';
import wordIcon from '@/assets/word-icon.svg';

const AttachedFileTile = ({ file, imagePreview, onRemoveFile }) => {
  const extension = file.name.split('.').pop()?.toLowerCase() || '';
  const isPdf = extension === 'pdf' || file.type === 'application/pdf';
  const isTxt = extension === 'txt' || file.type === 'text/plain';
  const isWord =
    extension === 'doc' ||
    extension === 'docx' ||
    file.type === 'application/msword' ||
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  const isImage = file.type.startsWith('image/');

  return (
    <div className="relative flex h-[70px] w-[70px] shrink-0 flex-col items-center justify-center rounded-xl border border-gray-200 bg-[rgb(246,248,253)] px-1.5">
      <button
        type="button"
        onClick={() => onRemoveFile(file)}
        className="absolute -right-1 -top-1 rounded-full bg-white text-gray-500 transition-colors hover:text-red-600"
        aria-label={`Remove ${file.name}`}
      >
        <CrossCircledIcon className="h-4 w-4" />
      </button>

      {isPdf ? (
        <img src={pdfIcon} alt="PDF" className="mb-0.5 h-5 w-5" />
      ) : isTxt ? (
        <img src={txtIcon} alt="TXT" className="mb-0.5 h-5 w-5" />
      ) : isWord ? (
        <img src={wordIcon} alt="WORD" className="mb-0.5 h-5 w-5" />
      ) : isImage && imagePreview ? (
        <img
          src={imagePreview}
          alt={file.name}
          className="mb-0.5 h-8 w-8 rounded-md border border-gray-200 object-cover"
        />
      ) : isImage ? (
        <ImageIcon className="mb-0.5 h-5 w-5 text-blue-600" />
      ) : (
        <FileIcon className="mb-0.5 h-5 w-5 text-gray-600" />
      )}

      <p className="w-full truncate text-center text-[10px] font-medium text-gray-700">
        {file.name}
      </p>
    </div>
  );
};

export default AttachedFileTile;
