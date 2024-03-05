// @ts-nocheck

import { Icon } from "@iconify/react";
import React, { useEffect, useRef, useState } from "react";
import { Collapse } from "react-bootstrap";
import { useSelector } from "react-redux";
import useFetch from "use-http";
import {
  $collapser,
  savingData,
  selectSection,
  updateData,
  updateResume,
} from "../../../services";
import "../resumeStyle.scss";

const References = ({ docId, onDelete, info, setChangeState }: any) => {
  const { response, post, loading, get, data: repos, put } = useFetch();
  const [editName, setEditName] = useState(false);
  const [sectionTitle, setSectionTitle] = useState(info.title);
  const ref = useRef(null);

  const [refernce, SetReference] = useState<{
    personOne: string;
    personeOneContact: string;
    personTwo: string;
    personTwoContact: string;
  }>(info);

  const auth: any = useSelector((store: any) => store.auth);

  const [section, setSectionOpener] = useState("");

  useEffect(() => {
    info.personOne = refernce.personOne;
    info.personTwo = refernce.personTwo;
    info.personTwoContact = refernce.personTwoContact;
    info.personeOneContact = refernce.personeOneContact;

    updateResume({ refernce: info });

    const sub$ = $collapser.subscribe((v: string) => {
      setSectionOpener(v);
    });
    return () => {
      sub$.unsubscribe();
    };
  }, []);
  useEffect(() => {
    setChangeState(ref);
  }, [section]);

  const updateValues = () => {
    if (auth.isLoggedIn) {
      postProfile();
    } else {
      (refernce.title = "references"),
        (refernce.cat = "references"),
        (refernce.order = info?.order),
        (refernce.showComp = true),
        updateData({
          references: refernce,
        });
      savingData("saved");
    }
  };

  let _setTimeOut = null;
  const onFormChange = () => {
    if (_setTimeOut) clearTimeout(_setTimeOut);
    info.personOne = refernce.personOne;
    info.personTwo = refernce.personTwo;
    info.personTwoContact = refernce.personTwoContact;
    info.personeOneContact = refernce.personeOneContact;

    updateResume({ refernce: info });
    savingData("saving...");
    // console.log(refernce, "refernce");
    _setTimeOut = setTimeout(updateValues, 1000);
  };

  const changeTitle = (e) => {
    e.stopPropagation();
    setEditName(false);
    (refernce.title = sectionTitle),
      (refernce.cat = "references"),
      (refernce.order = info?.order),
      (refernce.showComp = true),
      updateResume({ refernce: refernce });

    if (auth.isLoggedIn) {
      postProfile();
      updateResume({ refernce: refernce });
    } else {
      updateData({
        references: refernce,
      });
    }
  };

  const postProfile = async () => {
    (refernce.title = sectionTitle),
      (refernce.cat = "references"),
      (refernce.order = info?.order),
      (refernce.showComp = true);
    const res = await put(`resume/update/${docId}`, {
      references: refernce,
    });
    savingData("saved");
  };

  let isOpend = section === "references";
  // isOpend ? setChangeState(ref) : null;
  return (
    <>
      <div className="resume-box" ref={ref}>
        <div
          className="box-header d-flex justify-content-between"
          onClick={() => {
            selectSection("references");
          }}
          aria-controls="references"
          aria-expanded={section === "references"}>
          <div className="header-left d-inline-flex align-items-center">
            <div className="figure-icon">
              <Icon icon="ph:users-four" />
            </div>
            <h5
              onClick={(e) => {
                e.stopPropagation();
              }}>
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
                }}>
                <Icon icon="eva:edit-2-outline" />
              </button>
              <button
                className={editName ? "edit-button" : "edit-button d-none"}
                onClick={(e) => changeTitle(e)}>
                <Icon icon="charm:circle-tick" />
              </button>
            </h5>
          </div>
          <div className="header-right">
            <button
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation();
              }}>
              <Icon icon="bi:trash" hFlip={true} onClick={onDelete} />
            </button>
          </div>
        </div>
        {isOpend ? (
          <Collapse in={section === "references"}>
            <form className="box-body" id="references" onKeyUp={onFormChange}>
              <div className="row">
                <div className="col-xl-6">
                  <div className="form-group">
                    <div className="form-input">
                      <label>Person 1</label>
                      <input
                        type="text"
                        className="form-control"
                        style={{
                          border: "gainsboro solid 1px",
                          paddingLeft: "3px",
                        }}
                        value={refernce?.personOne}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          SetReference((prev) => {
                            return {
                              ...prev,
                              personOne: e.target.value,
                            };
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="form-group">
                    <div className="form-input">
                      <label>
                        Contact<span>(Phone or Email)</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        style={{
                          border: "gainsboro solid 1px",
                          paddingLeft: "3px",
                        }}
                        value={refernce?.personeOneContact}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          SetReference((prev) => {
                            return {
                              ...prev,
                              personeOneContact: e.target.value,
                            };
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="form-group">
                    <div className="form-input">
                      <label>Person 2</label>
                      <input
                        type="text"
                        className="form-control"
                        style={{
                          border: "gainsboro solid 1px",
                          paddingLeft: "3px",
                        }}
                        value={refernce?.personTwo}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          SetReference((prev) => {
                            return {
                              ...prev,
                              personTwo: e.target.value,
                            };
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="form-group">
                    <div className="form-input">
                      <label>
                        Contact<span>(Phone or Email)</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        style={{
                          border: "gainsboro solid 1px",
                          paddingLeft: "3px",
                        }}
                        value={refernce?.personTwoContact}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          SetReference((prev) => {
                            return {
                              ...prev,
                              personTwoContact: e.target.value,
                            };
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Collapse>
        ) : null}
      </div>
    </>
  );
};
export default References;
