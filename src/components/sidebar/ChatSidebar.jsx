import { useState } from 'react';
import {
  ArchiveIcon,
  BackpackIcon,
  CounterClockwiseClockIcon,
  Cross1Icon,
  DesktopIcon,
  EnterIcon,
  FileTextIcon,
  HamburgerMenuIcon,
  HomeIcon,
  ImageIcon,
  LayersIcon,
  LayoutIcon,
  StarFilledIcon,
  VideoIcon,
} from '@radix-ui/react-icons';
import favicon from '@/favicon.svg';
import RecentHistoryPanel from './RecentHistoryPanel';
import SidebarRailButton from './SidebarRailButton';

const ChatSidebar = ({
  conversations,
  activeConversationId,
  loading,
  onSelectConversation,
  onDeleteConversation,
  onNewChat,
  onSignIn,
  onUpgrade,
}) => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobilePanelView, setMobilePanelView] = useState('menu');

  const navItems = [
    { key: 'home', label: 'Home', Icon: HomeIcon },
    { key: 'document', label: 'Document', Icon: FileTextIcon },
    { key: 'design', label: 'Design', Icon: LayersIcon },
    { key: 'presentation', label: 'Presentation', Icon: DesktopIcon },
    { key: 'image', label: 'Image', Icon: ImageIcon },
    { key: 'video', label: 'Video', Icon: VideoIcon },
    { key: 'template', label: 'Template', Icon: LayoutIcon },
    { key: 'brand', label: 'Brand', Icon: BackpackIcon },
    { key: 'project', label: 'Project', Icon: ArchiveIcon },
  ];

  const handleOpenMobileMenu = () => {
    setIsMobileOpen(true);
    setMobilePanelView('menu');
  };

  const handleCloseMobileMenu = () => {
    setIsMobileOpen(false);
    setMobilePanelView('menu');
  };

  const handleMobileSelectConversation = (conversationId) => {
    onSelectConversation(conversationId);
    handleCloseMobileMenu();
  };

  return (
    <>
      <div className="fixed left-4 top-4 z-40 md:hidden">
        <button
          type="button"
          onClick={handleOpenMobileMenu}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#dbe0ec] bg-white text-[#1f2124] transition-colors hover:bg-gray-50"
        >
          <HamburgerMenuIcon className="h-4 w-4" />
        </button>
      </div>

      {isMobileOpen && (
        <button
          type="button"
          onClick={handleCloseMobileMenu}
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-[1px] md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] overflow-hidden border-r border-[#dbe0ec] bg-[#f2f5fd] transition-transform duration-300 ease-in-out md:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-[#dbe0ec] px-4 py-3">
            <img src={favicon} alt="Logo" className="h-7 w-7 shrink-0" />
            <button
              type="button"
              onClick={handleCloseMobileMenu}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-100"
            >
              <Cross1Icon className="h-4 w-4" />
            </button>
          </div>

          <div className="relative flex-1 overflow-hidden">
            <div
              className={`absolute inset-0 transition-all duration-300 ease-in-out ${
                mobilePanelView === 'menu'
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-4 opacity-0 pointer-events-none'
              }`}
            >
              <ul className="flex h-full flex-col px-3 py-3">
                {navItems.map((item) => (
                  <li key={`mobile-${item.key}`}>
                    <SidebarRailButton
                      label={item.label}
                      Icon={item.Icon}
                      isMobile
                      onClick={
                        item.key === 'home'
                          ? () => {
                              onNewChat();
                              handleCloseMobileMenu();
                            }
                          : undefined
                      }
                    />
                  </li>
                ))}

                <li>
                  <SidebarRailButton
                    label="Recent"
                    Icon={CounterClockwiseClockIcon}
                    isMobile
                    onClick={() => setMobilePanelView('recent')}
                    isActive={mobilePanelView === 'recent'}
                  />
                </li>

                <li className="mt-auto">
                  <SidebarRailButton label="Sign In" Icon={EnterIcon} isMobile onClick={onSignIn} />
                </li>

                <li className="pb-1">
                  <SidebarRailButton
                    label="Upgrade"
                    Icon={StarFilledIcon}
                    isMobile
                    onClick={onUpgrade}
                  />
                </li>
              </ul>
            </div>

            <div
              className={`absolute inset-0 transition-all duration-300 ease-in-out ${
                mobilePanelView === 'recent'
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-4 opacity-0 pointer-events-none'
              }`}
            >
              <RecentHistoryPanel
                isOpen
                isMobile
                onClose={() => setMobilePanelView('menu')}
                conversations={conversations}
                activeConversationId={activeConversationId}
                loading={loading}
                onSelectConversation={handleMobileSelectConversation}
                onDeleteConversation={onDeleteConversation}
              />
            </div>
          </div>
        </div>
      </aside>

      <div className="hidden h-full shrink-0 transition-all duration-300 ease-in-out md:flex">
        <aside className="flex h-full shrink-0 flex-col border-r border-[#dbe0ec] bg-[#f2f5fd]">
          <div className="flex justify-center px-2 py-4">
            <img src={favicon} alt="Logo" className="h-8 w-8 shrink-0" />
          </div>

          <ul className="flex h-full w-[68px] flex-col">
            {navItems.map((item) => (
              <li key={item.key}>
                <SidebarRailButton
                  label={item.label}
                  Icon={item.Icon}
                  onClick={item.key === 'home' ? onNewChat : undefined}
                />
              </li>
            ))}

            <li>
              <SidebarRailButton
                label="Recent"
                Icon={CounterClockwiseClockIcon}
                onClick={() => setIsHistoryOpen((prev) => !prev)}
                isActive={isHistoryOpen}
              />
            </li>

            <li className="mt-auto">
              <SidebarRailButton label="Sign In" Icon={EnterIcon} onClick={onSignIn} />
            </li>

            <li className="pb-3">
              <SidebarRailButton label="Upgrade" Icon={StarFilledIcon} onClick={onUpgrade} />
            </li>
          </ul>
        </aside>

        <RecentHistoryPanel
          isOpen={isHistoryOpen}
          isMobile={false}
          onClose={() => setIsHistoryOpen(false)}
          conversations={conversations}
          activeConversationId={activeConversationId}
          loading={loading}
          onSelectConversation={onSelectConversation}
          onDeleteConversation={onDeleteConversation}
        />
      </div>
    </>
  );
};

export default ChatSidebar;
