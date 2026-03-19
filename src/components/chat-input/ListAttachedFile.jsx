import { useEffect, useMemo } from 'react';
import { getFileKey } from '../../utils/tools';
import AttachedFileTile from './AttachedFileTile';

const ListAttachedFile = ({ files, onRemoveFile }) => {
  const imagePreviewUrls = useMemo(() => {
    const previews = new Map();

    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        previews.set(getFileKey(file), URL.createObjectURL(file));
      }
    });

    return previews;
  }, [files]);

  useEffect(() => {
    return () => {
      imagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviewUrls]);

  if (!files.length) return null;

  return (
    <div className="mb-2 flex flex-wrap gap-2">
      {files.map((file) => {
        const fileKey = getFileKey(file);
        const imagePreview = imagePreviewUrls.get(fileKey);

        return (
          <AttachedFileTile
            key={fileKey}
            file={file}
            imagePreview={imagePreview}
            onRemoveFile={onRemoveFile}
          />
        );
      })}
    </div>
  );
};

export default ListAttachedFile;
