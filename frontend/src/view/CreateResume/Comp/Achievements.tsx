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
import "../resumeStyle.scss";
const Achievements = ({ docId, onDelete, info, setChangeState }: any) => {
  const editor = useRef(null);
  const ref = useRef(null);
  const { response, post, loading, get, data: repos, put } = useFetch();
  const [editName, setEditName] = useState(false);
  const [sectionTitle, setSectionTitle] = useState(info.title);
  const [modalShow, setModalShow] = useState(false);
  const [autoCompletionText, setAutoCompletionText] = useState("");
  const [modalContentShow, setModalContentShow] = useState({
    sentenceWriterModal: false,
    aiWriterModal: false,
  });
  const [content, setContent] = useState(info?.description);
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

  const [section, setSectionOpener] = useState("");
  const auth: any = useSelector((store: any) => store.auth);
  useEffect(() => {
    const sub$ = $collapser.subscribe((v: string) => {
      setSectionOpener(v);
    });
    return () => {
      sub$.unsubscribe();
    };
  }, []);

  useEffect(() => {
    info.description = content;
    updateResume({ achievements: info });

    const sub$ = $collapser.subscribe((v: string) => {
      setSectionOpener(v);
    });
    return () => {
      sub$.unsubscribe();
    };
  }, [content]);

  const updateValues = (data) => {
    data.title = sectionTitle;
    if (auth.isLoggedIn) {
      postAchievements(data);
    } else {
      updateData({
        achievements: data,
      });
      savingData("saved");
    }
  };

  let _setTimeOut = null;
  const onFormChange = (data) => {
    if (_setTimeOut) clearTimeout(_setTimeOut);
    info.description = data;

    updateResume({ achievements: info });
    savingData("saving...");
    _setTimeOut = setTimeout(updateValues(info), 1000);
  };

  const postAchievements = async (data) => {
    const res = await put(`resume/update/${docId}`, {
      achievements: data,
    });
    savingData("saved");
  };
  const changeTitle = (e: any) => {
    e.stopPropagation();
    setEditName(false);
    info.description = content;
    info.title = sectionTitle;
    updateResume({ achievements: info });

    if (auth.isLoggedIn) {
      postAchievements(info);
    } else {
      info.description = content;
      info.title = sectionTitle;
      updateData({
        achievements: info,
      });
    }
  };

  const updateContent = (v: string) => {
    info.description = v;

    info.title = sectionTitle;
    setContent(v);

    updateResume({ achievements: info });
    if (!auth.isLoggedIn) {
      updateData({
        achievements: info,
      });
    } else {
      let data = {
        id: info.id,
        title: sectionTitle,
        cat: "achievements",
        to: "achievements",
        icon: "ph:trophy-light",
        order: info?.order,
        showComp: true,
        description: v,
      };
      const postAchievements = async () => {
        const res = await put(`resume/update/${docId}`, {
          achievements: info,
        });
      };
      postAchievements();
    }
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

  let isOpend = section === "achievements";
  isOpend ? setChangeState(ref) : null;
  return (
    <>
      <div className="resume-box" ref={ref}>
        <div
          className="box-header d-flex justify-content-between"
          onClick={() => {
            selectSection("achievements");
          }}
          aria-controls="achievements"
          aria-expanded={section === "achievements"}>
          <div className="header-left d-flex align-items-center">
            <div
              className="figure-icon"
              onClick={(e) => {
                e.stopPropagation();
              }}>
              <Icon icon="ph:trophy-light" />
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
          <div
            className="header-right"
            onClick={(e) => {
              e.stopPropagation();
            }}>
            <button className="delete-button">
              <Icon icon="bi:trash" hFlip={true} onClick={onDelete} />
            </button>
          </div>
        </div>
        {isOpend ? (
          <Collapse in={section === "achievements"}>
            <form className="box-body" id="achievements">
              <div className="row">
                <div className="col-lg-12">
                  <div className="content-editor">
                    <label>Professional Achievements</label>
                    <JoditEditor
                      ref={editor}
                      value={cleanHTML(content)}
                      tabIndex={1}
                      config={config}
                      onBlur={(newContent) => {
                        setContent(newContent);
                        onFormChange(newContent);
                      }}
                      placeholder=""
                      onChange={handleEditorChange}
                    />
                    <AutoComplete
                      toolType="sentence_autocomplete_generic"
                      text={content}
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
                          });
                        }}>
                        <Icon icon="ph:keyboard" />
                        <span>Sentence Rewriter</span>
                      </a>
                    </div>
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
export default Achievements;
