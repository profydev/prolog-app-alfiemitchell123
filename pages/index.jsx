import { Routes } from "@config/routes";
import { Button, ButtonSize } from "@features/ui";
import Link from "next/link";
import styles from "./index.module.scss";

const IssuesPage = () => {
  const menuItems = [
    { text: "Home", href: "/" },
    { text: "Products", href: "/products" },
    { text: "Documentation", href: "/documentation" },
    { text: "Pricing", href: "/pricing" },
  ];

  return (
    <div>
      <header className={styles.header}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/logo-large.svg" alt="Prolog logo" />
        <ul className={styles.navLinks}>
          {menuItems.map((menuItem, index) => (
            <li key={index}>
              <Link className={styles.navLink} href={menuItem.href}>
                {menuItem.text}
              </Link>
            </li>
          ))}
        </ul>
        <Button
          size={ButtonSize.lg}
          className={styles.dashboardLink}
          href={Routes.projects}
        >
          Open Dashboard
        </Button>
      </header>
      <button
        className={styles.contactButton}
        onClick={() =>
          alert(
            "Implement this in Challenge 2 - Modal:\n\nhttps://profy.dev/rjs-challenge-modal",
          )
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/message.svg" alt="Contact" />
      </button>
    </div>
  );
};

export default IssuesPage;
