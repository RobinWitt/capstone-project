import { LogButton, LogForm } from "./Login.styled";
import LoginInput from "./LoginInput";

export default function CreateAccForm() {
  function handleSubmit(e) {
    e.preventDefault();

    console.log("Account created");
  }

  return (
    <LogForm onSubmit={(e) => handleSubmit(e)}>
      <h2>Account erstellen</h2>
      <LoginInput name="email" title="Email" type="email" />
      <LoginInput name="name" title="Benutzername" type="text" />
      <LoginInput name="password" title="Passwort" type="password" />
      <LogButton type="submit">Absenden</LogButton>
    </LogForm>
  );
}
