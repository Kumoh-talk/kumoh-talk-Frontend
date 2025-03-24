import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { NodeViewWrapper } from '@tiptap/react';
import { usePostContent } from '@/app/lib/contexts/post/PostContentContext';
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
  const { src, alt, title, caption, width, height, margin } = node.attrs;
  const containerStyle = { width, height, margin };

  const [imgCaption, setImgCaption] = useState(caption);

  const { boardHeadImageUrl, setBoardHeadImageUrl } = usePostContent();

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

  const resizeHandler = (
    mouseDownEvent: React.MouseEvent<HTMLImageElement>
  ) => {
    const parent = (mouseDownEvent.target as HTMLElement).closest(
      `.${styles.wrapper}`
    );

    const image = parent?.querySelector(`.${styles.postimage}`) ?? null;

    if (image === null) return;

    const startSize = { x: image.clientWidth, y: image.clientHeight };
    const aspectRatio = startSize.x / startSize.y;
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };

    const onMouseMove = (mouseMoveEvent: MouseEvent) => {
      const newWidth = startSize.x - startPosition.x + mouseMoveEvent.pageX;

      updateAttributes({
        width: newWidth,
        height: newWidth / aspectRatio,
      });
    };

    const onMouseUp = () => {
      document.body.removeEventListener('mousemove', onMouseMove);
    };

    document.body.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseup', onMouseUp, { once: true });
  };

  const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCaption = e.target.value;

    setImgCaption(newCaption);
    updateAttributes({ caption: newCaption });
  };

  const toggleBoardHeadImage = () => {
    if (boardHeadImageUrl === src) {
      updateAttributes({ isBoardHeadImage: false });
      setBoardHeadImageUrl('');
    } else {
      updateAttributes({ isBoardHeadImage: true });
      setBoardHeadImageUrl(src);
    }
  };

  useEffect(() => {
    if (boardHeadImageUrl !== src) {
      updateAttributes({ isBoardHeadImage: false });
    }
  }, [boardHeadImageUrl]);

  return (
    <NodeViewWrapper
      className={clsx(styles.wrapper, { [styles.selected]: selected })}
    >
      <figure className={styles.container} style={containerStyle}>
        {selected && <AlignController />}

        <div className={styles.imageWrapper}>
          <img className={styles.postimage} src={src} alt={alt} title={title} />
          <div className={styles.resizeTrigger} onMouseDown={resizeHandler}>
            <div className={styles.resizeHandle} />
          </div>
          {selected && (
            <div
              className={clsx(styles.headImageChip, {
                [styles.active]: boardHeadImageUrl === src,
              })}
              onClick={toggleBoardHeadImage}
            >
              {boardHeadImageUrl === src ? (
                <div>
                  <span>✔</span>
                  <span>대표</span>
                </div>
              ) : (
                <div>
                  <span>○</span>
                  <span>대표</span>
                </div>
              )}
            </div>
          )}
        </div>

        {(imgCaption || selected) && (
          <input
            value={imgCaption}
            placeholder='이미지를 설명해 보세요'
            onChange={handleCaptionChange}
          />
        )}
      </figure>
    </NodeViewWrapper>
  );
};

export default ImageComponent;
