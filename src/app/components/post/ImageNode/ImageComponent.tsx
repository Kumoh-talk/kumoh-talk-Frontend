import clsx from 'clsx';
import { NodeViewWrapper } from '@tiptap/react';
import type { NodeViewProps } from '@tiptap/react';
import styles from './ImageComponent.module.scss';

const ImageComponent = ({ node, selected }: NodeViewProps) => {
  const { src, alt, title, width, height } = node.attrs;

  return (
    <NodeViewWrapper
      className={clsx(styles.wrapper, { [styles.selected]: selected })}
    >
      <img src={src} alt={alt} title={title} width={width} height={height} />
    </NodeViewWrapper>
  );
};

export default ImageComponent;
