import { createBrowserRouter } from "react-router";
import { CandidateListPage } from "./pages/CandidateListPage";
import { JobPage } from "./pages/JobPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: JobPage,
  },
  {
    path: "/candidatos",
    Component: CandidateListPage,
  },
  {
    path: "/candidatos/candidato/:id",
    Component: CandidateListPage,
  },
  {
    path: "*",
    Component: JobPage,
  },
]);