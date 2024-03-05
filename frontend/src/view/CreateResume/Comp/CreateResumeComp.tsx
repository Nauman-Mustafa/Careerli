// @ts-nocheck

import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useFetch from "use-http";
import { v4 } from "uuid";
import CreatedResume from "../../../components/CreatedResume";
import GetStarted from "../../../components/GetStarted";
import { ESection } from "../../../enums/section.enu";
import {
  $sectionList,
  getDataFromLocalDB,
  sectionListData,
  updateData,
} from "../../../services";
import Loader from "../Comp/Loader";
import "../resumeStyle.scss";
import Achievements from "./Achievements";
import Certificates from "./Certificates";
import CreateNewSection from "./CreateNewSection";
import Education from "./Education";
import Hobbies from "./Hobbies";
import Languages from "./Languages";
import Profile from "./MyProfile";
import Publications from "./Publications";
import References from "./References";
import Skills from "./Skills";
import Summary from "./Summary";
import WorkHistory from "./WorkHistory";
import ModalComponent from "./ModalComponent";


const CreateResumeComp = ({ docId, setdocId, setChangeState }: any) => {
  const { response, post, loading, get, put, request } = useFetch();
  const [modalShow, setModalShow] = useState(false);
  const [activeTab, setActiveTab] = useState("Fill In");

  const billingSelector = useSelector((state: any) => state.billing);
  const [sectionTitle, setSectionTitle] = useState("");

  const [sectionName, setSectionName] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [loadPage, setLoadPage] = useState("");

  const [data, setData] = useState<any>([]);

  const [pricesData, setPricesData] = useState([]);
  const auth: any = useSelector((store: any) => store.auth);
  const [modalShow2, setModalShow2] = useState(false);
  const [activeLists, setActiveList] = useState([]);
  const [nonActiveLists, setNonActiveList] = useState([]);
  const [editName, setEditName] = useState(false);

  const navigate = useNavigate();
  const draggingItem = useRef();
  const dragOverItem = useRef();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const sub$ = $sectionList.subscribe((v: any) => {
      setData(v);
    });

    return () => {
      sub$.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (docId) {
      fetchResume();
    }

    if (auth && auth.access_token && docId === "guestUser") {
      CreateResume();
    }
  }, [docId, auth]);

  useEffect(() => {
    const activeList = () => dataMapped()?.filter((obj) => obj?.showComp);
    const _list = activeList()?.sort(function (a, b) {
      return a.order - b.order;
    });
    setActiveList(_list);
    const InActiveList = () =>
      dataMapped()?.filter((obj) => typeof obj != "string" && !obj?.showComp);

    setNonActiveList(InActiveList());
  }, [data]);

  const fetchResume = async () => {
    if (auth.isLoggedIn) {
      setLoader(true);
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
        setLoader(false);
        setLoadPage("load");
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
      setSectionTitle(resumeTitle);
    }
  };

  const CreateResume = async () => {
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
      profileImage,
    } = getDataFromLocalDB();
    const resumeStyleData = JSON.parse(
      localStorage.getItem("resumeStyle") || "{}"
    );

    const template = JSON.parse(localStorage.getItem("templateType"));
    request.cache.set;
    const res = await post("resume/create-resume", {
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
      templateCategory: template?.resumeCategory,
      resumeType: template?.resumeName,
      resumeStyle: resumeStyleData,
    });
    setdocId(res?.data?._id);
    navigate(`/dashboard/creative?id=${res?.data?._id}`);
    // if (res.code == 200) {
    //   const ress = await get("resume/generate/" + res?.data?._id);
    //   const link = document.createElement("a");
    //   link.href = ress["url"];
    //   link.download = "MyResume.pdf";
    //   link.click();
    //   link.remove();
    // }
  };

  const getComponent = (item: any) => {
    
    const props = {
      docId,
      onDelete: () => {setSectionId(item.id) ;setModalShow2(true)},
      setChangeState,
    };
    switch (item.cat) {
      case ESection.PROFILE:
        return <Profile {...props} info={item} />;
      case ESection.EDUCATION:
        return <Education {...props} info={item} />;
      case ESection.LANGUAGES:
        return <Languages {...props} info={item} />;
      case ESection.ACHIEVEMENTS:
        return <Achievements {...props} info={item} />;
      case ESection.SKILLS:
        return <Skills {...props} info={item} />;
      case ESection.HOBBIES:
        return <Hobbies {...props} info={item} />;
      case ESection.CERTIFICATES:
        return <Certificates {...props} info={item} />;
      case ESection.REFERENCES:
        return <References {...props} info={item} />;
      case ESection.PUBLICATIONS:
        return <Publications {...props} info={item} />;
      case ESection.SUMMARY:
        return <Summary {...props} info={item} />;
      case ESection.WORK:
        return <WorkHistory {...props} info={item} />;
      case ESection.CUSTOMSECTION:
        // console.log("show custom", item);
        return <CreateNewSection {...props} info={item} loadPage={data} />;
      default:
        break;
    }
  };

  const addRemoveComponent = async (unId: string, showComp: boolean) => {
    console.log(unId, showComp, "showComp");
    const removedataSection = dataMapped()?.reduce((obj: any, current: any) => {
      if (current?.id === unId) current.showComp = showComp;

      if (current?.cat === "customSection") {
        obj[current.cat] = [...(obj[current.cat] || []), current];
      } else {
        obj[current?.cat] = current;
      }
      return obj;
    }, {});
    function removeNull(ob) {
      for (var key in ob) {
        if (typeof ob[key] == "string") {
          delete ob[key];
        }
      }
      return ob;
    }
    removeNull(removedataSection);

    if (auth.isLoggedIn) {
      const res = await put(`resume/update/${docId}`, removedataSection);
    }
    setModalShow2(false)
    updateData(removedataSection);
    sectionListData(removedataSection);
  };

  const handleModalClose = () => setModalShow(false);

  const addNewSection = async () => {
    if (sectionName.trim() === "") {
      return toast.error("Section name cannot be empty");
    }
    let newData = [
      {
        id: v4(),
        title: sectionName,
        order: 12,
        showComp: false,
        cat: "customSection",
        icon: "ph:notepad",
      },
    ];
    setModalShow(false);
    if (auth.isLoggedIn && docId) {
      const {
        data: { customSection },
      } = await get(`resume/my-resume/${docId}`);
      const value = customSection.concat(newData);
      const res = await put(`resume/update/${docId}`, { customSection: value });
    } else {
      ///// Get data from
      const { customSection } = getDataFromLocalDB();
      const value = customSection.concat(newData);
      updateData({ customSection: value });
    }

    fetchResume();

    // if (auth.isLoggedIn) {
    //   const res = await put(`resume/update/${docId}`, { customSection: value });
    // } else {
    //   updateData({ customSection: value });
    // }

    // fetchResume();
  };

  let dataMapped = () => {
    if (Object.keys(data).length < 1) return [];
    const { customSection, ...others } = data;
    const values = Object.values(others).concat(customSection);

    return [...values];
  };

  const handleDragStart = (e, position) => {
    draggingItem.current = position;
  };

  const handleDragEnter = (e, position) => {
    dragOverItem.current = position;

    const listCopy = [...activeLists];

    const draggingItemContent = listCopy[draggingItem.current];
    listCopy.splice(draggingItem.current, 1);
    listCopy.splice(dragOverItem.current, 0, draggingItemContent);

    draggingItem.current = dragOverItem.current;
    dragOverItem.current = null;

    const newList = listCopy?.map((item, i) => {
      item.order = i;
      return item;
    });
    const _list = newList.sort(function (a, b) {
      return a.order - b.order;
    });

    setActiveList(_list);
    let concatdata = _list.concat(nonActiveLists);
    const convertArr = concatdata?.reduce((obj: any, current: any) => {
      if (current?.cat === "customSection") {
        obj[current?.cat] = [...(obj[current?.cat] || []), current];
      } else {
        obj[current?.cat] = current;
      }
      return obj;
    }, {});

    sectionListData(convertArr);
    // updateData(convertArr);
  };

  const changeTitle = (e) => {
    e.stopPropagation();
    setEditName(false);
    updateData({ resumeTitle: sectionTitle });
    if (auth.isLoggedIn) {
      const postTitle = async () => {
        const res = await put(`resume/update/${docId}`, {
          resumeTitle: sectionTitle,
        });
      };
      postTitle();
    }
  };
  const tabButton = [{ tabName: "Fill In" }, { tabName: "Preview" }];
  useEffect(() => {
    fetchConfig();
  }, []);
  const fetchConfig = async () => {
    const res = await get("subscription/stripe-config");

    setPricesData(res?.data?.prices);
  };
  const filterData: any = () =>
    pricesData?.filter(
      (item: any) => item?.id === billingSelector?.user?.curr_price_id
    );
  return (
    <div className="create-resume-container">
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
        className={`left-side ${activeTab === "Fill In" ? "" : "display-none"}`}
      >
        {filterData() && filterData()[0]?.product?.name === "Free" ? (
          <GetStarted />
        ) : null}

        {loader ? (
          <Loader />
        ) : (
          <>
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
            <div className="create-resume-section">
              {activeLists?.map((item, i) => (
                <div className="add-new-section-box" key={i}>
                  {item.cat !== "profile" && (
                    <div
                      className="drag-comp"
                      onDragStart={(e) => handleDragStart(e, i)}
                      onDragOver={(e) => e.preventDefault()}
                      onDragEnter={(e) => handleDragEnter(e, i)}
                      draggable
                    ></div>
                  )}
                  {getComponent(item)}
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <h3 className="d-inline-flex align-items-center mb-0">
                <Icon
                  icon="akar-icons:plus"
                  hFlip={true}
                  style={{ fontSize: "16px", marginRight: "5px" }}
                />
                Add Section
              </h3>

              <button
                className="btn btn-linen"
                onClick={() => {
                  setModalShow(true);
                }}
              >
                <Icon icon="akar-icons:circle-plus" />
                <span>Create New Section</span>
              </button>
            </div>
            <div className="add-new-section">
              <ul>
                {nonActiveLists?.map((item, i) => (
                  <>
                    {item === undefined ? null : (
                      <li
                        onDragStart={(e) => handleDragStart(e, i)}
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={(e) => handleDragEnter(e, i)}
                        key={i}
                        draggable
                      >
                        <div className="add-new-section-box">
                          <Icon icon={item?.icon} />
                          <span>{item?.title}</span>
                          <button
                            className="btn-add"
                            onClick={() => addRemoveComponent(item?.id, true)}
                          >
                            <Icon icon="akar-icons:circle-plus" />
                          </button>
                        </div>
                      </li>
                    )}
                  </>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      <div
        className={`right-side ${
          activeTab === "Preview" ? "" : "display-none"
        }`}
      >
        <CreatedResume docId={docId} />
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
              <input
                type="text"
                className="form-control"
                onChange={(e) => setSectionName(e.target.value)}
                placeholder="Section Name"
              />
            </div>
            <button className="btn btn-linen" onClick={() => addNewSection()}>
              <span>Create </span>
            </button>
          </Modal.Body>
        </div>
      </Modal>
      <ModalComponent  setModalShow={setModalShow2}  modalShow={modalShow2} handler={()=>addRemoveComponent(sectionId, false)}/>
    </div>
  );
};
export default CreateResumeComp;
