export default function BubbleTailTopSvg({
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
        d="M32 8H28.878C28.878 8 28.878 8 28.878 8C28.878 8 25.7561 8 23.4146 5.97895C21.0732 3.95789 20.2927 2.94737 18.7317 1.26316C17.1707 -0.421053 16.3902 -0.421053 14.8293 1.26316C13.2683 2.94737 11.7073 4.63158 10.1463 5.97895C8.58537 7.32632 7.80488 8 3.90244 8C-1.04299e-06 8 -1.57981e-07 8 -1.57981e-07 8C-1.57981e-07 8 1.33428e-07 8 -1.57981e-07 8L32 8Z"
      />
    </svg>
  );
}
