import packageJson from "package.json";
import styles from "./footer.module.scss";

export function Footer() {
  const { version } = packageJson;

  return (
    <div className={styles.footerContainer}>
      <footer className={styles.footer}>
        <div className={styles.versionWrap}>
          <span className={styles.version}>Version: {version}</span>
        </div>

        <nav className={styles.footerLinks}>
          <a className={styles.footerLink} href="#">
            Docs
          </a>
          <a className={styles.footerLink} href="#">
            API
          </a>
          <a className={styles.footerLink} href="#">
            Help
          </a>
          <a className={styles.footerLink} href="#">
            Community
          </a>
        </nav>

        <div className={styles.logoWrap}>
          <img src="/icons/logo-small.svg" alt="logo" className={styles.logo} />
        </div>
      </footer>
    </div>
  );
}
