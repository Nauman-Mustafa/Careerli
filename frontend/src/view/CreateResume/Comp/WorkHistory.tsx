// @ts-nocheck

import { Icon } from "@iconify/react";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { Collapse } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useFetch from "use-http";
import { appendText } from "../../../components/AutoCompleteComp/AppendData";
import AutoComplete from "../../../components/AutoCompleteComp/AutoComplete";
import TextGenerateModal from "../../../components/Modal/TextGenerateModal";
import {
  $collapser,
  savingData,
  selectSection,
  updateData,
  updateResume,
} from "../../../services";
import { getYears } from "../../../services/yearlist";
import "../resumeStyle.scss";
const WorkHistory = ({ show, docId, onDelete, info, setChangeState }: any) => {
  const editor = useRef(null);
  const ref = useRef(null);
  const [editName, setEditName] = useState(false);
  const [sectionTitle, setSectionTitle] = useState(info.title);
  const [checkValue, setCheckValue] = useState(false);
  const [autoCompletionText, setAutoCompletionText] = useState("");
  const { response, post, loading, get, data: repos, put } = useFetch();
  const [modalShow, setModalShow] = useState(false);
  const [workHistory, SetWorkHistory] = useState(info?.history);

  const [modalContentShow, setModalContentShow] = useState({
    sentenceWriterModal: false,
    aiWriterModal: false,
    selectedIndex: 0,
  });
  const [content, setContent] = useState("");
  const cleanHTML = (html) => html?.replace(/style=".*?"/g, "");
  const config = {
    readonly: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    pastePlain: true,
    enableDragAndDropFileToEditor: true,
    buttons: [
      "bold",
      "italic",
      "underline",
      "justify",
      "left",
      "right",
      "ul",
      "ol",
      "link",
    ],

    removeButtons: [
      "fullsize",
      "fontsize",
      "eraser",
      "font",
      "brush",
      "paragraph",
      "file",
      "eraser",
      "source",
      "hr",
      "image",
      "table",
      "formatpainter",
    ],
    showXPathInStatusbar: false,
    showCharsCounter: false,
    showWordsCounter: false,
    toolbarAdaptive: false,
    toolbarSticky: true,
    allowTabNavigtion: false,
    height: 200,
  };

  useEffect(() => {
    if (info.history) {
      SetWorkHistory(info.history);
    }
  }, [info]);
  useEffect(() => {
    if (workHistory) {
      info.history = workHistory;
      updateResume({ workHistory: info });
    }

    const sub$ = $collapser.subscribe((v: string) => {
      setSectionOpener(v);
    });
    return () => {
      sub$.unsubscribe();
    };
  }, [workHistory]);
  useEffect(() => {
    if (autoCompletionText) {
      appendText(autoCompletionText);
    }
  }, [autoCompletionText]);

  let handleChange = (i, e) => {
    let newFormValues = [...workHistory];

    if (e?.target?.name == "stillWork") {
      newFormValues[i]["stillWork"] = e.target.checked;
      SetWorkHistory(newFormValues);
    } else {
      if (typeof e === "object") {
        newFormValues[i][e.target.name] = e.target.value;
        SetWorkHistory(newFormValues);
      } else {
        newFormValues[i]["description"] = e;
        SetWorkHistory(newFormValues);
      }
    }
  };

  let addFormFields = () => {
    SetWorkHistory([
      ...workHistory,
      {
        jobTitle: "",
        employer: "",
        email: "",
        startMonth: "",
        endMonth: "",
        startYear: "",
        endYear: "",
        description: "",
      },
    ]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...workHistory];
    newFormValues.splice(i, 1);
    SetWorkHistory(newFormValues);

    if (auth.isLoggedIn) {
      const posteducations = async () => {
        const res = await put(`resume/update/${docId}`, {
          workHistory: {
            id: info.id,
            title: sectionTitle,
            cat: "workHistory",
            to: "workHistory",
            icon: "ph:briefcase",
            order: info?.order,
            showComp: true,
            history: newFormValues,
          },
        });
      };
      posteducations();
    } else {
      updateData({
        workHistory: {
          id: info.id,
          title: sectionTitle,
          cat: "workHistory",
          to: "workHistory",
          icon: "ph:briefcase",
          order: info?.order,
          showComp: true,
          history: newFormValues,
        },
      });
    }
  };

  const auth: any = useSelector((store: any) => store.auth);

  const [section, setSectionOpener] = useState("");

  const obj = {
    id: info.id,
    title: sectionTitle,
    cat: "workHistory",
    to: "workHistory",
    icon: "ph:briefcase",
    order: info?.order,
    showComp: true,
    history: workHistory,
  };

  const updateValues = () => {
    if (auth.isLoggedIn) {
      postworkHistory();
    } else {
      updateData({
        workHistory: obj,
      });
      savingData("saved");
    }
  };

  let _setTimeOut = null;
  const onFormChange = () => {
    if (_setTimeOut) clearTimeout(_setTimeOut);
    info.history = workHistory;
    updateResume({ workHistory: info });
    savingData("saving...");
    _setTimeOut = setTimeout(updateValues, 1000);
  };

  const changeTitle = (e) => {
    e.stopPropagation();
    setEditName(false);

    updateResume({ workHistory: obj });
    if (auth.isLoggedIn) {
      postworkHistory();
      updateResume({ workHistory: obj });
    } else {
      updateData({
        workHistory: obj,
      });
    }
  };

  const postworkHistory = async () => {
    const res = await put(`resume/update/${docId}`, {
      workHistory: obj,
    });
    savingData("saved");
  };

  const updateContent = (v: string) => {
    const { selectedIndex } = modalContentShow;
    setContent(v);
    SetWorkHistory(
      workHistory?.map((item, i) => {
        if (i === selectedIndex) {
          item.description = v;
          return item;
        }
        return item;
      })
    );
    onFormChange();
  };

  const handleKeyDown = (event) => {
    if (autoCompletionText) {
      if (event.keyCode === 32 || event.keyCode === 9 || event.keyCode === 13) {
        // Space, Tab or Enter key was pressed

        event.preventDefault();
        document.getElementById("text-append")?.remove();

        let completeText = `${content
          .replace(/(<([^>]+)>)/gi, "")
          ?.replace(/(&nbsp;|\s)+/g, " ")
          .trim()} ${autoCompletionText}`;
        updateContent(completeText);
        setAutoCompletionText("");
      }
    }
  };

  const showAIModal = (index: number) => {
    if (workHistory[0]?.jobTitle?.trim() !== "") {
      setModalShow(true);
      setModalContentShow({
        sentenceWriterModal: false,
        aiWriterModal: true,
        selectedIndex: index,
      });
    } else {
      console.log("here");

      return toast.error("Job title cannot be empty");
    }
  };

  let isOpend = section === "workHistory";
  isOpend ? setChangeState(ref) : null;
  return (
    <>
      <div className="resume-box" ref={ref}>
        <div
          className="box-header d-flex justify-content-between"
          onClick={() => {
            selectSection("workHistory");
          }}
          aria-controls="workHistory"
          aria-expanded={section === "workHistory"}>
          <div
            className="header-left d-inline-flex align-items-center"
            onClick={(e) => {
              e.stopPropagation();
            }}>
            <div className="figure-icon">
              <Icon icon="ph:briefcase" />
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
          <Collapse in={section === "workHistory"}>
            <form className="box-body" id="workHistory" onChange={onFormChange}>
              {workHistory?.map((item, i) => (
                <div className="row" key={i}>
                  {i >= 1 ? (
                    <div className="col-lg-12">
                      <hr />
                    </div>
                  ) : null}
                  {i ? (
                    <div className="col-lg-12">
                      <div className="add-documents remove-documents">
                        <Icon icon="bi:trash" hFlip={true} onClick={onDelete} />
                        <span onClick={() => removeFormFields(i)}>
                          Remove Experience
                        </span>
                      </div>
                    </div>
                  ) : null}

                  <div className="col-xl-6">
                    <div className="form-group">
                      <div className="form-input">
                        <label>
                          Job Title <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          style={{
                            border: "gainsboro solid 1px",
                            paddingLeft: "3px",
                          }}
                          name="jobTitle"
                          defaultValue={item.jobTitle}
                          value={item.jobTitle || ""}
                          onChange={(e) => handleChange(i, e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="form-group">
                      <div className="form-input">
                        <label>
                          Employer <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          style={{
                            border: "gainsboro solid 1px",
                            paddingLeft: "3px",
                          }}
                          name="employer"
                          defaultValue={item.employer}
                          value={item.employer || ""}
                          onChange={(e) => handleChange(i, e)}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-xl-4">
                    <div className="form-group">
                      <div className="form-input">
                        <label>Email Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="email"
                          defaultValue={item.email}
                          value={item.email || ""}
                          onChange={(e) => handleChange(i, e)}
                        />
                      </div>
                    </div>
                  </div> */}
                  <div className="col-xl-6">
                    <div className="form-group">
                      <div className="form-input">
                        <label>Start</label>
                        <div className="d-flex date-input">
                          <select
                            className="form-control"
                            name="startMonth"
                            defaultValue={item.startMonth}
                            value={item.startMonth || ""}
                            onChange={(e) => handleChange(i, e)}>
                            <option value="">Select Month</option>
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>Jun</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                          </select>
                          <select
                            className="form-control"
                            name="startYear"
                            defaultValue={item.startYear}
                            value={item.startYear || ""}
                            onChange={(e) => handleChange(i, e)}>
                            <option value="">Select Year</option>
                            {getYears()}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="form-group">
                      <div className="form-input">
                        <label>End</label>

                        <div
                          className={
                            item?.stillWork
                              ? "d-flex date-input invisible"
                              : "d-flex date-input"
                          }>
                          <select
                            className="form-control"
                            name="endMonth"
                            value={item.endMonth || ""}
                            defaultValue={item.endMonth}
                            onChange={(e) => {
                              handleChange(i, e);
                            }}>
                            <option value="">Select Month</option>
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>Jun</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                          </select>
                          <select
                            className="form-control"
                            name="endYear"
                            defaultValue={item.endYear}
                            value={item.endYear || ""}
                            onChange={(e) => {
                              const selectedEndYear = parseInt(
                                e.target.value,
                                10
                              );
                              const selectedEndMonth = item.endMonth;
                              const startYear = parseInt(item.startYear, 10);
                              const startMonth = item.startMonth;

                              // Convert month names to numerical values for comparison
                              const monthToNumber = {
                                January: 1,
                                February: 2,
                                March: 3,
                                April: 4,
                                May: 5,
                                June: 6,
                                July: 7,
                                August: 8,
                                September: 9,
                                October: 10,
                                November: 11,
                                December: 12,
                              };

                              // Ensure end year is not less than start year
                              if (startYear && selectedEndYear < startYear) {
                                e.target.value = startYear;
                              }

                              // If end year is equal to start year, check end month
                              if (startYear && selectedEndYear === startYear) {
                                if (
                                  monthToNumber[selectedEndMonth] <
                                  monthToNumber[startMonth]
                                ) {
                                  item.endMonth = startMonth; // Set end month to start month
                                }
                              }

                              handleChange(i, e);
                            }}>
                            <option value="">Select Year</option>
                            {getYears()}
                          </select>
                        </div>
                      </div>
                      <label className="checkbox-container">
                        Still work here ?
                        <input
                          name="stillWork"
                          type="checkbox"
                          onChange={(e) => {
                            setCheckValue(e.target.checked);
                            handleChange(i, e);
                          }}
                          defaultChecked={item.stillWork}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="content-editor" onKeyDown={handleKeyDown}>
                      <label>
                        Description <span>(Optional)</span>
                      </label>
                      <JoditEditor
                        ref={editor}
                        defaultValue={item?.description}
                        value={cleanHTML(item?.description)}
                        tabIndex={1}
                        config={config}
                        onBlur={(newContent) => {
                          setContent(newContent);
                          handleChange(i, newContent);
                          onFormChange();
                        }}
                      />

                      <AutoComplete
                        toolType="sentence_autocomplete_work"
                        text={content ? content : item?.description}
                        secName="work"
                        textHandler={updateContent}
                        ghostText={setAutoCompletionText}
                      />
                      <div className="editor-buttons">
                        <a
                          className="btn btn-white"
                          onClick={() => {
                            setModalShow(true);
                            setModalContentShow({
                              sentenceWriterModal: true,
                              aiWriterModal: false,
                              selectedIndex: i,
                            });
                          }}>
                          <Icon icon="ph:keyboard" />
                          <span>Sentence Rewriter</span>
                        </a>
                        <a
                          className="btn btn-light-blue"
                          onClick={() => {
                            showAIModal(i);
                          }}>
                          <Icon icon="eva:flash-outline" />
                          <span> AI Writer</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="row">
                <div className="col-lg-12">
                  <div className="add-documents">
                    <Icon icon="akar-icons:plus" hFlip={true} />
                    <span onClick={() => addFormFields()}>Add Experience</span>
                  </div>
                </div>
              </div>
            </form>
          </Collapse>
        ) : null}
      </div>

      <TextGenerateModal
        secName="work"
        text={content ? content : workHistory[0].description}
        setText={updateContent}
        showModal={modalShow}
        showModalHandler={setModalShow}
        modalContentShow={modalContentShow}
      />
    </>
  );
};
export default WorkHistory;
