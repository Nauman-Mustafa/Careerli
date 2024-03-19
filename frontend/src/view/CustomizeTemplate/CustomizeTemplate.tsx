// @ts-nocheck
import { Icon } from "@iconify/react";
import { useEffect, useMemo, useState } from "react";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetch from "use-http";
import CreativeTemplate from "../../assets/images/CreativeTemplate.png";
import ClassicResumeTemlpate from "../../components/CreatedResume/Comp/ClassicResumeTemlpate";
import ClassicResumeTemlpate11 from "../../components/CreatedResume/Comp/ClassicResumeTemlpate11";
import ClassicResumeTemlpate7 from "../../components/CreatedResume/Comp/ClassicResumeTemlpate7";
import ResumeCreativeTemplate from "../../components/CreatedResume/Comp/ResumeCreativeTemplate";
import { CVData } from "../../components/Docments/data";
import Header from "../../components/Header/Header";
import { TempType } from "../../enums/template.enum";
import { getDataFromLocalDB, sectionListData } from "../../services";
import ResumeStyles from "./Components/ResumeStyles";
import "./editTemplateStyle.scss";
import star from "../../assets/images/star.png";

const CustomizeTemplate = (userData) => {
  console.log(userData?.userData?.roles);
  const resumeData = CVData;
  const [dashboardResume, setDashboardResume] = useState([...resumeData]);
  const [selectedImg, setSelectedImg] = useState(CreativeTemplate);
  const [template, setTemplate] = useState("");
  const _template = JSON.parse(localStorage.getItem("templateType"));
  const [activeTab, setActiveTab] = useState("Template");
  const [_category, setCategory] = useState("");
  const [docId, setDocId] = useState("");
  const { response, post, loading, get, data: repos, put } = useFetch();
  const auth: any = useSelector((store: any) => store.auth);
  const [data, setData] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    setDocId(window.location.href.split("=")[1]);
  }, [docId]);

  useEffect(() => {
    if (docId) {
      fetchResume();
    }
  }, [docId]);

  const fetchResume = async () => {
    // const res = await get(`resume/my-resume/${docId}`);
    // // console.log(res?.data?.profileImage, "res ponse ");

    // setTemplate(res?.data?.resumeType);
    if (auth.isLoggedIn) {
      const {
        data: {
          resumeTitle,
          profile,
          workHistory,
          education,
          publications,
          skills,
          languages,
          hobbies,
          certification,
          references,
          summary,
          achievements,
          customSection,
          profileImage,
          resumeType,
        },
      } = await get(`resume/my-resume/${docId}`);
      if (response.ok) {
        sectionListData({
          resumeTitle,
          profile,
          workHistory,
          education,
          publications,
          skills,
          languages,
          hobbies,
          certification,
          references,
          summary,
          achievements,
          customSection,
          profileImage,
        });
        setData({
          profile,
          workHistory,
          education,
          publications,
          skills,
          languages,
          hobbies,
          certification,
          references,
          summary,
          achievements,
          customSection,
          resumeTitle,
        });

        setTemplate(resumeType);
      }
    } else {
      ///// Get data from
      const {
        resumeTitle,
        profile,
        workHistory,
        education,
        publications,
        skills,
        languages,
        hobbies,
        certification,
        references,
        summary,
        achievements,
        customSection,
      } = getDataFromLocalDB();
      sectionListData({
        profile,
        workHistory,
        education,
        publications,
        skills,
        languages,
        hobbies,
        certification,
        references,
        summary,
        achievements,
        customSection,
        resumeTitle,
      });
      setData({
        profile,
        workHistory,
        education,
        publications,
        skills,
        languages,
        hobbies,
        certification,
        references,
        summary,
        achievements,
        customSection,
        resumeTitle,
      });

      setTemplate(_template?.resumeName);
    }
  };
  const filterItems = useMemo(
    () => [
      { name: "creative", category: "creative" },
      { name: "classic", category: "classic" },
    ],
    []
  );
  const filterResume = (toolText: string) => {
    if (toolText === "reset") {
      const filteredResume = [...resumeData];
      setDashboardResume([...filteredResume]);
    } else {
      const filteredResume = resumeData.filter((tool: any) => {
        if (tool.category === toolText) {
          return true;
        } else {
          return false;
        }
      });
      setDashboardResume([...filteredResume]);
    }
  };
  const changeTemplate = async (name: any, category: any, imagePath: any) => {
    console.log({ name, category, imagePath });
    setSelectedImg(imagePath);
    setTemplate(name);
    if (auth.isLoggedIn) {
      const res = await put(`resume/update/${docId}`, {
        templateCategory: category,
        resumeType: name,
      });
    } else {
      let data = {
        resumeCategory: category,
        resumeName: name,
      };
      localStorage.setItem("templateType", JSON.stringify(data));
    }
  };

  const tabButton = [
    { tabName: "Template" },
    { tabName: "Preview" },
    { tabName: "Styling" },
  ];
  const getTemplate = (templateType) => {
    switch (templateType) {
      case TempType.TEMPLATE_ONE:
        return <ResumeCreativeTemplate data={data} />;
      case TempType.TEMPLATE_TWO:
        return <ClassicResumeTemlpate data={data} />;
      case TempType.TEMPLATE_SEVEN:
        return <ClassicResumeTemlpate7 data={data} />;
      case TempType.TEMPLATE_ELEVEN:
        return <ClassicResumeTemlpate11 data={data} />;
    }
  };
  return (
    <>
      <Header />
      <div className="customize-template">
        <div className="d-flex">
          <div className="resume-tabs">
            <div onClick={() => navigate(-1)} className="go-back d-lg-none">
              <Icon icon="mingcute:back-2-line" />
              <span>Go Back to Resume</span>
            </div>
            <ul>
              {tabButton.map((tab, i) => (
                <li key={i}>
                  <button
                    className={activeTab === tab.tabName ? "active-tab" : ""}
                    onClick={(e) => setActiveTab((e.activeTab = tab.tabName))}
                  >
                    {tab.tabName}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div
            className={`left-side ${
              activeTab === "Template" ? "" : "display-none"
            }`}
          >
            <div className="template-filters">
              <Nav defaultActiveKey="/all">
                <Nav.Item
                  onClick={(e: any) => {
                    e.preventDefault();
                    filterResume("reset");
                  }}
                >
                  <Nav.Link href="/all" onClick={() => {}}>
                    All
                  </Nav.Link>
                </Nav.Item>
                {filterItems.map((item: any, i: any) => (
                  <Nav.Item
                    key={`filter-button-${i}`}
                    onClick={(e: any) => {
                      e.preventDefault();
                      filterResume(item.category);
                    }}
                  >
                    <Nav.Link href={`/${item.name}`}>{item.name}</Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </div>
            <div className="resumeTemplates">
              <div className="row">
                {dashboardResume.map((item, i) => {
                  console.log({ item });
                  return (
                    <div
                      className="col-6"
                      key={i}
                      onClick={
                        item.category === "creative" &&
                        userData?.userData?.roles[0] == "Free Member"
                          ? null
                          : () => {
                              changeTemplate(
                                item.name,
                                item.category,
                                item.imagePath
                              );
                              setCategory(item.category);
                            }
                      }
                    >
                      <div className="single-template-wrapper">
                        <div
                          className={`single-template ${
                            item?.name === template ? "activeTemp" : ""
                          }`}
                        >
                          <figure>
                            {item.category === "creative" &&
                            userData?.userData?.roles[0] == "Free Member" ? (
                              <img
                                style={{ width: "25px", float: "right" }}
                                src={star}
                                alt=""
                              />
                            ) : (
                              ""
                            )}
                            <img src={item?.imagePath} alt={item.name} />
                          </figure>
                          <div className="template-content">
                            <p>{item.name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div
            className={`middle-side ${
              activeTab === "Preview" ? "" : "display-none"
            }`}
          >
            <div
              onClick={() => navigate(-1)}
              className="go-back d-lg-block d-none"
            >
              <Icon icon="mingcute:back-2-line" />
              <span>Go Back to Resume</span>
            </div>
            <div className="resume-created-design">{getTemplate(template)}</div>
          </div>
          <div
            className={`right-side ${
              activeTab === "Styling" ? "" : "display-none"
            }`}
          >
            <ResumeStyles userData={userData}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomizeTemplate;
