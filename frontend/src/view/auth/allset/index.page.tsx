import { useState } from "react";
import * as yup from "yup";
import forgetpasswordImage from "../../../assets/images/forgetpassword.png";
import Header from "../../../components/Header/Header";
import LoginModal from "../../../components/Login/LoginModal";
const schema = yup.object().shape({
  password: yup.string().label("Password").min(4).required(),
  confirmPassword: yup.string().label("Password").min(4).required(),
});

const ResetPassword = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-8">
              <section className="At-SectionLoginForm">
                <div className="At-LoginLeft" style={{ textAlign: "center" }}>
                  <img
                    src={forgetpasswordImage}
                    alt=""
                    className="images-grounp"
                  />
                </div>
                <div className="At-LoginBoxOuter">
                  <div className="At-LoginBox">
                    <h3 className="welcome mt-3">You’re all set!</h3>
                    <div className="description">
                      If an account exists for abc@gmail.com, you will get an
                      email with instructions on resetting your password. If it
                      doesn’t arrive, be sure to check your spam folder.
                    </div>
                    <h6 className="already mt-5">
                      Back to
                      <button onClick={() => setModalShow(true)}>Login</button>
                    </h6>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <LoginModal showModal={modalShow} showModalHandler={setModalShow} />
    </>
  );
};

export default ResetPassword;
