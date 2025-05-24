import { useState } from 'react';
import styles from './SeminarSummary.module.scss';
import WikiCard from './WikiCard';

interface Props {
  summary: string;
}

const wikis = [
  {
    wiki: 'JDBC',
    general: '자바 프로그램이 데이터베이스와 쉽게 대화할 수 있게 도와주는 도구',
    expert:
      'Java Database Connectivity의 약자로 Java 기반 애플리케이션의 데이터를 데이터베이스에 저장 및 업데이트하거나, 데이터베이스에 저장된 데이터를 Java에서 사용할 수 있도록 하는 자바 API이다.',
  },
  {
    wiki: 'SQL',
    general:
      '관계형 데이터베이스에서 데이터를 정의, 조작, 조회할 수 있게 해주는 표준화된 언어',
    expert:
      'Structured Query Language의 약자로, SELECT, INSERT, UPDATE, DELETE 등 다양한 쿼리문을 사용해 RDBMS에서 데이터 작업을 수행할 수 있는 표준 언어이다.',
  },
  {
    wiki: 'JPA',
    general:
      '자바 객체와 관계형 데이터베이스 테이블 간의 매핑을 제공하는 자바 표준 ORM 사양',
    expert:
      'Java Persistence API의 약자로, 객체-관계 매핑(ORM) 프레임워크를 위한 인터페이스와 애노테이션을 정의한다. 엔티티의 생명 주기 관리, JPQL 쿼리, 영속성 컨텍스트 등을 통해 데이터베이스 연동을 추상화하여 생산성을 높인다.',
  },
  {
    wiki: 'Spring',
    general: '자바 애플리케이션 개발을 위한 경량 오픈소스 프레임워크',
    expert:
      '스프링 프레임워크는 DI/IoC 컨테이너, AOP, 트랜잭션 관리, MVC 웹 프레임워크 등의 모듈로 구성되어 있다. 자바 기반 엔터프라이즈 애플리케이션 개발 시 모듈 단위로 다양한 기능을 제공해 개발 생산성과 유지보수성을 향상시킨다.',
  },
];

export default function SeminarSummary({ summary }: Props) {
  const [hoveredWiki, setHoveredWiki] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

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

  return (
    <div className={styles.summary}>
      <div className={styles.content}>{highlightWikiTerms(summary)}</div>
      {hoveredWiki && (
        <div
          className={styles.wikiCardContainer}
          style={{
            position: 'fixed',
            left: hoverPosition.x - 10,
            top: hoverPosition.y - 230,
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
