import styles from './voteCard.module.scss';

interface Props {
  vote: {
    name: string;
    multiple: boolean;
    select: {
      id: number;
      content: string;
    }[];
  };
}

export default function VoteCard({ vote }: Props) {
  const { name, multiple, select } = vote;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>투표</h2>
      </div>
      <div className={styles.content}>
        <h3>{name}</h3>
        <form className={styles.selectWrapper}>
          {select.map((item) => (
            <div key={item.id} className={styles.select}>
              <div>
                <input
                  className={styles.selectButton}
                  type='radio'
                  name='vote'
                  value={item.id}
                />
              </div>
              <div>
                <p>{item.content}</p>
                <progress max='100' value='70' />
              </div>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}
