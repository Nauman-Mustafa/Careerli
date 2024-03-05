import GPT3Tokenizer from "gpt3-tokenizer";
import React from "react";
import { OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import { toast } from "react-toastify";
import { useFetch } from "use-http";
const AutoComplete = ({
  toolType,
  text,
  secName,
  textHandler,
  ghostText,
}: any) => {
  const encoding = new GPT3Tokenizer({ type: "gpt3" });
  const { response, post, loading, get, data: repos, put } = useFetch();
  // To calculate input tokens use this code
  let textAfter = text
    ?.replace(/(<([^>]+)>)/gi, "")
    ?.replace(/(&nbsp;|\s)+/g, " ")
    .trim();

  let summary = textAfter;
  let input_tokens = 0;
  if (summary) {
    input_tokens = encoding?.encode(summary)?.bpe?.length;
  }

  const AutoComplete = async () => {
    let characterLength = textAfter?.split("")?.length;

    if (textAfter == "") {
      toast.error("Please enter text to auto complete");
      return;
    }
    if (characterLength < 35) {
      toast.error(
        `Please enter at least 35 characters. Your current document is only ${characterLength} characters.`);
      return;
    }
    let body: any = {
      toolType: toolType,
      input_tokens: input_tokens,
    };
    body[secName] = textAfter;
    const res = await post("resume/ai-generation", body);

    if (res.code=== 200) {
      ghostText(res?.data?.output);
    } else {
      toast.error(res.data.output);
      return;
    }
    let completeText = `${textAfter} ${res.data.output}`;
    // textHandler(completeText)
  };
  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 50, hide: 400 }}
      overlay={<Tooltip id={`tooltip-top`}>Auto complete text.</Tooltip>}
    >
      <div onClick={() => AutoComplete()} className="grammerly-btn">
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <img src="/images/icons8-quill-pen-24.png" alt="image not found" />
          // <Icon icon="mdi:alpha-a-circle" />
        )}
      </div>
    </OverlayTrigger>
  );
};

export default AutoComplete;
