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
  favoriteEmpty: {
    path: "M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z",
    viewbox: "0 0 24 24",
  },
  favoriteFilled: {
    path: "M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z",
    viewbox: "0 0 24 24",
  },
  chevronUp: {
    path: "M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z",
    viewbox: "0 0 24 24",
  },
  chevronDown: {
    path: "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z",
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
