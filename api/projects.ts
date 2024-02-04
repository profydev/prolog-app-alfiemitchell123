import { axios } from "./axios";
import { Project, ProjectStatus } from "./projects.types";

const ENDPOINT = "/project";

export async function getProjects(): Promise<Project[]> {
  const { data } = await axios.get<Project[]>(ENDPOINT);

  const modifiedData = data.map((project, index) => {
    let status: ProjectStatus = ProjectStatus.stable; // Default value

    if (index === 0) {
      status = ProjectStatus.critical;
    } else if (index === 1) {
      status = ProjectStatus.warning;
    } else if (index === 2) {
      status = ProjectStatus.stable;
    }

    return {
      ...project,
      status,
    };
  });

  return modifiedData;
}
