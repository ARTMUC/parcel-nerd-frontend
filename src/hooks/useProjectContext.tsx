import { useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";

export const useProjectContext = () => {
    const projectContext = useContext(ProjectContext)

    if (!projectContext) { throw new Error('Missing AuthContext data') }

    return projectContext
}