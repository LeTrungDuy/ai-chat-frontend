export const formatDateTime = (isoDate) => {
  if (!isoDate) return '';

  try {
    return new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
    }).format(new Date(isoDate));
  } catch {
    return '';
  }
};

export const getFileKey = (file) => {
  if (!file) return '';
  return `${file.name}-${file.size}-${file.lastModified}`;
};

export const formatFileSize = (bytes) => {
  if (!bytes) return '0 B';

  const units = ['B', 'KB', 'MB'];
  let size = bytes;
  let index = 0;

  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index += 1;
  }

  return `${size.toFixed(size >= 10 || index === 0 ? 0 : 1)} ${units[index]}`;
};
