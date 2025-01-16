import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
      <Header toggleTheme={toggleTheme} theme={theme} />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
