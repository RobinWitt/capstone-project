import { ListHeader } from "../EpisodesList/EpisodesList.styled";
import { FormHeader, LogButton, LogForm } from "./Login.styled";
import LoginInput from "./LoginInput";

export default function CreateAccForm() {
  function handleSubmit(e) {
    e.preventDefault();

    console.log("Account created");
  }

  return (
    <LogForm onSubmit={(e) => handleSubmit(e)}>
      <FormHeader>Account erstellen</FormHeader>
      <LoginInput name="email" title="Email" type="email" />
      <LoginInput name="name" title="Benutzername" type="text" />
      <LoginInput name="password" title="Passwort" type="password" />
      <LogButton type="submit">Absenden</LogButton>
    </LogForm>
  );
}
