// @ts-nocheck

import { Icon } from "@iconify/react";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { Collapse } from "react-bootstrap";
import { useSelector } from "react-redux";
import useFetch from "use-http";
import AutoComplete from "../../../components/AutoCompleteComp/AutoComplete";
import TextGenerateModal from "../../../components/Modal/TextGenerateModal";
import {
  $collapser,
  getDataFromLocalDB,
  savingData,
  selectSection,
  updateData,
  updateResume,
} from "../../../services";
import "../resumeStyle.scss";
const CreateNewSection = ({
  info,
  loadPage,
  onDelete,
  docId,
  setChangeState,
}: any) => {
  const editor = useRef(null);
  const ref = useRef(null);
  const [modalShow, setModalShow] = useState(false);
  const [autoCompletionText, setAutoCompletionText] = useState("");
  const [modalContentShow, setModalContentShow] = useState({
    sentenceWriterModal: false,
    aiWriterModal: false,
  });
  const [content, setContent] = useState(info?.description);
  const [sectionTitle, setSectionTitle] = useState(info.title);
  const { response, post, loading, get, data: repos, put } = useFetch();
  const [section, setSectionOpener] = useState();
  const auth: any = useSelector((store: any) => store.auth);
  const [editName, setEditName] = useState(false);
  const [customData, setCustomData] = useState({});

  const config = {
    readonly: false,
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
    askBeforePasteHTML: false,
    allowTabNavigtion: false,
    height: 200,
  };

  useEffect(() => {
    if (info?.description) {
      setContent(info?.description);
    }
    const sub$ = $collapser.subscribe((v: string) => {
      setSectionOpener(v);
    });
    return () => {
      sub$.unsubscribe();
    };
  }, []);
  useEffect(() => {
    updateResume({ customSection: auth.isLoggedIn ? newArr2 : newArr });

    const sub$ = $collapser.subscribe((v: string) => {
      setSectionOpener(v);
    });
    return () => {
      sub$.unsubscribe();
    };
  }, [content]);

  const newArr = getDataFromLocalDB()?.customSection?.map((obj) => {
    if (obj.id === info.id) {
      return { ...obj, description: content, title: sectionTitle };
    }

    return obj;
  });

  const newArr2 = loadPage?.customSection?.map((obj) => {
    if (obj.id === info.id) {
      return { ...obj, description: content, title: sectionTitle };
    }

    return obj;
  });
  const updateValues = () => {
    if (auth.isLoggedIn) {
      postNewSection();
    } else {
      updateData({
        customSection: newArr,
      });
      savingData("saved");
    }
  };

  let _setTimeOut = null;
  const onFormChange = () => {
    if (_setTimeOut) clearTimeout(_setTimeOut);
    updateResume({ customSection: auth.isLoggedIn ? newArr2 : newArr });
    savingData("saving...");
    _setTimeOut = setTimeout(updateValues, 1000);
  };

  const postNewSection = async () => {
    const res = await put(`resume/update/${docId}`, {
      customSection: newArr2,
    });
    savingData("saved");
  };
  const changeTitle = (e: any) => {
    e.stopPropagation();
    setEditName(false);

    if (auth.isLoggedIn) {
      postNewSection();
      updateResume({ customSection: newArr2 });
    } else {
      updateResume({ customSection: newArr });
      updateData({
        customSection: newArr,
      });
    }
  };
  let isOpend = section === info.title;
  isOpend ? setChangeState(ref) : null;
  const updateContent = (v: string) => {
    setContent(v);

    if (auth.isLoggedIn) {
      const newArr2 = loadPage?.customSection?.map((obj) => {
        if (obj.id === info.id) {
          return { ...obj, description: v, title: sectionTitle };
        }

        return obj;
      });
      const postNewSection = async () => {
        const res = await put(`resume/update/${docId}`, {
          customSection: newArr2,
        });
      };
      postNewSection();
      updateResume({ customSection: newArr2 });
    } else {
      const newArr = getDataFromLocalDB()?.customSection?.map((obj) => {
        if (obj.id === info.id) {
          return { ...obj, description: v, title: sectionTitle };
        }

        return obj;
      });
      updateResume({ customSection: newArr });
      updateData({
        customSection: newArr,
      });
    }
  };
  useEffect(() => {
    if (autoCompletionText) {
      console.log(autoCompletionText, "autoCompletionText");
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

  return (
    <>
      <div className="resume-box" ref={ref}>
        <div
          className="box-header d-flex justify-content-between"
          onClick={() => {
            selectSection(info.title);
          }}
          aria-controls={info.title}
          aria-expanded={section === info.title}>
          <div className="header-left d-flex align-info.titles-center">
            <div
              className="figure-icon"
              onClick={(e) => {
                e.stopPropagation();
              }}>
              <Icon icon="ph:notepad" />
            </div>
            <h5
              onClick={(e) => {
                e.stopPropagation();
              }}>
              {editName ? (
                <input
                  type="text"
                  defaultValue={info.title}
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
          <Collapse in={section === info.title}>
            <form className="box-body" id={info.title} onChange={onFormChange}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="content-editor">
                    <label>Professional Achievements</label>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      tabIndex={1}
                      config={config}
                      onBlur={(newContent) => {
                        setContent(newContent);
                        onFormChange();
                      }}
                      placeholder=""
                      onChange={(newContent) => {}}
                    />
                    <AutoComplete
                      toolType="sentence_autocomplete_generic"
                      text={content}
                      secName="sentence"
                      textHandler={updateContent}
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
        text={content}
        setText={updateContent}
        showModal={modalShow}
        showModalHandler={setModalShow}
        modalContentShow={modalContentShow}
      />
    </>
  );
};
export default CreateNewSection;
