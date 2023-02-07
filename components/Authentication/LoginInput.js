import { LogInput, LogLabel } from "./Login.styled";

export default function LoginInput({ name, title, type }) {
  return (
    <>
      <LogLabel htmlFor={name}>{title}</LogLabel>
      <LogInput id={name} name={name} type={type} />
    </>
  );
}
