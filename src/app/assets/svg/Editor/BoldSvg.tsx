export default function BoldSvg({ className = '' }: { className?: string }) {
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
        d='M7 5.33333H13.6667C14.5507 5.33333 15.3986 5.68452 16.0237 6.30964C16.6488 6.93477 17 7.78261 17 8.66667C17 9.55072 16.6488 10.3986 16.0237 11.0237C15.3986 11.6488 14.5507 12 13.6667 12H7V5.33333Z'
        stroke='currentColor'
        strokeWidth='1.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7 12H14.5C15.3841 12 16.2319 12.3512 16.857 12.9763C17.4821 13.6014 17.8333 14.4493 17.8333 15.3333C17.8333 16.2174 17.4821 17.0652 16.857 17.6904C16.2319 18.3155 15.3841 18.6667 14.5 18.6667H7V12Z'
        stroke='currentColor'
        strokeWidth='1.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
