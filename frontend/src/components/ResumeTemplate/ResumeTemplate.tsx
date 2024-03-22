// @ts-nocheck
import { Icon } from "@iconify/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { selectTemplate } from "../../services";
import { CVData } from "../Docments/data";
import LoginModal from "../Login/LoginModal";
import TopContent from "../TopContent/TopContent";
import "./templateStyle.scss";
import star from "../../assets/images/star.png";

const ResumeTemplate = () => {
  const resumeData = CVData;
  let scrl = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [dashboardResume, setDashboardResume] = useState<any>([...resumeData]);
  const filterItems = useMemo(
    () => [
      { name: "Creative Templates", category: "creative" },
      { name: "Classic Templates", category: "classic" },
      // { name: "Premium Templates", category: "premium" },
    ],
    []
  );
  const slide = (shift: any) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  //Anim
  // const anim = (e: any) => {
  //   gsap.from(e.target, { scale: 1 });
  //   gsap.to(e.target, { scale: 1.5 });
  // };
  // const anim2 = (e: any) => {
  //   gsap.from(e.target, { scale: 1.5 });
  //   gsap.to(e.target, { scale: 1 });
  // };

  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };
  const handleModalClose = () => setModalShow(false);
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
  // console.log(dashboardResume, "resume");
  // console.log(resumeData, "resume data");
  // console.log(filterResume, "filter resume");
  const history = useNavigate();

  const handleSubmited = async (resumeType: any, name, e: any) => {
    // console.log(resumeType, "resumeType");
    // const res = await post("resume/create", { resumeType: resumeType });
    let data = {
      resumeCategory: resumeType,
      resumeName: name,
    };
    selectTemplate(resumeType);
    navigate(`/dashboard/${resumeType}?id=guestUser`);
    localStorage.setItem("templateType", JSON.stringify(data));
  };

  useEffect(() => {
    if (window.location.href.split("=")[1]) {
      setModalShow(true);
    }
  }, []);

  return (
    <>
      <div style={{ width: "100%" }}>
        <TopContent typeTemplate="resume" />
        <div className="template-container">
          <div className="template-filters">
            {scrollX !== 0 && (
              <button className="prev" onClick={() => slide(-50)}>
                <Icon icon="akar-icons:chevron-left" />
              </button>
            )}
            <Nav defaultActiveKey={"/all"} ref={scrl} onScroll={scrollCheck}>
              <Nav.Item
                onClick={(e: any) => {
                  e.preventDefault();
                  filterResume("reset");
                }}
              >
                <Nav.Link className="filter-button" href="/all">
                  All Templates
                </Nav.Link>
              </Nav.Item>
              {filterItems.map((item, i) => (
                <Nav.Item
                  key={`filter-button-${i}`}
                  onClick={(e: React.MouseEvent<HTMLElement>) => {
                    e.preventDefault();
                    filterResume(item.category);
                  }}
                >
                  <Nav.Link href={`/${item.name}`}>{item.name}</Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
            {!scrolEnd && (
              <button className="next" onClick={() => slide(+50)}>
                <Icon icon="akar-icons:chevron-right" />
              </button>
            )}
          </div>
          <div className="resume-templates">
            <div className="resume-tempaltes-wrapper">
              {dashboardResume.map((item: any, i: any) => (
                <>
                  <div className="single-template-wrapper" key={i}>
                    <div className="single-template">
                      <figure>
                        {item.category === "creative" && (
                          <img
                            style={{ width: "25px", float: "right" }}
                            src={star}
                            alt=""
                          />
                        )}
                        <img src={item?.imagePath} alt={item} />
                        <div
                          className="overlay"
                          // onClick={(e) => handleSubmit(item?.document_type, e)}
                          onClick={(e) =>{
                            item.category === "creative" ? null:
                            handleSubmited(item?.document_type, item?.name, e)
                          }
                          }
                        >
                          <div className="btn btn-linen">{item.category === "creative"?"Premium":"Use Template"}</div>
                        </div>
                      </figure>
                      <div className="template-content">
                        <p>{item.name}</p>
                        <span className={item?.category}>{item?.category}</span>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
      <LoginModal showModal={modalShow} showModalHandler={setModalShow} />
    </>
  );
};

export default ResumeTemplate;
