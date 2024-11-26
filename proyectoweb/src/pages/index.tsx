import Image from "next/image";
import localFont from "next/font/local";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const changePage = (e: React.FormEvent) => {
    e.preventDefault();

    router.push('/main');
  }

  return (
    <div className="full-height">
      <p>Hello world</p>
      <form onSubmit={changePage}>
        <button type="submit">Ir a main</button>
      </form>
    </div>
  );
}
