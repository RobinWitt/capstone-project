// copied from: https://codesandbox.io/s/dreamy-joana-13ij6o

const paths = {
  homeEmpty: {
    path: "M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22",
    viewbox: "0 0 24 24",
  },
  homeFilled: {
    path: "M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z",
    viewbox: "0 0 24 24",
  },
  returnIcon: {
    path: "M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z",
    viewbox: "0 0 24 24",
  },
};

export default function SVGIcon({ variant, width, color = "currentColor" }) {
  return (
    <svg viewBox={paths[variant].viewbox} width={width} fill={color}>
      <title>{variant}</title>
      <path d={paths[variant].path} />
    </svg>
  );
}
