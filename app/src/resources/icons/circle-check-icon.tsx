interface Props {
  size?: number;
}

export const CircleCheckIcon = ({ size }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size}
      height={size}
    >
      <rect width="256" height="256" fill="none" />
      <polyline
        points="88 136 112 160 168 104"
        fill="none"
        stroke="#449d1d"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <circle
        cx="128"
        cy="128"
        r="96"
        fill="none"
        stroke="#449d1d"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  );
};
