import { Cross2Icon } from '@radix-ui/react-icons';
import { formatFileSize, getFileKey } from '@/utils/tools';

const SelectedFilesList = ({ files, onRemoveFile }) => {
  if (!files.length) return null;

  return (
    <div className="flex flex-wrap gap-2 rounded-xl border border-gray-200 bg-gray-50 p-2.5">
      {files.map((file) => (
        <div
          key={getFileKey(file)}
          className="flex max-w-[220px] items-center gap-2 rounded-lg border border-gray-200 bg-white px-2.5 py-2"
        >
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-gray-800">{file.name}</p>
            <p className="text-[11px] text-gray-500">{formatFileSize(file.size)}</p>
          </div>
          <button
            type="button"
            onClick={() => onRemoveFile(file)}
            className="rounded p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label={`Remove ${file.name}`}
          >
            <Cross2Icon className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default SelectedFilesList;
