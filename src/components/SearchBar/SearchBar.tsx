import { useRef } from "react";
import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";

export interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const formRef = useRef<HTMLFormElement>(null);


  async function formAction(formData: FormData) {
    const q = (formData.get("query") || "").toString().trim();

    if (!q) {
      toast.error("Please enter your search query.");
      return;
    }

    onSubmit(q);
    formRef.current?.reset();
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        {/* ключове: використовуємо action, а не onSubmit */}
        <form className={styles.form} action={formAction} ref={formRef}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
