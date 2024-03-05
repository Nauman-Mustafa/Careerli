// @ts-nocheck

import { Icon } from "@iconify/react";
import { useEffect, useMemo, useState } from "react";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetch from "use-http";
import firstCover from "../../assets/images/firstCover.jpg";
import secondCover from "../../assets/images/secondCoverImage.jpg";
import FirstLatestCoverLetter from "../../components/CreateCoverLetter/Comp/FirstLatestCoverLetter";
import SecondLatestCoverLetter from "../../components/CreateCoverLetter/Comp/SecondLatestCoverLetter";
import Header from "../../components/Header/Header";
import { $coverLetter, $coverLetterStyle } from "../../services";
import ResumeStyles from "./Components/ResumeStyles";

const resumeTemplate = [
  {
    name: "First Template",
    imagePath: firstCover,
    category: "classic",
  },
  {
    name: "Second Template",
    imagePath: secondCover,
    category: "creative",
  },
];

const CustomizeCoverLetter = () => {
  const [activeTab, setActiveTab] = useState("Template");
  const [dashboardResume, setDashboardResume] = useState([...resumeTemplate]);
  const [selectedImg, setSelectedImg] = useState(secondCover);
  const [docId, setDocId] = useState("");
  const { response, post, loading, get, data: repos, put } = useFetch();
  const auth: any = useSelector((store: any) => store.auth);
  const navigate = useNavigate();
  const [data, setData] = useState<any>({});

  const [selectedTemp, setSelectedTemp] = useState<string>("");
  const [resumeStyleData, setResumeStyle] = useState<any>({});
  const template = JSON.parse(localStorage.getItem("coverTemplateType"));
  const customStyle = JSON.parse(localStorage.getItem("coverStyle"));
  useEffect(() => {
    setDocId(window.location.href.split("=")[1]);
  }, []);
  const filterItems = useMemo(
    () => [
      { name: "Creative", category: "creative" },
      { name: "Classic", category: "classic" },
    ],
    []
  );
  const filterResume = (toolText: string) => {
    if (toolText === "reset") {
      const filteredResume = [...resumeTemplate];
      setDashboardResume([...filteredResume]);
    } else {
      const filteredResume = resumeTemplate.filter((tool: any) => {
        if (tool.category === toolText) {
          return true;
        } else {
          return false;
        }
      });
      setDashboardResume([...filteredResume]);
    }
  };
  const changeTemplate = async (category: any, imagePath: any) => {
    setSelectedImg(imagePath);
    setSelectedTemp(category);
    if (auth.isLoggedIn) {
      const res = await put(`cover-letter/update/${docId}`, {
        coverTemplateType: category,
        coverLetterType: category,
      });
    } else {
      let data = {
        coverLetterCategory: "Basic",
        coverLetterName: category,
      };
      localStorage.setItem("coverTemplateType", JSON.stringify(data));
    }
  };

  useEffect(() => {
    const $sub = $coverLetter.subscribe((v) => {
      setData(v);
    });
    const $style = $coverLetterStyle.subscribe((s: any) => {
      if (s) setResumeStyle(s);
    });
    return () => {
      $style.unsubscribe();
      $sub.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (docId != "guestUser" && auth.isLoggedIn && docId) {
      fetchResume();
    } else {
      setSelectedTemp(template?.coverLetterName);
      setResumeStyle(customStyle);
    }
  }, [docId]);
  const fetchResume = async () => {
    const res = await get(`cover-letter/my-cover-letter/${docId}`);

    setSelectedTemp(res?.data?.coverLetterType);
    setResumeStyle(res?.data?.coverStyle);
  };

  const tabButton = [
    { tabName: "Template" },
    { tabName: "Preview" },
    { tabName: "Styling" },
  ];

  return (
    <div className="customize-template">
      <Header />
      <div className="d-flex">
        <div className="resume-tabs">
          <div onClick={() => navigate(-1)} className="go-back d-lg-none">
            <Icon icon="mingcute:back-2-line" />
            <span>Go Back to Cover Letter</span>
          </div>
          <ul>
            {tabButton.map((tab, i) => (
              <li key={i}>
                <button
                  className={activeTab === tab.tabName ? "active-tab" : ""}
                  onClick={(e: any) =>
                    setActiveTab((e.activeTab = tab.tabName))
                  }
                >
                  {tab.tabName}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`left-side ${activeTab === "Template" ? "" : "display-none"
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
                <Nav.Link href="/all" onClick={() => { }}>
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
              {dashboardResume.map((item, i) => (
                <div
                  className="col-6"
                  key={i}
                  onClick={() => changeTemplate(item.name, item.imagePath)}
                >
                  <div className="single-template-wrapper">
                    <div
                      className={`single-template ${item?.name === selectedTemp ? "activeTemp" : ""
                        }`}
                    >
                      <figure>
                        <img src={item.imagePath} alt={item.name} />
                      </figure>
                      <div className="template-content">
                        <p>{item.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`middle-side ${activeTab === "Preview" ? "" : "display-none"
            }`}
        >
          <div
            onClick={() => navigate(-1)}
            className="go-back d-lg-block d-none"
          >
            <Icon icon="mingcute:back-2-line" />
            <span>Go Back to Cover Letter</span>
          </div>
          <div className="resume-created-design">
            {/* <figure>
              <img src={selectedImg} />
            </figure> */}
            {selectedTemp === "First Template" ? (
              <FirstLatestCoverLetter
                data={data}
                resumeStyleData={resumeStyleData}
              />
            ) : (
              <SecondLatestCoverLetter
                data={data}
                resumeStyleData={resumeStyleData}
              />
            )}
          </div>
        </div>
        <div
          className={`right-side ${activeTab === "Styling" ? "" : "display-none"
            }`}
        >
          <ResumeStyles />
        </div>
      </div>
    </div>
  );
};

export default CustomizeCoverLetter;
