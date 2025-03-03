import clsx from 'clsx';
import { NodeViewWrapper } from '@tiptap/react';
import AlignLeftSvg from '@/app/assets/svg/Editor/AlignLeftSvg';
import AlignCenterSvg from '@/app/assets/svg/Editor/AlignCenterSvg';
import AlignRightSvg from '@/app/assets/svg/Editor/AlignRightSvg';
import type { NodeViewProps } from '@tiptap/react';
import styles from './ImageComponent.module.scss';

const ImageComponent = ({
  node,
  selected,
  updateAttributes,
}: NodeViewProps) => {
  const { src, alt, title, width, height, margin } = node.attrs;
  const containerStyle = { width, height, margin };

  const AlignController = () => {
    return (
      <div className={styles.alignController}>
        <button
          type='button'
          onClick={() => updateAttributes({ margin: '0 auto 0 0' })}
        >
          <AlignLeftSvg />
        </button>
        <button
          type='button'
          onClick={() => updateAttributes({ margin: '0 auto' })}
        >
          <AlignCenterSvg />
        </button>
        <button
          type='button'
          onClick={() => updateAttributes({ margin: '0 0 0 auto' })}
        >
          <AlignRightSvg />
        </button>
      </div>
    );
  };

  return (
    <NodeViewWrapper
      className={clsx(styles.wrapper, { [styles.selected]: selected })}
    >
      <figure className={styles.container} style={containerStyle}>
        {selected && <AlignController />}

        <div className={styles.imageWrapper}>
          <img className={styles.postimage} src={src} alt={alt} title={title} />
        </div>
      </figure>
    </NodeViewWrapper>
  );
};

export default ImageComponent;
