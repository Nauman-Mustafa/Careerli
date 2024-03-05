// @ts-nocheck

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "use-http";
import { $resumeStyle, $sectionList } from "../../../services";
const ClassicResumeTemlpate = ({ data }: any) => {
  const [selectedTemp, setSelectedTemp] = useState<string>("");
  const { response, post, loading, get, put, request } = useFetch();
  const [docId, setId] = useState("");
  const [resumeStyleData, setResumeStyle] = useState<any>({});
  const template = JSON.parse(localStorage.getItem("templateType"));
  const customStyle = JSON.parse(localStorage.getItem("resumeStyle"));
  const auth: any = useSelector((store: any) => store.auth);
  const [profileImage, setProfileImage] = useState();
  useEffect(() => {
    setId(window.location.href.split("=")[1]);
  }, []);
  useEffect(() => {
    if (docId != "guestUser" && auth.isLoggedIn && docId) {
      fetchResume();
    } else {
      setSelectedTemp(template);
      setResumeStyle(customStyle);
    }
  }, [docId]);

  useEffect(() => {
    const sub$ = $sectionList.subscribe((v: any) => {
      setProfileImage(v?.profileImage);
    });
    const style$ = $resumeStyle.subscribe((s: any) => {
      setResumeStyle(s);
    });
    return () => {
      style$.unsubscribe();
      sub$.unsubscribe();
    };
  }, []);

  const fetchResume = async () => {
    const res = await get(`resume/my-resume/${docId}`);
    // console.log(res?.data?.profileImage, "res ponse ");
    setProfileImage(res?.data?.profileImage);
    setSelectedTemp(res?.data?.templateType);
    setResumeStyle(res?.data?.resumeStyle);
  };

  let dataMapped = () => {
    if (Object.keys(data).length < 1) return [];
    const { customSection, ...others }: any = data;
    const values = Object.values(others).concat(customSection);

    return [...values];
  };
  const activeList = () => dataMapped()?.filter((obj: any) => obj?.showComp);

  const rearangeList = activeList().sort(function (a: any, b: any) {
    return a.order - b.order;
  });

  return (
    <div
      className="Classic-Resume-Temlpate template-2"
      style={{
        fontFamily: resumeStyleData?.fontFamily,
        backgroundColor: resumeStyleData?.backgroundColor,
        color: resumeStyleData?.color,
        height: "100vh",
      }}>
      <h1
        style={{
          fontSize: `calc(${resumeStyleData?.fontSize}px * 1.75)`,
          fontWeight: resumeStyleData?.fontWeight,
        }}>
        {data?.profile?.firstName
          ? `${data?.profile?.firstName}  ${data?.profile?.lastName}`
          : "Robert Fox"}
      </h1>
      <div className="email__div d-flex align-items-center">
        {data?.profile?.city ? (
          <>
            <p>{data?.profile?.city}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="7"
              height="8"
              viewBox="0 0 7 8"
              fill="none">
              <path
                d="M0 4L3.5 0L7 4L3.5 8L0 4Z"
                fill={resumeStyleData?.color ? resumeStyleData?.color : "black"}
              />
            </svg>
          </>
        ) : null}
        {data?.profile?.postalCode ? (
          <>
            <p>{data?.profile?.postalCode}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="7"
              height="8"
              viewBox="0 0 7 8"
              fill="none">
              <path
                d="M0 4L3.5 0L7 4L3.5 8L0 4Z"
                fill={resumeStyleData?.color ? resumeStyleData?.color : "black"}
              />
            </svg>
          </>
        ) : null}
        {data?.profile?.email ? (
          <>
            <p>{data?.profile?.email}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="7"
              height="8"
              viewBox="0 0 7 8"
              fill="none">
              <path
                d="M0 4L3.5 0L7 4L3.5 8L0 4Z"
                fill={resumeStyleData?.color ? resumeStyleData?.color : "black"}
              />
            </svg>
          </>
        ) : (
          " "
        )}
        {data?.profile?.phone ? (
          <>
            <p>{data?.profile?.phone}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="7"
              height="8"
              viewBox="0 0 7 8"
              fill="none">
              <path
                d="M0 4L3.5 0L7 4L3.5 8L0 4Z"
                fill={resumeStyleData?.color ? resumeStyleData?.color : "black"}
              />
            </svg>
          </>
        ) : (
          ""
        )}

        {data?.profile?.linkedin ? (
          <>
            <p>{data?.profile?.linkedin}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="7"
              height="8"
              viewBox="0 0 7 8"
              fill="none">
              <path
                d="M0 4L3.5 0L7 4L3.5 8L0 4Z"
                fill={resumeStyleData?.color ? resumeStyleData?.color : "black"}
              />
            </svg>
          </>
        ) : (
          ""
        )}

        {data?.profile?.websiteLink ? (
          <>
            <a href={data?.profile?.websiteLink} target="_blank">
              {data?.profile?.websiteLink}
            </a>
          </>
        ) : null}
      </div>
      <div className="Summary__Content">
        {rearangeList?.map((item: any) => {
          return (
            <>
              {item?.cat === "workHistory" && item.showComp ? (
                <div className="summary">
                  <h2
                    style={{
                      fontWeight: resumeStyleData?.fontWeight,
                      fontSize: `${resumeStyleData?.fontSize}px`,
                      lineHeight: `calc(${resumeStyleData?.fontSize}px * 1.333)`,
                    }}>
                    <span
                      className="underline__div"
                      style={{
                        backgroundColor: `${resumeStyleData?.color}`,
                      }}></span>
                    {item.title}
                  </h2>
                  {item?.history?.map((item: any) => {
                    return (
                      <div className="professional__InnerContent">
                        <h4
                          style={{
                            fontWeight: resumeStyleData?.fontWeight,
                          }}>
                          {item.jobTitle}
                        </h4>

                        <p>
                          {item.employer} | {item.startMonth}-{item.startYear} -{" "}
                          {item.stillWork
                            ? "Present"
                            : `${item.endMonth} - ${item.endYear}`}
                        </p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : item?.cat === "education" && item.showComp ? (
                <div className="summary">
                  <h2
                    style={{
                      fontWeight: resumeStyleData?.fontWeight,
                      fontSize: `${resumeStyleData?.fontSize}px`,
                      lineHeight: `calc(${resumeStyleData?.fontSize}px * 1.333)`,
                    }}>
                    <span
                      className="underline__div"
                      style={{
                        backgroundColor: `${resumeStyleData?.color}`,
                      }}></span>
                    {item?.title}
                  </h2>
                  {item?.educationHistory?.map((item: any) => {
                    return (
                      <div className="professional__InnerContent">
                        <h4 style={{ fontWeight: resumeStyleData?.fontWeight }}>
                          {item.school}
                        </h4>
                        <p>
                          {item.degree} | {item.startMonth}-{item.startYear}-
                          {item.stillWork
                            ? "Present"
                            : `${item.endMonth} - ${item.endYear}`}
                        </p>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : item?.cat === "skills" && item.showComp ? (
                <div className="summary">
                  <h2
                    style={{
                      fontWeight: resumeStyleData?.fontWeight,
                      fontSize: `${resumeStyleData?.fontSize}px`,
                      lineHeight: `calc(${resumeStyleData?.fontSize}px * 1.333)`,
                    }}>
                    <span
                      className="underline__div"
                      style={{
                        backgroundColor: `${resumeStyleData?.color}`,
                      }}></span>
                    {item?.title}
                  </h2>
                  <div className="row">
                    <div className="col-md-12">
                      <ul className="d-flex flex-wrap w-100 mt-2">
                        {item?.list?.map((skills: any) => (
                          <li style={{ width: "50%" }}>{skills}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : item?.cat === "hobbies" && item.showComp ? (
                <div className="summary">
                  <h2
                    style={{
                      fontWeight: resumeStyleData?.fontWeight,
                      fontSize: `${resumeStyleData?.fontSize}px`,
                      lineHeight: `calc(${resumeStyleData?.fontSize}px * 1.333)`,
                    }}>
                    <span
                      className="underline__div"
                      style={{
                        backgroundColor: `${resumeStyleData?.color}`,
                      }}></span>
                    {item?.title}
                  </h2>
                  <ul className="d-flex flex-wrap w-100 mt-3">
                    {item?.list?.map((hobbies: any) => (
                      <li style={{ width: "50%" }}>{hobbies}</li>
                    ))}
                  </ul>
                </div>
              ) : item?.cat === "certification" && item.showComp ? (
                <div className="summary">
                  <h2
                    style={{
                      fontWeight: resumeStyleData?.fontWeight,
                      fontSize: `${resumeStyleData?.fontSize}px`,
                      lineHeight: `calc(${resumeStyleData?.fontSize}px * 1.333)`,
                    }}>
                    <span
                      className="underline__div"
                      style={{
                        backgroundColor: `${resumeStyleData?.color}`,
                      }}></span>
                    {item?.title}
                  </h2>

                  {item?.certificate?.map((item: any) => {
                    return (
                      <div className="professional__InnerContent">
                        <h4
                          style={{
                            fontWeight: resumeStyleData?.fontWeight,
                          }}>
                          {item?.certificateName}
                        </h4>
                        <p>
                          {item.authority} - {item.dateReceMonth}-
                          {item.dateReceYear}
                        </p>
                        <p>{item.certificationLink}</p>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : item?.cat === "languages" && item.showComp ? (
                <div className="summary">
                  <h2
                    style={{
                      fontWeight: resumeStyleData?.fontWeight,
                      fontSize: `${resumeStyleData?.fontSize}px`,
                      lineHeight: `calc(${resumeStyleData?.fontSize}px * 1.333)`,
                    }}>
                    <span
                      className="underline__div"
                      style={{
                        backgroundColor: `${resumeStyleData?.color}`,
                      }}></span>
                    {item?.title}
                  </h2>
                  <div className="row">
                    <div className="col-md-12">
                      <ul className="d-flex flex-wrap w-100 mt-2">
                        {item?.list?.map((skills: any) => (
                          <li style={{ width: "50%" }}>{skills}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : item?.cat === "references" && item.showComp ? (
                <div className="summary">
                  <h2
                    style={{
                      fontWeight: resumeStyleData?.fontWeight,
                      fontSize: `${resumeStyleData?.fontSize}px`,
                      lineHeight: `calc(${resumeStyleData?.fontSize}px * 1.333)`,
                    }}>
                    <span
                      className="underline__div"
                      style={{
                        backgroundColor: `${resumeStyleData?.color}`,
                      }}></span>
                    {item?.title}
                  </h2>

                  <div className="professional__InnerContent">
                    <div className="row">
                      <div className="col-md-6">
                        <h4
                          style={{
                            fontWeight: resumeStyleData?.fontWeight,
                          }}>
                          References 1
                        </h4>
                        <h5
                          style={{
                            fontWeight: resumeStyleData?.fontWeight,
                          }}>
                          {" "}
                          {item?.personOne}:
                        </h5>
                        <p>{item?.personeOneContact}</p>
                      </div>
                      <div className="col-md-6">
                        <h4
                          style={{
                            fontWeight: resumeStyleData?.fontWeight,
                          }}>
                          References 2
                        </h4>
                        <h5
                          style={{
                            fontWeight: resumeStyleData?.fontWeight,
                          }}>
                          {" "}
                          {item?.personTwo}:
                        </h5>
                        <p>{item?.personTwoContact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : item?.cat === "publications" && item.showComp ? (
                <div className="summary">
                  <h2
                    style={{
                      fontWeight: resumeStyleData?.fontWeight,
                      fontSize: `${resumeStyleData?.fontSize}px`,
                      lineHeight: `calc(${resumeStyleData?.fontSize}px * 1.333)`,
                    }}>
                    <span
                      className="underline__div"
                      style={{
                        backgroundColor: `${resumeStyleData?.color}`,
                      }}></span>
                    {item?.title}
                  </h2>

                  {item?.publicationList?.map((item: any) => {
                    return (
                      <div className="professional__InnerContent">
                        <h4
                          style={{
                            fontWeight: resumeStyleData?.fontWeight,
                          }}>
                          {item.title}
                        </h4>

                        <p>
                          {item.publisher} | {item.isbn}-{item.dateReceMonth} -{" "}
                          {item.dateReceYear}
                        </p>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : item?.cat === "achievements" && item.showComp ? (
                <div className="summary">
                  <h2
                    style={{
                      fontWeight: resumeStyleData?.fontWeight,
                      fontSize: `${resumeStyleData?.fontSize}px`,
                      lineHeight: `calc(${resumeStyleData?.fontSize}px * 1.333)`,
                    }}>
                    <span
                      className="underline__div"
                      style={{
                        backgroundColor: `${resumeStyleData?.color}`,
                      }}></span>
                    {item?.title}
                  </h2>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: item?.description,
                    }}
                  />
                </div>
              ) : item?.cat === "customSection" && item.showComp ? (
                <div className="summary">
                  <h2
                    style={{
                      fontWeight: resumeStyleData?.fontWeight,
                      fontSize: `${resumeStyleData?.fontSize}px`,
                      lineHeight: `calc(${resumeStyleData?.fontSize}px * 1.333)`,
                    }}>
                    <span
                      className="underline__div"
                      style={{
                        backgroundColor: `${resumeStyleData?.color}`,
                      }}></span>
                    {item?.title}
                  </h2>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: item?.description,
                    }}
                  />
                </div>
              ) : item?.cat === "summary" && item.showComp ? (
                <div className="summary">
                  <h2
                    style={{
                      fontWeight: resumeStyleData?.fontWeight,
                      fontSize: `${resumeStyleData?.fontSize}px`,
                      lineHeight: `calc(${resumeStyleData?.fontSize}px * 1.333)`,
                    }}>
                    <span
                      className="underline__div"
                      style={{
                        backgroundColor: `${resumeStyleData?.color}`,
                      }}></span>
                    {item?.title}
                  </h2>

                  <div className="professional__InnerContent">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item?.description,
                      }}
                    />
                  </div>
                </div>
              ) : null}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ClassicResumeTemlpate;
