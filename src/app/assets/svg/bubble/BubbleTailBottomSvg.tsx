export default function BubbleTailBottomSvg({
  className = '',
}: {
  className?: string;
}) {
  return (
    <svg
      width="32"
      height="8"
      viewBox="0 0 32 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0L3.12195 0C3.12195 0 3.12195 0 3.12195 0C3.12195 0 6.2439 0 8.58537 2.02105C10.9268 4.04211 11.7073 5.05263 13.2683 6.73684C14.8293 8.42105 15.6098 8.42105 17.1707 6.73684C18.7317 5.05263 20.2927 3.36842 21.8537 2.02105C23.4146 0.673684 24.1951 0 28.0976 0C32 0 32 0 32 0C32 0 32 0 32 0L0 0Z"
      />
    </svg>
  );
}
