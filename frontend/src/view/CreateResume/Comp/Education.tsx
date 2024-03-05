// @ts-nocheck

import { Icon } from "@iconify/react";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { Collapse } from "react-bootstrap";
import { useSelector } from "react-redux";
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

const Education = ({ docId, onDelete, info, setChangeState }: any) => {
  const editor = useRef(null);
  const ref = useRef(null);

  const [modalShow, setModalShow] = useState(false);
  const [other, setOther] = useState(false);
  const [modalContentShow, setModalContentShow] = useState({
    sentenceWriterModal: false,
    aiWriterModal: false,
    selectedIndex: 0,
  });
  const [editName, setEditName] = useState(false);
  const [sectionTitle, setSectionTitle] = useState(info.title);
  // const [editSectionName,, setEditSectionName] = useState("Education");
  const { data: repos, put } = useFetch();
  const [autoCompletionText, setAutoCompletionText] = useState("");

  const [content, setContent] = useState("");
  const [education, SetEducation] = useState(info?.educationHistory);

  let handleChange = (i, e) => {
    if (e.target?.name === "degree" && e.target?.value === "Other") {
      setOther(true);
    }
    let newFormValues = [...education];
    if (e?.target?.name == "stillWork") {
      newFormValues[i]["stillWork"] = e.target.checked;
      SetEducation(newFormValues);
    } else {
      if (typeof e === "object") {
        newFormValues[i][e.target.name] = e.target.value;
        SetEducation(newFormValues);
      } else {
        newFormValues[i]["description"] = e;
        SetEducation(newFormValues);
      }
    }
  };

  let addFormFields = () => {
    SetEducation([
      ...education,
      {
        school: "",
        location: "",

        fieldOfStudy: "",
        degree: "",
        startMonth: "",
        endMonth: "",
        startYear: "",
        endYear: "",
        description: "",
      },
    ]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...education];
    newFormValues.splice(i, 1);
    SetEducation(newFormValues);

    if (auth.isLoggedIn) {
      const posteducations = async () => {
        const res = await put(`resume/update/${docId}`, {
          education: {
            id: info.id,
            title: sectionTitle,
            cat: "education",
            to: "education",
            icon: "ph:graduation-cap-bold",
            order: 3,
            showComp: true,
            educationHistory: newFormValues,
          },
        });
      };
      posteducations();
    } else {
      updateData({
        education: {
          id: info.id,
          title: sectionTitle,
          cat: "education",
          to: "education",
          icon: "ph:graduation-cap-bold",
          order: 3,
          showComp: true,
          educationHistory: newFormValues,
        },
      });
    }
  };

  const auth: any = useSelector((store: any) => store.auth);

  const [section, setSectionOpener] = useState("");

  useEffect(() => {
    if (info.educationHistory) {
      SetEducation(info.educationHistory);
    }
  }, [info]);

  useEffect(() => {
    info.educationHistory = education;
    updateResume({ education: info });

    const sub$ = $collapser.subscribe((v: string) => {
      setSectionOpener(v);
    });
    return () => {
      sub$.unsubscribe();
    };
  }, []);
  let data = {
    id: info.id,
    title: sectionTitle,
    cat: "education",
    to: "education",
    icon: "ph:graduation-cap-bold",
    order: 3,
    showComp: true,
    educationHistory: education,
  };
  const updateValues = () => {
    if (auth.isLoggedIn) {
      postEducation();
    } else {
      updateData({
        education: data,
      });
      savingData("saved");
    }
  };

  let _setTimeOut = null;
  const onFormChange = () => {
    if (_setTimeOut) clearTimeout(_setTimeOut);
    info.educationHistory = education;
    updateResume({ education: info });
    savingData("saving...");
    _setTimeOut = setTimeout(updateValues, 1000);
  };

  const changeTitle = (e) => {
    e.stopPropagation();
    setEditName(false);
    updateResume({ education: data });

    if (auth.isLoggedIn) {
      postEducation();
      updateResume({ education: data });
    } else {
      updateData({
        education: data,
      });
    }
  };

  const postEducation = async () => {
    const res = await put(`resume/update/${docId}`, {
      education: data,
    });
    savingData("saved");
  };

  const updateContent = (v: string) => {
    const { selectedIndex } = modalContentShow;
    setContent(v);
    SetEducation(
      education?.map((item, i) => {
        if (i === selectedIndex) {
          item.description = v;
          return item;
        }
        return item;
      })
    );
    onFormChange();
  };
  useEffect(() => {
    if (autoCompletionText) {
      appendText(autoCompletionText);
    }
  }, [autoCompletionText]);
  const handleEditorChange = (newContent) => {
    const elem = document.querySelector(".jodit-wysiwyg>p");
    if (autoCompletionText) {
      const lastChar = newContent
        .replace(/(<([^>]+)>)/gi, "")
        ?.replace(/(&nbsp;|\s)+/g, " ")
        .slice(-1);

      if (lastChar === " " || lastChar === "\t" || lastChar === "\n") {
        const autoGeneratedText = "Hello, world!";

        document.getElementById("text-append")?.remove();

        let completeText = `${content
          .replace(/(<([^>]+)>)/gi, "")
          ?.replace(/(&nbsp;|\s)+/g, " ")
          .trim()} ${autoCompletionText}`;
        updateContent(completeText);
        setAutoCompletionText("");
      }
    } else {
      setAutoCompletionText("");
    }
  };
  let isOpend = section === "education";
  isOpend ? setChangeState(ref) : null;

  const cleanHTML = (html) => html.replace(/style=".*?"/g, "");
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

  return (
    <>
      <div className="resume-box" ref={ref}>
        <div
          className="box-header d-flex justify-content-between"
          onClick={() => {
            selectSection("education");
          }}
          aria-controls="education"
          aria-expanded={section === "education"}>
          <div className="header-left d-flex align-items-center">
            <div
              className="figure-icon"
              onClick={(e) => {
                e.stopPropagation();
              }}>
              <Icon icon="ph:graduation-cap-bold" />
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
          <Collapse in={section === "education"}>
            <form className="box-body" id="education" onChange={onFormChange}>
              {education?.map((item, i) => (
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
                          Remove Education
                        </span>
                      </div>
                    </div>
                  ) : null}
                  <div className="col-xl-6">
                    <div className="form-group">
                      <div className="form-input">
                        <label>School</label>
                        <input
                          type="text"
                          className="form-control"
                          style={{
                            border: "gainsboro solid 1px",
                            paddingLeft: "3px",
                          }}
                          name="school"
                          defaultValue={item.school}
                          value={item.school || ""}
                          onChange={(e) => handleChange(i, e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="form-group">
                      <div className="form-input">
                        <label>Location</label>
                        <input
                          type="text"
                          className="form-control"
                          style={{
                            border: "gainsboro solid 1px",
                            paddingLeft: "3px",
                          }}
                          name="location"
                          defaultValue={item.location}
                          value={item.location || ""}
                          onChange={(e) => handleChange(i, e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="form-group">
                      <div className="form-input">
                        <label>Field of Study</label>
                        <input
                          type="text"
                          className="form-control"
                          style={{
                            border: "gainsboro solid 1px",
                            paddingLeft: "3px",
                          }}
                          name="fieldOfStudy"
                          defaultValue={item.fieldOfStudy}
                          value={item.fieldOfStudy || ""}
                          onChange={(e) => handleChange(i, e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="form-group">
                      {other ? (
                        <div className="form-input">
                          <label>Other</label>

                          <input
                            type="text"
                            className="form-control"
                            style={{
                              border: "gainsboro solid 1px",
                              paddingLeft: "3px",
                            }}
                            name="degree"
                            defaultValue={item.degree}
                            value={item.degree || ""}
                            onChange={(e) => handleChange(i, e)}
                          />
                        </div>
                      ) : (
                        <div className="form-input">
                          <label>Degree</label>

                          <select
                            className="form-control"
                            style={{
                              border: "gainsboro solid 1px",
                              paddingLeft: "3px",
                            }}
                            name="degree"
                            defaultValue={item.degree}
                            value={item.degree || ""}
                            onChange={(e) => handleChange(i, e)}>
                            <option>Select Degree</option>
                            <option>BSIT</option>
                            <option>BSCS</option>
                            <option>BSSE</option>
                            <option>MIT</option>
                            <option>MCS</option>
                            <option>MSCS</option>
                            <option>MSIT</option>
                            <option>Other</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
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
                            onChange={(e) => handleChange(i, e)}
                            // defaultValue={optionArray[index]}
                          >
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
                            defaultValue={item.endMonth}
                            value={item.endMonth || ""}
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
                        Still school here ?
                        <input
                          type="checkbox"
                          name="stillWork"
                          defaultValue={item.stillWork}
                          onChange={(e) => {
                            handleChange(i, e);
                          }}
                          defaultChecked={item.stillWork}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="content-editor">
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
                        placeholder=""
                        onChange={handleEditorChange}
                      />
                      <AutoComplete
                        toolType="sentence_autocomplete_generic"
                        text={content ? content : item?.description}
                        secName="sentence"
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
                            setModalShow(true);
                            setModalContentShow({
                              sentenceWriterModal: false,
                              aiWriterModal: true,
                              selectedIndex: i,
                            });
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
                    <span onClick={() => addFormFields()}>Add Education</span>
                  </div>
                </div>
              </div>
            </form>
          </Collapse>
        ) : null}
      </div>
      <TextGenerateModal
        secName="education"
        text={content}
        setText={updateContent}
        showModal={modalShow}
        showModalHandler={setModalShow}
        modalContentShow={modalContentShow}
      />
    </>
  );
};
export default Education;
