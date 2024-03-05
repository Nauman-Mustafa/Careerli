export const creativeGenerator = (resume: any) => {
  let dataMapped = () => {
    if (Object.keys(resume).length < 1) return [];
    const { customSection, ...others }: any = resume;
    const values = Object.values(others).concat(customSection);

    return [...values];
  };
  const activeList = () => dataMapped()?.filter((obj: any) => obj?.showComp);

  const rearangeList = activeList().sort(function (a: any, b: any) {
    return a.order - b.order;
  });
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Creative Template</title>
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <style>
    @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-Variable.woff2") format("woff2"),
          url("../../fonts/Satoshi-Variable.woff") format("woff"),
          url("../../fonts/Satoshi-Variable.ttf") format("truetype");
        font-weight: 300 900;
        font-display: swap;
        font-style: normal;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-VariableItalic.woff2") format("woff2"),
          url("../../fonts/Satoshi-VariableItalic.woff") format("woff"),
          url("../../fonts/Satoshi-VariableItalic.ttf") format("truetype");
        font-weight: 300 900;
        font-display: swap;
        font-style: italic;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-Light.woff2") format("woff2"),
          url("../../fonts/Satoshi-Light.woff") format("woff"),
          url("../../fonts/Satoshi-Light.ttf") format("truetype");
        font-weight: 300;
        font-display: swap;
        font-style: normal;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-LightItalic.woff2") format("woff2"),
          url("../../fonts/Satoshi-LightItalic.woff") format("woff"),
          url("../../fonts/Satoshi-LightItalic.ttf") format("truetype");
        font-weight: 300;
        font-display: swap;
        font-style: italic;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-Regular.woff2") format("woff2"),
          url("../../fonts/Satoshi-Regular.woff") format("woff"),
          url("../../fonts/Satoshi-Regular.ttf") format("truetype");
        font-weight: 400;
        font-display: swap;
        font-style: normal;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-Italic.woff2") format("woff2"),
          url("../../fonts/Satoshi-Italic.woff") format("woff"),
          url("../../fonts/Satoshi-Italic.ttf") format("truetype");
        font-weight: 400;
        font-display: swap;
        font-style: italic;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-Medium.woff2") format("woff2"),
          url("../../fonts/Satoshi-Medium.woff") format("woff"),
          url("../../fonts/Satoshi-Medium.ttf") format("truetype");
        font-weight: 500;
        font-display: swap;
        font-style: normal;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-MediumItalic.woff2") format("woff2"),
          url("../../fonts/Satoshi-MediumItalic.woff") format("woff"),
          url("../../fonts/Satoshi-MediumItalic.ttf") format("truetype");
        font-weight: 500;
        font-display: swap;
        font-style: italic;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-Bold.woff2") format("woff2"),
          url("../../fonts/Satoshi-Bold.woff") format("woff"),
          url("../../fonts/Satoshi-Bold.ttf") format("truetype");
        font-weight: 700;
        font-display: swap;
        font-style: normal;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-BoldItalic.woff2") format("woff2"),
          url("../../fonts/Satoshi-BoldItalic.woff") format("woff"),
          url("../../fonts/Satoshi-BoldItalic.ttf") format("truetype");
        font-weight: 700;
        font-display: swap;
        font-style: italic;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-Black.woff2") format("woff2"),
          url("../../fonts/Satoshi-Black.woff") format("woff"),
          url("../../fonts/Satoshi-Black.ttf") format("truetype");
        font-weight: 900;
        font-display: swap;
        font-style: normal;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-BlackItalic.woff2") format("woff2"),
          url("../../fonts/Satoshi-BlackItalic.woff") format("woff"),
          url("../../fonts/Satoshi-BlackItalic.ttf") format("truetype");
        font-weight: 900;
        font-display: swap;
        font-style: italic;
      }
      *,
      *:before,
      *:after {
        box-sizing: border-box;
        font-family: "Lato", sans-serif;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin: 0;
        margin-bottom: calc(7px * 0.75);
      }
      .ql-align-justify{
        text-align:justify;
      }
      .ql-align-right{
        text-align:right;
      }
      p,
      p span,
      p h1,
      p h2,
      p h3,
      p h4,
      p h5,
      p h6,
      p li {
        margin: 0 !important;
        margin-bottom: calc(8px * 0.75) !important;
        font-size: calc(12px * 0.75) !important;
        line-height: calc(12px * 1.333) !important;
        color:${resume?.resumeStyle?.color} !important;
        background-color:inherit !important
      }

      body {
        padding: 0;
        margin: 0;
        color: #000;
      }

      .creative-resume-template {
        position: relative;
        width: 100%;
        min-height: 100%;
      }
      .Templete__img{
        position:absolute;
        top:0;
        left:0;
        bottom:0;
        right:0;
        width:100%;
        height:100%;
      }
     

      .Templete__img img {
        position: absolute;
      }

      .Templete__img .create-img-one {
        left: 0px;
        top: 0px;
      }

      .Templete__img .create-img-two {
        right: 0px;
        bottom: 0px;
      }
      .resume-container{
        position: relative;
      }
      h1 {
        font-weight: 700;
        font-size: calc(25px * 0.75);
        line-height: calc(25px * 1.333);
        text-align: center;
        letter-spacing: calc(0.06em * 0.75);
        text-transform: capitalize;
        color: #000;
      }

      h4 {
        font-style: normal;
        font-weight: 700;
        text-align: center;
        letter-spacing: calc(0.06em * 0.75);
        text-transform:capitalize ;
        font-size: calc(12px * 0.75);
        line-height: calc(16px * 1.333);
      }

      h5 {
        font-weight: 700;
        font-size: calc(14px * 0.75);
        line-height: calc(14px * 1.333);
        letter-spacing: calc(0.06em * 0.75);
      }
      h6 {
        font-weight: 700;
        font-size: calc(12px * 0.75);
        line-height: calc(12px * 1.333);
        letter-spacing: calc(0.06em * 0.75);
      }
 

      .personal__Profile {
        width: 100%;
        position: relative;
        z-index: 99;
      }

      .personal__Profile .personal__Profile__left {
        width: 35%;
        padding: 0px 20px 20px 0;
        border-right: 1px dashed ${
          resume?.resumeStyle?.color
            ? resume?.resumeStyle?.color
            : "rgba(0, 0, 0, 0.54)"
        } ;
        vertical-align: baseline;
        z-index: 99;
        position: relative;
      }

      .personal__Profile .personal__Profile__left .creative__profile {
        position: relative;
        width: calc(143px * 0.75);
        height: calc(143px * 0.75);
        border-radius: 50%;
        margin: 0 auto calc(25px * 0.75);
      }

      .personal__Profile .personal__Profile__left .creative__profile svg,
      .personal__Profile .personal__Profile__left .creative__profile img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }

      .personal__Profile .personal__Profile__right {
        width: 65%;
        margin-top: 0px !important;
        z-index: 99;
        position: relative;
      }



      ul {
        list-style: disc;
        padding-left: calc(16px * 0.75);
        margin-top: 0px !important;
      }
      ol li,
      ul li {
        font-weight: 400;
        font-size: calc(12px * 0.75) !important;
        line-height: calc(10px * 1.333) !important;
        letter-spacing: calc(0.06em * 0.75);
        padding: calc(4px * 0.75);
        padding-right: 0;
      }

      .professional__history {
        padding-left: 24px;
      }

      .professional__history h4 {
        text-align: start;
      }

      .personalprofile {
        margin-top:0;
        margin-bottom: calc(9px * 0.75);
      }

      .personalprofile .personalprofile__inner {
        margin-bottom: calc(14px * 0.75);
      }

      .personalprofile h4 {
        text-align: start;
        margin-left: calc(9px * 0.75);
        margin-top: 0px;
        display: inline-block;
      }

      .personalprofile p {
        font-weight: 400;
        font-size: calc(9px * 0.75);
        line-height: calc(12px * 1.333);
        letter-spacing: calc(0.06em * 0.75);
        margin-top: calc(5px * 0.75);
        margin-bottom: 0px;
      }
      
      table td{
        vertical-align: top;
      }
      
    </style>
  </head>
  <body style="box-sizing: border-box;margin:0;padding:0;width:100%;min-height:100%;">
    <div class="creative-resume-template" style="background-color: ${
      resume?.resumeStyle?.backgroundColor
    } !important; color: ${resume?.resumeStyle?.color};font-family: ${
    resume?.resumeStyle?.fontFamily
  };">
      <div class="Templete__img">
        <img src="https://careerli.ekkel.app/assets/Subtract.3411cf54.svg" alt="img not found" class="create-img-one" />
        <img
          src="https://careerli.ekkel.app/assets/Subtractright.b36e6d71.svg"
          alt="img not found"
          class="create-img-two"
        />
      </div>
      <div class="resume-container" style="padding: calc(9px * 0.75);">
        <table style="width: 100%">
          <tr>
            <td colspan="2" style="padding-bottom: 50px">
              <h1 style="font-weight: ${
                resume?.resumeStyle?.fontWeight
              }; color: ${resume?.resumeStyle?.color};">${
    resume?.profile?.firstName ? resume?.profile?.firstName : ""
  } ${resume?.profile?.lastName ? resume?.profile?.lastName : ""}</h1>
              <h4 style="font-weight: ${resume?.resumeStyle?.fontWeight}"> ${
    resume?.profile?.designation ? resume?.profile?.designation : ""
  }</h4>
            </td>
          </tr>
          <tr class="personal__Profile">
            <td class="personal__Profile__left"> 
              ${
                resume?.profileImage
                  ? ` 
                <figure class="creative__profile">
                  <img src=${resume?.profileImage} alt="img not fount " />
                </figure>`
                  : ""
              } 
              <div class="personalprofile">
              ${
                resume.summary?.description
                  ? `
              <div class="personalprofile__inner">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 26 28" fill="none">
              <path d="M9.66702 15.5162C13.416 15.5162 16.4551 12.2599 16.4551 8.24296C16.4551 4.22606 13.416 0.969727 9.66702 0.969727C5.91805 0.969727 2.87891 4.22606 2.87891 8.24296C2.87891 12.2599 5.91805 15.5162 9.66702 15.5162Z" fill=${
                resume?.resumeStyle?.color
                  ? resume?.resumeStyle?.color
                  : "black"
              } />
              <path d="M15.0005 21.3348C17.4106 21.3348 19.3643 19.381 19.3643 16.9709C19.3643 14.5607 17.4106 12.6069 15.0005 12.6069C12.5905 12.6069 10.6367 14.5607 10.6367 16.9709C10.6367 19.381 12.5905 21.3348 15.0005 21.3348Z" fill=${
                resume?.resumeStyle?.color
                  ? resume?.resumeStyle?.color
                  : "black"
              } />
              <path d="M22.6837 12.0416C24.5204 3.05282 17.2173 -1.06092 9.1123 0.233717C1.00633 1.52641 1.31082 6.42954 0.833715 8.76958C-0.115651 14.6337 5.92092 21.1874 5.92092 21.1874L5.57667 28H15.4059L16.1584 24.8677C16.1584 24.8677 16.585 25.5834 19.1248 25.7986C21.6655 26.0139 21.3561 22.9126 21.3561 22.9126C21.3561 22.9126 23.0473 22.1659 23.0473 21.6073C23.0473 21.0468 22.0466 20.3253 22.0466 20.3253C22.0466 20.3253 23.122 20.5183 23.5118 20.0654C23.8988 19.6125 23.0367 17.9765 23.0367 17.9765C23.0367 17.9765 24.3633 17.9426 25.1449 17.0824C25.9265 16.2232 22.6837 13.6795 22.6837 12.0416ZM8.64489 13.2703C8.64489 13.2703 8.58962 12.6632 8.56247 12.3596C8.3181 12.2947 8.08245 12.2084 7.8565 12.1075C7.58886 12.3344 7.05357 12.7873 7.05357 12.7873C7.05357 12.7873 6.96241 12.8377 6.91683 12.863C6.87126 12.8872 6.01983 12.7873 6.01983 12.7873L4.55554 11.0582V10.0254C4.55554 10.0254 5.11895 9.5483 5.40018 9.30974C5.33908 9.07797 5.30223 8.84231 5.28575 8.5989C4.91628 8.42919 4.17929 8.09269 4.17929 8.09269L3.88352 7.23251L3.91746 7.09189L4.86295 5.03211L5.86274 4.7693C5.86274 4.7693 6.49888 5.06023 6.81598 5.20473C7.00993 5.04763 7.21939 4.90507 7.44049 4.77997C7.40849 4.39691 7.34643 3.62983 7.34643 3.62983L8.0776 2.8996L10.3351 2.71728L11.0663 3.44849C11.0663 3.44849 11.1129 4.03131 11.1371 4.32224C11.4309 4.40176 11.7112 4.50747 11.9779 4.63645C12.2222 4.42601 12.7119 4.00707 12.7119 4.00707H13.7466L15.2216 5.72743V6.75926C15.2216 6.75926 14.6233 7.2713 14.3236 7.52828C14.3682 7.73678 14.3915 7.95207 14.4022 8.1693C14.7804 8.3875 15.5348 8.82389 15.5348 8.82389L15.7976 9.82372L14.664 11.7846L13.6642 12.0474C13.6642 12.0474 13.0775 11.708 12.7837 11.5392C12.6179 11.6682 12.4404 11.7826 12.2562 11.8883C12.2911 12.2801 12.3619 13.0627 12.3619 13.0627L11.6317 13.7939L9.37704 13.9995L8.64489 13.2703ZM17.8428 19.0433L17.2018 19.212C17.2018 19.212 16.8255 18.9938 16.6364 18.8862C16.5298 18.9686 16.4153 19.0413 16.297 19.1092C16.3193 19.3613 16.3649 19.8617 16.3649 19.8617L15.8975 20.3301L14.4516 20.462L13.9833 19.9936C13.9833 19.9936 13.9474 19.6057 13.9299 19.4089C13.7728 19.3672 13.6225 19.3109 13.478 19.2469C13.3064 19.3924 12.9631 19.6823 12.9631 19.6823C12.9631 19.6823 12.904 19.7143 12.8758 19.7318C12.8467 19.7493 12.2998 19.6823 12.2998 19.6823L11.3611 18.572V17.9086C11.3611 17.9086 11.7218 17.6032 11.9022 17.4499C11.8634 17.3025 11.8402 17.1493 11.8295 16.9932C11.5919 16.8855 11.1196 16.6683 11.1196 16.6683L10.9296 16.1185L10.9509 16.0273L11.557 14.7074L12.199 14.5387C12.199 14.5387 12.6062 14.7239 12.8099 14.818C12.934 14.7171 13.0688 14.627 13.2104 14.5455C13.191 14.3001 13.1512 13.8065 13.1512 13.8065L13.6196 13.3381L15.0674 13.2218L15.5368 13.6902C15.5368 13.6902 15.5659 14.0635 15.5814 14.2507C15.7695 14.3021 15.9499 14.37 16.1205 14.4524C16.2776 14.3176 16.5918 14.048 16.5918 14.048H17.2561L18.2035 15.1535V15.8169C18.2035 15.8169 17.8195 16.1456 17.6265 16.3105C17.6556 16.4443 17.6702 16.582 17.677 16.7226C17.9194 16.8632 18.4043 17.1416 18.4043 17.1416L18.572 17.7835L17.8428 19.0433Z" fill=${
                resume?.resumeStyle?.color
                  ? resume?.resumeStyle?.color
                  : "black"
              } />
              </svg>
              <h4 style="font-size: calc(${
                resume?.resumeStyle?.fontSize
              }px * 0.75); font-weight: ${
                      resume?.resumeStyle?.fontWeight
                    };margin-bottom:0"> ${
                      resume?.summary?.title
                        ? resume?.summary?.title
                        : " PERSONAL"
                    } </h4>
              </div>
              `
                  : ""
              }
                <p> ${resume.summary?.description} </p>
              </div>
              <div class="personalprofile">
                <div class="personalprofile__inner">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26 26" fill="none">
                    <g clip-path="url(#clip0_1617_128)">
                      <path d="M2.49549 9.08274C2.82438 9.31483 3.8158 10.0041 5.46978 11.1503C7.12382 12.2964 8.39093 13.179 9.27115 13.7979C9.36786 13.8657 9.57332 14.0132 9.88763 14.2405C10.202 14.468 10.4632 14.6518 10.671 14.792C10.879 14.9321 11.1305 15.0894 11.4256 15.2634C11.7207 15.4373 11.9988 15.5681 12.26 15.6547C12.5212 15.742 12.763 15.7853 12.9854 15.7853H13H13.0146C13.2371 15.7853 13.479 15.742 13.7402 15.6547C14.0012 15.5681 14.2796 15.4372 14.5744 15.2634C14.8694 15.0892 15.1208 14.9321 15.3288 14.792C15.5368 14.6518 15.7978 14.468 16.1123 14.2405C16.4265 14.013 16.6322 13.8657 16.729 13.7979C17.6187 13.179 19.8823 11.6071 23.519 9.08244C24.2251 8.58934 24.815 7.99436 25.2889 7.2979C25.7631 6.60174 26 5.87143 26 5.10737C26 4.46889 25.7701 3.92234 25.3106 3.46777C24.8512 3.0131 24.307 2.78589 23.6785 2.78589H2.32133C1.57659 2.78589 1.00346 3.03734 0.602045 3.54024C0.200682 4.04324 0 4.67196 0 5.42636C0 6.03572 0.266085 6.69606 0.798001 7.40695C1.32987 8.1179 1.89588 8.67655 2.49549 9.08274Z" fill=${
                        resume?.resumeStyle?.color
                          ? resume?.resumeStyle?.color
                          : "black"
                      } />
                      <path d="M24.5489 10.635C21.3766 12.7822 18.9678 14.4508 17.3237 15.6407C16.7724 16.0468 16.3251 16.3638 15.9817 16.5909C15.6382 16.8182 15.1814 17.0504 14.6106 17.2873C14.04 17.5245 13.5082 17.6427 13.0148 17.6427H13H12.9855C12.4922 17.6427 11.9601 17.5245 11.3895 17.2873C10.8189 17.0504 10.3618 16.8182 10.0184 16.5909C9.67515 16.3638 9.22775 16.0468 8.67647 15.6407C7.37059 14.6832 4.96698 13.0144 1.46555 10.635C0.914069 10.2677 0.425604 9.84668 0 9.3728V20.8926C0 21.5313 0.227209 22.0776 0.68188 22.5322C1.13645 22.987 1.68305 23.2143 2.32148 23.2143H23.6787C24.317 23.2143 24.8635 22.987 25.3182 22.5322C25.7729 22.0774 26 21.5314 26 20.8926V9.3728C25.584 9.83688 25.1005 10.2579 24.5489 10.635Z" fill=${
                        resume?.resumeStyle?.color
                          ? resume?.resumeStyle?.color
                          : "black"
                      } />
                    </g>
                    <defs>
                      <clipPath id="clip0_1617_128">
                        <rect width="26" height="26" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <h4 style="font-size: calc(${
                    resume?.resumeStyle?.fontSize
                  }px * 0.75); font-weight: ${
    resume?.resumeStyle?.fontWeight
  };margin:bottom:0"> GET IN TOUCH
                </div>
                ${
                  resume?.profile?.phone
                    ? `<p style="margin: calc(8px * 0.75) 0 0 !important;"><b>Phone number:</b> ${resume?.profile?.phone}</p>`
                    : ""
                }
                ${
                  resume?.profile?.email
                    ? `<p style="margin: calc(8px * 0.75) 0 0 !important;"><b>Email Address:</b> ${resume?.profile?.email}</p>`
                    : ""
                }
                ${
                  resume?.profile?.city || resume?.profile?.postalCode
                    ? `<p style="margin: calc(8px * 0.75) 0 0 !important;"><b>Home Address:</b> ${resume?.profile?.city}, ${resume?.profile?.postalCode} </p>`
                    : ""
                }
                ${
                  resume?.profile?.linkedin
                    ? `<p style="margin: calc(8px * 0.75) 0 0 !important;"><b>Linkedin:</b> ${resume?.profile?.linkedin}</p>`
                    : ""
                }
                ${
                  resume?.profile?.websiteLink
                    ? `<p style="margin: calc(8px * 0.75) 0 0 !important;"><b>Website:</b> ${resume?.profile?.websiteLink}</p>`
                    : ""
                }
              </div>
            </td>
            <td class="personal__Profile__right" style="margin-top: 5px !important">
              <div class="professional__history"> ${rearangeList
                ?.map((item: any) => {
                  return ` ${
                    item?.cat === "workHistory" && item?.showComp
                      ? ` 
                <div class="professional__InnerContent">
                  <h4 style="font-size: calc(${
                    resume?.resumeStyle?.fontSize
                  }px * 0.75);font-weight: ${
                          resume?.resumeStyle?.fontWeight
                        }">${item?.title}</h4> 
                  ${item?.history
                    ?.map((item: any) => {
                      return ` 
                  <div>
                    ${
                      item?.jobTitle
                        ? `<h5 style="font-weight:${resume?.resumeStyle?.fontWeight};">${item?.jobTitle}</h5>`
                        : ""
                    }
                    ${
                      item?.employer ||
                      item?.startMonth ||
                      item?.startYear ||
                      item?.stillWork ||
                      item?.endMonth ||
                      item?.endYear
                        ? `<p>${item?.employer ? `${item?.employer} |` : ""} ${
                            item?.startMonth
                          } - ${item?.startYear} - ${
                            item?.stillWork
                              ? "Present"
                              : `${item?.endMonth} - ${item?.endYear}`
                          } </p>`
                        : ""
                    }
                    ${item?.description ? `<p>${item?.description}</p>` : ""}
                  </div>`;
                    })
                    .join("")}
                </div>`
                      : item?.cat === "education" && item?.showComp
                      ? ` 
                <div class="professional__InnerContent" style="margin-top:calc(20px * 0.75)">
                  <h4 style="font-size: calc(${
                    resume?.resumeStyle?.fontSize
                  }px * 0.75); font-weight: ${resume?.resumeStyle?.fontWeight}">
                    ${item?.title}
                  </h4>
                  ${item?.educationHistory
                    ?.map((item: any) => {
                      return ` 
                  <div>
                    ${
                      item?.school
                        ? `<h5 style="font-weight:${resume?.resumeStyle?.fontWeight};">${item?.school}</h5>`
                        : ""
                    }
                    ${
                      item?.degree ||
                      item?.startMonth ||
                      item?.startYear ||
                      item?.stillWork ||
                      item?.endMonth ||
                      item?.endYear
                        ? `<p>${item?.employer ? `${item?.employer} |` : ""} ${
                            item?.startMonth
                          } - ${item?.startYear} - ${
                            item?.stillWork
                              ? "Present"
                              : `${item?.endMonth} - ${item?.endYear}`
                          } </p>`
                        : ""
                    }
                    ${item?.description ? `<p>${item?.description}</p>` : ""}
                  </div> `;
                    })
                    .join("")} 
                </div> `
                      : item?.cat === "skills" && item?.showComp
                      ? `
                <div class="professional__InnerContent" style="margin-top:calc(20px * 0.75)">
                  <h4 style="font-size: calc(${
                    resume?.resumeStyle?.fontSize
                  }px * 0.75); font-weight: ${
                          resume?.resumeStyle?.fontWeight
                        }">${item?.title}</h4>
                  <ul style="float:left;width:100%"> ${item?.list
                    ?.map(
                      (skills: any) =>
                        ` <li style="diplay: inline-block; width:50%; line-height:calc(12px * 0.75);float:left">${skills}</li>`
                    )
                    .join("")}</ul>
                </div>
                    `
                      : item?.cat === "hobbies" && item?.showComp
                      ? `
                      <div class="professional__InnerContent" style="margin-top:calc(20px * 0.75)">
                        <h4 style="font-size: calc(${
                          resume?.resumeStyle?.fontSize
                        }px * 0.75); font-weight: ${
                          resume?.resumeStyle?.fontWeight
                        }">${item?.title}</h4>
                        <ul style="float:left;width:100%"> ${item?.list
                          ?.map(
                            (hobbies: any) =>
                              ` <li style="diplay: inline-block; width:50%;float:left;">${hobbies}</li> `
                          )
                          .join("")} </ul>
                      </div> `
                      : item?.cat === "certification" && item?.showComp
                      ? ` 
                      <div class="professional__InnerContent" style="margin-top:calc(20px * 0.75)">
                        <h4 style="font-size: calc(${
                          resume?.resumeStyle?.fontSize
                        }px * 0.75); font-weight: ${
                          resume?.resumeStyle?.fontWeight
                        }">${item?.title}</h4> 
                        ${item?.certificate
                          ?.map((item: any) => {
                            return ` 
                        <h5 style="font-weight:${resume?.resumeStyle?.fontWeight};"> ${item?.certificateName}</h5>
                        <p> ${item?.authority} - ${item?.dateReceMonth}- ${item?.dateReceYear} </p>
                        <p>${item?.certificationLink}</p>
                        <p>${item?.description}</p> `;
                          })
                          .join("")}
                </div> `
                      : item?.cat === "languages" && item?.showComp
                      ? ` <div class="professional__InnerContent" style="width:100%;margin-top:calc(20px * 0.75)">
                  <h4 style="font-size: calc(${
                    resume?.resumeStyle?.fontSize
                  }px * 0.75); font-weight: ${
                          resume?.resumeStyle?.fontWeight
                        }">${item?.title}</h4>
                  <ul style="float:left;width:100%"> ${item?.list
                    ?.map(
                      (skills: any) =>
                        ` <li style="diplay: inline-block; width:50%; float: left">${skills}</li> `
                    )
                    .join("")} </ul>
                </div>
                <br /> `
                      : item?.cat === "references" && item?.showComp
                      ? ` <div class="professional__InnerContent">
                  <table class="row" style="width:100%">
                    <tr>
                      <td>
                        <h4 style="font-size: calc(${resume?.resumeStyle?.fontSize}px * 0.75); font-weight: ${resume?.resumeStyle?.fontWeight}">${item?.title}</h4>
                      </td>
                    </tr>
                    <tr style="width:100%">
                      <td class="col-md-6" style="width:50%">
                        <h5 style="font-weight:${resume?.resumeStyle?.fontWeight};">References 1</h5>
                        <h6 style="font-weight:${resume?.resumeStyle?.fontWeight};"> ${item?.personOne}:</h6>
                        <p>${item?.personeOneContact}</p>
                      </td>
                      <td class="col-md-6" style="width:50%">
                        <h5 style="font-weight:${resume?.resumeStyle?.fontWeight};">References 2</h5>
                        <h6 style="font-weight:${resume?.resumeStyle?.fontWeight};"> ${item?.personTwo}:</h6>
                        <p>${item?.personTwoContact}</p>
                      </td>
                    </tr>
                  </table>
                </div>`
                      : item?.cat === "publications" && item?.showComp
                      ? ` <div class="professional__InnerContent">
                  <h4 style="font-size: calc(${
                    resume?.resumeStyle?.fontSize
                  }px * 0.75); font-weight: ${
                          resume?.resumeStyle?.fontWeight
                        }">${item?.title}</h4> ${item?.publicationList
                          ?.map((item: any) => {
                            return ` <div>
                    <h5 style="font-weight:${resume?.resumeStyle?.fontWeight};">${item?.title}</h5>
                    <p> ${item?.publisher} | ${item?.isbn}-${item?.dateReceMonth} - ${item?.dateReceYear} </p>
                    <p>${item?.description}</p>
                  </div> `;
                          })
                          .join("")}
                </div> `
                      : item?.cat === "achievements" && item?.showComp
                      ? ` <div class="professional__InnerContent">
                  <h4 style="font-size: calc(${resume?.resumeStyle?.fontSize}px * 0.75); font-weight: ${resume?.resumeStyle?.fontWeight}">${item?.title}</h4>
                  <p>${item?.description}</p>
                </div> `
                      : item?.cat === "customSection" && item?.showComp
                      ? ` <div class="professional__InnerContent">
                  <h4 style="font-size: calc(${resume?.resumeStyle?.fontSize}px * 0.75); font-weight: ${resume?.resumeStyle?.fontWeight}">${item?.title}</h4>
                  <p>${item?.description}</p>
                </div> `
                      : ""
                  } `;
                })
                .join("")}
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <script src="https://code.iconify.design/iconify-icon/1.0.1/iconify-icon.min.js"></script>
  </body>
</html> `;
};

export const classicGenerator = (resume: any) => {
  let dataMapped = () => {
    if (Object.keys(resume).length < 1) return [];
    const { customSection, ...others }: any = resume;
    const values = Object.values(others).concat(customSection);

    return [...values];
  };
  const activeList = () => dataMapped()?.filter((obj: any) => obj?.showComp);

  const rearangeList = activeList()?.sort(function (a: any, b: any) {
    return a.order - b.order;
  });
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>classic Template</title>
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <style>
      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-Variable.woff2") format("woff2"),
          url("../../fonts/Satoshi-Variable.woff") format("woff"),
          url("../../fonts/Satoshi-Variable.ttf") format("truetype");
        font-weight: 300 900;
        font-display: swap;
        font-style: normal;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-VariableItalic.woff2") format("woff2"),
          url("../../fonts/Satoshi-VariableItalic.woff") format("woff"),
          url("../../fonts/Satoshi-VariableItalic.ttf") format("truetype");
        font-weight: 300 900;
        font-display: swap;
        font-style: italic;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-Light.woff2") format("woff2"),
          url("../../fonts/Satoshi-Light.woff") format("woff"),
          url("../../fonts/Satoshi-Light.ttf") format("truetype");
        font-weight: 300;
        font-display: swap;
        font-style: normal;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-LightItalic.woff2") format("woff2"),
          url("../../fonts/Satoshi-LightItalic.woff") format("woff"),
          url("../../fonts/Satoshi-LightItalic.ttf") format("truetype");
        font-weight: 300;
        font-display: swap;
        font-style: italic;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-Regular.woff2") format("woff2"),
          url("../../fonts/Satoshi-Regular.woff") format("woff"),
          url("../../fonts/Satoshi-Regular.ttf") format("truetype");
        font-weight: 400;
        font-display: swap;
        font-style: normal;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-Italic.woff2") format("woff2"),
          url("../../fonts/Satoshi-Italic.woff") format("woff"),
          url("../../fonts/Satoshi-Italic.ttf") format("truetype");
        font-weight: 400;
        font-display: swap;
        font-style: italic;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-Medium.woff2") format("woff2"),
          url("../../fonts/Satoshi-Medium.woff") format("woff"),
          url("../../fonts/Satoshi-Medium.ttf") format("truetype");
        font-weight: 500;
        font-display: swap;
        font-style: normal;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-MediumItalic.woff2") format("woff2"),
          url("../../fonts/Satoshi-MediumItalic.woff") format("woff"),
          url("../../fonts/Satoshi-MediumItalic.ttf") format("truetype");
        font-weight: 500;
        font-display: swap;
        font-style: italic;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-Bold.woff2") format("woff2"),
          url("../../fonts/Satoshi-Bold.woff") format("woff"),
          url("../../fonts/Satoshi-Bold.ttf") format("truetype");
        font-weight: 700;
        font-display: swap;
        font-style: normal;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-BoldItalic.woff2") format("woff2"),
          url("../../fonts/Satoshi-BoldItalic.woff") format("woff"),
          url("../../fonts/Satoshi-BoldItalic.ttf") format("truetype");
        font-weight: 700;
        font-display: swap;
        font-style: italic;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-Black.woff2") format("woff2"),
          url("../../fonts/Satoshi-Black.woff") format("woff"),
          url("../../fonts/Satoshi-Black.ttf") format("truetype");
        font-weight: 900;
        font-display: swap;
        font-style: normal;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-BlackItalic.woff2") format("woff2"),
          url("../../fonts/Satoshi-BlackItalic.woff") format("woff"),
          url("../../fonts/Satoshi-BlackItalic.ttf") format("truetype");
        font-weight: 900;
        font-display: swap;
        font-style: italic;
      }

      body {
        margin: 0;
        padding: 0;
      }

      *,
      *:before,
      *:after {
        box-sizing: border-box;
        font-family: "Satoshi";
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin: 0px;
        margin-top: calc(9px * 0.75);
        margin-bottom: 0px;
      }

      .creative-resume-template {
        padding: calc(37px * 0.75) calc(43px * 0.75) calc(100px * 0.75) calc(43px * 0.75);
        position: relative;
        width: 100%;
      }

      h1 {
        font-weight: 400;
        font-size: calc(25px * 0.75);
        line-height: 41px;
        text-align: center;
        letter-spacing: calc(0.06em * 0.75);
        margin-top: calc(20px * 0.75);
        text-transform:capitalize;
      }

      h2 {
        font-weight: 400;
        line-height: calc(${resume?.resumeStyle?.fontSize}px * 1.333);
        letter-spacing: calc(0.06em * 0.75);
        font-size:calc(14px * 0.75);
        text-transform: capitalize;
        position: relative;
      }

      .underline__div {
        position: absolute;
        height: calc(1px * 0.75);
        width: 100%;
        left: 0px;
        bottom: -5px;
        background-color: #4d85f1;
      }
      p,
      p span,
      p h1,
      p h2,
      p h3,
      p h4,
      p h5,
      p h6,
      p li {
        font-weight: 400 !important;
        font-size: calc(12px * 0.75) !important;
        line-height: calc(12px * 1.333) !important;
        letter-spacing: calc(0.06em * 0.75) !important;
        color:${resume?.resumeStyle?.color} !important;
        background-color:inherit  !important;
      }

      h4 {
        font-weight: 700;
        font-size: calc(13px * 0.75);
        line-height: calc(13px * 1.333);
        letter-spacing: calc(0.06em * 0.75);
      }

      h5 {
        font-size: calc(12px * 0.75);
        text-transform: capitalize;
      }
      .email__div {
        display: inline-block;
        font-weight: 400;
        font-size: calc(12px * 0.75);
        line-height: calc(12px * 1.333);
        text-align: center;
        letter-spacing: calc(0.06em * 0.75);
        text-transform: lowercase;
        justify-content: center;
        margin-top: calc(5px * 0.75);
      }

      .email__div span {
        margin-bottom: 0px;
        margin: 4px calc(9px * 0.75);
      }

      .email__div a {
        margin: 4px calc(9px * 0.75);
        color: #000;
        text-decoration: none;
      }
      .ql-align-justify{
        text-align:justify;
      }
      .ql-align-right{
        text-align:right;
      }
      .summary .row {
        display: inline-block;
      }

      .summary .mt-4 {
        margin-top: calc(8px * 0.75) !important;
      }

      .col {
        display: inline-block;
        width: 50%;
      }

      .Summary__Content {
        margin-top: calc(15px * 0.75);
      }

      .Summary__Content .summary {
        margin-top: calc(20px * 0.75);
      }

      .Summary__Content .summary p {
        margin-top: calc(8px * 0.75);
        margin-bottom: 0px;
      }

      .professional__InnerContent{
        margin-top:calc(20px * 0.75)
      }

      .Summary__Content .summary h5 {
        font-weight: 700;
        font-size: calc(12px * 0.75);
        line-height: calc(12px * 1.333);
        letter-spacing: calc(0.06em * 0.75);
        margin-top: calc(9px * 0.75);
        margin-bottom: 0px;
      }

      .Summary__Content .summary ul {
        list-style: disc;
        padding-left: calc(12px * 0.75);
        margin-top: calc(15px * 0.75);;
      }

      .Summary__Content .summary li {
        font-weight: 400;
        font-size: calc(12px * 0.75);
        line-height: calc(12px * 1.333);
        letter-spacing: calc(0.06em * 0.75);
        padding: calc(5 * 0.75) calc(5 * 0.75) calc(5 * 0.75) 0px;
        text-transform: capitalize;
      }

    </style>
  </head>
  <body>
    <div class="creative-resume-template" style="background-color: ${
      resume?.resumeStyle?.backgroundColor
    } !important; color: ${resume?.resumeStyle?.color};font-family: ${
    resume?.resumeStyle?.fontFamily
  }">
      <div class="resume-container">
        <div>
          <table style="width: 100%">
            <tr>
              <td style="text-align: center;">
                <h1 style="font-weight: ${resume?.resumeStyle?.fontWeight}">${
    resume?.profile?.firstName ? resume?.profile?.firstName : ""
  } ${resume?.profile?.lastName ? resume?.profile?.lastName : ""}</h1>
                <div class="email__div" style="display: inline-block; text-align:center ;"> 
                  ${
                    resume?.profile?.city &&
                    ` <span> ${resume?.profile?.city} </span> `
                  } 
                 ${
                   resume?.profile?.postalCode &&
                   ` <svg xmlns="http://www.w3.org/2000/svg" width="7" height="8" viewBox="0 0 7 8" fill="none">
                    <path d="M0 4L3.5 0L7 4L3.5 8L0 4Z" fill=${
                      resume?.resumeStyle?.color
                        ? resume?.resumeStyle?.color
                        : "black"
                    } />
                    </svg>
                    <a href="#" style="color: ${resume?.resumeStyle?.color}">${
                     resume?.profile?.postalCode
                   }</a> `
                 } 
                  ${
                    resume?.profile?.email &&
                    ` 
                  <svg xmlns="http://www.w3.org/2000/svg" width="7" height="8" viewBox="0 0 7 8" fill="none">
                    <path d="M0 4L3.5 0L7 4L3.5 8L0 4Z" fill=${
                      resume?.resumeStyle?.color
                        ? resume?.resumeStyle?.color
                        : "black"
                    } />
                  </svg>
                  <a href="emailto:tanya.hill@example.com" style="color: ${
                    resume?.resumeStyle?.color
                  }">${resume?.profile?.email}</a> `
                  } 
                  ${
                    resume?.profile?.phone &&
                    ` <svg xmlns="http://www.w3.org/2000/svg" width="7" height="8" viewBox="0 0 7 8" fill="none">
                    <path d="M0 4L3.5 0L7 4L3.5 8L0 4Z" fill=${
                      resume?.resumeStyle?.color
                        ? resume?.resumeStyle?.color
                        : "black"
                    } />
                  </svg>
                  <a href="tel:(405) 555-0128" style="color: ${
                    resume?.resumeStyle?.color
                  }">${resume?.profile?.phone}</a> `
                  } 
                  
                  ${
                    resume?.profile?.websiteLink &&
                    ` <svg xmlns="http://www.w3.org/2000/svg" width="7" height="8" viewBox="0 0 7 8" fill="none">
                    <path d="M0 4L3.5 0L7 4L3.5 8L0 4Z" fill=${
                      resume?.resumeStyle?.color
                        ? resume?.resumeStyle?.color
                        : "black"
                    } />
                  </svg>
                  <a href="#" style="color: ${resume?.resumeStyle?.color}">${
                      resume?.profile?.websiteLink
                    }</a> `
                  } ${
    resume?.profile?.linkedin &&
    ` <svg xmlns="http://www.w3.org/2000/svg" width="7" height="8" viewBox="0 0 7 8" fill="none">
                    <path d="M0 4L3.5 0L7 4L3.5 8L0 4Z" fill=${
                      resume?.resumeStyle?.color
                        ? resume?.resumeStyle?.color
                        : "black"
                    } />
                  </svg>
                  <a href="#" style="color: ${resume?.resumeStyle?.color}">${
      resume?.profile?.linkedin
    }</a> `
  }
                </div>
              </td>
            </tr>
            <tr>
              <td style="width: 100%" class="Summary__Content"> ${rearangeList
                ?.map((item: any) => {
                  return ` ${
                    item?.cat === "workHistory" && item?.showComp
                      ? ` <div class="professional__InnerContent">
                  <h2 style="font-size: calc(${
                    resume?.resumeStyle?.fontSize
                  }px * 0.75); font-weight: ${resume?.resumeStyle?.fontWeight}">
                    <span class="underline__div" style="background-color: ${
                      resume?.resumeStyle?.color
                    }"></span> 
                    ${item?.title}
                  </h2> 
                  ${item?.history
                    ?.map((item: any) => {
                      return ` 
                  <div class="professional__InnerContent">
                    <h4 style="font-weight: ${
                      resume?.resumeStyle?.fontWeight
                    }">${item?.jobTitle}</h4>
                    <p> ${item?.employer} | ${item?.startMonth}-${
                        item?.startYear
                      }- ${
                        item?.stillWork
                          ? "Present"
                          : `${item?.endMonth} - ${item?.endYear}`
                      } </p>
                    <p>${item?.description}</p>
                  </div>`;
                    })
                    .join("")}
                </div>`
                      : item?.cat === "education" && item?.showComp
                      ? ` 
                <div class="summary">
                  <h2 style="font-size: calc(${
                    resume?.resumeStyle?.fontSize
                  }px * 0.75); font-weight: ${resume?.resumeStyle?.fontWeight}">
                    <span class="underline__div" style="background-color: ${
                      resume?.resumeStyle?.color
                    }"></span> 
                    ${item?.title}
                  </h2>
                  <div class="professional__InnerContent">
                    <div class="row"> ${item?.educationHistory
                      ?.map((item: any) => {
                        return ` 
                      <div class="col-md-6">
                        <h4 style="font-weight: ${
                          resume?.resumeStyle?.fontWeight
                        }">${item?.school}</h4>
                        <p> ${item?.degree} | ${item?.startMonth}-${
                          item?.startYear
                        } - ${
                          item?.stillWork
                            ? "Present"
                            : `${item?.endMonth} - ${item?.endYear}`
                        } </p>
                        <p>${item?.description}</p>
                      </div> `;
                      })
                      .join("")} 
                    </div>
                  </div>
                </div> `
                      : item?.cat === "skills" && item?.showComp
                      ? ` <table style="width: 100%">
                  <tr>
                    <td style="width: 100%">
                      <div class="summary">
                        <h2 style="font-size: calc(${
                          resume?.resumeStyle?.fontSize
                        }px * 0.75); font-weight: ${
                          resume?.resumeStyle?.fontWeight
                        }">
                          <span class="underline__div" style="background-color: ${
                            resume?.resumeStyle?.color
                          }"></span> ${item?.title}
                        </h2>
                        <ul style="width: 100%"> ${item?.list
                          ?.map(
                            (skills: any) =>
                              ` <li style="diplay: inline-block; width:50%; float: left">${skills}</li>`
                          )
                          .join("")} </ul>
                      </div>
                    </td>
                  </tr>
                </table> `
                      : item?.cat === "hobbies" && item?.showComp
                      ? ` <table style="width: 100%">
                  <tr>
                    <td style="width: 100%">
                      <div class="summary">
                        <h2 style="font-size: calc(${
                          resume?.resumeStyle?.fontSize
                        }px * 0.75); font-weight: ${
                          resume?.resumeStyle?.fontWeight
                        }">
                          <span class="underline__div" style="background-color: ${
                            resume?.resumeStyle?.color
                          }"></span> ${item?.title}
                        </h2>
                        <ul> ${item?.list
                          ?.map(
                            (hobbies: any) =>
                              ` <li style="diplay: inline-block; width:50%; float: left">${hobbies}</li> `
                          )
                          .join("")} </ul>
                      </div>
                    </td>
                  </tr>
                </table> `
                      : item?.cat === "certification" && item?.showComp
                      ? ` 
                <div class="summary">
                  <h2 style="font-size: calc(${
                    resume?.resumeStyle?.fontSize
                  }px * 0.75); font-weight: ${resume?.resumeStyle?.fontWeight}">
                    <span class="underline__div" style="background-color: ${
                      resume?.resumeStyle?.color
                    }"></span> ${item?.title}
                  </h2> ${item?.certificate
                    ?.map((item: any) => {
                      return `
                  <div class="professional__InnerContent"> 
                    <h4 style="font-weight: ${resume?.resumeStyle?.fontWeight}"> ${item?.certificateName}</h4>
                    <p> ${item?.authority} - ${item?.dateReceMonth}- ${item?.dateReceYear} </p>
                    <p>${item?.certificationLink}</p>
                    <p>${item?.description}</p> 
                  </div>`;
                    })
                    .join("")}
                </div> `
                      : item?.cat === "languages" && item?.showComp
                      ? ` 
                <div class="summary">
                  <h2 style="font-size: calc(${
                    resume?.resumeStyle?.fontSize
                  }px * 0.75); font-weight: ${resume?.resumeStyle?.fontWeight}">
                    <span class="underline__div" style="background-color: ${
                      resume?.resumeStyle?.color
                    }"></span> ${item?.title}
                  </h2>
                  <ul> ${item?.list
                    ?.map(
                      (skills: any) =>
                        ` <li style="diplay: inline-block; width:50%; float: left">${skills}</li> `
                    )
                    .join("")} </ul>
                </div>`
                      : item?.cat === "references" && item?.showComp
                      ? ` <div class="summary">
                  <table style="width: 100%">
                    <tr>
                      <td>
                        <h2 style="font-size: calc(${resume?.resumeStyle?.fontSize}px * 0.75); font-weight: ${resume?.resumeStyle?.fontWeight}">
                          <span class="underline__div" style="background-color: ${resume?.resumeStyle?.color}"></span> ${item?.title}
                        </h2>
                      </td>
                    </tr>
                    <tr style="width: 100%">
                      <td class="col-md-6" style="display:inline-block; width:50%">
                        <h4 style="font-weight: ${resume?.resumeStyle?.fontWeight}; margin-bottom:0;">References 1</h4>
                        <h5 style="font-weight: ${resume?.resumeStyle?.fontWeight}; margin-top:calc(8px * 0.75);margin-bottom:0;">${item?.personOne}:</h5>
                        <p>${item?.personeOneContact}</p>
                      </td>
                      <td class="col-md-6" style="display:inline-block; width:50%">
                        <h4 style="font-weight: ${resume?.resumeStyle?.fontWeight}; margin-bottom:0;">References 2</h4>
                        <h5 style="font-weight: ${resume?.resumeStyle?.fontWeight}; margin-top:calc(8px * 0.75);margin-bottom:0;">${item?.personTwo}:</h5>
                        <p>${item?.personTwoContact}</p>
                      </td>
                    </tr>
                  </table>
                </div>`
                      : item?.cat === "publications" && item?.showComp
                      ? ` <div class="summary">
                  <h2 style="font-size: calc(${
                    resume?.resumeStyle?.fontSize
                  }px * 0.75); font-weight: ${resume?.resumeStyle?.fontWeight}">
                    <span class="underline__div" style="background-color: ${
                      resume?.resumeStyle?.color
                    }"></span> ${item?.title}
                  </h2> ${item?.publicationList
                    ?.map((item: any) => {
                      return ` 
                  <div class="professional__InnerContent">
                    <h4 style="font-weight: ${resume?.resumeStyle?.fontWeight}">${item?.title}</h4>
                    <p> ${item?.publisher} | ${item?.isbn}-${item?.dateReceMonth} - ${item?.dateReceYear} </p>
                    <p>${item?.description}</p>
                  </div> `;
                    })
                    .join("")}
                </div> `
                      : item?.cat === "achievements" && item?.showComp
                      ? ` 
                <div class="summary">
                  <h2 style="font-size: calc(${resume?.resumeStyle?.fontSize}px * 0.75); font-weight: ${resume?.resumeStyle?.fontWeight}">
                    <span class="underline__div" style="background-color: ${resume?.resumeStyle?.color}"></span> ${item?.title}
                  </h2>
                  <div class="professional__InnerContent">
                    <p>${item?.description}</p>
                  </div>
                </div> `
                      : item?.cat === "customSection" && item?.showComp
                      ? ` <div class="summary">
                  <h2 style="font-size: calc(${resume?.resumeStyle?.fontSize}px * 0.75); font-weight: ${resume?.resumeStyle?.fontWeight}">
                    <span class="underline__div" style="background-color: ${resume?.resumeStyle?.color}"></span> ${item?.title}
                  </h2>
                  <p>${item?.description}</p>
                </div> `
                      : item?.cat === "summary" && item?.showComp
                      ? ` <div class="summary">
                  <h2 style="font-size: calc(${resume?.resumeStyle?.fontSize}px * 0.75); font-weight: ${resume?.resumeStyle?.fontWeight}">
                    <span class="underline__div" style="background-color: ${resume?.resumeStyle?.color}"></span> ${item?.title}
                  </h2>
                  <p style="margin-top: 15px">${item?.description}</p>
                </div> `
                      : ""
                  } `;
                })
                .join("")} </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </body>
</html>`;
};

export const templateSeven = (resume: any) => {
  let dataMapped = () => {
    if (Object.keys(resume).length < 1) return [];
    const { customSection, ...others }: any = resume;
    const values = Object.values(others).concat(customSection);

    return [...values];
  };
  const activeList = () => dataMapped()?.filter((obj: any) => obj?.showComp);

  const rearangeList = activeList()?.sort(function (a: any, b: any) {
    return a.order - b.order;
  });
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title></title>
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap");
      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-Variable.woff2") format("woff2"),
          url("../../fonts/Satoshi-Variable.woff") format("woff"),
          url("../../fonts/Satoshi-Variable.ttf") format("truetype");
        font-weight: 300 900;
        font-display: swap;
        font-style: normal;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-VariableItalic.woff2") format("woff2"),
          url("../../fonts/Satoshi-VariableItalic.woff") format("woff"),
          url("../../fonts/Satoshi-VariableItalic.ttf") format("truetype");
        font-weight: 300 900;
        font-display: swap;
        font-style: italic;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-Light.woff2") format("woff2"),
          url("../../fonts/Satoshi-Light.woff") format("woff"),
          url("../../fonts/Satoshi-Light.ttf") format("truetype");
        font-weight: 300;
        font-display: swap;
        font-style: normal;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-LightItalic.woff2") format("woff2"),
          url("../../fonts/Satoshi-LightItalic.woff") format("woff"),
          url("../../fonts/Satoshi-LightItalic.ttf") format("truetype");
        font-weight: 300;
        font-display: swap;
        font-style: italic;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-Regular.woff2") format("woff2"),
          url("../../fonts/Satoshi-Regular.woff") format("woff"),
          url("../../fonts/Satoshi-Regular.ttf") format("truetype");
        font-weight: 400;
        font-display: swap;
        font-style: normal;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-Italic.woff2") format("woff2"),
          url("../../fonts/Satoshi-Italic.woff") format("woff"),
          url("../../fonts/Satoshi-Italic.ttf") format("truetype");
        font-weight: 400;
        font-display: swap;
        font-style: italic;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-Medium.woff2") format("woff2"),
          url("../../fonts/Satoshi-Medium.woff") format("woff"),
          url("../../fonts/Satoshi-Medium.ttf") format("truetype");
        font-weight: 500;
        font-display: swap;
        font-style: normal;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-MediumItalic.woff2") format("woff2"),
          url("../../fonts/Satoshi-MediumItalic.woff") format("woff"),
          url("../../fonts/Satoshi-MediumItalic.ttf") format("truetype");
        font-weight: 500;
        font-display: swap;
        font-style: italic;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-Bold.woff2") format("woff2"),
          url("../../fonts/Satoshi-Bold.woff") format("woff"),
          url("../../fonts/Satoshi-Bold.ttf") format("truetype");
        font-weight: 700;
        font-display: swap;
        font-style: normal;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-BoldItalic.woff2") format("woff2"),
          url("../../fonts/Satoshi-BoldItalic.woff") format("woff"),
          url("../../fonts/Satoshi-BoldItalic.ttf") format("truetype");
        font-weight: 700;
        font-display: swap;
        font-style: italic;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-Black.woff2") format("woff2"),
          url("../../fonts/Satoshi-Black.woff") format("woff"),
          url("../../fonts/Satoshi-Black.ttf") format("truetype");
        font-weight: 900;
        font-display: swap;
        font-style: normal;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-BlackItalic.woff2") format("woff2"),
          url("../../fonts/Satoshi-BlackItalic.woff") format("woff"),
          url("../../fonts/Satoshi-BlackItalic.ttf") format("truetype");
        font-weight: 900;
        font-display: swap;
        font-style: italic;
      }
      body {
        padding: 0;
        margin: 0;
        font-family: "Didact Gothic";
        padding: 20px 30px;
      }

      *,
      *:after,
      *:before {
        box-sizing: border-box;
        margin: 0;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      .ql-align-justify{
        text-align:justify;
      }
      .ql-align-right{
        text-align:right;
      }     
      td {
        padding: calc(11px * 0.75) 0;
        vertical-align: top;
      }

      td:first-child {
        padding-right: calc(20px * 0.75);
      }
      h4 {
        font-size: calc(13px * 0.75);
        line-height: calc(13px * 1.333);
        letter-spacing: calc(0.06em * 0.75);
        text-transform: capitalize;
        margin-bottom:0
      }
      h5 {
        font-size: calc(12px * 0.75);
        line-height: calc(14px * 0.75);
        letter-spacing: calc(0.06em * 0.75);
        margin-top: calc(10px * 0.336);
        margin-bottom: 0px;
      }
      h2 {
        font-size: calc(${resume?.resumeStyle?.fontSize}px * 0.75) !important;
        line-height: calc(${resume?.resumeStyle?.fontSize}px * 0.75);
        letter-spacing: calc(0.06em * 0.75);
        margin-top: calc(10px * 0.336);
        margin-bottom: 0px;
      }
      
      p,
      p span,
      p h1,
      p h2,
      p h3,
      p h4,
      p h5,
      p h6,
      p li {
        font-weight: 300;
        font-size: calc(9px * 0.75) !important;
        line-height: calc(10px * 1.333) !important;
        letter-spacing: calc(0.06em * 0.75) !important;
        margin-top: calc(10px * 0.336);
        margin-bottom: 0px;
        color:${resume?.resumeStyle?.color} !important;
        background-color:inherit !important
      }

      ul {
        padding: 0;
        float: left;
        margin: 0;
        width:100%;
        padding-left:calc(15px * 0.75);
      }
      ol li,
      ul li {
        font-weight: 300;
        font-size: calc(9px * 0.75) !important;
        line-height: calc(10px * 1.333) !important;
        letter-spacing: calc(0.06em * 0.75);
        position: relative;
        text-transform: capitalize;
      }
      ul.w-50 li {
        width: 50%;
        float: left;
        text-transform: capitalize;
      }

      .shortName {
        font-style: normal;
        font-weight: 400;
        font-size: calc(36px * 0.75);
        line-height: 47px;
        text-align: center;
        letter-spacing: calc(0.06em * 0.75);
        text-transform: uppercase;
        color: #000000;
        position: relative;
        width: 80px;
        height: 80px;
      }

      .text-left {
        position: absolute;
        top: calc(-8px * 0.75);
        left: calc(10px * 1.333);
      }

      .text-right {
        position: absolute;
        bottom: calc(-8px * 0.75);
        right: calc(10px * 1.333);
      }

      .line {
        left: calc(-1px * 0.75);
        top: calc(17px * 0.75);
        display: inline-block;
        position: relative;
      }
      .links .single-link{
        margin-bottom:calc(5px * 0.75);
        float:left;
        width:100%;
      }
      .links .single-link svg {
        margin-right: calc(4px * 0.75);
        float:left;
      }

      .links .single-link span {
        float:left;
        font-size: calc(11px * 0.75);
        letter-spacing: calc(0.06em * 0.75);
        font-weight: 400;
        position: relative;
        top: calc(-1px * 0.75);
        word-break:break-all;
        width:calc(100% - 26px);
      }

      .summary p{
        margin: calc(9px * 0.75) 0;
        font-weight: 300;
        font-size: calc(9px * 0.75);
        line-height: calc(10px * 1.333);
        letter-spacing: calc(0.06em * 0.75);
      }
      .user-info span {
        margin: 0 0 0 calc(3px * 0.75);
        position: relative;
        line-height: normal;
        font-weight: 300;
        font-size: calc(9px * 0.75);
        letter-spacing: calc(0.06em * 0.75);
      }
    </style>
  </head>
  <body style="
    background-color: ${resume?.resumeStyle?.backgroundColor} !important; 
    color: ${resume?.resumeStyle?.color};
    font-family: ${resume?.resumeStyle?.fontFamily} !important;
    width:100%;">
    <table>
      <tr>
        <td colspan="2">
          <table>
            <tr>
              <td style="text-align: center; width:calc(80px * 0.75)">
                <div class="shortName">
                  <span style="color: ${
                    resume?.resumeStyle?.color
                  }; font-weight: ${
    resume?.resumeStyle?.fontWeight
  }" class="text-left">
                    ${
                      resume?.profile?.firstName
                        ? resume?.profile?.firstName.charAt(0)
                        : "R"
                    }
                  </span>
                  <span class="line">
                    <svg xmlns="http://www.w3.org/2000/svg" width="55" height="48" viewBox="0 0 55 48" fill="${
                      resume?.resumeStyle?.color
                        ? resume?.resumeStyle?.color
                        : " black"
                    }">
                      <line x1="1.34453" y1="47.2448" x2="54.3445" y2="1.24478" stroke="${
                        resume?.resumeStyle?.color
                          ? resume?.resumeStyle?.color
                          : " black"
                      }" stroke-width="2" />
                    </svg>
                  </span>
                  <span class="text-right" style="color: ${
                    resume?.resumeStyle?.color
                  }; font-weight: ${resume?.resumeStyle?.fontWeight}">
                    ${
                      resume?.profile?.lastName
                        ? resume?.profile?.lastName.charAt(0)
                        : "R"
                    }
                  </span>
                </div>
              </td>
              <td style="text-align: center;">
								<h1 style="
                  font-size: calc((${
                    resume?.resumeStyle?.fontSize
                  }px * 1.75) * 0.75)); 
                  font-weight: 400 !important;
                  line-height: calc(${resume?.resumeStyle?.fontSize}px * 0.75); 
                  letter-spacing: calc(0.06em * 0.75); 
                  text-transform: uppercase; 
                  margin: 0; 
                  color: ${resume?.resumeStyle?.color};"
                >
                  ${
                    resume?.profile?.firstName ? resume?.profile?.firstName : ""
                  } ${
    resume?.profile?.lastName ? resume?.profile?.lastName : ""
  } 
                </h1>
                <div class="user-info">
                  <span>${
                    resume?.profile?.email && resume?.profile?.email
                  }</span>
                  <span>${
                    resume?.profile?.phone && resume?.profile?.phone
                  }</span>
                  <span>${
                    resume?.profile?.postalCode && resume?.profile?.postalCode
                  }</span>
                  <span>${resume?.profile?.city && resume?.profile?.city}</span>
                </div>
              </td>
              <td style="width:26%; padding:calc(24px * 0.75) 0;">
                <div class="links">
                  <div class="single-link" style="display:block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="0.75em" height="0.75em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20">
                      <path fill="currentColor" d="M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4zM7.65 13.979H5.706V7.723H7.65v6.256zm-.984-7.024c-.614 0-1.011-.435-1.011-.973c0-.549.409-.971 1.036-.971s1.011.422 1.023.971c0 .538-.396.973-1.048.973zm8.084 7.024h-1.944v-3.467c0-.807-.282-1.355-.985-1.355c-.537 0-.856.371-.997.728c-.052.127-.065.307-.065.486v3.607H8.814v-4.26c0-.781-.025-1.434-.051-1.996h1.689l.089.869h.039c.256-.408.883-1.01 1.932-1.01c1.279 0 2.238.857 2.238 2.699v3.699z" />
                    </svg>
                    <span style="display:inline-block; text-transform: lowercase; color: ${
                      resume?.resumeStyle?.color
                    }">${
    resume?.profile?.linkedin ? resume?.profile?.linkedin : ""
  } </span>
                  </div>
                  <div class="single-link" style="display:block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="0.75em" height="0.75em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M10.59 13.41c.41.39.41 1.03 0
                        1.42c-.39.39-1.03.39-1.42 0a5.003 5.003 0 0 1
                        0-7.07l3.54-3.54a5.003 5.003 0 0 1 7.07 0a5.003 5.003 0 0 1 0
                        7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.982 2.982 0 0
                        0 0-4.24a2.982 2.982 0 0 0-4.24 0l-3.53 3.53a2.982 2.982 0 0 0 0
                        4.24m2.82-4.24c.39-.39 1.03-.39 1.42 0a5.003 5.003 0 0 1 0
                        7.07l-3.54 3.54a5.003 5.003 0 0 1-7.07 0a5.003 5.003 0 0 1
                        0-7.07l1.49-1.49c-.01.82.12 1.64.4 2.43l-.47.47a2.982 2.982 0 0
                        0 0 4.24a2.982 2.982 0 0 0 4.24 0l3.53-3.53a2.982 2.982 0 0 0
                        0-4.24a.973.973 0 0 1 0-1.42Z" />
                    </svg>
                    <span style="text-transform: lowercase; color: ${
                      resume?.resumeStyle?.color
                    }">${
    resume?.profile?.websiteLink ? resume?.profile?.websiteLink : ""
  } </span>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr> ${rearangeList
        ?.map((item: any) => {
          return ` ${
            item?.cat === "workHistory" && item?.showComp
              ? ` 
      <tr>
        <td style="border-top: 1px solid ${
          resume?.resumeStyle?.color ? resume?.resumeStyle?.color : " #e5e5e5"
        }; font-size:calc(${
                  resume?.resumeStyle?.fontSize
                }px * 0.75); font-weight:400; width: 25%; text-transform:uppercase;">
          ${item?.title}
        </td>
        <td style="border-top: 1px solid ${
          resume?.resumeStyle?.color ? resume?.resumeStyle?.color : " #e5e5e5"
        }; width: 75%"> 
          ${item?.history
            .map((item) => {
              return `
          <h4 style="font-weight: ${resume?.resumeStyle?.fontWeight};">${item?.jobTitle}</h4>
          <p>${item?.employer}</p>
          <p>${item?.description}</p> `;
            })
            .join("")}
        </td>
      </tr>`
              : item?.cat === "education" && item?.showComp
              ? ` 
      <tr>
         <td style="border-top: 1px solid ${
           resume?.resumeStyle?.color ? resume?.resumeStyle?.color : " #e5e5e5"
         }; font-size:calc(${
                  resume?.resumeStyle?.fontSize
                }px * 0.75); font-weight:400; width: 25%; text-transform:uppercase;">
          ${item?.title}
        </td>
        <td style="border-top: 1px solid ${
          resume?.resumeStyle?.color ? resume?.resumeStyle?.color : " #e5e5e5"
        }; width: 75%"> 
          ${item?.educationHistory
            .map((item) => {
              return ` 
            <h4 style="font-weight: ${resume?.resumeStyle?.fontWeight};">${
                item?.school
              }</h4>
            <p> ${item?.degree} | ${item?.startMonth}-${item?.startYear} - ${
                item?.stillWork
                  ? "Present"
                  : `${item?.endMonth} - ${item?.endYear}`
              } </p>
            <p>${item?.description}</p> `;
            })
            .join("")}
        </td>
      </tr>`
              : item?.cat === "skills" && item?.showComp
              ? ` 
      <tr>
         <td style="border-top: 1px solid ${
           resume?.resumeStyle?.color ? resume?.resumeStyle?.color : " #e5e5e5"
         }; font-size:calc(${
                  resume?.resumeStyle?.fontSize
                }px * 0.75); font-weight:400; width: 25%; text-transform:uppercase;">
          ${item?.title}
        </td>
        <td style="border-top: 1px solid ${
          resume?.resumeStyle?.color ? resume?.resumeStyle?.color : " #e5e5e5"
        }; width: 75%">
          <ul style="width:100%"> ${item?.list
            ?.map(
              (skills: any) =>
                ` <li style="diplay: inline-block; width:50%; float: left">${skills}</li> `
            )
            .join("")}</ul>
        </td>
      </tr>`
              : item?.cat === "hobbies" && item?.showComp
              ? ` 
      <tr>
         <td style="border-top: 1px solid ${
           resume?.resumeStyle?.color ? resume?.resumeStyle?.color : " #e5e5e5"
         }; font-size:calc(${
                  resume?.resumeStyle?.fontSize
                }px * 0.75); font-weight:400; width: 25%; text-transform:uppercase;">
          ${item?.title}
        </td>
        <td style="border-top: 1px solid ${
          resume?.resumeStyle?.color ? resume?.resumeStyle?.color : " #e5e5e5"
        }; width: 75%">
          <ul style="width:100%"> ${item?.list
            ?.map(
              (hobbies: any) =>
                ` <li style="diplay: inline-block; width:50%; float: left">${hobbies}</li> `
            )
            .join("")}</ul>
        </td>
      </tr>`
              : item?.cat === "languages" && item?.showComp
              ? ` 
      <tr>
         <td style="border-top: 1px solid ${
           resume?.resumeStyle?.color ? resume?.resumeStyle?.color : " #e5e5e5"
         }; font-size:calc(${
                  resume?.resumeStyle?.fontSize
                }px * 0.75); font-weight:400; width: 25%; text-transform:uppercase;">
          ${item?.title}
        </td>
        <td style="border-top: 1px solid ${
          resume?.resumeStyle?.color ? resume?.resumeStyle?.color : " #e5e5e5"
        }; width: 75%">
          <ul style="width:100%"">${item?.list
            ?.map(
              (languages: any) =>
                `<li style=" diplay: inline-block; width:50%; float: left">${languages}</li> `
            )
            .join("")}</ul>
        </td>
      </tr>`
              : item?.cat === "summary" && item?.showComp
              ? ` 
      <tr>
         <td style="border-top: 1px solid ${
           resume?.resumeStyle?.color ? resume?.resumeStyle?.color : " #e5e5e5"
         }; font-size:calc(${
                  resume?.resumeStyle?.fontSize
                }px * 0.75); font-weight:400; width: 25%; text-transform:uppercase;">
          ${item?.title}
        </td>
        <td style="border-top: 1px solid ${
          resume?.resumeStyle?.color ? resume?.resumeStyle?.color : " #e5e5e5"
        }; width: 75%">
          <p>${item?.description}</p>
        </td>
      </tr>`
              : item?.cat === "achievements" && item?.showComp
              ? ` 
      <tr>
         <td style="border-top: 1px solid ${
           resume?.resumeStyle?.color ? resume?.resumeStyle?.color : " #e5e5e5"
         }; font-size:calc(${
                  resume?.resumeStyle?.fontSize
                }px * 0.75); font-weight:400; width: 25%; text-transform:uppercase;">
          ${item?.title}
        </td>
        <td style="border-top: 1px solid ${
          resume?.resumeStyle?.color ? resume?.resumeStyle?.color : " #e5e5e5"
        }; width: 75%">
          <p>${item?.description}</p>
        </td>
      </tr>`
              : item?.cat === "customSection" && item?.showComp
              ? ` 
      <tr>
         <td style="border-top: 1px solid ${
           resume?.resumeStyle?.color ? resume?.resumeStyle?.color : " #e5e5e5"
         }; font-size:calc(${
                  resume?.resumeStyle?.fontSize
                }px * 0.75); font-weight:400; width: 25%; text-transform:uppercase;">
          ${item?.title}
        </td>
        <td style="border-top: 1px solid ${
          resume?.resumeStyle?.color ? resume?.resumeStyle?.color : " #e5e5e5"
        }; width: 75%">
          <p>${item?.description}</p>
        </td>
      </tr>`
              : item?.cat === "references" && item?.showComp
              ? ` 
      <tr>
         <td style="border-top: 1px solid ${
           resume?.resumeStyle?.color ? resume?.resumeStyle?.color : " #e5e5e5"
         }; font-size:calc(${
                  resume?.resumeStyle?.fontSize
                }px * 0.75); font-weight:400; width: 25%; text-transform:uppercase;">
          ${item?.title}
        </td>
        <td style="border-top: 1px solid ${
          resume?.resumeStyle?.color ? resume?.resumeStyle?.color : " #e5e5e5"
        }; width: 75%">
          <table style="margin-top: 0px">
            <tr style="margin-top: 0px">
              <td style="margin-top: 0px; padding:0">
                <h4 style="font-weight: ${
                  resume?.resumeStyle?.fontWeight
                }">Reference 1</h4>
                <h5 style="font-weight: ${resume?.resumeStyle?.fontWeight}">${
                  item?.personOne
                } :</h5>
                <p>${item?.personeOneContact} </p>
              </td>
              <td style="margin-top: 0px; padding:0">
                <h4 style="font-weight: ${
                  resume?.resumeStyle?.fontWeight
                }">Reference 1</h4>
                <h5 style="font-weight: ${resume?.resumeStyle?.fontWeight}">${
                  item?.personTwo
                } :</h5>
                <p>${item?.personTwoContact} </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
              : item?.cat === "publications" && item?.showComp
              ? `
      <tr> 
         <td style="border-top: 1px solid ${
           resume?.resumeStyle?.color ? resume?.resumeStyle?.color : " #e5e5e5"
         }; font-size:calc(${
                  resume?.resumeStyle?.fontSize
                }px * 0.75); font-weight:400; width: 25%; text-transform:uppercase;">
          ${item?.title}
        </td>
        ${item?.publicationList
          .map((item) => {
            return ` 
        <td style="border-top: 1px solid ${
          resume?.resumeStyle?.color ? resume?.resumeStyle?.color : " #e5e5e5"
        }; width: 75%">
          <h4>${item?.title}</h4>
          <p> ${item?.publisher} | ${item?.isbn}-${item?.dateReceMonth} - ${
              item?.dateReceYear
            } </p>
          <p>${item?.description}</p>
        </td>
      </tr> `;
          })
          .join("")}`
              : item?.cat === "certification" && item?.showComp
              ? ` 
      <tr>
         <td style="border-top: 1px solid ${
           resume?.resumeStyle?.color ? resume?.resumeStyle?.color : " #e5e5e5"
         }; font-size:calc(${
                  resume?.resumeStyle?.fontSize
                }px * 0.75); font-weight:400; width: 25%; text-transform:uppercase;">
          ${item?.title}
        </td>
        ${item?.certificate
          .map((item) => {
            return ` 
        <td style="border-top: 1px solid ${
          resume?.resumeStyle?.color ? resume?.resumeStyle?.color : " #e5e5e5"
        }; width: 75%">
          <h4 style="font-weight: ${resume?.resumeStyle?.fontWeight};"> ${
              item?.certificateName
            }</h4>
          <p>${item?.authority} - ${item?.dateReceMonth}- ${
              item?.dateReceYear
            } </p>
          <p>${item?.certificationLink}</p>
          <p>${item?.description}</p>
        </td> `;
          })
          .join("")}
      </tr>`
              : ""
          } `;
        })
        .join("")}
    </table>
  </body>
</html>`;
};

export const templateEleven = (resume: any) => {
  let dataMapped = () => {
    if (Object.keys(resume).length < 1) return [];
    const { customSection, ...others }: any = resume;
    const values = Object.values(others).concat(customSection);

    return [...values];
  };
  const activeList = () => dataMapped()?.filter((obj: any) => obj?.showComp);

  const rearangeList = activeList()?.sort(function (a: any, b: any) {
    return a.order - b.order;
  });
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title></title>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Pontano+Sans&display=swap");
      @import url("https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-Variable.woff2") format("woff2"),
          url("../../fonts/Satoshi-Variable.woff") format("woff"),
          url("../../fonts/Satoshi-Variable.ttf") format("truetype");
        font-weight: 300 900;
        font-display: swap;
        font-style: normal;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-VariableItalic.woff2") format("woff2"),
          url("../../fonts/Satoshi-VariableItalic.woff") format("woff"),
          url("../../fonts/Satoshi-VariableItalic.ttf") format("truetype");
        font-weight: 300 900;
        font-display: swap;
        font-style: italic;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-Light.woff2") format("woff2"),
          url("../../fonts/Satoshi-Light.woff") format("woff"),
          url("../../fonts/Satoshi-Light.ttf") format("truetype");
        font-weight: 300;
        font-display: swap;
        font-style: normal;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-LightItalic.woff2") format("woff2"),
          url("../../fonts/Satoshi-LightItalic.woff") format("woff"),
          url("../../fonts/Satoshi-LightItalic.ttf") format("truetype");
        font-weight: 300;
        font-display: swap;
        font-style: italic;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-Regular.woff2") format("woff2"),
          url("../../fonts/Satoshi-Regular.woff") format("woff"),
          url("../../fonts/Satoshi-Regular.ttf") format("truetype");
        font-weight: 400;
        font-display: swap;
        font-style: normal;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-Italic.woff2") format("woff2"),
          url("../../fonts/Satoshi-Italic.woff") format("woff"),
          url("../../fonts/Satoshi-Italic.ttf") format("truetype");
        font-weight: 400;
        font-display: swap;
        font-style: italic;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-Medium.woff2") format("woff2"),
          url("../../fonts/Satoshi-Medium.woff") format("woff"),
          url("../../fonts/Satoshi-Medium.ttf") format("truetype");
        font-weight: 500;
        font-display: swap;
        font-style: normal;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-MediumItalic.woff2") format("woff2"),
          url("../../fonts/Satoshi-MediumItalic.woff") format("woff"),
          url("../../fonts/Satoshi-MediumItalic.ttf") format("truetype");
        font-weight: 500;
        font-display: swap;
        font-style: italic;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-Bold.woff2") format("woff2"),
          url("../../fonts/Satoshi-Bold.woff") format("woff"),
          url("../../fonts/Satoshi-Bold.ttf") format("truetype");
        font-weight: 700;
        font-display: swap;
        font-style: normal;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-BoldItalic.woff2") format("woff2"),
          url("../../fonts/Satoshi-BoldItalic.woff") format("woff"),
          url("../../fonts/Satoshi-BoldItalic.ttf") format("truetype");
        font-weight: 700;
        font-display: swap;
        font-style: italic;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-Black.woff2") format("woff2"),
          url("../../fonts/Satoshi-Black.woff") format("woff"),
          url("../../fonts/Satoshi-Black.ttf") format("truetype");
        font-weight: 900;
        font-display: swap;
        font-style: normal;
      }

      @font-face {
        font-family: "Satoshi";
        src: url("../../fonts/Satoshi-BlackItalic.woff2") format("woff2"),
          url("../../fonts/Satoshi-BlackItalic.woff") format("woff"),
          url("../../fonts/Satoshi-BlackItalic.ttf") format("truetype");
        font-weight: 900;
        font-display: swap;
        font-style: italic;
      }
      body {
        padding: 0;
        margin: 0;
        font-family: "Lato";
        font-size:14px;
      }

      *,
      *:after,
      *:before {
        box-sizing: border-box;
        margin-top: 0;
      }
      .ql-align-justify{
        text-align:justify;
      }
      .ql-align-right{
        text-align:right;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        border:0;
      }
      
      td {
        vertical-align: top;
        border:0;
      }

      .links .single-link:not(:last-child) {
        margin-bottom: 4px;
      }

      .links .single-link svg {
        margin-right: calc(8px * 0.75);
        width: calc(12px * 0.75);
      }

      .links .single-link span {
        font-style: normal;
        font-weight: 300;
        font-size: calc(9px * 0.75);
        line-height: calc(12px * 1.333);
        letter-spacing: calc(0.22em * 0.75);
        position: relative;
        top: -2px;
      }

      h4 {
        font-style: normal;
        font-weight: 400;
        font-size:calc(13px * 0.75);
        line-height: calc(15px * 1.333);
        letter-spacing: calc(0.22em * 0.75);
        margin-bottom: calc(0.5rem * 0.75);
        text-transform:capitalize;
        color:${resume?.resumeStyle?.color};
      }
      ul {
        padding: 0;
        list-style:none;
      }
      ol li,
      ul li {
        padding-left:calc(16px * 0.75);
        position: relative;
        font-style: normal;
        font-weight: 300;
        font-size: calc(12px * 0.75) !important;
        line-height: calc(12px * 1.333) !important;
        letter-spacing: calc(0.22em * 0.75);
        text-transform: capitalize;
      }
      ul li:before{
        content:"";
        position:absolute;
        left:0px;
        top:5px;
        height:calc(5px * 0.75);
        width:calc(5px * 0.75);
        border-radius:50%;
        background-color:${
          resume?.resumeStyle?.color ? resume?.resumeStyle?.color : "#000"
        };
      }
      ol li:not(:last-child),
      ul li:not(:last-child) {
        margin-bottom: calc(6px * 0.75);
      }

      h6 {
        font-style: normal;
        font-weight: 600;
        font-size: calc(9px * 0.75);
        line-height: calc(10px * 1.333);
        letter-spacing: calc(0.22em * 0.75);
        margin-bottom: calc(9px * 0.75);
        margin-bottom: calc(9px * 0.75);
      }

      p {
        font-style: normal;
        font-weight: 300;
        font-size: calc(9px * 0.75);
        line-height: calc(10px * 1.333);
        letter-spacing: calc(0.06em * 0.75);
        margin:0;
      }
      .summary-section{
        width:100%;
        display:block;
        float:left;
      }
      .line{
        margin: 12px 0;
        color: inherit;
        border: 0;
        border-top: 1px solid;
        opacity: .25;
        width:100%;
        display:block;
        float:left;
      }
    </style>
  </head>
  <body style="background-color: ${
    resume?.resumeStyle?.backgroundColor
  } !important; color: ${resume?.resumeStyle?.color};font-family: ${
    resume?.resumeStyle?.fontFamily
  }">
    <table style="margin-top: 30px; width:100%">
      <tr>
        <td style="border-top: 1px solid ${
          resume?.resumeStyle?.color
            ? resume?.resumeStyle?.color
            : " rgba(0, 0, 0, 0.47)"
        }; padding-top: 3px">
          <table style="border-top: 2px solid ${
            resume?.resumeStyle?.color ? resume?.resumeStyle?.color : " #000000"
          }; border-bottom: 1px solid ${
    resume?.resumeStyle?.color
      ? resume?.resumeStyle?.color
      : "rgba(0, 0, 0, 0.47)"
  }; ">
						<tr>
							<td style=" padding: 13px 30px 20px">
                <h1 style="
                      font-weight:${resume?.resumeStyle?.fontWeight};
                      font-size: calc(48px * 0.75);
                      line-height: 115.12%;
                      letter-spacing: calc(0.22em * 0.75);
                      text-align: left;
                      text-transform: uppercase;
                      font-family: 'Pontano Sans';
                      margin-bottom: calc(20px * 0.75);
                      color: ${resume?.resumeStyle?.color}
                    "> ${
                      resume.profile?.firstName ? resume.profile?.firstName : ""
                    } <br /> ${
    resume?.profile?.lastName ? resume?.profile?.lastName : ""
  } </h1>
                <p style="
                      font-weight: 400;
                      font-size: calc(18px * 0.75);
                      line-height: 115.12%;
                      letter-spacing: calc(0.22em * 0.75);
                      margin-bottom:0;
                      color: ${resume?.resumeStyle?.color}
                    "> ${
                      resume?.profile?.designation
                        ? resume?.profile?.designation
                        : ""
                    } </p>
              </td>
              <td style="padding: 13px 30px calc(20px * 0.75);">
                <div class="links">
                  ${
                    resume.profile?.phone
                      ? `
                  <div class="single-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M9.41586 7.10742C9.58773 7.10742 9.7518 7.13867 9.90805 7.20117C10.0643 7.26367 10.2049 7.35742 10.3299 7.48242L11.619 8.77148C11.7401 8.89258 11.8319 9.03125 11.8944 9.1875C11.9569 9.34375 11.9901 9.50977 11.994 9.68555C11.994 9.85742 11.9627 10.0215 11.9002 10.1777C11.8377 10.334 11.744 10.4746 11.619 10.5996L11.537 10.6816C11.326 10.8926 11.1327 11.0801 10.9569 11.2441C10.7811 11.4082 10.5975 11.5449 10.4061 11.6543C10.2147 11.7637 10.0018 11.8496 9.76742 11.9121C9.53305 11.9746 9.25375 12.0039 8.92953 12C8.44125 12 7.9393 11.9238 7.42367 11.7715C6.90805 11.6191 6.39633 11.4082 5.88851 11.1387C5.3807 10.8691 4.8807 10.5488 4.38851 10.1777C3.89633 9.80664 3.43344 9.40234 2.99984 8.96484C2.56625 8.52734 2.1639 8.0625 1.79281 7.57031C1.42172 7.07812 1.10531 6.57812 0.843591 6.07031C0.581873 5.5625 0.374841 5.05273 0.222498 4.54102C0.0701538 4.0293 -0.00406494 3.53711 -0.000158691 3.06445C-0.000158691 2.74023 0.0271851 2.46289 0.0818726 2.23242C0.13656 2.00195 0.220544 1.79102 0.333826 1.59961C0.447107 1.4082 0.583826 1.22656 0.743982 1.05469C0.904138 0.882812 1.09164 0.689453 1.30648 0.474609L1.40023 0.380859C1.52133 0.259766 1.66 0.166016 1.81625 0.0996094C1.9725 0.0332031 2.13851 0 2.31429 0C2.48617 0 2.65023 0.0332031 2.80648 0.0996094C2.96273 0.166016 3.10336 0.259766 3.22836 0.380859L4.51742 1.66992C4.63851 1.79102 4.73031 1.92969 4.79281 2.08594C4.85531 2.24219 4.88851 2.4082 4.89242 2.58398C4.89242 2.75586 4.86312 2.9082 4.80453 3.04102C4.74594 3.17383 4.67367 3.29688 4.58773 3.41016C4.50179 3.52344 4.40804 3.62305 4.30648 3.70898C4.20492 3.79492 4.10922 3.88281 4.01937 3.97266C3.92953 4.0625 3.85726 4.14844 3.80258 4.23047C3.74789 4.3125 3.71859 4.4082 3.71469 4.51758C3.71469 4.66602 3.76742 4.79297 3.87289 4.89844L7.1014 8.12695C7.20687 8.23242 7.33383 8.28516 7.48226 8.28516C7.58383 8.28516 7.67758 8.25586 7.76351 8.19727C7.84945 8.13867 7.93734 8.06641 8.02719 7.98047C8.11703 7.89453 8.20492 7.80078 8.29086 7.69922C8.37679 7.59766 8.4764 7.50195 8.58969 7.41211C8.70297 7.32227 8.82406 7.25 8.95297 7.19531C9.08187 7.14062 9.23617 7.11133 9.41586 7.10742ZM8.92953 11.25C9.21078 11.25 9.44516 11.2246 9.63266 11.1738C9.82016 11.123 9.99203 11.0469 10.1483 10.9453C10.3045 10.8438 10.453 10.7188 10.5936 10.5703C10.7342 10.4219 10.9002 10.2539 11.0916 10.0664C11.1971 9.96094 11.2498 9.83398 11.2498 9.68555C11.2498 9.61523 11.2225 9.5332 11.1678 9.43945C11.1131 9.3457 11.0389 9.24414 10.9452 9.13477C10.8514 9.02539 10.7518 8.91797 10.6463 8.8125C10.5409 8.70703 10.4315 8.60156 10.3182 8.49609C10.2049 8.39062 10.1053 8.29883 10.0194 8.2207C9.93344 8.14258 9.86117 8.07422 9.80258 8.01562C9.69711 7.91016 9.5682 7.85742 9.41586 7.85742C9.3143 7.85742 9.22055 7.88672 9.13461 7.94531C9.04867 8.00391 8.96273 8.07617 8.87679 8.16211C8.79086 8.24805 8.70297 8.3418 8.61312 8.44336C8.52328 8.54492 8.42172 8.64062 8.30844 8.73047C8.19515 8.82031 8.07406 8.89258 7.94515 8.94727C7.81625 9.00195 7.66195 9.03125 7.48226 9.03516C7.31039 9.03516 7.14633 9.00391 6.99008 8.94141C6.83383 8.87891 6.6932 8.78516 6.5682 8.66016L3.33969 5.43164C3.21859 5.31055 3.12679 5.17188 3.06429 5.01562C3.00179 4.85938 2.96859 4.69336 2.96469 4.51758C2.96469 4.3457 2.99398 4.19336 3.05258 4.06055C3.11117 3.92773 3.18344 3.80469 3.26937 3.69141C3.35531 3.57812 3.44906 3.47852 3.55062 3.39258C3.65219 3.30664 3.74789 3.2168 3.83773 3.12305C3.92758 3.0293 3.99984 2.94336 4.05453 2.86523C4.10922 2.78711 4.13851 2.69336 4.14242 2.58398C4.14242 2.43164 4.08969 2.30273 3.98422 2.19727C3.93344 2.14648 3.86703 2.07617 3.785 1.98633C3.70297 1.89648 3.61117 1.79688 3.50961 1.6875C3.40804 1.57812 3.30258 1.46875 3.1932 1.35938C3.08383 1.25 2.97445 1.14844 2.86508 1.05469C2.7557 0.960938 2.65609 0.888672 2.56625 0.837891C2.4764 0.787109 2.39242 0.757812 2.31429 0.75C2.16586 0.75 2.0389 0.802734 1.93344 0.908203L1.43539 1.40625C1.29086 1.55078 1.16586 1.69922 1.06039 1.85156C0.954919 2.00391 0.876794 2.17383 0.826013 2.36133C0.775232 2.54883 0.747888 2.7832 0.743982 3.06445C0.743982 3.50195 0.814294 3.95312 0.954919 4.41797C1.09554 4.88281 1.29281 5.34766 1.54672 5.8125C1.80062 6.27734 2.09945 6.73438 2.4432 7.18359C2.78695 7.63281 3.16195 8.06055 3.5682 8.4668C3.97445 8.87305 4.40219 9.24414 4.8514 9.58008C5.30062 9.91602 5.75765 10.209 6.2225 10.459C6.68734 10.709 7.14828 10.9023 7.60531 11.0391C8.06234 11.1758 8.50375 11.2461 8.92953 11.25Z" fill="${
                    resume?.resumeStyle?.color
                      ? resume?.resumeStyle?.color
                      : " black"
                  }" />
                    </svg>
                    <span> ${resume.profile?.phone}</span>
                    </div>
                    `
                      : ""
                  }
                  ${
                    resume.profile?.email
                      ? `
                  <div class="single-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9" fill="none">
                  <path d="M12 0.4375V8.5625H0V0.4375H12ZM0.837891 1.25L6 4.04932L11.1621 1.25H0.837891ZM11.25 7.75V2.11328L6 4.95068L0.75 2.11328V7.75H11.25Z" fill="${
                    resume?.resumeStyle?.color
                      ? resume?.resumeStyle?.color
                      : " black"
                  }" />
                    </svg>
                    <span>${resume.profile?.email}</span>
                    </div>
                    `
                      : ""
                  }
                    ${
                      resume.profile?.city || resume.profile?.postalCode
                        ? `
                    <div class="single-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
                    <path d="M4 0C4.34375 0 4.67578 0.0449219 4.99609 0.134766C5.31641 0.224609 5.61523 0.349609 5.89258 0.509766C6.16992 0.669922 6.42188 0.865234 6.64844 1.0957C6.875 1.32617 7.07031 1.58008 7.23438 1.85742C7.39844 2.13477 7.52539 2.43359 7.61523 2.75391C7.70508 3.07422 7.75 3.40625 7.75 3.75C7.75 4.01953 7.71875 4.27539 7.65625 4.51758C7.59375 4.75977 7.5 5.00391 7.375 5.25L4 12L0.625 5.25C0.503906 5.00781 0.412109 4.76562 0.349609 4.52344C0.287109 4.28125 0.253906 4.02344 0.25 3.75C0.25 3.40625 0.294922 3.07422 0.384766 2.75391C0.474609 2.43359 0.599609 2.13477 0.759766 1.85742C0.919922 1.58008 1.11523 1.32812 1.3457 1.10156C1.57617 0.875 1.83008 0.679688 2.10742 0.515625C2.38477 0.351562 2.68359 0.224609 3.00391 0.134766C3.32422 0.0449219 3.65625 0 4 0ZM6.78906 4.95703V4.95117L6.79492 4.94531C6.89258 4.76172 6.9668 4.56836 7.01758 4.36523C7.06836 4.16211 7.09375 3.95703 7.09375 3.75C7.09375 3.32422 7.01367 2.92383 6.85352 2.54883C6.69336 2.17383 6.4707 1.8457 6.18555 1.56445C5.90039 1.2832 5.57227 1.0625 5.20117 0.902344C4.83008 0.742188 4.42969 0.660156 4 0.65625C3.57422 0.65625 3.17383 0.736328 2.79883 0.896484C2.42383 1.05664 2.0957 1.2793 1.81445 1.56445C1.5332 1.84961 1.3125 2.17773 1.15234 2.54883C0.992188 2.91992 0.910156 3.32031 0.90625 3.75C0.90625 3.95703 0.931641 4.16211 0.982422 4.36523C1.0332 4.56836 1.10742 4.76172 1.20508 4.94531V4.95117L1.21094 4.95703L4 10.5352L6.78906 4.95703ZM4 1.54688C4.30469 1.54688 4.58984 1.60352 4.85547 1.7168C5.12109 1.83008 5.35547 1.98828 5.55859 2.19141C5.76172 2.39453 5.91797 2.62695 6.02734 2.88867C6.13672 3.15039 6.19531 3.4375 6.20312 3.75C6.20312 4.05469 6.14648 4.33984 6.0332 4.60547C5.91992 4.87109 5.76172 5.10547 5.55859 5.30859C5.35547 5.51172 5.12305 5.66797 4.86133 5.77734C4.59961 5.88672 4.3125 5.94531 4 5.95312C3.69531 5.95312 3.41016 5.89648 3.14453 5.7832C2.87891 5.66992 2.64453 5.51172 2.44141 5.30859C2.23828 5.10547 2.08203 4.87305 1.97266 4.61133C1.86328 4.34961 1.80469 4.0625 1.79688 3.75C1.79688 3.44531 1.85352 3.16016 1.9668 2.89453C2.08008 2.62891 2.23828 2.39453 2.44141 2.19141C2.64453 1.98828 2.87695 1.83203 3.13867 1.72266C3.40039 1.61328 3.6875 1.55469 4 1.54688ZM4 5.29688C4.21484 5.29688 4.41602 5.25781 4.60352 5.17969C4.79102 5.10156 4.95508 4.99023 5.0957 4.8457C5.23633 4.70117 5.3457 4.53711 5.42383 4.35352C5.50195 4.16992 5.54297 3.96875 5.54688 3.75C5.54688 3.53516 5.50781 3.33398 5.42969 3.14648C5.35156 2.95898 5.24023 2.79492 5.0957 2.6543C4.95117 2.51367 4.78711 2.4043 4.60352 2.32617C4.41992 2.24805 4.21875 2.20703 4 2.20312C3.78516 2.20312 3.58398 2.24219 3.39648 2.32031C3.20898 2.39844 3.04492 2.50977 2.9043 2.6543C2.76367 2.79883 2.6543 2.96289 2.57617 3.14648C2.49805 3.33008 2.45703 3.53125 2.45312 3.75C2.45312 3.96484 2.49219 4.16602 2.57031 4.35352C2.64844 4.54102 2.75977 4.70508 2.9043 4.8457C3.04883 4.98633 3.21289 5.0957 3.39648 5.17383C3.58008 5.25195 3.78125 5.29297 4 5.29688Z" fill="${
                      resume?.resumeStyle?.color
                        ? resume?.resumeStyle?.color
                        : " black"
                    }" />
                      </svg>
                      <span>${resume.profile?.city}${
                            resume.profile?.postalCode
                              ? resume.profile?.postalCode
                              : ""
                          } </span>
                      </div>
                      `
                        : ""
                    }
                  ${
                    resume.profile?.linkedin
                      ? `
                  <div class="single-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
                      <path d="M6.666 3.15063C6.23757 3.15063 5.92035 3.25869 5.67201 3.39518C5.6322 3.25364 5.50139 3.15 5.3472 3.18097H3.46158C3.27516 3.15 3.12414 3.30103 3.18164 3.49692V10.448C3.12414 10.6249 3.27516 10.7765 3.46158 10.7639H5.3472C5.53362 10.7765 5.68464 10.6249 5.68464 10.4385L5.68401 6.23752C5.68338 6.23563 5.67643 6.03468 5.80344 5.89629C5.90518 5.78634 6.08022 5.7301 6.32224 5.7301C6.7254 5.7301 6.90487 5.89503 6.97185 6.26407V10.4385C6.9055 10.6249 7.05652 10.7765 7.24294 10.7639H9.2303C9.41672 10.7765 9.56774 10.6249 9.50076 10.4385V6.12378C9.56711 3.92978 8.00439 3.15063 6.666 3.15063ZM8.89223 10.132H7.58038V6.26407C7.58038 5.51778 7.09823 5.05522 6.32288 5.05522C5.88433 5.05522 5.5431 5.18413 5.30802 5.43816C4.98133 5.79203 5.0066 6.24068 5.07675 6.34053V10.132H3.79902V3.82552H5.00976V4.03784C5.00927 4.10109 5.02663 4.1632 5.05985 4.21702C5.09307 4.27085 5.1408 4.31421 5.19755 4.34213C5.25431 4.37005 5.31779 4.38138 5.38071 4.37484C5.44362 4.3683 5.50341 4.34414 5.55321 4.30514L5.64167 4.23689C5.8976 4.03531 6.16237 3.82615 6.66664 3.82615C7.1886 3.82615 8.89286 3.99234 8.89286 6.12441V10.132H8.89223Z" fill="${
                        resume?.resumeStyle?.color
                          ? resume?.resumeStyle?.color
                          : " black"
                      }" />
                      <path d="M1.28531 0C0.576304 0 0 0.576304 0 1.28531C0 1.99431 0.576304 2.57062 1.28531 2.57062C1.99431 2.57062 2.57062 1.99431 2.57062 1.28531C2.57062 0.576304 1.99431 0 1.28531 0ZM1.28531 1.89574C0.949132 1.89574 0.674883 1.62149 0.674883 1.28531C0.674883 0.949132 0.949132 0.674882 1.28531 0.674882C1.62149 0.674882 1.89574 0.949132 1.89574 1.28531C1.89574 1.62149 1.62149 1.89574 1.28531 1.89574Z" fill="black" />
                      <path d="M2.18772 3.15002H0.312201C0.125786 3.15002 -0.0252405 3.30105 0.021521 3.49694V10.448C-0.0252405 10.6249 0.125786 10.7766 0.312201 10.7639H2.18772C2.37413 10.7766 2.52516 10.6249 2.52516 10.4385V3.48747C2.52516 3.39797 2.48961 3.31214 2.42632 3.24886C2.36304 3.18558 2.27721 3.15002 2.18772 3.15002ZM1.91726 10.132H0.649642V3.82554H1.91726V10.132Z" fill="${
                        resume?.resumeStyle?.color
                          ? resume?.resumeStyle?.color
                          : " black"
                      }" />
                    </svg>
                    <span>${resume.profile?.linkedin} </span>
                  </div>`
                      : ""
                  }
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px 0">
          <table>
            <tr>
              <td style="
                  width:40%;
                  padding: 0 30px;
                  border-right: 1px solid ${
                    resume?.resumeStyle?.color
                      ? resume?.resumeStyle?.color
                      : " rgba(0, 0, 0, 0.47)"
                  } ; "
                  >
                  ${rearangeList
                    .map((item: any) => {
                      return `
                    ${
                      item?.cat === " education" && item?.showComp
                        ? ` 
                    <div class="summary-section">
                      <h2 style="font-size:calc(${
                        resume?.resumeStyle?.fontSize
                      }px * 0.75); font-weight:400; margin-bottom:calc(.5rem * 0.75); text-transform:uppercase; letter-spacing: calc(0.22em * 0.75);">${
                            item?.title
                          }</h2> 
                      ${item?.educationHistory
                        .map((item) => {
                          return ` 
                      <p>${item?.school} <br />${item?.startYear}-${
                            item?.stillWork ? "Present" : item?.endYear
                          } </p> `;
                        })
                        .join("")}
                      <div class="line"></div>
                    </div>`
                        : item?.cat === "skills" && item?.showComp
                        ? ` 
                    <div class="summary-section">
                      <h2 style="font-size:calc(${
                        resume?.resumeStyle?.fontSize
                      }px * 0.75); font-weight:400; margin-bottom:calc(.5rem * 0.75); text-transform:uppercase; letter-spacing: calc(0.22em * 0.75);">${
                            item?.title
                          }</h2>
                      <ul> ${item?.list
                        ?.map((skills: any) => ` <li>${skills}</li> `)
                        .join("")} </ul> 
                      <div class="line"></div>
                    </div>`
                        : item?.cat === "references" && item?.showComp
                        ? ` 
                    <div class="summary-section">
                      <h2 style="font-size:calc(${resume?.resumeStyle?.fontSize}px * 0.75); font-weight:400; margin-bottom:calc(.5rem * 0.75); text-transform:uppercase; letter-spacing: calc(0.22em * 0.75);">${item?.title}</h2>
                      <h4 style="
                        font-weight:600;
                        font-size: calc(12px * 0.75);
                        line-height: font-size: calc(13px * 1.333);
                        letter-spacing: font-size: calc(0.22em * 0.75);;
                        text-transform: capitalize;
                        margin-bottom:0;
                        margin-top: calc(20px * 0.75);
                      ">Reference 1</h5>
                      <h5 style="
                        font-weight:${resume?.resumeStyle?.fontWeight};
                        font-size: calc(12px * 0.75);
                        line-height: font-size: calc(12px * 1.333);
                        letter-spacing: font-size: calc(0.22em * 0.75);;
                        text-transform: capitalize;
                      ">${item?.personOne}:</h6>
                      <p>${item?.personeOneContact}</p>
                      <h4 style="
                        font-weight:600;
                        font-size: calc(12px * 0.75);
                        line-height: font-size: calc(13px * 1.333);
                        letter-spacing: font-size: calc(0.22em * 0.75);;
                        text-transform: capitalize;
                        margin-bottom:0;
                        margin-top: calc(20px * 0.75);
                      ">Reference 2</h5>
                      <h5 style="
                        font-weight:${resume?.resumeStyle?.fontWeight};
                        font-size: calc(12px * 0.75);
                        line-height: font-size: calc(12px * 1.333);
                        letter-spacing: font-size: calc(0.22em * 0.75);;
                        text-transform: capitalize;
                      ">${item?.personTwo}:</h6>
                      <p>${item?.personTwoContact}</p> 
                      <div class="line"></div>
                    </div>`
                        : ""
                    } `;
                    })
                    .join("")}
              </td>
              <td style="padding: 0 30px"> ${rearangeList
                .map((item: any) => {
                  return ` 
                ${
                  item?.cat === "workHistory" && item?.showComp
                    ? ` 
                <div class="summary-section">
                  <h2 style="font-size:calc(${
                    resume?.resumeStyle?.fontSize
                  }px * 0.75); font-weight:400; margin-bottom:calc(.5rem * 0.75); text-transform:uppercase; letter-spacing: calc(0.22em * 0.75);">${
                        item?.title
                      }</h2> 
                  ${item?.history
                    .map((item) => {
                      return ` 
                    <h6 style="font-weight:${resume?.resumeStyle?.fontWeight};">${item?.jobTitle}</h6>
                    <p>${item?.employer}</p>
                    <p>${item?.description}</p>
                  `;
                    })
                    .join("")} 
                  <div class="line"></div>
                </div>`
                    : item?.cat === "certification" && item?.showComp
                    ? ` 
                <div class="summary-section">
                  <h2 style="font-size:calc(${
                    resume?.resumeStyle?.fontSize
                  }px * 0.75); font-weight:400; margin-bottom:calc(.5rem * 0.75); text-transform:uppercase; letter-spacing: calc(0.22em * 0.75);">${
                        item?.title
                      }</h2> ${item?.certificate
                        .map((item) => {
                          return ` 
                  <h6 style="font-weight:${resume?.resumeStyle?.fontWeight};">${item?.certificateName}</h6>
                  <p> ${item?.authority} - ${item?.dateReceMonth}- ${item?.dateReceYear} </p>
                  <p>${item?.certificationLink}</p>
                  <p>${item?.description}</p>
                  <div class="line"></div>
                </div>`;
                        })
                        .join("")} `
                    : item?.cat === "publications" && item?.showComp
                    ? ` 
                <div class="summary-section">
                  <h2 style="font-size:calc(${
                    resume?.resumeStyle?.fontSize
                  }px * 0.75); font-weight:400; margin-bottom:calc(.5rem * 0.75); text-transform:uppercase; letter-spacing: calc(0.22em * 0.75);">${
                        item?.title
                      }</h2> 
                  ${item?.publicationList
                    .map((item) => {
                      return ` 
                  <h6 style="font-weight:${resume?.resumeStyle?.fontWeight};">${item?.title}</h6>
                  <p> ${item?.publisher} | ${item?.isbn}-${item?.dateReceMonth} - ${item?.dateReceYear} </p>
                  <p>${item?.description}</p>
                  <div class="line"></div>
                </div>`;
                    })
                    .join("")}`
                    : item?.cat === "hobbies" && item?.showComp
                    ? ` 
                <div class="summary-section">
                  <h2 style="font-size:calc(${
                    resume?.resumeStyle?.fontSize
                  }px * 0.75); font-weight:400; margin-bottom:calc(.5rem * 0.75); text-transform:uppercase; letter-spacing: calc(0.22em * 0.75);">${
                        item?.title
                      }</h2>
                  <ul style="float:left; width:100%"> ${item?.list
                    ?.map(
                      (hobbies: any) =>
                        ` <li style="float:left;width:50%">${hobbies}</li> `
                    )
                    .join("")} </ul>
                  <div class="line"></div>
                </div>`
                    : item?.cat === "languages" && item?.showComp
                    ? ` 
                <div class="summary-section">
                  <h2 style="font-size:calc(${
                    resume?.resumeStyle?.fontSize
                  }px * 0.75); font-weight:400; margin-bottom:calc(.5rem * 0.75); text-transform:uppercase; letter-spacing: calc(0.22em * 0.75);">${
                        item?.title
                      }</h2>
                  <ul style="float:left; width:100%"> ${item?.list
                    ?.map(
                      (languages: any) =>
                        ` <li style="float:left;width:50%">${languages}</li> `
                    )
                    .join("")} </ul>
                  <div class="line"></div>
                </div>`
                    : item?.cat === "customSection" && item?.showComp
                    ? `
                <div class="summary-section"> 
                  <h2 style="font-size:calc(${resume?.resumeStyle?.fontSize}px * 0.75); font-weight:400; margin-bottom:calc(.5rem * 0.75); text-transform:uppercase; letter-spacing: calc(0.22em * 0.75);">${item?.title}</h2>
                  <p>${item?.description}</p>
                  <div class="line"></div>
                </div>`
                    : item?.cat === "summary" && item?.showComp
                    ? ` 
                <div class="summary-section">  
                  <h2 style="font-size:calc(${resume?.resumeStyle?.fontSize}px * 0.75); font-weight:400; margin-bottom:calc(.5rem * 0.75); text-transform:uppercase; letter-spacing: calc(0.22em * 0.75);">${item?.title}</h2>
                  <p>${item?.description}</p>
                  <div class="line"></div>
                </div>`
                    : item?.cat === "achievements" && item?.showComp
                    ? ` 
                <div class="summary-section">  
                  <h2 style="font-size:calc(${resume?.resumeStyle?.fontSize}px * 0.75); font-weight:400; margin-bottom:calc(.5rem * 0.75); text-transform:uppercase; letter-spacing: calc(0.22em * 0.75);">${item?.title}</h2>
                  <p>${item?.description}</p> 
                  <div class="line"></div>
                </div>`
                    : ""
                } `;
                })
                .join("")}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};
