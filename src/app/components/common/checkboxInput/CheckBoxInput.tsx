export interface Props {
  selectList: string[];
}

export default function CheckBoxInput({ selectList }: Props) {
  return (
    <div>
      <input type='checkbox'/>
    </div>
  )
}