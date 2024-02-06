import { useState } from "react";
import { ProjectCard } from "../project-card";
import { useGetProjects } from "../../api/use-get-projects";
import styles from "./project-list.module.scss";

export function ProjectList() {
  const { data, isLoading, isError, error, refetch } = useGetProjects();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    refetch().then(() => {
      setRefreshing(false);
    });
  };

  if (isLoading || refreshing) {
    return (
      <div className={styles.loadingWrap}>
        <img src="icons/loading.svg" alt="Loading" className={styles.loading} />
      </div>
    );
  }

  if (isError) {
    console.error(error);
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorWrap}>
          <img src="icons/alert-circle.svg" alt="Error" />
          <span className={styles.errorMessage}>
            There was a problem while loading the project data
          </span>
        </div>

        <div className={styles.errorWrap}>
          <button className={styles.errorMessage} onClick={handleRefresh}>
            Try again
          </button>
          <img
            src="icons/arrow-right.svg"
            alt="arrow"
            className={styles.arrowRight}
          />
        </div>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {data?.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
