import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

const HistorySearchInput = ({ value, onChange }) => {
  return (
    <div className="group mb-3 flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 transition-colors hover:border-[#4031ff] focus-within:border-[#4031ff]">
      <MagnifyingGlassIcon className="h-3.5 w-3.5 shrink-0 text-gray-400 transition-colors group-hover:text-[#4031ff] group-focus-within:text-[#4031ff]" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search..."
        className="w-full bg-transparent text-xs text-gray-700 placeholder-gray-400 outline-none"
      />
    </div>
  );
};

export default HistorySearchInput;
