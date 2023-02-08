import CreateAccForm from "@/components/Authentication/CreateAccForm";
import LoginForm from "@/components/Authentication/LoginForm";
import { ListHeader } from "@/components/EpisodesList/EpisodesList.styled";
import Link from "next/link";
import useSWR from "swr";

export default function LandingPage() {
  const { data, isLoading, error } = useSWR("/api/users/user");

  if (error)
    return (
      <main>
        <ListHeader>Fehler beim Laden</ListHeader>
      </main>
    );
  if (isLoading)
    return (
      <main>
        <ListHeader>wird geladen...</ListHeader>
      </main>
    );

  if (data)
    return (
      <main>
        <LoginForm />
        <h2>oder</h2>
        <CreateAccForm />
        <Link href={"/startseite"}>Ohne Account nutzen</Link>
      </main>
    );
}
