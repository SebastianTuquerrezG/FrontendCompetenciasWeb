import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirige a la página de login cuando se monte el componente
    router.push('/login');
  }, [router]);

  return (
    <div className="full-height">
      <p>Redirigiendo a la página de login...</p>
    </div>
  );
}