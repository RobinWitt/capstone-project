import CreateAccForm from "@/components/Authentication/CreateAccForm";
import LoginForm from "@/components/Authentication/LoginForm";
import Link from "next/link";
import useSWR from "swr";

export default function LandingPage() {
  const { data, isLoading, error } = useSWR("/api/users/user");

  if (error)
    return (
      <main>
        <h2>Fehler beim Laden</h2>
      </main>
    );
  if (isLoading)
    return (
      <main>
        <h2>wird geladen...</h2>
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
