import template2Img from "../../assets/images/ClassicTemplate.png";
import template1Img from "../../assets/images/CreativeTemplate.png";
import firstCoverLetter from "../../assets/images/firstCover.jpg";
import secondCoverLetter from "../../assets/images/secondCoverImage.jpg";
import template11Img from "../../assets/images/template-11.png";
import template7Img from "../../assets/images/Template-7.png";
import icon1 from "../../assets/react.svg";
export const CVData: any = [
  {
    category: "creative",
    document_type: "creative",
    name: "Template 1",
    imagePath: template1Img,
  },
  {
    category: "classic",
    document_type: "classic",
    name: "Template 2",
    imagePath: template2Img,
  },
  {
    category: "classic",
    document_type: "classic",
    name: "Template 3",
    imagePath: template7Img,
  },
  {
    category: "classic",
    document_type: "classic",
    name: "Template 4",
    imagePath: template11Img,
  },
];

export const CLData: any = [
  {
    category: "classic",
    imagePath: firstCoverLetter,
    document_type: "classic",
    name: "First Template",
  },
  {
    category: "creative",
    imagePath: secondCoverLetter,
    document_type: "creative",
    name: "Second Template",
  },
];
export const CoverLetterData: any = [
  {
    category: "creative",
    className: "icon1",
    iconimg: icon1,
    pageHeading:
      "Blast through writers block by letting Loopy write your opening  of",
    title: "My Cover Letter",
    sections: [
      {
        name: "From",
        iconimg: "url",
        fields: [
          {
            defaultValue: "",
            disabled: false,
            key: "titleBefore",
            placeholder: "",
            readonly: false,
            cardheading: "Title Before",
            type: "text",
            validation: {
              required: true,
            },
          },
          {
            defaultValue: "",
            disabled: false,
            key: "firstName",
            placeholder: "",
            readonly: false,
            cardheading: "First Name",
            type: "text",
            validation: {
              required: true,
            },
          },
          {
            defaultValue: "",
            disabled: false,
            key: "lastName",
            placeholder: "",
            readonly: false,
            cardheading: "Last Name",
            type: "text",
            validation: {
              required: true,
            },
          },
          {
            defaultValue: "",
            disabled: false,
            key: "titleAfter",
            placeholder: "",
            readonly: false,
            cardheading: "Title After",
            type: "text",
            validation: {
              required: true,
            },
          },
          {
            defaultValue: "",
            disabled: false,
            key: "phoneNumber",
            placeholder: "",
            readonly: false,
            cardheading: "Phone Number",
            type: "number",
            validation: {
              required: false,
            },
          },
          {
            defaultValue: "",
            disabled: false,
            key: "email",
            placeholder: "",
            readonly: false,
            cardheading: "Email",
            type: "email",
            validation: {
              required: true,
            },
          },
          {
            defaultValue: "",
            disabled: false,
            key: "streetNumber",
            placeholder: "",
            readonly: false,
            cardheading: "Street Number",
            type: "number",
            validation: {
              required: false,
            },
          },
          {
            defaultValue: "",
            disabled: false,
            key: "city",
            placeholder: "",
            readonly: false,
            cardheading: "City",
            type: "select",
            validation: {
              required: false,
            },
          },
          {
            defaultValue: "",
            disabled: false,
            key: "postalCode",
            placeholder: "",
            readonly: false,
            cardheading: "Postal Code",
            type: "number",
            validation: {
              required: false,
            },
          },
          {
            defaultValue: "",
            disabled: false,
            key: "country",
            placeholder: "",
            readonly: false,
            cardheading: "Country",
            type: "select",
            validation: {
              required: false,
            },
          },
        ],
      },
      {
        name: "To",
        iconimg: "url",
        fields: [
          {
            defaultValue: "",
            disabled: false,
            key: "titleBefore",
            placeholder: "",
            readonly: false,
            cardheading: "Title Before",
            type: "text",
            validation: {
              required: true,
            },
          },
          {
            defaultValue: "",
            disabled: false,
            key: "firstName",
            placeholder: "",
            readonly: false,
            cardheading: "First Name",
            type: "text",
            validation: {
              required: true,
            },
          },
          {
            defaultValue: "",
            disabled: false,
            key: "lastName",
            placeholder: "",
            readonly: false,
            cardheading: "Last Name",
            type: "text",
            validation: {
              required: true,
            },
          },
          {
            defaultValue: "",
            disabled: false,
            key: "titleAfter",
            placeholder: "",
            readonly: false,
            cardheading: "Title After",
            type: "text",
            validation: {
              required: true,
            },
          },
          {
            defaultValue: "",
            disabled: false,
            key: "companyName",
            placeholder: "",
            readonly: false,
            cardheading: "Company Number",
            type: "text",
            validation: {
              required: false,
            },
          },
          {
            defaultValue: "",
            disabled: false,
            key: "department",
            placeholder: "",
            readonly: false,
            cardheading: "Department",
            type: "text",
            validation: {
              required: true,
            },
          },
          {
            defaultValue: "",
            disabled: false,
            key: "streetNumber",
            placeholder: "",
            readonly: false,
            cardheading: "Street Number",
            type: "number",
            validation: {
              required: false,
            },
          },
          {
            defaultValue: "",
            disabled: false,
            key: "city",
            placeholder: "",
            readonly: false,
            cardheading: "City",
            type: "select",
            validation: {
              required: false,
            },
          },
          {
            defaultValue: "",
            disabled: false,
            key: "postalCode",
            placeholder: "",
            readonly: false,
            cardheading: "Postal Code",
            type: "number",
            validation: {
              required: false,
            },
          },
          {
            defaultValue: "",
            disabled: false,
            key: "country",
            placeholder: "",
            readonly: false,
            cardheading: "Country",
            type: "select",
            validation: {
              required: false,
            },
          },
        ],
      },
      {
        name: "Content",
        iconimg: "url",
        fields: [
          {
            defaultValue: "",
            disabled: false,
            key: "subject",
            placeholder: "",
            readonly: false,
            cardheading: "Subject",
            type: "text",
            validation: {
              required: true,
            },
          },

          {
            defaultValue: "",
            disabled: false,
            key: "location",
            placeholder: "",
            readonly: false,
            cardheading: "Location",
            type: "text",
            validation: {
              required: true,
            },
          },

          {
            defaultValue: "",
            disabled: false,
            key: "date",
            placeholder: "",
            readonly: false,
            cardheading: "Date",
            type: "date",
            validation: {
              required: true,
            },
          },
          {
            defaultValue: "",
            disabled: false,
            key: "letterBody",
            placeholder: "",
            readonly: false,
            cardheading: "Letter Body",
            type: "textArea",
            validation: {
              required: true,
            },
          },
          {
            defaultValue: "",
            disabled: false,
            key: "signature",
            placeholder: "",
            readonly: false,
            cardheading: "Signature",
            type: "text",
            validation: {
              required: true,
            },
          },
        ],
      },
    ],

    document_type: "free",
    status: true,
    documentheading: "basic",
  },
];
