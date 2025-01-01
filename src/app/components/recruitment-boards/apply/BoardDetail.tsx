export interface Props {
  content: string;
}

export default function BoardDetail({ content }: Props) {
  return (
    <div style={{ margin: '2rem 0' }}>
      {content}
    </div>
  )
}