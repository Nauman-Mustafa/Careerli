import { useState } from "react";
import Header from "../../components/Header/Header";
import ResumeTemplate from "../../components/ResumeTemplate/ResumeTemplate";
import { updateData } from "../../services";
import { newResume } from "../../services/data";

const DashboardPage = () => {
  const [styleData, setStyleData] = useState<{
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    lieHeight: string;
    color: string;
    backgroundColor: string;
  }>({
    fontFamily: "",
    fontSize: "",
    fontWeight: "",
    lieHeight: "",
    color: "",
    backgroundColor: "",
  });
  updateData(newResume);
  localStorage.setItem(
    "templateType",
    JSON.stringify({ resumeCategory: "creative", resumeName: "Template 1" })
  );
  localStorage.setItem("resumeStyle", JSON.stringify(styleData));
  return (
    <>
      <Header />
      <main className="dashboard-main" style={{ backgroundColor: "#fff" }}>
        <ResumeTemplate />
      </main>
    </>
  );
};

export default DashboardPage;
