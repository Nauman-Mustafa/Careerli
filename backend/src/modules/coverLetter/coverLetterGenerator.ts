export const FirstCoverLetter = (data) => {
  function dateFormat(ts: any): String {
    return new Date(ts).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Creative Template</title>
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">

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
          }
          
          h1,
          h2,
          h3,
          h4,
          h5,
          h6{
            margin-top: 0;
            margin-bottom: 0.5rem;
          }
          
          body {
            padding: 0;
            margin: 0;
            font-size:calc(14px * 0.75);
            font-family: ${
              data?.coverStyle?.fontFamily ?  data?.coverStyle?.fontFamily : "'Lato', sans-serif"
            }
          }
    
          p {
            margin-bottom: 0px;
            font-size: calc(14px * 0.75);
            line-height: calc(14px * 1.333);
            font-weight: 400;
            margin-top: 0px;
            letter-spacing: calc(1px * 0.75);
          }
    
          .Top-Header {
            height: 22.5pt;
            width: 100%;
            background: #ffd647;
          }
    
          .Heading h1 {
            font-size: 22.5pt;
            font-weight: 900;
            line-height: 30px;
            text-transform:capitalize;
          }
    
          .infromation-div {
            margin-left: auto;
            position: relative;
          }
    
          .Latter-Date p {
            letter-spacing: calc(1px * 0.75);
          }
    
    
          .paragraph p {
            margin-top: calc(20px * 0.75);
          }
          .Regards-text{
            margin: calc(30px * 0.75) 0px calc(5px * 0.75);
          }
          .Regards-text{
            margin: calc(30px * 0.75) 0px calc(5px * 0.75);
          }
          .Regards-text p {
            font-size: calc(10px * 0.75);
          }
    
         
          .paragraph-text p,
          .paragraph-text p span,
          .paragraph-text h1,
          .paragraph-text h2,
          .paragraph-text h3,
          .paragraph-text h4,
          .paragraph-text h5,
          .paragraph-text h6,
          .paragraph-text ul,
          .paragraph-text span,
          .paragraph-text ul li {
            font-size:calc(14px * 0.75) !important;
            font-weight:inherit !important;
            line-height:inherit !important;
            letter-spacing:normal !important;
            font-family: inherit !important;
            color: #2e2e2e !important;
            margin-bottom: 0px !important;
            letter-spacing: normal !important;
            background-color: inherit !important;
          }
          .paragraph-text ul{
            padding-left:18px;
          }
        </style>
      </head>
    
      <body style="margin:0">
        <div class="creative-resume-template">
          <div class="resume-container" style=" font-family: ${data?.coverStyle?.fontFamily}">
            <table style="width: 100%">
              <tr>
                <td colspan="2">
                  <div class="Top-Header" style=" background-color: ${
                    data?.coverStyle?.backgroundColor
                  }"></div>
                </td>
              </tr>
              <tr>
                <td style="padding: calc(30px * 0.75);">
                  <h1 style="
                    text-transform: capitalize; 
                    color: ${data?.coverStyle?.color};
                    font-weight: ${data?.coverStyle?.fontWeight};
                    font-size: calc(${data?.coverStyle?.fontSize}px * 0.75);
                    ">
                  ${data?.profile?.firstName ? data?.profile?.firstName : ""} ${data?.profile?.lastName ? data?.profile?.lastName : ""}</h1>
                </td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 0px calc(30px * 0.75);text-align:right">
                  <div class="infromation-div" style="text-align:left; display:inline-block">
                    ${
                      data?.profile?.websiteLink
                        ? `<p>${data?.profile?.websiteLink}</p>`
                        : ""
                    }
                    ${data?.profile?.email ? `<p>${data?.profile?.email}</p>` : ""}
                    ${data?.profile?.phone ? `<p>${data?.profile?.phone}</p>` : ""}</p>
                    ${data?.profile?.city || data?.profile?.postalCode ? `<p>${data?.profile?.city}, ${data?.profile?.postalCode}</p>` : ""}
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 0px calc(30px * 0.75)">
                  <div class="Letter-header">
                    ${dateFormat(data?.profile?.date)? 
                      `<p style="color: #2e2e2e;
                        font-size: calc(14px * 0.75);
                        font-weight: 400;
                        text-transform: capitalize;margin:0">
                          ${dateFormat(data?.profile?.date)}
                        </p>`
                      : ""
                    }
                    ${
                      data?.receipient?.firstName
                      ? 
                      `<p style="margin-top:16px">
                        ${data?.receipient?.firstName }</p>`
                        : ""
                    }
                    
                    ${
                      data?.receipient?.positionHeld
                        ? 
                        `<p>${data?.receipient?.positionHeld}</p>`
                        : ""
                    }
                    ${
                      data?.receipient?.companyName
                        ? `<p>${data?.receipient?.companyName}</p>`
                        : ""
                    }
                    ${
                      data?.receipient?.companyAddress || data?.receipient?.postalCode 
                        ? `<p>${data?.receipient?.companyAddress},${data?.receipient?.postalCode}</p>`
                        : ""
                    }
                  </div>
                  <div style="margin-top: 15pt">
                    <p>Dear, ${
                      data?.introduction?.title ? data?.introduction?.title : ""
                    }
                    ${data?.receipient?.firstName ? data?.receipient?.firstName : ""}
                    ${data?.receipient?.lastName ? data?.receipient?.lastName : ""}
                    </p>
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2" style="padding:calc(30px * 0.75)">
                  <div class="paragraph">
                    <div class="paragraph-text" style="font-size:calc(14px * 0.75) !important;">
                     ${
                       data?.introduction?.opener
                         ? data?.introduction?.opener
                         : ""
                     }
                    </div>
                    <div class="paragraph-text" style="font-size:calc(14px * 0.75)  !important;">
                     ${data?.body ? data?.body : ""}
                    </div>
                    <div class="paragraph-text" style="font-size:calc(14px * 0.75) !important;">
                      ${
                        data?.closing?.closingData
                          ? data?.closing?.closingData
                          : ""
                      }
                    </div>
                  </div>
                  <div class="Regards-text">
                    <p style="font-size: calc(14px * 0.75);
                    font-weight: normal;
                    text-transform: capitalize; margin:0">${
                      data?.closing?.signing ? data?.closing?.signing : ""
                    }</p>
                  </div>
                  <h5 style="margin-top:0; text-transform:capitalize; color: ${data?.coverStyle?.color};
                    color: #888888;
                    font-size: calc(14px * 0.75);
                    font-weight: normal;
                  ">${
                    data?.profile?.firstName ? data?.profile?.firstName : "Mark"
                  } ${data?.profile?.lastName ? data?.profile?.lastName : "Smit"}</h5>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <script src="https://code.iconify.design/iconify-icon/1.0.1/iconify-icon.min.js"></script>
      </body>
    </html>
    
    
    `;
};

export const SecondCoverLetter = (data) => {
  function dateFormat(ts: any): String {
    return new Date(ts).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  return `
    <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Creative Template</title>
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">

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
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
      margin-bottom: 0px;
    }

    body {
      padding: 0;
      margin: 0;
      color: #2e2e2e;
      font-family: ${
        data?.coverStyle?.fontFamily ?  data?.coverStyle?.fontFamily : "'Lato', sans-serif"
      }
    }
    td{
      vertical-align:top;
    }
    .resume-container{
      padding:0 10% 3rem;
      background-color:#fff;
    }
    .second-cover-letter {
      position: relative;
      width: calc(40px * 0.75);
      height: calc(150px * 0.75);
      background: #000000;
      margin-left: auto;
    }

   

    p {
      margin-bottom: 0px;
      font-size: calc(14px * 0.75);
      line-height: 16.5px;
      font-weight: 400;
      color: #2e2e2e;
      letter-spacing: calc(1px * 0.75);
      margin-top: 0px;
    }

    span {
      font-weight: 600;
    }

    .bottom-div {
      height: 2px;
      width: 100%;
      margin-top: calc(20px * 0.75);
    }

    .innter-content {
      padding: 11.25px 0;

    }

    .innter-content h2 {
      font-size: calc(18px * 0.75);
      font-weight: ${data?.coverStyle?.fontWeight};
      line-height: 25px;
      letter-spacing: calc(1px * 0.75);
      color: ${data?.coverStyle?.color};
    }
    

    .innter-content .Name-Test {
      margin-top: calc(40px * 0.75);
      margin-bottom: calc(16px * 0.75);
    }

    .paragraph p {
      margin-top: calc(20px * 0.75);
    }
    .body-content p {
      maegin-bottom:calc(16px * 0.75);
    }
    .Regards-text{
      margin: 30px 0px 5px;
    }
    .Regards-text p {
      font-size: calc(16px * 0.75);
      margin:0;
    }
    h5 {
      color: #888888;
      font-size: calc(14px * 0.75);
      font-weight: normal;
      text-transform: capitalize;
      margin:0;
    }
 
    .paragraph-text p,
    .paragraph-text p span,
    .paragraph-text h1,
    .paragraph-text h2,
    .paragraph-text h3,
    .paragraph-text h4,
    .paragraph-text h5,
    .paragraph-text h6,
    .paragraph-text ul,
    .paragraph-text span,
    .paragraph-text ul li {
      font-size:calc(14px * 0.75) !important;
      font-weight:inherit !important;
      line-height:inherit !important;
      letter-spacing:normal !important;
      font-family: inherit !important;
      color: #2e2e2e !important;
      margin-bottom: 0px !important;
      letter-spacing: normal !important;
      background-color: inherit !important;
    }
    .paragraph-text ul{
      padding-left:18px;
    }
    .info-p p{
      font-size:calc(12px * 0.75)
    }
  </style>
</head>

<body  style="margin:0;padding:0">
  <div class="creative-resume-template">
    <div class="resume-container">
      <table style="width: 100%">
        <tr>
          <td colspan="2">
            <div class="second-cover-letter" style=" background-color: ${
              data?.coverStyle?.backgroundColor
            }"></div>
          </td>
        </tr>
        <tr>
          <td>
            <h1 style="
              margin-top: 0px; 
              color: ${data?.coverStyle?.color};
              text-transform:capitalize;
              line-height:calc(${data?.coverStyle?.fontSize}px * 1);
              letter-spacing:calc(3px * 0.75);
              font-weight: ${data?.coverStyle?.fontWeight};
              font-size: calc(${data?.coverStyle?.fontSize}px * 0.75);
              margin:0;
              padding-bottom:calc(8px * 0.75);
            "> 
              ${data?.profile?.firstName ? data?.profile?.firstName : "MARK"} <br /> ${data?.profile?.lastName ? data?.profile?.lastName : ""} 
            </h1>
          </td>
        </tr>
        <tr>
          <td style="width: 100%; padding:calc(32px * 0.75) 0 calc(10px * 0.75); border-bottom: 1px solid #000000;">
            <table style="width: 100%; border-collapse: collapse; padding-bottom: calc(20px * 0.75);">
              <tr class="info-p">
                <td style=" width:33.33%" >
                  <div style="display:inline-block;">
                    ${data?.profile?.email ? 
                      `<p>
                        <span style="display:inline-block ;">Email:</span> 
                        ${data?.profile?.email}
                      </p>` : ""
                    }
                  </div> 
                </td>
                <td style="width:33.33%" >
                  <div  style="display:inline-block ;">
                    ${data?.profile?.phone ? `<p>
                      <span style="display:inline-block ;">Phone Number:</span> 
                      ${data?.profile?.phone}</p>` : ""}
                    
                    ${data?.profile?.city || data?.profile?.postalCode ? 
                      `<p>
                        <span style="display:inline-block ;">Address:</span> 
                          ${data?.profile?.city}, ${data?.profile?.postalCode}
                      </p>` : ""
                    }
                    
                  </div>
                </td>
                <td style="width:33.33%" >
                  <div style="display:inline-block ;">
                    ${
                      data?.profile?.websiteLink
                        ? `<p><span  style="display:inline-block ;">Website:</span> ${data?.profile?.websiteLink}</p>`
                        : ""
                    }
                  </div>
                </td>
              </tr>
            </td>
          </table>
        </tr>
        <tr>
          <td class="innter-content" style="width: 100%; padding:calc(20px * 0.75)">
            <h2>${dateFormat(data?.profile?.date)}</h2>
            ${
              data?.receipient?.firstName
                ? `<p>${data?.receipient?.firstName}</p>`
                : ""
            }
            ${
              data?.receipient?.companyName
                ? `<p>${data?.receipient?.companyName}</p>`
                : ""
            }
              ${
                data?.receipient?.positionHeld
                  ? `<p>${data?.receipient?.positionHeld}</p>`
                  : ""
              }
          
              ${
                data?.receipient?.companyAddress || data?.receipient?.postalCode
                  ? `<p>${data?.receipient?.companyAddress}, ${data?.receipient?.postalCode}</p>`
                  : ""
              }
              
            <div class="Name-Test">
              <p>
                Dear, ${data?.introduction?.title ? data?.introduction?.title : ""}
                ${data?.receipient?.firstName ? data?.receipient?.firstName : ""}
              </p>
            </div>   
            <div class="paragraph">
              <div class="paragraph-text">
                ${data?.introduction?.opener ? data?.introduction?.opener : ""}
              </div>
              <div class="paragraph-text">
                ${data?.body ? data?.body : ""}
              </div>
              <div class="paragraph-text">
                ${data?.closing?.closingData ? data?.closing?.closingData : ""}
              </div>
            </div>
            <div class="Regards-text">
              <p>${
                data?.closing?.signing ? data?.closing?.signing : ""
              }</p>
            </div>
            <h5>${
              data?.profile?.firstName ? data?.profile?.firstName : "Mark"
            } ${data?.profile?.lastName ? data?.profile?.lastName : "Smit"}</h5>
          </td>
        </tr>
      </table>
    </div>
  </div>
  <script src="https://code.iconify.design/iconify-icon/1.0.1/iconify-icon.min.js"></script>
</body>

</html>
    `;
};
