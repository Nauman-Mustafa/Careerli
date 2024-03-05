// @ts-nocheck
import { Icon } from "@iconify/react";
import { useEffect, useMemo, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useFetch from "use-http";
import {
  $coverLetter,
  getDataFromLocalDBForCover,
  updateCoverLetter,
} from "../../services";
import "../CreatedResume/resumeStyle.scss";
import Header from "../Header/Header";
import CoverLetterBody from "./Comp/CoverLetterBody";
import CoverLetterClosing from "./Comp/CoverLetterClosing";
import CoverLetterIntroduction from "./Comp/CoverLetterIntroduction";
import CoverLetterProfile from "./Comp/CoverLetterProfile";
import CoverLetterSidebar from "./Comp/CoverLetterSidebar";
import "./coverLetterStyle.scss";
const CreateCoverLetter = () => {
  const {
    response,
    post,
    loading,
    get,
    data: repos,
    put,
    request,
  } = useFetch();

  const [activeTab, setActiveTab] = useState("Fill In");
  const [currentTab, setCurrentTab] = useState(0);
  const [editName, setEditName] = useState(false);
  const [coverLetterData, setCoverLetterData] = useState({});
  const [sectionTitle, setSectionTitle] = useState("Cover Letter");
  const [id, setId] = useState("");
  const auth: any = useSelector((store: any) => store.auth);
  const coverLetterTabs = useMemo(
    () => [
      {
        tabName: "Profile",
        iconPath: <Icon icon="ph:user-circle-light" />,
        tabClass: "active-tab",
      },
      // {
      //   tabName: "Receipient",
      //   iconPath: <Icon icon="ph:envelope" />,
      //   tabClass: "",
      // },
      {
        tabName: "Introduction",
        iconPath: <Icon icon="ph:envelope-simple-open" />,
        tabClass: "",
      },
      {
        tabName: "Body",
        iconPath: <Icon icon="ph:note-pencil-light" />,
        tabClass: "",
      },
      {
        tabName: "Closing",
        iconPath: <Icon icon="ph:envelope-simple-light" />,
        tabClass: "",
      },
    ],
    []
  );
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const $sub = $coverLetter.subscribe((v) => {
      setData(v);
    });
    return () => $sub.unsubscribe();
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    setId(window.location.href.split("=")[1]);
  }, []);
  useEffect(() => {
    if (id) {
      fecthCoverLetter();
    }
  }, [id]);
  useEffect(() => {
    if (auth && auth.access_token && id === "guestUser") {
      CreateCoverLetter();
    }
  }, [id, auth]);

  const fecthCoverLetter = async () => {
    if (auth.isLoggedIn) {
      const res = await get(`cover-letter/my-cover-letter/${id}`);

      setCoverLetterData(res?.data);

      setSectionTitle(res?.data?.coverLetterTitle);
    } else {
      const data = getDataFromLocalDBForCover();
      setCoverLetterData(data);

      setSectionTitle(
        data?.coverLetterTitle ? data?.coverLetterTitle : "Cover Letter"
      );
    }
  };
  const CreateCoverLetter = async () => {
    const data = getDataFromLocalDBForCover();
    request.cache.set;
    const res = await post("cover-letter/create", data);

    navigate(`/cover-letter/create-cover-letter?id=${res?.data?._id}`);
    // if (res.code == 200) {
    //   const res = await get("cover-letter/generate/" + id);
    //   const link = document.createElement("a");
    //   link.href = res["url"];
    //   link.download = "MyResume.pdf";
    //   link.click();
    //   link.remove();
    // }
    window.location.reload();
  };

  const changeTitle = (e) => {
    e.stopPropagation();
    setEditName(false);
    updateCoverLetter({ coverLetterTitle: sectionTitle });
    if (auth.isLoggedIn) {
      const postTitle = async () => {
        const res = await put(`cover-letter/update/${id}`, {
          coverLetterTitle: sectionTitle,
        });
      };
      postTitle();
    }
  };

  const NextButton = (props: any) => {
    let coverLetterTabName = "";
    if (currentTab === coverLetterTabs.length - 1)
      coverLetterTabName = coverLetterTabs[0].tabName;
    else coverLetterTabName = coverLetterTabs[currentTab + 1].tabName;

    const postHandle = async () => {
      if (auth.isLoggedIn) {
        // const data = getDataFromLocalDBForCover();

        const res = await put(`cover-letter/update/${id}`, {
          profile: data?.profile,
          receipient: data?.receipient,
          body: data?.body,
          closing: data?.closing,
          introduction: data?.introduction,
        });
        toast("Data saved");
      } else {
        toast("Data saved");
      }
    };
    const moveNext = async () => {
      if (
        coverLetterTabName === "Introduction" &&
        data?.profile?.firstName !== undefined &&
        data?.profile?.lastName !== undefined &&
        data?.profile?.email !== undefined
        // data?.receipient?.firstName !== undefined &&
        // data?.receipient?.lastName !== undefined &&
        // data?.receipient?.positionHeld !== undefined &&
        // data?.receipient?.companyName !== undefined
      ) {
        setCurrentTab((prev) => prev + 1);
      } else if (coverLetterTabName === "Body") {
        setCurrentTab((prev) => prev + 1);
      } else if (coverLetterTabName === "Closing" && data?.body !== undefined) {
        setCurrentTab((prev) => prev + 1);
      } else {
        toast("Please fill  the mandatory fields");
      }
    };
    return (
      <>
        {currentTab === 3 ? (
          <button className="btn btn-black" onClick={() => postHandle()}>
            <span>Save & Finish</span>
            <Icon icon="line-md:arrow-right-circle" />
          </button>
        ) : (
          <button
            className="btn btn-black"
            hidden={currentTab === 3}
            onClick={() => {
              moveNext();
              // setCurrentTab((prev) => prev + 1);
            }}
          >
            <span>Next : {coverLetterTabName}</span>
            <Icon icon="line-md:arrow-right-circle" />
          </button>
        )}
      </>
    );
  };
  const PrevButton = (props: any) => {
    let coverLetterTabName = "";
    if (currentTab === 0)
      coverLetterTabName = coverLetterTabs[coverLetterTabs.length - 1].tabName;
    else coverLetterTabName = coverLetterTabs[currentTab - 1].tabName;

    return (
      <button
        className="btn btn-linen"
        hidden={currentTab === 0}
        onClick={() => setCurrentTab((prev) => prev - 1)}
      >
        <Icon icon="mingcute:back-2-line" />
        <span>Previous : {coverLetterTabName}</span>
      </button>
    );
  };

  const tabButton = [{ tabName: "Fill In" }, { tabName: "Preview" }];

  return (
    <>
      <Header />
      <main className="create-cover-letter-container">
        <div className="resume-tabs">
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
          className={`left-side-cover-letter ${
            activeTab === "Fill In" ? "" : "display-none"
          }`}
        >
          <div className="cover-letter-tabs">
            <ul>
              {coverLetterTabs.map((item, i) => (
                <li
                  key={`tab-${i}`}
                  className={currentTab === i ? "active-tab" : ""}
                >
                  <figure>{item.iconPath}</figure>
                  <p>{item.tabName}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="create-cover-letter-components">
            <div className="heading-area">
              <h2
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {editName ? (
                  <input
                    type="text"
                    defaultValue={sectionTitle}
                    onChange={(e) => setSectionTitle(e.target.value)}
                  />
                ) : (
                  `${sectionTitle}`
                )}
                <button
                  className={
                    editName ? "edit-button d-none" : "edit-button edit-btn"
                  }
                  style={{ border: 0, backgroundColor: "transparent" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditName(true);
                  }}
                >
                  <Icon icon="eva:edit-2-outline" />
                </button>
                <button
                  className={editName ? "edit-button" : "edit-button d-none"}
                  onClick={(e) => changeTitle(e)}
                >
                  <Icon icon="charm:circle-tick" />
                </button>
              </h2>
            </div>
            <Tabs activeKey={currentTab}>
              <Tab
                eventKey={0}
                title="Profile"
                className="single-cover-letter-component"
                disabled={currentTab !== 0}
              >
                <CoverLetterProfile id={id} coverLetterData={coverLetterData} />
              </Tab>
              <Tab
                eventKey={1}
                title="Introduction"
                className="single-cover-letter-component"
                disabled={currentTab !== 1}
              >
                <CoverLetterIntroduction
                  id={id}
                  coverLetterData={coverLetterData}
                />
              </Tab>
              <Tab
                eventKey={2}
                title="Body"
                className="single-cover-letter-component"
                disabled={currentTab !== 2}
              >
                <CoverLetterBody id={id} coverLetterData={coverLetterData} />
              </Tab>
              <Tab
                eventKey={3}
                title="Closing"
                className="single-cover-letter-component"
                disabled={currentTab !== 3}
              >
                <CoverLetterClosing id={id} coverLetterData={coverLetterData} />
              </Tab>
            </Tabs>
            <div className="d-flex justify-content-between">
              <PrevButton />
              <NextButton />
            </div>
          </div>
        </div>
        <div
          className={`right-side ${
            activeTab === "Preview" ? "" : "display-none"
          }`}
        >
          <CoverLetterSidebar />
        </div>
      </main>
    </>
  );
};

export default CreateCoverLetter;
