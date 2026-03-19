const PromptTextarea = ({ textareaRef, value, onChange, onKeyDown, disabled }) => {
  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder="Type your message here... (Shift+Enter for newline)"
      disabled={disabled}
      className="mb-0 max-h-[500px] min-h-[58px] resize-none overflow-auto border-0 bg-white pr-2 text-sm font-normal text-[var(--color-input-text)] shadow-none outline-none transition-[height] duration-300 ease-in-out"
      rows="3"
    />
  );
};

export default PromptTextarea;
