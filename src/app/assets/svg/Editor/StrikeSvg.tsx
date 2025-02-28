export default function StrikeSvg({ className = '' }: { className?: string }) {
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
        d='M11.65 11.6649C11.5642 11.6454 11.4787 11.6244 11.3937 11.6018C10.1161 11.263 9.05287 10.6054 8.36288 9.81511C7.65919 9.00887 7.34322 8.0652 7.58262 7.17746C8.05819 5.41957 10.5352 4.54861 13.1146 5.23419C13.8911 5.43628 14.6239 5.77691 15.2773 6.23939M7.15218 16.3089C7.84298 17.0992 8.90617 17.756 10.1838 18.0956C12.7632 18.7812 15.241 17.9118 15.7158 16.1531C15.9036 15.4596 15.7512 14.7316 15.341 14.062M5 11.6649H18.3'
        stroke='currentColor'
        strokeWidth='1.25'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
