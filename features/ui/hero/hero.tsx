import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "./hero.module.scss";

// Define the types for your data structure
interface Image {
  src: string;
  width: number;
  height: number;
}

interface HeroSection {
  sectionType: "hero";
  theme: string;
  title: string;
  subtitle: string;
  image: Image;
}

interface ContentData {
  meta: {
    title: string;
    description: string;
    image: string;
  };
  sections: HeroSection[];
}

export function Hero() {
  const [heroData, setHeroData] = useState<HeroSection | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://prolog-api.profy.dev/content-page/home");
      const result: ContentData = await res.json();
      const heroSection = result.sections.find(
        (section): section is HeroSection => section.sectionType === "hero",
      );
      setHeroData(heroSection || null);
    };

    fetchData();
  }, []);

  if (!heroData) {
    return <p>Loading...</p>;
  }

  const baseUrl = "https://prolog-api.profy.dev";
  const imageUrl = `${baseUrl}${heroData.image.src}`;

  return (
    <div
      className={`${styles.hero} ${styles[heroData.theme.replace(" ", "-")]}`}
    >
      <Head>
        <title>{heroData.title}</title>
        <meta name="description" content={heroData.subtitle} />
        <meta property="og:image" content={imageUrl} />
      </Head>
      <div className={styles.heroContainer}>
        <div className={styles.heroTitleContainer}>
          <h1 className={styles.heroTitle}>{heroData.title}</h1>
          <p className={styles.heroSubtitle}>{heroData.subtitle}</p>
        </div>
        <img
          src={imageUrl}
          alt="Hero Image"
          width={heroData.image.width}
          height={heroData.image.height}
          className={styles.heroImage}
        />
      </div>
    </div>
  );
}

// export default Hero;
