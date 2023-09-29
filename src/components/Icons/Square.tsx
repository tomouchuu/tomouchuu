// https://feathericons.dev/?search=square&iconset=feather&format=strict-tsx
export function Square(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 38 38"
      width="38"
      height="38"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      {...props}
    >
      <rect height="32" rx="2" ry="2" width="32" x="3" y="3" />
    </svg>
  );
}
