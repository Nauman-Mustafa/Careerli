// @ts-nocheck

import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useFetch from "use-http";
import careerlyImage from "../../../assets/images/careerly.svg";
// import ethiopiaImage from "../../assets/images/ethiopia.png";
import gettingStartedImage from "../../../assets/images/getting-started.svg";
import reumeGuideImage from "../../../assets/images/resume-guide.svg";
import videoGuideImage from "../../../assets/images/video-guide.svg";
import { $coverLetter, $coverLetterStyle, $saveStatus } from "../../../services";
import LoginModal from "../../Login/LoginModal";
import FirstLatestCoverLetter from "./FirstLatestCoverLetter";
import SecondLatestCoverLetter from "./SecondLatestCoverLetter";
// import CreativeCoverLetterTemplate from "../Comp/CreateCoverLetterTemplate";
const CoverLetterSidebar = () => {
  const [activeAcademy, setActiveAcademy] = useState(false);
  const [id, setId] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [check, setCheck] = useState<any>("");
  const { data: repos, put, get, loading, request } = useFetch();

  const auth: any = useSelector((store: any) => store.auth);
  const [data, setData] = useState<any>({});

  const [selectedTemp, setSelectedTemp] = useState<string>("");
  const [resumeStyleData, setResumeStyle] = useState<any>({});
  const template = JSON.parse(localStorage.getItem("coverTemplateType"));
  const customStyle = JSON.parse(localStorage.getItem("coverStyle"));

  useEffect(() => {
    const $sub = $coverLetter.subscribe((v) => {
      setData(v);
    });
    const $style = $coverLetterStyle.subscribe((s: any) => {
      setResumeStyle(s);
    });
    return () => {
      $style.unsubscribe();
      $sub.unsubscribe();
    };
  }, []);
 
  useEffect(() => {
    // setDocId(window.location.href.split("=")[1]);
   
    const sub2$ = $saveStatus.subscribe((v: any) => {
     console.log(v,"saving status");
     setCheck(v)
    });
    
    return () => {
     
      sub2$.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setId(window.location.href.split("=")[1]);
  }, [id]);
  useEffect(() => {
    if (id != "guestUser" && auth.isLoggedIn && id) {
      fetchResume();
    } else {
      setSelectedTemp(template?.coverLetterName);
      setResumeStyle(customStyle);
    }
  }, [id]);
  const fetchResume = async () => {
    const res = await get(`cover-letter/my-cover-letter/${id}`);
    setSelectedTemp(res?.data?.coverLetterType);
    setResumeStyle(res?.data?.coverStyle);
  };
  const downloadHandler = async () => {
    if (!auth.isLoggedIn) {
      // toast.error("Please Login First");
      setModalShow(true);
    } else {
      if (id !== "guestUser") {
        const res = await get("cover-letter/generate/" + id);
        const link = document.createElement("a");
        link.href = res["url"];
        link.download = "MyResume.pdf";
        link.click();
        link.remove();
      }
    }
  };
 
  return (
    <>
      <div className="created-resume">
        <div className="created-resume-header">
          <div className="d-flex justify-content-between">
            <button className="btn btn-save">
              <Icon icon="mdi-light:cloud-upload" hFlip={true} />
              <span>{check}</span>
            </button>
            <Link
              to={`/cover-letter/customize-cover-letter?id=${id}`}
              className="btn btn-edit"
            >
              <Icon icon="eva:edit-2-outline" />
              <span>Customize Template</span>
            </Link>
          </div>
        </div>

        {/* <figure>
          <img src={ethiopiaImage} alt="image not found" />
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
        {/* <CreativeCoverLetterTemplate /> */}

        <div className="d-flex justify-content-center">
          <button className="btn btn-yellow" onClick={() => downloadHandler()}>
            {loading ? (
              <Spinner animation="border" />
            ) : (
              <>
                <Icon icon="eva:download-fill" hFlip={true} />
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>
        <div
          className={
            activeAcademy
              ? "careerly-academy active-academy"
              : "careerly-academy"
          }
        >
          <div className="academy-header d-flex justify-content-between align-items-center">
            <div className="left-content">
              <figure>
                <img src={careerlyImage} alt="image not found" />
              </figure>
              <div className="content">
                <h3>Careerli Academy </h3>
                <p>View our guides, examples, tips and tutorials</p>
              </div>
            </div>
            {activeAcademy ? (
              <button
                className="btn btn-upload"
                onClick={() => setActiveAcademy(false)}
              >
                <span>Close</span>
                <Icon icon="charm:circle-cross" />
              </button>
            ) : (
              <button
                className="btn btn-upload"
                onClick={() => setActiveAcademy(true)}
              >
                <span>Open</span>
                <Icon icon="eva:arrow-circle-right-outline" />
              </button>
            )}
          </div>
          <div className="academy-container">
            <div className="single-academy">
              <div className="single-academy-content">
                <h3>Getting Started</h3>
                <p>Don’t know where to begin ? Start here</p>
                <Link to="/">
                  <span>View Guides</span>
                  <Icon icon="eva:arrow-circle-right-outline" />
                </Link>
              </div>
              <figure>
                <img src={gettingStartedImage} alt="image not found" />
              </figure>
            </div>
            <div className="single-academy">
              <div className="single-academy-content">
                <h3>Resume Guides</h3>
                <p>Curate your resume, section by section</p>
                <Link to="/">
                  <span>View Guides</span>
                  <Icon icon="eva:arrow-circle-right-outline" />
                </Link>
              </div>
              <figure>
                <img src={reumeGuideImage} alt="image not found" />
              </figure>
            </div>
            <div className="single-academy">
              <div className="single-academy-content">
                <h3>Video Guides</h3>
                <p>Watch tutorials on our Youtube channel</p>
                <Link to="/">
                  <span>View Guides</span>
                  <Icon icon="eva:arrow-circle-right-outline" />
                </Link>
              </div>
              <figure>
                <img src={videoGuideImage} alt="image not found" />
              </figure>
            </div>
          </div>
        </div>
      </div>
      <LoginModal showModal={modalShow} showModalHandler={setModalShow} />
    </>
  );
};

export default CoverLetterSidebar;
