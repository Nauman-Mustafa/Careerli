// @ts-nocheck
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useFetch from "use-http";
import { v4 } from "uuid";
import {
  $collapser,
  $sectionList,
  getDataFromLocalDB,
  sectionListData,
  selectSection,
  updateData,
} from "../../services";
import "./resumeNavStyle.scss";
const ResumeNavbar = ({ changeState, docId }: any) => {
  let scrl = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);
  const { response, post, loading, get, put, request } = useFetch();
  const [section, setSectionOpener] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState({});
  const auth: any = useSelector((store: any) => store.auth);
  useEffect(() => {
    const sub$ = $sectionList.subscribe((v: any) => {
      setData(v);
    });

    return () => {
      sub$.unsubscribe();
    };
  }, []);
  useEffect(() => {
    const sub$ = $collapser.subscribe((v: string) => {
      setSectionOpener(v);
    });
    return () => {
      sub$.unsubscribe();
    };
  }, []);
  const handleModalClose = () => setModalShow(false);
  let dataMapped = () => {
    if (Object.keys(data).length < 1) return [];
    const { customSection, ...others }: any = data;
    const values = Object.values(others).concat(customSection);
    // console.log(changeState);
    return [...values];
  };
  const activeList = () => dataMapped()?.filter((obj) => obj?.showComp);

  const rearangeList = activeList().sort(function (a, b) {
    return a.order - b.order;
  });
  const addNewSection = async () => {
    console.log(sectionName, "sectionName");
    if (sectionName.trim() === "") {
      return toast.error("Section name cannot be empty");
    }
    fetchResume();

    let newData = [
      {
        id: v4(),
        title: sectionName,
        order: 12,
        showComp: true,
        cat: "customSection",
        icon: "ph:notepad",
      },
    ];
    const { customSection } = data;

    const value = customSection.concat(newData);

    setModalShow(false);
    if (auth.isLoggedIn) {
      const res = await put(`resume/update/${docId}`, { customSection: value });
    }
    updateData({ customSection: value });
    fetchResume();
  };
  const fetchResume = async () => {
    if (auth.isLoggedIn && docId) {
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
        });

        setSectionTitle(resumeTitle);
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
    }
  };
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
  // console.log(rearangeList, "rearangeList");
  return (
    <div className="resume-navbar">
      <div className="nav">
        {scrollX !== 0 && (
          <button
            className="prev"
            onClick={() => slide(-50)}
            onMouseEnter={(e) => anim(e)}
            onMouseLeave={(e) => anim2(e)}
          >
            <Icon icon="akar-icons:chevron-left" />
          </button>
        )}
        <ul className="top-nav" ref={scrl} onScroll={scrollCheck}>
          {rearangeList?.map((item: any, i: any) => (
            <li key={i}>
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={
                  <Tooltip
                    id={`tooltip-right`}
                    style={{ textTransform: "capitalize" }}
                  >
                    {item.title}
                  </Tooltip>
                }
              >
                <div
                  className={
                    section === item.to ? "nav-item active" : "nav-item"
                  }
                  onClick={() => {
                    selectSection(item.to);
                    changeState.current?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  <Icon icon={item?.icon} />
                </div>
              </OverlayTrigger>
            </li>
          ))}
        </ul>
        <ul>
          <li>
            <button className="nav-item" onClick={() => setModalShow(true)}>
              <Icon icon="akar-icons:circle-plus" />
            </button>
          </li>
        </ul>
        {!scrolEnd && (
          <button
            className="next"
            onClick={() => slide(+50)}
            onMouseEnter={(e) => anim(e)}
            onMouseLeave={(e) => anim2(e)}
          >
            <Icon icon="akar-icons:chevron-right" />
          </button>
        )}
      </div>
      <Modal
        show={modalShow}
        onHide={handleModalClose}
        centered
        className="resumeModal add-section-modal"
      >
        <div className="resume-modal-body">
          <Modal.Header closeButton>
            <div className="d-flex align-items-center">
              <h2>
                <Icon icon="ph:keyboard" />
                Section Name
              </h2>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <div className="form-input">
                <label>Section Name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setSectionName(e.target.value)}
                />
              </div>
            </div>
            <button className="btn btn-linen" onClick={() => addNewSection()}>
              <span>Create </span>
            </button>
          </Modal.Body>
        </div>
      </Modal>
    </div>
  );
};

export default ResumeNavbar;
