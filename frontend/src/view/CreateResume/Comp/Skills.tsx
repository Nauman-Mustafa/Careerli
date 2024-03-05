import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { Collapse } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useFetch from "use-http";
import TextGenerateModal from "../../../components/Modal/TextGenerateModal";
import {
  $collapser,
  savingData,
  selectSection,
  updateData,
  updateResume,
} from "../../../services";

const Skills = ({ docId, onDelete, info, setChangeState }: any) => {
  const { response, post, loading, get, data: repos, put } = useFetch();
  const [skills, setSkills] = useState<any>(info.list);
  const ref = useRef(null);
  const [editName, setEditName] = useState(false);
  const [sectionTitle, setSectionTitle] = useState(info.title);
  const [value, setValue] = useState<any>([]);
  const [modalShow, setModalShow] = useState(false);
  const auth: any = useSelector((store: any) => store.auth);
  const [modalContentShow, setModalContentShow] = useState<any>({
    sentenceWriterModal: false,
    aiWriterModal: false,
    selectedIndex: 0,
  });
  const [section, setSectionOpener] = useState("");
  useEffect(() => {
    if (info.list) {
      setSkills(info.list);
    }
  }, [info]);
  useEffect(() => {
    info.list = skills;
    updateResume({ skills: info });

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

    const index = skills.findIndex((element: any) => {
      return element.toLowerCase() === e.target.value.toLowerCase();
    });
    if (index !== -1) {
      toast("Already Skill added");

      e.target.value = "";
    } else {
      setSkills([...skills, e.target.value]);

      e.target.value = "";
    }
  }
  const removeTag: any = (index: any) => {
    setSkills(skills.filter((el: any, i: any) => i !== index));
    const removeSkill = skills.filter((el: any, i: any) => i !== index);
    info.list = removeSkill;
    updateResume({ skills: info });
    if (auth.isLoggedIn) {
      const postSkills = async () => {
        const res = await put(`resume/update/${docId}`, {
          skills: info,
        });
      };
      postSkills();
    } else {
      updateData({
        skills: info,
      });
    }
  };

  const updateValues = () => {
    info.list = skills;
    if (auth.isLoggedIn) {
      postSkills();
    } else {
      updateData({
        skills: info,
      });
      savingData("saved");
    }
  };

  let _setTimeOut: any = null;
  const onFormChange = () => {
    if (_setTimeOut) clearTimeout(_setTimeOut);
    info.list = skills;
    updateResume({ skills: info });
    savingData("saving...");
    _setTimeOut = setTimeout(updateValues, 1000);
  };

  const changeTitle = (e: any) => {
    info.list = skills;
    info.title = sectionTitle;
    e.stopPropagation();
    setEditName(false);
    updateResume({ skills: info });

    if (auth.isLoggedIn) {
      postSkills();
      updateResume({ skills: info });
    } else {
      updateData({
        skills: info,
      });
    }
  };

  const postSkills = async () => {
    info.list = skills;
    const res = await put(`resume/update/${docId}`, {
      skills: info,
    });
    savingData("saved");
  };
  const updateContent = async (v: string) => {
    let newskills: any = v?.replace(/(<([^>]+)>)|(&nbsp;)/gi, "")?.split(",");

    setSkills([...skills, ...newskills]);
    info.list = newskills;
    const res = await put(`resume/update/${docId}`, {
      skills: info,
    });
    updateResume({ skills: info });
  };
  let isOpend = section === "skills";
  isOpend ? setChangeState(ref) : null;
  return (
    <div className="resume-box" ref={ref}>
      <div
        className="box-header d-flex justify-content-between"
        onClick={() => {
          selectSection("skills");
        }}
        aria-controls="skills"
        aria-expanded={section === "skills"}>
        <div
          className="header-left d-inline-flex align-items-center"
          onClick={(e) => {
            e.stopPropagation();
          }}>
          <div className="figure-icon">
            <Icon icon="ph:sparkle" />
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
        <Collapse in={section === "skills"}>
          <form
            className="box-body"
            id="skills"
            onSubmit={(e) => e.preventDefault()}
            onKeyUp={onFormChange}>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <div className="form-input">
                    <label>Enter Skills</label>
                    <input
                      type="text"
                      className="form-control"
                      onKeyDown={handleKeyDown}
                      placeholder="Add a skill and press enter"
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="suggestion-list">
              <ul>
                {skills?.map((list: any, i: any) => (
                  <li key={`single-suggestion-${i}`}>
                    <button type="button" onClick={() => removeTag(i)}>
                      {list} <Icon icon="charm:circle-cross" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <button
                type="button"
                onClick={() => {
                  setModalShow(true);
                  setModalContentShow({
                    sentenceWriterModal: false,
                    aiWriterModal: true,
                  });
                }}
                className="btn btn-light-blue">
                <Icon icon="eva:flash-outline" />
                <span> AI Writer</span>
              </button>
            </div>
          </form>
        </Collapse>
      ) : null}
      <TextGenerateModal
        secName="skills"
        setText={updateContent}
        showModal={modalShow}
        showModalHandler={setModalShow}
        modalContentShow={modalContentShow}
      />
    </div>
  );
};

export default Skills;
