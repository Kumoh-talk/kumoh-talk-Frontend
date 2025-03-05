import { NodeViewWrapper } from '@tiptap/react';
import clsx from 'clsx';
import FileSvg from '@/app/assets/svg/Editor/FileSvg';
import type { NodeViewProps } from '@tiptap/react';
import styles from './FileComponent.module.scss';

export interface FileInfo {
  fileName: string;
  fileType: string;
  fileSize: string;
  fileUrl: string;
}

const FileComponent = ({ node, selected }: NodeViewProps) => {
  const { fileName, fileType, fileSize } = node.attrs as FileInfo;

  return (
    <NodeViewWrapper>
      <figure
        className={styles.fileContainer}
        draggable
        data-drag-handle
      >
        <div
          className={clsx(styles.fileContent, {
            [styles.selected]: selected,
          })}
        >
          <div className={styles.icon}>
            <FileSvg />
          </div>
          <div className={styles.desc}>
            <div className={styles.fileName}>
              <span className={styles.name}>{fileName}</span>
              <span className={styles.type}>.{fileType}</span>
            </div>
            <span className={styles.fileSize}>{fileSize}</span>
          </div>
        </div>
      </figure>
    </NodeViewWrapper>
  );
};

export default FileComponent;
