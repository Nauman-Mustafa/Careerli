// @ts-nocheck
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { Dropdown, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useFetch from "use-http";
import coverLetterImage from "../../assets/images/cover-letter.svg";
import { updateCoverLetter } from "../../services";
import GetStarted from "../GetStarted";
import "./myCoverLetter.scss";
import { Pagination } from "../Pagination/PaginationComp";
const MyCoverLetter = () => {
  const {
    response,
    post,
    loading,
    get,
    data: repos,
    put,
    delete: deleteData,
  } = useFetch();

  const dropdownRef = useRef(null);
  const auth: any = useSelector((store: any) => store.auth);
  const billingSelector = useSelector((state: any) => state.billing);
  const [data, setData] = useState<any>();
  const navigate = useNavigate();
  const [pricesData, setPricesData] = useState([]);
  const [editName, setEditName] = useState("");
  const [checkName, setCheckName] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [sectionTitle, setSectionTitle] = useState("Cover Letter");
  // const [data, setData] = useState<any>();
  // const { response, post, loading, get, data: repos, put } = useFetch();

  const [isDDOpen, setIsDDOpen] = useState(false);
  const [isDDOpenIndex, setIsDDOpenIndex] = useState<any>();
  const [resumeCount, setResumeCount] = useState(0);
  const [Loader, setLoader] = useState(false);
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
  useEffect(()=>{ fecthCoverLetter();},[pagination.page])
  useEffect(() => {
    if(data){
     
      setResumeCount(prev => parseInt(prev) + parseInt(data?.length));
    }
    
  }, [data]);
  const handleDDToggle = (index: any) => {
    setIsDDOpenIndex(index);
    setIsDDOpen(!isDDOpen);
    console.log(index, "ind");
  };

  const handleDDClose = () => {
    setIsDDOpen(false);
    setIsDDOpenIndex(null);
  };

  const handleSubmit = async () => {
    let data = {
      coverLetterCategory: "Basic",
      coverLetterName: "First Template",
    };
    localStorage.setItem("coverTemplateType", JSON.stringify(data));
    if (auth?.isLoggedIn) {
      // console.log(resumeType, "resumeType");
      const res = await post("cover-letter/create");
      // console.log(res, "response");
      navigate(`/cover-letter/create-cover-letter?id=${res?.data?._id}`);
    } else {
      navigate(`/cover-letter/create-cover-letter?id=guestUser`);
    }
  };

  const fecthCoverLetter = async () => {
    setLoader(true)
    const res = await get(`cover-letter/my-all-cover-letter?page=${pagination.page}&limit=${pagination.limit}`);

    setData(res?.data?.doc);
    setPagination({
      ...pagination,
      totalPages: res?.data?.totalPages,
      totalCount: res?.data?.totalCount,
    });
    setLoader(false)
  };
  const deleteResume = async (id: any) => {
    const res = await deleteData(`cover-letter/delete/${id}`);
    if (res?.code === 200) {
      toast.success(res?.message);
    }
    fecthCoverLetter();
  };
  const dateFormate = (data: any) => {
    const date = new Date(data).toLocaleDateString();
    return date;
  };
  const fetchConfig = async () => {
    const res = await get("subscription/stripe-config");

    setPricesData(res?.data?.prices);
  };
  const filterData: any = () =>
    pricesData?.filter(
      (item: any) => item?.id === billingSelector?.user?.curr_price_id
    );

  const CreateCoverLeter = async (item: any) => {
    let { profile, receipient, introduction, body, closing } = item;

    const res = await post("cover-letter/create", {
      profile,
      receipient,
      introduction,
      body,
      closing,
    });
    fecthCoverLetter();
  };
  const downloadHandler = async (id: any) => {
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
  const changeTitle = (e: any, doc: any) => {
    e.stopPropagation();
    setEditName("");
    setCheckName(false);

    if (auth.isLoggedIn) {
      const postTitle = async () => {
        const res = await put(`cover-letter/update/${doc}`, {
          coverLetterTitle: sectionTitle,
        });
      };
      postTitle();
    }
    fecthCoverLetter();
  };
  updateCoverLetter({
    body: "",
    closing: {},
    profile: {},
    introduction: {},
    receipient: {},
  });
  const handlePageChange = (page: any) => {
    setPagination({ ...pagination, page });
  };
  return (
    <>
      <div className="my-cover-letter-container">
        <div className="row justify-content-center">
          <div className="col-xl-7">
            {filterData() && filterData()[0]?.product?.name === "Free" ? (
              <GetStarted />
            ) : null}
          </div>
        </div>
        <div className="my-cover-letter-wrapper">
          <div className="row justify-content-center">
            <div className="col-lg-4">
              <div className="single-cover-letter-box">
                <div className="cover-letter-child">
                  <h2>Win hearts and mind</h2>
                  <div
                    className="btn btn-yellow"
                    onClick={() => handleSubmit()}
                  >
                    <Icon icon="akar-icons:circle-plus" />
                    <span>Create Cover Letter</span>
                  </div>
                  <figure>
                    <img src={coverLetterImage} alt="image not found" />
                  </figure>
                </div>
              </div>
            </div>
            {data?.map((item: any, i: any) => {
              const count = i+1+5 * (pagination.page - 1);
              return(
<div className="col-lg-4" key={i}>
                <div
                style={{cursor:"pointer"}}
                  className="single-cover-letter-box"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(
                      `/cover-letter/create-cover-letter?id=${item?._id}`
                    );
                  }}
                >
                  <div className="cover-letter-child">
                    <div className="figure">
                      <img
                        src={
                          item?.coverLetterType === "First Template"
                            ? "/images/cover-letter-1.jpg"
                            : item?.coverLetterType === "Second Template"
                            ? "/images/cover-letter-2.jpg"
                            : ""
                        }
                        alt="image not found"
                      />
                    </div>
                    <div
                      className="cover-letter-content-container"
                      // onClick={(e) => {
                      //   e.stopPropagation();
                      // }}
                    >
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
                              defaultValue={item?.coverLetterTitle}
                              onChange={(e) => setSectionTitle(e.target.value)}
                            />
                            <button
                              className={
                                checkName
                                  ? "btn-action btn-edit"
                                  : "btn-action btn-edit d-none"
                              }
                              onClick={(e) => {
                                e.stopPropagation();
                                changeTitle(e, item?._id);
                              }}
                            >
                              <Icon icon="charm:circle-tick" />
                            </button>
                          </div>
                        ) : (
                          <h4>{item?.coverLetterTitle} {count}</h4>
                        )}

                        <p>{dateFormate(item?.updatedAt)} </p>
                      </div>

                      {/* <h4>{item?.userId?.firstName} Cover Letter</h4> */}
                      {/* <p>{dateFormate(item?.updatedAt)} </p> */}

                      {/* <div className="action-buttons">
                          <button
                            className="btn-action btn-edit"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/cover-letter/`);
                            }}
                          >
                            <Icon icon="eva:edit-outline" />
                          </button>
                          <Dropdown
                            align="end"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Dropdown.Toggle
                              id="dropdown-custom-components"
                              className="btn-action btn-dropdown"
                            >
                              <Icon icon="ph:dots-three-outline-vertical" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <button className="btn btn-linen">
                                <Icon icon="eva:download-fill" />
                                <span>Download</span>
                              </button>
                              <ul>
                                <li>
                                  <Link to="/dashboard">
                                    <Icon icon="arcticons:dots" />
                                    <span>Choose Template</span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/dashboard">
                                    <Icon icon="mingcute:edit-3-line" />
                                    <span>Rename</span>
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/dashboard">
                                    <Icon icon="ph:copy" />
                                    <span>Duplicate </span>
                                  </Link>
                                </li>
                                <li>
                                  <div
                                    className="delete"
                                    onClick={() => deleteResume(item?._id)}
                                  >
                                    <Icon icon="gg:trash" />
                                    <span>Delete </span>
                                  </div>
                                </li>
                              </ul>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div> */}
                      <div className="action-buttons">
                        <button
                          className="btn-action btn-edit"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(
                              `/cover-letter/create-cover-letter?id=${item?._id}`
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
                              {loading ? (
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
                                  to={`/cover-letter/customize-cover-letter?id=${item?._id}`}
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
                                    CreateCoverLeter(item);
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
                                  className="delete dropdown-link"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteResume(item?._id);
                                  }}
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
              )
              
})}
          </div>
        </div>
        <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            Loader={Loader}
          />
      </div>
    </>
  );
};

export default MyCoverLetter;
