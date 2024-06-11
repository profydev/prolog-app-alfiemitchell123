import { useState, useRef, ChangeEvent } from "react";
import { Select } from "@features/ui";
import { Input, InputIcon } from "@features/ui";
import { Button, ButtonSize, ButtonIcon } from "@features/ui";
import { statusOptions, levelOptions } from "./options";
import { useRouter } from "next/router";
import { debounce } from "lodash";
import styles from "./issue-filters.module.scss";

export function IssueFilters() {
  const router = useRouter();

  const [filters, setFilters] = useState({
    status: router.query.status || "",
    level: router.query.level || "",
    project: router.query.project || "",
  });

  const updateFilter = (filterName: string, filterValue: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: filterValue,
    }));
    router.push({
      pathname: router.pathname,
      query: { ...router.query, [filterName]: filterValue },
    });
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    updateFilter("status", event.target.value);
  };
  const handleLevelChange = (event: ChangeEvent<HTMLSelectElement>) => {
    updateFilter("level", event.target.value);
  };

  const debouncedUpdateFilter = useRef(
    debounce((value: string) => {
      updateFilter("project", value);
    }, 200),
  ).current;

  const handleProjectNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedUpdateFilter(value);
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterContent}>
        <Button
          className={styles.resolveBtn}
          size={ButtonSize.lg}
          icon={ButtonIcon.leading}
          iconSrc="/icons/check.svg"
        >
          Resolve selected issues
        </Button>
        <div className={styles.filters}>
          <Select
            className={styles.filterSelect}
            options={statusOptions}
            value={filters.status}
            onChange={handleStatusChange}
            placeholder="Status"
          />
          <Select
            className={styles.filterSelect}
            options={levelOptions}
            value={filters.level}
            onChange={handleLevelChange}
            placeholder="Level"
          />
          <div className={styles.inputContainer}>
            <Input
              className={styles.filterInput}
              placeholder="Project Name"
              value={filters.project || ""}
              icon={InputIcon.icon}
              iconSrc={"/icons/search.svg"}
              onChange={handleProjectNameChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
