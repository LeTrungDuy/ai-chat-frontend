import templateIcon from '../assets/template-icon.svg';

const ChatHeader = () => {
  return (
    <div className="py-6 border-b border-gray-200 ml-[50px] md:ml-0">
      <img src={templateIcon} alt="Gemini" className="w-[134px] h-[22px]" />
    </div>
  );
};

export default ChatHeader;
