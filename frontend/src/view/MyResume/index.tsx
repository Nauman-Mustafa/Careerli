// @ts-nocheck

import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { Dropdown, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useFetch from "use-http";
import template2Img from "../../assets/images/ClassicTemplate.png";
import template1Img from "../../assets/images/CreativeTemplate.png";
import template7Img from "../../assets/images/Template-7.png";
import template11Img from "../../assets/images/template-11.png";
import welcomeImage from "../../assets/images/welcome.svg";
import GetStarted from "../../components/GetStarted";
import Header from "../../components/Header/Header";
import LoginModal from "../../components/Login/LoginModal";
import PaginationComp from "./PaginationComp";
import "./myResume.scss";
import { Pagination } from "../../components/Pagination/PaginationComp";

const MyResume = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [data, setData] = useState<any>();
  const [pricesData, setPricesData] = useState([]);
  const [editName, setEditName] = useState("");
  const [checkName, setCheckName] = useState(false);
  const [sectionTitle, setSectionTitle] = useState("Resume");
  const [modalShow, setModalShow] = useState(false);
  const [Loader, setLoader] = useState(false);
  const auth: any = useSelector((store: any) => store.auth);
  const [isDDOpen, setIsDDOpen] = useState(false);
  const [isDDOpenIndex, setIsDDOpenIndex] = useState<any>();
  const [id, setId] = useState("");
  const [resumeCount, setResumeCount] = useState(0);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    totalPages: 1,
    totalCount: 0,
  });

  useEffect(() => {
    fetchConfig();
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        handleDDClose();
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    fecthResume();
  }, [pagination.page]);
  useEffect(() => {
    if (data) {
      setResumeCount((prev) => parseInt(prev) + parseInt(data?.length));
    }
  }, [data]);
  useEffect(() => {
    setId(window.location.href.split("=")[1]);
  }, [id]);

  const handleDDToggle = (index: any) => {
    setIsDDOpenIndex(index);
    setIsDDOpen(!isDDOpen);
    console.log(index, "ind");
  };

  const handleDDClose = () => {
    setIsDDOpen(false);
    setIsDDOpenIndex(null);
  };
  const {
    response,
    post,
    delete: deleteData,
    loading,
    get,
    data: repos,
    put,
  } = useFetch();

  const billingSelector = useSelector((state: any) => state.billing);
  const handleSubmit = async (name: any, resumeType: any, e: any) => {
    // console.log(resumeType, "resumeType");
    let data = {
      resumeCategory: resumeType,
      resumeName: name,
    };
    const res = await post("resume/create", {
      templateCategory: resumeType,
      resumeType: name,
    });
    // console.log(res, "response");

    localStorage.setItem("templateType", JSON.stringify(data));
    navigate(`/dashboard/${resumeType}?id=${res?.data?._id}`, {
      state: { id: res.data._id },
    });
  };

  const fetchConfig = async () => {
    const res = await get("subscription/stripe-config");

    setPricesData(res?.data?.prices);
  };
  const fecthResume = async () => {
    setLoader(true);
    const res = await get(
      `resume/my-all-resume?page=${pagination.page}&limit=${pagination.limit}`
    );
    setData(res?.data?.doc);
    setPagination({
      ...pagination,
      totalPages: res?.data?.totalPages,
      totalCount: res?.data?.totalCount,
    });
    setLoader(false);
  };
  const deleteResume = async (id: any) => {
    const res = await deleteData(`resume/delete/${id}`);
    if (res?.code === 200) {
      toast.success(res?.message);
    }
    fecthResume();
  };
  const dateFormate = (data: any) => {
    const date = new Date(data).toLocaleDateString();
    return date;
  };
  const filterData: any = () =>
    pricesData?.filter(
      (item: any) => item?.id === billingSelector?.user?.curr_price_id
    );
  const downloadHandler = async (id: any) => {
    setLoader(true);
    const res = await get("resume/generate/" + id);
    if ((res.StatusCode === 400) | 404 | 500) {
      toast.error(res.message);
    } else {
      const link = document.createElement("a");
      link.href = res["url"];
      link.download = "MyResume.pdf";
      link.click();
      link.remove();
    }
  };
  const changeTitle = (e: any, doc: any) => {
    e.stopPropagation();
    setEditName("");
    setCheckName(false);

    if (auth.isLoggedIn) {
      const postTitle = async () => {
        try {
          const res = await put(`resume/update/${doc}`, {
            resumeTitle: sectionTitle,
          });
          fecthResume(); // Call fetchResume after the update is completed
        } catch (error) {
          console.error(error);
        }
      };

      postTitle();
    }
  };

  const CreateResume = async (item: any) => {
    let {
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
      resumeType,
      templateCategory,
    } = item;

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
      resumeType,
      templateCategory,
    });
    fecthResume();
  };
  const handlePageChange = (page: any) => {
    setPagination({ ...pagination, page });
  };

  return (
    <>
      <Header />
      <main className="my-resume-container">
        <div className="row justify-content-center">
          <div className="col-xl-7">
            {filterData() && filterData()[0]?.product?.name === "Free" ? (
              <GetStarted />
            ) : null}
          </div>
        </div>
        <div className="my-resume-wrapper">
          <div className="row justify-content-center">
            <div className="col-lg-4">
              <div className="single-resume-box">
                <div className="resume-child">
                  <h2>Welcome back,</h2>
                  <button
                    className="btn btn-yellow"
                    onClick={(e) => handleSubmit("Template 1", "creative", e)}
                  >
                    <Icon icon="akar-icons:circle-plus" />
                    <span>Create New Resume</span>
                  </button>
                  <figure>
                    <img src={welcomeImage} alt="image not found" />
                  </figure>
                </div>
              </div>
            </div>
            {data?.map((item: any, i: any) => {
              const count = i + 1 + 5 * (pagination.page - 1);
              return (
                <div className="col-lg-4" key={i} ref={dropdownRef}>
                  <div className="single-resume-box">
                    <div className="resume-child">
                      <div
                        className="figure"
                        onClick={() =>
                          navigate(
                            `/dashboard/${item?.templateCategory}?id=${item?._id}`
                          )
                        }
                      >
                        <img
                          src={
                            item?.resumeType === "Template 1"
                              ? template1Img
                              : item?.resumeType === "Template 2"
                              ? template2Img
                              : item?.resumeType === "Template 3"
                              ? template7Img
                              : item?.resumeType === "Template 4"
                              ? template11Img
                              : ""
                          }
                          alt="image not found"
                        />
                      </div>
                      <div className="resume-content-container">
                        <div className="">
                          {editName === i ? (
                            <div
                              className="edit-template-name"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <input
                                type="text"
                                defaultValue={item?.resumeTitle}
                                onChange={(e) =>
                                  setSectionTitle(e.target.value)
                                }
                              />
                              <button
                                className={
                                  checkName
                                    ? "btn-action btn-edit"
                                    : "btn-action btn-edit d-none"
                                }
                                onClick={(e) => changeTitle(e, item?._id)}
                              >
                                <Icon icon="charm:circle-tick" />
                              </button>
                            </div>
                          ) : (
                            <h4>
                              {item?.resumeTitle} {count}
                            </h4>
                            // <h4>{item?.resumeTitle +  count}</h4>
                          )}

                          <p>{dateFormate(item?.updatedAt)} </p>
                        </div>

                        <div className="action-buttons">
                          <button
                            className="btn-action btn-edit"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(
                                `/dashboard/${item?.templateCategory}?id=${item?._id}`
                              );
                            }}
                          >
                            <Icon icon="eva:edit-outline" />
                          </button>
                          <Dropdown
                            align="end"
                            show={isDDOpen && isDDOpenIndex === i}
                            onToggle={() => {
                              handleDDToggle(i);
                            }}
                            // onHide={() => handleDDClose()}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Dropdown.Toggle
                              id="dropdown-custom-components"
                              className="btn-action btn-dropdown"
                            >
                              <Icon icon="ph:dots-three-outline-vertical" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <button
                                className="btn btn-linen"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  downloadHandler(item?._id);
                                }}
                              >
                                {Loader ? (
                                  <Spinner animation="border" />
                                ) : (
                                  <>
                                    <Icon icon="eva:download-fill" />
                                    <span>Download</span>
                                  </>
                                )}
                              </button>
                              <ul>
                                <li>
                                  <Link
                                    to={`/dashboard/customize-template?id=${item?._id}`}
                                    className="dropdown-link"
                                  >
                                    <Icon icon="ph:circles-four-bold" />
                                    <span>Choose Template</span>
                                  </Link>
                                </li>
                                <li>
                                  <div
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditName(i);
                                      setCheckName(true);
                                      handleDDClose();
                                    }}
                                    className="dropdown-link"
                                  >
                                    <Icon icon="mingcute:edit-3-line" />
                                    <span>Rename</span>
                                  </div>
                                </li>
                                <li>
                                  <div
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      CreateResume(item);
                                      handleDDClose();
                                    }}
                                    className="dropdown-link"
                                  >
                                    <Icon icon="ph:copy" />
                                    <span>Duplicate </span>
                                  </div>
                                </li>
                                <li>
                                  <div
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteResume(item?._id);
                                    }}
                                    className="delete dropdown-link"
                                  >
                                    <Icon icon="gg:trash" />
                                    <span>Delete </span>
                                  </div>
                                </li>
                              </ul>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
          Loader={Loader}
        />
        {/* <PaginationComp /> */}
      </main>
      <LoginModal showModal={modalShow} showModalHandler={setModalShow} />
    </>
  );
};

export default MyResume;
