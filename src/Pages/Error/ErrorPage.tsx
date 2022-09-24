import { useEffect } from "react";

export default function ErrorPage({ validateUser }: any) {
  useEffect(() => {
    validateUser();
  }, []);

  return (
    <>
      <main>ERROR 404</main>
    </>
  );
}
