import { useState, useEffect } from 'react';
import styles from './vodSummary.module.scss';
import wikis from '@/app/lib/constants/wiki.json';
import WikiCard from '../../streaming/[id]/WikiCard';

interface Props {
  summary: string;
}

export default function VodSummary({ summary }: Props) {
  const [hoveredWiki, setHoveredWiki] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });

  const highlightWikiTerms = (text: string) => {
    const parts = text.split(/(\w+)/);
    return parts.map((part, index) => {
      const wiki = wikis.find((w) => w.wiki === part);
      if (wiki) {
        return (
          <span
            key={index}
            className={styles.wikiTerm}
            data-wiki={wiki.wiki}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    const wiki = e.currentTarget.dataset.wiki;
    if (wiki) {
      setHoveredWiki(wiki);
      setHoverPosition({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.relatedTarget as HTMLElement;
    if (!target?.closest(`.${styles.wikiCardContainer}`)) {
      setHoveredWiki(null);
    }
  };

  useEffect(() => {
    if (hoveredWiki) {
      const cardWidth = 180; // WikiCard의 너비
      const cardHeight = 240; // WikiCard의 높이
      const margin = 10; // 여백

      // 화면 경계 체크 및 위치 조정
      let x = hoverPosition.x - margin;
      let y = hoverPosition.y - cardHeight - margin;

      // 오른쪽 경계 체크
      if (x + cardWidth > window.innerWidth) {
        x = window.innerWidth - cardWidth - margin;
      }

      // 왼쪽 경계 체크
      if (x < margin) {
        x = margin;
      }

      // 위쪽 경계 체크
      if (y < margin) {
        y = hoverPosition.y + margin;
      }

      // 아래쪽 경계 체크
      if (y + cardHeight > window.innerHeight) {
        y = window.innerHeight - cardHeight - margin;
      }

      setCardPosition({ x, y });
    }
  }, [hoverPosition, hoveredWiki]);

  return (
    <div className={styles.summary}>
      <div className={styles.content}>{highlightWikiTerms(summary)}</div>
      {hoveredWiki && (
        <div
          className={styles.wikiCardContainer}
          style={{
            position: 'fixed',
            left: cardPosition.x,
            top: cardPosition.y,
          }}
          onMouseLeave={handleMouseLeave}
        >
          <WikiCard
            info={wikis.find((w) => w.wiki === hoveredWiki) || wikis[0]}
          />
        </div>
      )}
    </div>
  );
}
