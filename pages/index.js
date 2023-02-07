import Link from "next/link";

export default function LandingPage() {
  return (
    <main>
      <p>Login!</p>
      <p>Ohne Account nutzen</p>
      <Link href={"/startseite"}>Startseite</Link>
    </main>
  );
}
