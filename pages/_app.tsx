import { useEffect } from "react";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.querySelector("body")!.classList.add("bg-[#101826]");
  }, []);
  return <Component {...pageProps} />;
}
export default MyApp;
