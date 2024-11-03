export default function NaverSvg({ className = '' }: { className?: string }) {
  return (
    <svg
      width="45"
      height="45"
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="0.5" y="0.5" width="44" height="44" rx="22" fill="#03C75A" />
      <g clipPath="url(#clip0_1819_2292)">
        <path
          d="M25.3843 23.0689L19.3792 14.401H14.4019V30.5977H19.616V21.9284L25.6212 30.5977H30.5985V14.401H25.3843V23.0689Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_1819_2292">
          <rect
            width="16.1966"
            height="16.1966"
            fill="white"
            transform="translate(14.4019 14.4023)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
