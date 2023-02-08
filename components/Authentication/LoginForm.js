import { ListHeader } from "../EpisodesList/EpisodesList.styled";
import { FormHeader, LogButton, LogForm } from "./Login.styled";
import LoginInput from "./LoginInput";

export default function LoginForm() {
  function handleSubmit(e) {
    e.preventDefault();

    console.log("Login submitted");
  }

  return (
    <LogForm onSubmit={(e) => handleSubmit(e)}>
      <FormHeader>Einloggen</FormHeader>
      <LoginInput name="email" title="Email" type="email" />
      <LoginInput name="password" title="Passwort" type="password" />
      <LogButton type="submit">Absenden</LogButton>
    </LogForm>
  );
}
