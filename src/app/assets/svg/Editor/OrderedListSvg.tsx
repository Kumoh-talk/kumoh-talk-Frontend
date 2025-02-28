export default function OrderedListSvg({
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
        d='M10 12H21M10 18H21M10 6H21M4 10H6M4 6H5V10M6 18H4C4 17 6 16 6 15C6 14 5 13.5 4 14'
        stroke='currentColor'
        strokeWidth='1.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
