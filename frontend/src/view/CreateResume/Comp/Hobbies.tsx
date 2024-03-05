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

const Hobbies = ({ docId, onDelete, info, setChangeState }: any) => {
  const { response, post, loading, get, data: repos, put } = useFetch();
  const [editName, setEditName] = useState(false);
  const [sectionTitle, setSectionTitle] = useState(info.title);
  const [hobbies, setHobbies] = useState<any>(info?.list);
  const ref = useRef(null);

  const [value, setValue] = useState<any>([]);

  const auth: any = useSelector((store: any) => store.auth);

  const [section, setSectionOpener] = useState("");
  useEffect(() => {
    if (info.list) {
      setHobbies(info.list);
    }
  }, [info]);
  useEffect(() => {
    info.list = hobbies;
    updateResume({ hobbies: info });

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
    const index = hobbies.findIndex((element) => {
      return element.toLowerCase() === e.target.value.toLowerCase();
    });
    // let result = hobbies.includes(e.target.value.toLowerCase());

    if (index !== -1) {
      toast("Already Hobby added");

      e.target.value = "";
    } else {
      setHobbies([...hobbies, e.target.value]);

      e.target.value = "";
    }
  }
  const removeTag = (index: any) => {
    setHobbies(hobbies.filter((el: any, i: any) => i !== index));
    const removeSkill = hobbies.filter((el: any, i: any) => i !== index);
    info.list = removeSkill;
    updateResume({ hobbies: info });
    if (auth.isLoggedIn) {
      const postHobbies = async () => {
        const res = await put(`resume/update/${docId}`, {
          hobbies: info,
        });
      };

      postHobbies();
    } else {
      updateData({
        hobbies: info,
      });
    }
  };

  const updateValues = () => {
    info.list = hobbies;
    if (auth.isLoggedIn) {
      postHobbies();
    } else {
      updateData({
        hobbies: info,
      });
      savingData("saved");
    }
  };

  let _setTimeOut = null;
  const onFormChange = () => {
    if (_setTimeOut) clearTimeout(_setTimeOut);
    info.list = hobbies;
    updateResume({ hobbies: info });
    savingData("saving...");
    _setTimeOut = setTimeout(updateValues, 1000);
  };

  const changeTitle = (e) => {
    info.list = hobbies;
    info.title = sectionTitle;
    e.stopPropagation();
    setEditName(false);
    updateResume({ hobbies: info });

    if (auth.isLoggedIn) {
      postHobbies();
      updateResume({ hobbies: info });
    } else {
      updateData({
        hobbies: info,
      });
    }
  };

  const postHobbies = async () => {
    info.list = hobbies;
    const res = await put(`resume/update/${docId}`, {
      hobbies: info,
    });
    savingData("saved");
  };
  let isOpend = section === "hobbies";
  isOpend ? setChangeState(ref) : null;
  return (
    <>
      <div className="resume-box" ref={ref}>
        <div
          className="box-header d-flex justify-content-between"
          onClick={() => {
            selectSection("hobbies");
          }}
          aria-controls="hobbies"
          aria-expanded={section === "hobbies"}>
          <div className="header-left d-flex align-items-center">
            <div
              className="figure-icon"
              onClick={(e) => {
                e.stopPropagation();
              }}>
              <Icon icon="ph:balloon" />
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
            {/* <button className="edit-button">
              <Icon icon="eva:edit-2-outline" />
            </button> */}
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
          <Collapse in={section === "hobbies"}>
            <form
              className="box-body"
              id="hobbies"
              onSubmit={(e) => e.preventDefault()}
              onKeyUp={onFormChange}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="form-input">
                      <label>
                        Enter Hobbies
                        <span>( Add hobbies and press enter )</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Hobby"
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setValue(e.target.value)}
                      />
                      {/* <button
                      className="add-button"
                      onClick={(e) => {
                        value.length > 1 ? setHobbies([...hobbies, value]) : null;
                      }}
                    >
                      <Icon icon="akar-icons:circle-plus" />
                    </button> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="suggestion-list">
                <ul>
                  {hobbies?.map((list: any, i: any) => (
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
export default Hobbies;
