import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import { Routes } from "@config/routes";
import classNames from "classnames";
import { NavigationContext } from "./navigation-context";
import { MenuItemButton } from "./menu-item-button";
import { MenuItemLink } from "./menu-item-link";
import { Button } from "@features/ui";
import styles from "./sidebar-navigation.module.scss";

const menuItems = [
  { text: "Projects", iconSrc: "/icons/projects.svg", href: Routes.projects },
  { text: "Issues", iconSrc: "/icons/issues.svg", href: Routes.issues },
  { text: "Alerts", iconSrc: "/icons/alert.svg", href: Routes.alerts },
  { text: "Users", iconSrc: "/icons/users.svg", href: Routes.users },
  { text: "Settings", iconSrc: "/icons/settings.svg", href: Routes.settings },
];

export function SidebarNavigation() {
  const router = useRouter();
  const { isSidebarCollapsed, toggleSidebar } = useContext(NavigationContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLandscape, setIsLandscape] = useState(
    window !== undefined &&
      window.matchMedia("(orientation: landscape)").matches,
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(orientation: landscape)");

      const handleOrientationChange = (event: MediaQueryListEvent) => {
        setIsLandscape(event.matches);
      };

      mediaQuery.addEventListener("change", handleOrientationChange);

      return () => {
        mediaQuery.removeEventListener("change", handleOrientationChange);
      };
    }
  }, []);

  return (
    <div
      className={classNames(
        styles.container,
        isSidebarCollapsed && styles.isCollapsed,
      )}
    >
      <div
        className={classNames(
          styles.fixedContainer,
          isSidebarCollapsed && styles.isCollapsed,
        )}
      >
        <header className={styles.header}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              isSidebarCollapsed
                ? isLandscape
                  ? "/icons/logo-small.svg"
                  : "/icons/logo-large.svg"
                : "/icons/logo-large.svg"
            }
            alt="logo"
            className={styles.logo}
          />
          <Button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className={styles.menuButton}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={isMobileMenuOpen ? "/icons/close.svg" : "/icons/menu.svg"}
              alt={isMobileMenuOpen ? "close menu" : "open menu"}
              className={styles.menuIcon}
            />
          </Button>
        </header>
        <div
          className={classNames(
            styles.menuOverlay,
            isMobileMenuOpen && styles.isMobileMenuOpen,
          )}
        />
        <nav
          className={classNames(
            styles.nav,
            isMobileMenuOpen && styles.isMobileMenuOpen,
          )}
        >
          <ul className={styles.linkList}>
            {menuItems.map((menuItem, index) => (
              <MenuItemLink
                key={index}
                {...menuItem}
                isCollapsed={isSidebarCollapsed}
                isActive={router.pathname === menuItem.href}
              />
            ))}
          </ul>
          <ul className={styles.list}>
            <MenuItemButton
              text="Support"
              iconSrc="/icons/support.svg"
              isCollapsed={isSidebarCollapsed}
              onClick={() =>
                window.open(
                  "mailto:support@prolog-app.com?subject=Support Request: ",
                  "_blank",
                )
              }
              rotateIcon={false}
            />
            <MenuItemButton
              text="Collapse"
              iconSrc="/icons/arrow-left.svg"
              isCollapsed={isSidebarCollapsed}
              onClick={() => toggleSidebar()}
              className={styles.collapseMenuItem}
              rotateIcon={true}
            />
          </ul>
        </nav>
      </div>
    </div>
  );
}
