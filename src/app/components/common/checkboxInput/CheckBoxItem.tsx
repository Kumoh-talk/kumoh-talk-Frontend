export interface Props {
  label: string;
}

export default function CheckBoxItem({ label }: Props) {
  return (
    <div>
      <input type='checkbox' id={label} name={label} />
      <label htmlFor={label}>{label}</label>
    </div>
  )
}