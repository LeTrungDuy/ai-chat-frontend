import { useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HamburgerMenuIcon,
  PlusIcon,
  TrashIcon,
} from '@radix-ui/react-icons';
import { formatDateTime } from '../utils/formatters';
import favicon from '../favicon.svg';

const ConversationSidebar = ({
  conversations,
  activeConversationId,
  loading,
  onSelectConversation,
  onDeleteConversation,
  onNewChat,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isVisibleMobile = Boolean(isMobileOpen);
  const isDesktopCollapsed = isCollapsed && !isVisibleMobile;

  const handleToggleDesktopSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleOpenMobileSidebar = () => {
    setIsMobileOpen(true);
  };

  const handleCloseMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  const handleSelectConversation = (conversationId) => {
    onSelectConversation(conversationId);
    setIsMobileOpen(false);
  };

  return (
    <>
      <div className="fixed left-4 top-6 z-20 md:hidden">
        <button
          type="button"
          onClick={handleOpenMobileSidebar}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-100"
        >
          <HamburgerMenuIcon className="h-4 w-4" />
        </button>
      </div>

      {isMobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar history overlay"
          className="fixed inset-0 z-30 bg-slate-900/30 backdrop-blur-[1px] transition-opacity duration-300 md:hidden"
          onClick={handleCloseMobileSidebar}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[82vw] max-w-[320px] shrink-0 flex-col overflow-hidden border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out ${
          isVisibleMobile ? 'translate-x-0' : '-translate-x-full'
        } md:static md:z-auto md:max-w-none md:translate-x-0 md:transition-all md:duration-300 md:ease-in-out ${
          isDesktopCollapsed ? 'md:w-14' : 'md:w-80'
        }`}
      >
        <div
          className={`border-b border-gray-200 py-3 transition-all duration-300 ${
            isDesktopCollapsed ? 'px-2' : 'px-4'
          }`}
        >
          <div
            className={`flex items-center ${isDesktopCollapsed ? 'justify-center' : 'justify-between'}`}
          >
            <div
              className={`flex items-center gap-2 overflow-hidden transition-all duration-200 ${
                isDesktopCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
              }`}
            >
              <img src={favicon} alt="Logo" className="h-6 w-6 shrink-0" />
            </div>

            <button
              type="button"
              onClick={isVisibleMobile ? handleCloseMobileSidebar : handleToggleDesktopSidebar}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-100"
            >
              {isVisibleMobile ? (
                <ChevronLeftIcon className="h-4 w-4" />
              ) : isDesktopCollapsed ? (
                <ChevronRightIcon className="h-4 w-4" />
              ) : (
                <ChevronLeftIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <div
          className={`border-b border-gray-100 py-2 transition-all duration-300 ${
            isDesktopCollapsed ? 'px-2' : 'px-3'
          }`}
        >
          <button
            type="button"
            onClick={onNewChat}
            className={`flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 ${
              isDesktopCollapsed ? 'h-9 w-9 justify-center' : 'h-9 w-full px-3'
            }`}
          >
            <PlusIcon className="h-4 w-4 shrink-0" />
            <span
              className={`overflow-hidden whitespace-nowrap transition-all duration-200 ${
                isDesktopCollapsed ? 'w-0 opacity-0 hidden' : 'opacity-100'
              }`}
            >
              New Chat
            </span>
          </button>
        </div>

        <h2
          className={`overflow-hidden whitespace-nowrap text-sm font-semibold text-gray-900 transition-all duration-200 p-3 ${
            isDesktopCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
          }`}
        >
          Your Chat
        </h2>

        <div
          className={`min-h-0 flex-1 overflow-y-auto p-3 transition-opacity duration-200 ${
            isDesktopCollapsed ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
        >
          {conversations.length === 0 ? (
            <p className="px-2 py-4 text-sm text-gray-500">
              There is no conversation history available.
            </p>
          ) : (
            <div className="space-y-2">
              {conversations.map((conversation) => {
                const isActive = activeConversationId === conversation.conversationId;
                const title = conversation.title || 'New conversation';
                const preview = conversation.lastMessage || 'No messages yet';

                return (
                  <div
                    key={conversation.conversationId}
                    className={`group w-full rounded-xl border px-3 py-2 text-left transition-colors ${
                      isActive
                        ? 'border-blue-300 bg-blue-50'
                        : 'border-transparent bg-gray-50 hover:border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <button
                        type="button"
                        onClick={() => handleSelectConversation(conversation.conversationId)}
                        disabled={loading}
                        className="min-w-0 flex-1 text-left disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <p className="truncate text-sm font-medium text-gray-900">{title}</p>
                        <p className="mt-1 truncate text-xs text-gray-600">{preview}</p>
                        <p className="mt-1 text-[11px] text-gray-400">
                          {formatDateTime(conversation.updatedAt)}
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => onDeleteConversation(conversation.conversationId)}
                        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-gray-400 opacity-0 transition-all duration-150 hover:bg-red-50 hover:text-red-600 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200 group-hover:opacity-100"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default ConversationSidebar;
