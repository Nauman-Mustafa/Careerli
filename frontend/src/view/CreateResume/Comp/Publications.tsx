// @ts-nocheck

import { Icon } from "@iconify/react";
import JoditEditor from "jodit-react";
import { useEffect, useMemo, useRef, useState } from "react";
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

const Publications = ({ onDelete, docId, info, setChangeState }: any) => {
  const editor = useRef(null);
  const ref = useRef(null);
  const [sectionTitle, setSectionTitle] = useState(info.title);
  const { response, post, loading, get, data: repos, put } = useFetch();
  const [editName, setEditName] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [autoCompletionText, setAutoCompletionText] = useState("");
  const [modalContentShow, setModalContentShow] = useState({
    sentenceWriterModal: false,
    aiWriterModal: false,
    selectedIndex: 0,
  });
  const [publication, SetPublication] = useState<
    [
      {
        title: string;
        publisher: string;
        isbn: string;
        dateReceMonth: string;
        dateReceYear: string;
        description: string;
      }
    ]
  >(info.publicationList);

  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState("");
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

  let handleChange = (i, e) => {
    let newFormValues = [...publication];
    SetPublication(newFormValues);
    if (typeof e === "object") {
      newFormValues[i][e.target.name] = e.target.value;
      SetPublication(newFormValues);
    } else {
      newFormValues[i]["description"] = e;
      SetPublication(newFormValues);
    }
  };

  let addFormFields = () => {
    SetPublication([
      ...publication,
      {
        title: "",
        publisher: "",
        isbn: "",
        dateReceMonth: "",
        dateReceYear: "",
        description: "",
      },
    ]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...publication];
    newFormValues.splice(i, 1);
    SetPublication(newFormValues);

    if (auth.isLoggedIn) {
      const posteducations = async () => {
        const res = await put(`resume/update/${docId}`, {
          publications: {
            title: sectionTitle,
            cat: "publications",
            to: "publications",
            icon: "ph:books",
            order: info?.order,
            showComp: true,
            publicationList: newFormValues,
          },
        });
      };
      posteducations();
    } else {
      updateData({
        publications: {
          title: sectionTitle,
          cat: "publications",
          to: "publications",
          icon: "ph:books",
          order: info?.order,
          showComp: true,
          publicationList: newFormValues,
        },
      });
    }
  };

  const generatedAIData = useMemo(
    () => [
      "Helping the Head Chef to pick and train new employees.",
      "Scheduling special board, creating innovative and authentic dishes.",
      "Responsible for completing all audit and quality standards documentation.",
      "Turn on ovens, dish machine, lights, salad bar; fill and turn on hot food line; set up prep stations for the Chef and myself; inspect and replenish snack kitchen.",
      "Responsible for completing all audit and quality standards documentation.",
    ],
    []
  );
  const auth: any = useSelector((store: any) => store.auth);

  const [section, setSectionOpener] = useState("");

  useEffect(() => {
    info.publicationList = publication;
    updateResume({ publications: info });
    const sub$ = $collapser.subscribe((v: string) => {
      setSectionOpener(v);
    });
    return () => {
      sub$.unsubscribe();
    };
  }, []);
  let data = {
    title: sectionTitle,
    cat: "publications",
    to: "publications",
    icon: "ph:books",
    order: info?.order,
    showComp: true,
    publicationList: publication,
  };
  const updateValues = () => {
    if (auth.isLoggedIn) {
      postpublication();
    } else {
      updateData({
        publications: data,
      });
      savingData("saved");
    }
  };

  let _setTimeOut = null;
  const onFormChange = () => {
    if (_setTimeOut) clearTimeout(_setTimeOut);
    info.publicationList = publication;
    updateResume({ publications: info });
    savingData("saving...");
    _setTimeOut = setTimeout(updateValues, 1000);
  };

  const changeTitle = (e) => {
    e.stopPropagation();
    setEditName(false);
    updateResume({ publications: data });

    if (auth.isLoggedIn) {
      postpublication();
      updateResume({ publications: data });
    } else {
      updateData({
        publications: data,
      });
    }
  };

  const postpublication = async () => {
    const res = await put(`resume/update/${docId}`, {
      publications: data,
    });
    savingData("saved");
  };

  const updateContent = (v: string) => {
    const { selectedIndex } = modalContentShow;
    setContent(v);
    SetPublication(
      publication?.map((item, i) => {
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
  let isOpend = section === "publications";
  isOpend ? setChangeState(ref) : null;
  return (
    <>
      <div className="resume-box" ref={ref}>
        <div
          className="box-header d-flex justify-content-between"
          onClick={() => {
            selectSection("publications");
          }}
          aria-controls="publications"
          aria-expanded={section === "publications"}>
          <div
            className="header-left d-inline-flex align-items-center"
            onClick={(e) => {
              e.stopPropagation();
            }}>
            <div className="figure-icon">
              <Icon icon="ph:books" />
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
          <Collapse in={section === "publications"}>
            <form
              className="box-body"
              id="publications"
              onChange={onFormChange}>
              {publication?.map((item, i) => (
                <div className="row">
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
                          Remove Publication
                        </span>
                      </div>
                    </div>
                  ) : null}
                  <div className="col-xl-6">
                    <div className="form-group">
                      <div className="form-input">
                        <label>Title</label>
                        <input
                          type="text"
                          className="form-control"
                          style={{
                            border: "gainsboro solid 1px",
                            paddingLeft: "3px",
                          }}
                          name="title"
                          defaultValue={item?.title}
                          value={item.title || ""}
                          onChange={(e) => handleChange(i, e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="form-group">
                      <div className="form-input">
                        <label>Publisher</label>
                        <input
                          type="text"
                          className="form-control"
                          style={{
                            border: "gainsboro solid 1px",
                            paddingLeft: "3px",
                          }}
                          name="publisher"
                          defaultValue={item?.publisher}
                          value={item.publisher || ""}
                          onChange={(e) => handleChange(i, e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="form-group">
                      <div className="form-input">
                        <label>ISBN</label>
                        <input
                          type="text"
                          className="form-control"
                          style={{
                            border: "gainsboro solid 1px",
                            paddingLeft: "3px",
                          }}
                          name="isbn"
                          defaultValue={item?.isbn}
                          value={item.isbn || ""}
                          onChange={(e) => handleChange(i, e)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="form-group">
                      <div className="form-input">
                        <label>Date Released</label>
                        <div className="d-flex date-input">
                          <select
                            className="form-control"
                            name="dateReceMonth"
                            defaultValue={item?.dateReceMonth}
                            value={item.dateReceMonth || ""}
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
                            name="dateReceYear"
                            defaultValue={item?.dateReceYear}
                            value={item.dateReceYear || ""}
                            onChange={(e) => handleChange(i, e)}>
                            <option value="">Select Year</option>
                            {getYears()}
                          </select>
                        </div>
                      </div>
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
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="row">
                <div className="col-lg-12">
                  <div className="add-documents">
                    <Icon icon="akar-icons:plus" hFlip={true} />
                    <span onClick={() => addFormFields()}>
                      Add Publications
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </Collapse>
        ) : null}
      </div>
      <TextGenerateModal
        secName="generic"
        text={content}
        setText={updateContent}
        showModal={modalShow}
        showModalHandler={setModalShow}
        modalContentShow={modalContentShow}
      />
    </>
  );
};
export default Publications;
