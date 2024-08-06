import React, { useState } from "react";
import { Routes } from "@config/routes";
import { Button, ButtonSize, ButtonColor } from "@features/ui";
import { Modal } from "@features/ui";
import Link from "next/link";
import styles from "./index.module.scss";
import classNames from "classnames";
import { Hero } from "@features/ui";

const IssuesPage = () => {
  const menuItems = [
    { text: "Home", href: "/" },
    { text: "Products", href: "/products" },
    { text: "Documentation", href: "/documentation" },
    { text: "Pricing", href: "/pricing" },
  ];

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className={styles.container}>
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
      <button className={styles.contactButton} onClick={handleOpenModal}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/message.svg" alt="Contact" />
      </button>

      <Modal show={showModal} handleClose={handleCloseModal}>
        <div className={styles.modalContainer}>
          <div className={styles.modalTopContent}>
            <svg
              width="44"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.3332 4.99999C18.3332 4.08333 17.5832 3.33333 16.6665 3.33333H3.33317C2.4165 3.33333 1.6665 4.08333 1.6665 4.99999M18.3332 4.99999V15C18.3332 15.9167 17.5832 16.6667 16.6665 16.6667H3.33317C2.4165 16.6667 1.6665 15.9167 1.6665 15V4.99999M18.3332 4.99999L9.99984 10.8333L1.6665 4.99999"
                stroke="#101828"
                stroke-width="0.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div>
              <h2 className={styles.contactUsTitle}>Contact Us Via Email</h2>
              <p className={styles.emailP}>
                Any questions? Send us an email at prolog@profy.dev. We usually
                answer within 24 hours.
              </p>
            </div>
          </div>
          <div className={styles.btnContainer}>
            <Button
              className={classNames(styles.modalBtn, styles.cancelBtn)}
              onClick={handleCloseModal}
              size={ButtonSize.lg}
              color={ButtonColor.gray}
            >
              Cancel
            </Button>
            <Button
              className={classNames(styles.modalBtn, styles.openEmailBtn)}
              onClick={() => window.open("mailto:prolog@profy.dev")}
            >
              Open Email App
            </Button>
          </div>
        </div>
      </Modal>

      <Hero />
    </div>
  );
};

export default IssuesPage;
