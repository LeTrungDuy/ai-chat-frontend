import templateIcon from '../assets/template-icon.svg';

const ChatHeader = ({ onSignUpClick }) => {
  return (
    <div className="py-6 border-b border-gray-200 ml-[50px] md:ml-0 flex items-center justify-between">
      <img src={templateIcon} alt="Template" className="w-[134px] h-[22px]" />
      <button
        onClick={onSignUpClick}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
      >
        Sign Up
      </button>
    </div>
  );
};

export default ChatHeader;
