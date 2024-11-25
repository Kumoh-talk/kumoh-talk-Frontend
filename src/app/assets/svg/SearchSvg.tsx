export default function SearchSvg({ className = '' }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.5209 20.5816C17.7701 22.0889 15.4915 23 13 23C7.47715 23 3 18.5228 3 13C3 7.47715 7.47715 3 13 3C18.5228 3 23 7.47715 23 13C23 15.4915 22.0889 17.7701 20.5816 19.5209L24.5303 23.4697C24.8232 23.7626 24.8232 24.2374 24.5303 24.5303C24.2374 24.8232 23.7626 24.8232 23.4697 24.5303L19.5209 20.5816ZM21.5 13C21.5 17.6944 17.6944 21.5 13 21.5C8.30558 21.5 4.5 17.6944 4.5 13C4.5 8.30558 8.30558 4.5 13 4.5C17.6944 4.5 21.5 8.30558 21.5 13Z"
        fill="black"
        fillOpacity="0.85"
      />
    </svg>
  );
}
