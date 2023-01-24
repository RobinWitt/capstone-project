import { StyledSvg } from ".";

export function HomeIconEmpty() {
  return (
    <StyledSvg viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22"
      />
    </StyledSvg>
  );
}

export function HomeIconFilled() {
  return (
    <StyledSvg viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"
      />
    </StyledSvg>
  );
}
