// @ts-ignore
// @ts-nocheck

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CVData } from "../../components/Docments/data";
import Header from "../../components/Header/Header";
import ResumeNavbar from "../../components/ResumeNavbar";
import CreateResumeComp from "./Comp/CreateResumeComp";
import "./resumeStyle.scss";

const CreateResumePage = () => {
  const { resume_type } = useParams();

  const [id, setId] = useState("");
  const [changeState, setChangeState] = useState("");

  const navigateTo = useNavigate();
  const resumeSelector = CVData;
  if (resume_type === "" || resume_type === "_blank") {
    navigateTo("/dashboard", {
      replace: true,
    });
  }

  const desiredResumeConfiguration = resumeSelector.find(
    (resume: any) => resume.resume_type === resume_type
  );

  useEffect(() => {
    setId(window.location.href.split("=")[1]);
  }, []);

  return (
    <>
      <Header />
      <main>
        <ResumeNavbar docId={id} changeState={changeState} />
        <CreateResumeComp
          docId={id}
          setdocId={setId}
          // selectedItem
          setChangeState={setChangeState}
          resume_type={desiredResumeConfiguration}
        />
      </main>
    </>
  );
};
export default CreateResumePage;
