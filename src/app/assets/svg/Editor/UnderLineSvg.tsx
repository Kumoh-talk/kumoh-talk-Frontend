export default function UnderLineSvg({
  className = '',
}: {
  className?: string;
}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 24 24'
      fill='none'
      className={className}
    >
      <path
        d='M7 4.5V10.3333C7 11.6594 7.52678 12.9312 8.46447 13.8689C9.40215 14.8065 10.6739 15.3333 12 15.3333C13.3261 15.3333 14.5979 14.8065 15.5355 13.8689C16.4732 12.9312 17 11.6594 17 10.3333V4.5'
        stroke='currentColor'
        strokeWidth='1.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5.33301 19.5H18.6663'
        stroke='currentColor'
        strokeWidth='1.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
