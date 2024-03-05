import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import careerlyImage from "../../assets/images/careerly.svg";
// import ethiopiaImage from "../../assets/images/ethiopia.png";
import gettingStartedImage from "../../assets/images/getting-started.svg";
import reumeGuideImage from "../../assets/images/resume-guide.svg";
import videoGuideImage from "../../assets/images/video-guide.svg";
import { $saveStatus, $savingData } from "../../services";
import CreativeResumeTemplate from "./Comp/CreativeResumeTemplate";
const CreatedResume = ({ docId }: any) => {
  const [activeAcademy, setActiveAcademy] = useState(false);
  // const [docId, setDocId] = useState("");
  const [tempType, setTempType] = useState("");
  const [data, setData] = useState<any>({});
  const [check, setCheck] = useState<any>("");
  useEffect(() => {
    // setDocId(window.location.href.split("=")[1]);
   
    const sub2$ = $saveStatus.subscribe((v: any) => {
     console.log(v,"saving status");
     setCheck(v)
    });
    setTempType(window.location.pathname.split("/")[2]);
    return () => {
     
      sub2$.unsubscribe();
    };
  }, []);

  let path = `/dashboard/${tempType}/customize-template?id=${docId}`;
  return (
    <>
      <div className="created-resume">
        <div className="created-resume-header">
          <div className="d-flex justify-content-between">
            <button className="btn btn-save">
              <Icon icon="mdi-light:cloud-upload" hFlip={true} />
              <span> {check}</span>
            </button>

            <Link to={path} className="btn btn-edit">
              <Icon icon="eva:edit-2-outline" />
              <span>Customize Template</span>
            </Link>
          </div>
        </div>

        {/* <figure>
          <img src={ethiopiaImage} alt="image not found" />
        </figure> */}

        <CreativeResumeTemplate docId={docId} />

        <div className="d-flex justify-content-center">
          {/* <button className="btn btn-yellow" onClick={downLoadHandler}>
            <Icon icon="eva:download-fill" hFlip={true} />
            <span>Download PDF</span>
          </button> */}
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
    </>
  );
};

export default CreatedResume;
