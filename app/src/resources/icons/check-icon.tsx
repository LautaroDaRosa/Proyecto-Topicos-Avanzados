interface Props {
  size?: number;
  color?: string;
}

export const CheckIcon = ({ size, color }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size}
      height={size}
    >
      <rect width="256" height="256" fill="none" />
      <polyline
        points="40 144 96 200 224 72"
        fill="none"
        stroke={color || 'currentColor'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  );
};
