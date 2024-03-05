// @ts-nocheck

import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { Collapse } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useFetch from "use-http";
import {
  $collapser,
  savingData,
  selectSection,
  updateData,
  updateResume,
} from "../../../services";
import "../resumeStyle.scss";

const Languages = ({ docId, onDelete, info, setChangeState }) => {
  const { response, post, loading, get, data: repos, put } = useFetch();
  const [editName, setEditName] = useState(false);
  const [sectionTitle, setSectionTitle] = useState(info.title);
  const [languages, setLanguages] = useState<any>(info.list);

  const [value, setValue] = useState<any>([]);

  const ref = useRef(null);
  const auth: any = useSelector((store: any) => store.auth);

  const [section, setSectionOpener] = useState("");
  useEffect(() => {
    if (info.list) {
      setLanguages(info.list);
    }
  }, [info]);

  useEffect(() => {
    info.list = languages;
    updateResume({ languages: info });

    const sub$ = $collapser.subscribe((v: string) => {
      setSectionOpener(v);
    });
    return () => {
      sub$.unsubscribe();
    };
  }, []);
  function handleKeyDown(e: any) {
    if (e.key !== "Enter") return;
    const value = e.target.value;

    if (!value.trim()) return;

    const index = languages.findIndex((element) => {
      return element.toLowerCase() === e.target.value.toLowerCase();
    });
    if (index !== -1) {
      toast("Already Language added");

      e.target.value = "";
    } else {
      setLanguages([...languages, e.target.value]);

      e.target.value = "";
    }
  }
  const removeTag = (index: any) => {
    setLanguages(languages.filter((el: any, i: any) => i !== index));
    const removeSkill = languages.filter((el: any, i: any) => i !== index);
    info.list = removeSkill;
    updateResume({ languages: info });
    if (auth.isLoggedIn) {
      const postHobbies = async () => {
        const res = await put(`resume/update/${docId}`, {
          languages: info,
        });
      };

      postHobbies();
    } else {
      updateData({
        languages: info,
      });
    }
  };

  const updateValues = () => {
    if (auth.isLoggedIn) {
      postHobbies();
    } else {
      updateData({
        languages: data,
      });
      savingData("saved");
    }
  };

  let _setTimeOut = null;
  const onFormChange = () => {
    if (_setTimeOut) clearTimeout(_setTimeOut);
    info.list = languages;
    updateResume({ languages: info });
    savingData("saving...");
    _setTimeOut = setTimeout(updateValues, 1000);
  };

  const changeTitle = (e) => {
    info.list = languages;
    info.title = sectionTitle;
    e.stopPropagation();
    setEditName(false);
    updateResume({ languages: info });

    if (auth.isLoggedIn) {
      postHobbies();
      updateResume({ languages: info });
    } else {
      updateData({
        languages: info,
      });
    }
  };

  const postHobbies = async () => {
    info.list = languages;
    const res = await put(`resume/update/${docId}`, {
      languages: info,
    });
    savingData("saved");
  };

  let isOpend = section === "languages";
  isOpend ? setChangeState(ref) : null;
  return (
    <>
      <div className="resume-box" ref={ref}>
        <div
          className="box-header d-flex justify-content-between"
          onClick={() => {
            selectSection("languages");
          }}
          aria-controls="languages"
          aria-expanded={section === "languages"}>
          <div
            className="header-left d-inline-flex align-items-center"
            onClick={(e) => {
              e.stopPropagation();
            }}>
            <div className="figure-icon">
              <Icon icon="ph:translate-fill" />
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
          <Collapse in={section === "languages"}>
            <form
              className="box-body"
              id="languages"
              onSubmit={(e) => e.preventDefault()}
              onKeyUp={onFormChange}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="form-input">
                      <label>
                        Enter Languages
                        <span>( Add language and press enter )</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Language"
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setValue(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="suggestion-list">
                <ul>
                  {languages?.map((list: any, i: any) => (
                    <li key={`single-suggestion-${i}`}>
                      <button type="button" onClick={() => removeTag(i)}>
                        {list} <Icon icon="charm:circle-cross" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </form>
          </Collapse>
        ) : null}
      </div>
    </>
  );
};
export default Languages;
