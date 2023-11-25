interface Props {
  size?: number;
  color?: string;
}

export const LeftRightIcon = ({ size, color }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size || 14}
      height={size || 14}
    >
      <rect width="256" height="256" fill="none" />
      <polyline
        points="176 144 208 176 176 208"
        fill="none"
        stroke={color || 'currentColor'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <line
        x1="48"
        y1="176"
        x2="208"
        y2="176"
        fill="none"
        stroke={color || 'currentColor'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <polyline
        points="80 112 48 80 80 48"
        fill="none"
        stroke={color || 'currentColor'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <line
        x1="208"
        y1="80"
        x2="48"
        y2="80"
        fill="none"
        stroke={color || 'currentColor'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  );
};