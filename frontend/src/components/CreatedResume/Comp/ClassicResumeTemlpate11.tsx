// @ts-nocheck

import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "use-http";
import { $resumeStyle, $sectionList } from "../../../services";
const ClassicResumeTemlpate11 = ({ data }: any) => {
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
      className="Classic-Resume-Temlpate template-11"
      style={{
        fontFamily: resumeStyleData?.fontFamily,
        backgroundColor: resumeStyleData?.backgroundColor,
        color: resumeStyleData?.color,
        height: "100vh",
      }}>
      <div
        style={{
          borderBottom: `1px solid ${
            resumeStyleData?.color ? resumeStyleData?.color : "#000000"
          }`,
          display: "block",
          width: "100%",
          height: "30px",
          marginBottom: "2px",
        }}></div>
      <div
        className="d-flex justify-content-between template-header"
        style={{
          borderTopColor: `${
            resumeStyleData?.color ? resumeStyleData?.color : "#000000"
          }`,
        }}>
        <div className="header-title">
          <h1 style={{ fontWeight: resumeStyleData?.fontWeight }}>
            {data?.profile?.firstName ? (
              <>
                {data?.profile?.firstName} <br /> {data?.profile?.lastName}
              </>
            ) : (
              ""
            )}
          </h1>
          <p>
            {data?.profile?.designation
              ? data?.profile?.designation
              : "Senior Graphic Designer"}
          </p>
        </div>
        <div className="links">
          {data?.profile?.phone && (
            <div className="single-link">
              <Icon icon="ph:phone" />
              <span>{data?.profile?.phone}</span>
            </div>
          )}
          {data?.profile?.email && (
            <div className="single-link">
              <Icon icon="ic:outline-email" />
              <span>{data?.profile?.email}</span>
            </div>
          )}
          {data?.profile?.postalCode || data?.profile?.city ? (
            <div className="single-link">
              <Icon icon="clarity:map-marker-line" />
              <span>
                {data?.profile?.postalCode} {data?.profile?.city}.
              </span>
            </div>
          ) : (
            ""
          )}
          {data?.profile?.websiteLink && (
            <div className="single-link">
              <Icon icon="mdi:link-variant" />
              <span>{data?.profile?.websiteLink}</span>
            </div>
          )}
          {data?.profile?.linkedin && (
            <div className="single-link">
              <Icon icon="uit:linkedin-alt" />
              <span> {data?.profile?.linkedin}</span>
            </div>
          )}
        </div>
      </div>
      <div
        className="Summary__Content"
        style={{
          borderTopColor: `${
            resumeStyleData?.color ? resumeStyleData?.color : "#000000"
          }`,
        }}>
        <div className="d-flex">
          <div
            className="left-content"
            style={{
              borderRightColor: `${
                resumeStyleData?.color ? resumeStyleData?.color : "#000000"
              }`,
            }}>
            {rearangeList?.map((item: any) => {
              return (
                <>
                  {item?.cat === "skills" && item.showComp ? (
                    <>
                      <div className="summary">
                        <h2
                          style={{
                            fontWeight: resumeStyleData?.fontWeight,
                            fontSize: `${resumeStyleData?.fontSize}px`,
                          }}>
                          {item?.title}
                        </h2>
                        <ul className="">
                          {item?.list?.map((skills: any) => (
                            <li>{skills}</li>
                          ))}
                        </ul>
                      </div>
                      <hr />
                    </>
                  ) : item?.cat === "education" && item.showComp ? (
                    <>
                      <div className="summary">
                        <h2
                          style={{
                            fontWeight: resumeStyleData?.fontWeight,
                            fontSize: `${resumeStyleData?.fontSize}px`,
                          }}>
                          {item?.title}
                        </h2>
                        {item?.educationHistory?.map((item: any) => {
                          return (
                            <>
                              <div className="single-education">
                                <h5
                                  style={{
                                    fontWeight: resumeStyleData?.fontWeight,
                                  }}>
                                  {item.degree}
                                </h5>
                                <p>
                                  {item.school} <br />
                                  {item.startYear}-
                                  {item.stillWork
                                    ? "Present"
                                    : `${item.endYear}`}
                                </p>
                              </div>
                            </>
                          );
                        })}
                      </div>
                      <hr />
                    </>
                  ) : item?.cat === "references" && item.showComp ? (
                    <>
                      <div className="summary">
                        <div>
                          <h2
                            style={{
                              fontWeight: resumeStyleData?.fontWeight,
                              fontSize: `${resumeStyleData?.fontSize}px`,
                            }}>
                            {item?.title}
                          </h2>
                        </div>
                        <div>
                          <div className="row">
                            <div className="col-lg-12">
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
                                {item?.personOne}:
                              </h5>
                              <p>{item?.personeOneContact}</p>
                            </div>
                            <div className="col-lg-12">
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
                      <hr />
                    </>
                  ) : null}
                </>
              );
            })}
          </div>
          <div className="right-content">
            {rearangeList?.map((item: any) => {
              return (
                <>
                  {item?.cat === "summary" && item.showComp ? (
                    <>
                      <div className="summary">
                        <h2
                          style={{
                            fontWeight: resumeStyleData?.fontWeight,
                            fontSize: `${resumeStyleData?.fontSize}px`,
                          }}>
                          {item?.title}
                        </h2>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}
                        />
                      </div>
                      <hr />
                    </>
                  ) : item?.cat === "workHistory" && item.showComp ? (
                    <>
                      <div className="summary">
                        <h2
                          style={{
                            fontWeight: resumeStyleData?.fontWeight,
                            fontSize: `${resumeStyleData?.fontSize}px`,
                          }}>
                          {item?.title}
                        </h2>
                        {item?.history?.map((item: any) => {
                          return (
                            <div className="single-experience">
                              {item.jobTitle && (
                                <h5
                                  style={{
                                    fontWeight: resumeStyleData?.fontWeight,
                                  }}>
                                  {item.jobTitle}
                                </h5>
                              )}
                              <p>
                                {item.employer} | {item.startYear}-
                                {item.stillWork ? "Present" : `${item.endYear}`}
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
                      <hr />
                    </>
                  ) : item?.cat === "certification" && item.showComp ? (
                    <>
                      <div className="summary">
                        <h2
                          style={{
                            fontWeight: resumeStyleData?.fontWeight,
                            fontSize: `${resumeStyleData?.fontSize}px`,
                          }}>
                          {item?.title}
                        </h2>
                        {item?.certificate?.map((item: any) => {
                          return (
                            <div className="single-experience">
                              {item.certificateName && (
                                <h5
                                  style={{
                                    fontWeight: resumeStyleData?.fontWeight,
                                  }}>
                                  {item.certificateName}
                                </h5>
                              )}
                              <p>
                                {item.authority}
                                {item.dateReceMonth && (
                                  <> - {item.dateReceMonth}</>
                                )}
                                {item.dateReceYear && (
                                  <> - {item.dateReceYear}</>
                                )}
                              </p>
                              {item.certificationLink && (
                                <p>{item.certificationLink}</p>
                              )}
                              {item?.description && (
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: item?.description,
                                  }}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <hr />
                    </>
                  ) : item?.cat === "publications" && item.showComp ? (
                    <>
                      <div className="summary">
                        <h2
                          style={{
                            fontWeight: resumeStyleData?.fontWeight,
                            fontSize: `${resumeStyleData?.fontSize}px`,
                          }}>
                          {item?.title}
                        </h2>
                        {item?.publicationList?.map((item: any) => {
                          return (
                            <div className="single-experience">
                              {item.title && (
                                <h5
                                  style={{
                                    fontWeight: resumeStyleData?.fontWeight,
                                  }}>
                                  {item.title}
                                </h5>
                              )}
                              <p>
                                {item.publisher ||
                                  item.isbn ||
                                  item.dateReceMonth ||
                                  (item.dateReceYear ? (
                                    <>
                                      <p>
                                        {item.publisher}{" "}
                                        {item.isbn && <> | {item.isbn}</>}
                                        {item.dateReceMonth && (
                                          <> - {item.dateReceMonth}</>
                                        )}
                                        {item.dateReceYear && (
                                          <> - {item.dateReceYear}</>
                                        )}
                                      </p>
                                    </>
                                  ) : (
                                    <div>---</div>
                                  ))}
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
                      <hr />
                    </>
                  ) : item?.cat === "hobbies" && item.showComp ? (
                    <>
                      <div className="summary">
                        <h2
                          style={{
                            fontWeight: resumeStyleData?.fontWeight,
                            fontSize: `${resumeStyleData?.fontSize}px`,
                          }}>
                          {item?.title}
                        </h2>
                        <ul className="d-flex w-100 flex-wrap">
                          {item?.list?.map((skills: any) => (
                            <li style={{ width: "50%" }}>{skills}</li>
                          ))}
                        </ul>
                      </div>
                      <hr />
                    </>
                  ) : item?.cat === "languages" && item.showComp ? (
                    <>
                      <div className="summary">
                        <h2
                          style={{
                            fontWeight: resumeStyleData?.fontWeight,
                            fontSize: `${resumeStyleData?.fontSize}px`,
                          }}>
                          {item?.title}
                        </h2>
                        <ul className="d-flex w-100 flex-wrap">
                          {item?.list?.map((skills: any) => (
                            <li style={{ width: "50%" }}>{skills}</li>
                          ))}
                        </ul>
                      </div>
                      <hr />
                    </>
                  ) : item?.cat === "customSection" && item.showComp ? (
                    <>
                      <div className="summary">
                        <div>
                          <h2
                            style={{
                              fontWeight: resumeStyleData?.fontWeight,
                              fontSize: `${resumeStyleData?.fontSize}px`,
                            }}>
                            {item?.title}
                          </h2>
                        </div>
                        <p>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item?.description,
                            }}
                          />
                        </p>
                      </div>
                      <hr />
                    </>
                  ) : item?.cat === "achievements" && item.showComp ? (
                    <>
                      <div className="summary">
                        <h2
                          style={{
                            fontWeight: resumeStyleData?.fontWeight,
                            fontSize: `${resumeStyleData?.fontSize}px`,
                          }}>
                          {item?.title}
                        </h2>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}
                        />
                      </div>
                      <hr />
                    </>
                  ) : null}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassicResumeTemlpate11;
