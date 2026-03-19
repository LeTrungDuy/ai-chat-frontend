const SidebarRailButton = ({ label, Icon, onClick, isActive = false, isMobile = false }) => {
  const sizeClass = isMobile ? 'min-h-[56px]' : 'min-h-[58px]';
  const buttonLayoutClass = isMobile
    ? 'flex-row justify-start px-3 text-left hover:bg-[#e7edfc]'
    : 'flex-col justify-center';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex ${sizeClass} w-full items-center gap-2 rounded-xl text-[#1f2124] transition-colors ${buttonLayoutClass} ${
        isMobile && isActive ? 'bg-[#e7edfc]' : ''
      }`}
    >
      <div
        className={`flex items-center justify-center rounded-[99px] py-1 transition-colors ${
          isMobile ? 'w-auto px-1' : 'w-4/5'
        } ${isMobile ? '' : isActive ? 'bg-[#e7edfc]' : 'hover:bg-[#e7edfc]'}`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <span className={`font-medium leading-3 ${isMobile ? 'text-sm' : 'text-center text-[10px]'}`}>
        {label}
      </span>
    </button>
  );
};

export default SidebarRailButton;
