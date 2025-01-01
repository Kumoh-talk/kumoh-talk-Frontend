export default function PageMoreSvg({
  className = '',
}: {
  className?: string;
}) {
  return (
    <svg
      width="11"
      height="15"
      viewBox="0 0 11 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="3.45215"
        y="1.84375"
        width="8"
        height="1.5"
        rx="0.75"
        transform="rotate(45 3.45215 1.84375)"
        fill="#959595"
      />
      <rect
        width="8"
        height="1.5"
        rx="0.75"
        transform="matrix(-0.707107 0.707107 0.707107 0.707107 8.04785 6.44141)"
        fill="#959595"
      />
    </svg>
  );
}
