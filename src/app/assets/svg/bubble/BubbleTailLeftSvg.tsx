export default function BubbleTailLeftSvg({
  className = '',
}: {
  className?: string;
}) {
  return (
    <svg
      width="8"
      height="32"
      viewBox="0 0 8 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0V3.12195C8 3.12195 8 3.12195 8 3.12195C8 3.12195 8 6.2439 5.97895 8.58537C3.95789 10.9268 2.94737 11.7073 1.26316 13.2683C-0.421053 14.8293 -0.421053 15.6098 1.26316 17.1707C2.94737 18.7317 4.63158 20.2927 5.97895 21.8537C7.32632 23.4146 8 24.1951 8 28.0976C8 32 8 32 8 32C8 32 8 32 8 32L8 0Z"
      />
    </svg>
  );
}
