import { createBrowserRouter, useMatch } from "react-router-dom";
import Home from "../pages/Home";
import Edit from "../pages/Edit";
import Interview from "../pages/Interview";
import AddQuestions from "../pages/AddQuestions";
import AddInterview from "../pages/AddInterview";
import ViewInterview from "../pages/ViewInterview";
import StartInterview from "../pages/StartInterview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/duzenle/:id",
    element: <EditWrapper />,
  },
  {
    path: "/ekle",
    element: <AddQuestions />,
  },
  {
    path: "/mulakat",
    element: <Interview/>,
  },
  {
    path: "/olustur",
    element: <AddInterview/>,
  },
  {
    path:"/mulakat/baslat",
    element:<StartInterview/>
  },
  {
    path: "/goruntule/:id",
    element: <ViewInterviewWrapper/>,
  },
]);
function EditWrapper() {
  const match = useMatch("/duzenle/:id");
  const questionSetId = match?.params?.id;

  if (questionSetId) {
    return <Edit questionSetId={questionSetId} />;
  }
  return null;
}
function ViewInterviewWrapper() {
  const match = useMatch("/goruntule/:id");
  const interviewId = match?.params?.id;

  if (interviewId) {
    return <ViewInterview interviewId={interviewId} />;
  }
  return null;
}
export default router;
