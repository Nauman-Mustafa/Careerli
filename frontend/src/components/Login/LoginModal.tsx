import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react";
import { StatusCodes } from "http-status-codes";
import { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useFetch from "use-http";
import * as yup from "yup";
import forgetpasswordImage from "../../assets/images/forgetpassword.png";
import loginImage from "../../assets/images/login.png";
import signupImage from "../../assets/images/signup.png";
import { saveLogin } from "../../store/action";
import { ValidationError } from "../form/validation.component";
const schema = yup.object().shape({
  identifier: yup.string().email().label("Email or Username").required(),
  password: yup.string().label("Password").min(4).required(),
});
const schemaSignUp = yup.object().shape({
  email: yup.string().label("Email").email().required(),
  password: yup.string().label("Password").min(4).required(),
});
const schemaForgot = yup.object().shape({
  email: yup.string().label("Email").email().required(),
});

const LoginModal = ({ showModal, showModalHandler }: any) => {
  const { response, post, loading, data: repos, put } = useFetch();
  const [showAccount, setShowAccount] = useState({
    loginAccount: true,
    registerAccount: false,
    forgetPasswordAccount: false,
  });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [sErrors, setSErrors] = useState({});
  const [pathName, setPathName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
   
    setPathName(window.location.pathname);
  }, []);

  const {
    register: loginRegister,
    control: controlLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    register: signUpRegister,
    control: controlSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: { errors: errorsSignUp },
  } = useForm({
    resolver: yupResolver(schemaSignUp),
  });
  const {
    register: forgotRegister,
    control: controlForgot,
    handleSubmit: handleSubmitForgot,
    formState: { errors: errorsForgot },
  } = useForm({
    resolver: yupResolver(schemaForgot),
  });
  const auth: any = useSelector((store: any) => store.auth);
  const onSubmit = async (value: any) => {
   
    const res = await post("auth/login", value);
    if (response.ok) {
      dispatch(saveLogin(res.data));
      toast.success("Account logged in successfully!");
  
      window.location.reload();

      showModalHandler(false);
    } else {
      switch (response.status) {
        case StatusCodes.UNPROCESSABLE_ENTITY:
          setSErrors(response.data.errors);
          break;
        case StatusCodes.CONFLICT:
          setSErrors({ email: response.data.message });
          break;
        default:
          toast.error(response.data.message);
      }
    }
  };

  const history = useNavigate();
  const onSubmit2 = async (value: any) => {
   
    const res = await post("auth/signup", value);

    if (response.ok) {
      toast("Account registered successfully!");
     
      showModalHandler(false);
      setShowAccount({
        loginAccount: true,
        registerAccount: false,
        forgetPasswordAccount: false,
      });
    } else {
      switch (response.status) {
        case StatusCodes.UNPROCESSABLE_ENTITY:
          setSErrors(response.data.errors);
          break;
        case StatusCodes.CONFLICT:
          setSErrors({ email: response.data.message });
          break;
        default:
          toast.error(response.data.message);
      }
    }
  };

  const handleModalClose = () => showModalHandler(false);
  const handleForgetPassword = async (value: any) => {
    const res = await post("auth/forget-password", value);
    if (response.ok) {
      toast.success("Reset link is sent to your email!");
      // history("/auth/reset-password");
    } else {
      switch (response.status) {
        case StatusCodes.UNPROCESSABLE_ENTITY:
          setSErrors(response.data.errors);
          break;
        case StatusCodes.CONFLICT:
          setSErrors({ email: response.data.message });
          break;
        default:
          toast.error(response.data.message);
      }
    }
  
  };
  const LoginGoogle = () => {
    localStorage.setItem("location", JSON.stringify(pathName));
    window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/google`;
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={handleModalClose}
        centered
        className="resumeModal login-modal"
      >
        <div className="resume-modal-body">
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div
              className={
                showAccount.loginAccount
                  ? "login-container active"
                  : "login-container "
              }
            >
              <div className="d-flex align-items-center">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="At-LoginBoxOuter">
                        <div className="At-LoginBox">
                          <figure>
                            <img src={loginImage} alt="login image" />
                          </figure>
                          <h3 className="welcome mt-3">
                            <span>Log In</span>
                          </h3>
                          <p>Sign in to your account</p>
                          <form
                            className="At-LoginForm mt-5"
                            onSubmit={(e) => e.preventDefault()}
                          >
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="google-btn">
                                  <button
                                    className="btn-google"
                                    onClick={() => LoginGoogle()}
                                  >
                                    <Icon icon="flat-color-icons:google" />
                                    <span>Login with Google</span>
                                  </button>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label>Email address</label>
                                  <input
                                    type="text"
                                    placeholder="e.g: john@doe.com"
                                    {...loginRegister("identifier")}
                                    className="form-control"
                                  />
                                  <ValidationError
                                    name="identifier"
                                    errors={errorsLogin}
                                    sErrors={sErrors}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label>Password</label>
                                  <div className="position-relative">
                                    <input
                                      type={
                                        showLoginPassword ? "text" : "password"
                                      }
                                      placeholder={
                                        showLoginPassword
                                          ? "********"
                                          : "Password"
                                      }
                                      {...loginRegister("password")}
                                      className="form-control"
                                    />
                                    <div
                                      className="btn-password"
                                      style={{ top: "3px" }}
                                      onClick={(e) =>
                                        setShowLoginPassword(
                                          (showLoginPassword) =>
                                            !showLoginPassword
                                        )
                                      }
                                    >
                                      {showLoginPassword ? (
                                        <Icon icon="akar-icons:eye-open" />
                                      ) : (
                                        <Icon icon="akar-icons:eye-slashed" />
                                      )}
                                    </div>
                                  </div>
                                  <ValidationError
                                    name="password"
                                    errors={errorsLogin}
                                    sErrors={sErrors}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="d-flex justify-content-end mb-4">
                              <Link
                                to=""
                                onClick={() =>
                                  setShowAccount({
                                    loginAccount: false,
                                    registerAccount: false,
                                    forgetPasswordAccount: true,
                                  })
                                }
                                className="password text-end justify-content-end"
                              >
                                Forgot Password?
                              </Link>
                            </div>

                            <div className="d-flex justify-content-center">
                              <button
                                type="submit"
                                className="btn btn-yellow"
                                onClick={handleSubmitLogin(onSubmit)}
                              >
                                {loading ? (
                                  <Spinner animation="border" />
                                ) : (
                                  "Login"
                                )}
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      <h6 className="already mt-5 text-center">
                        Don’t have an account?
                        <button
                          onClick={() =>
                            setShowAccount({
                              loginAccount: false,
                              registerAccount: true,
                              forgetPasswordAccount: false,
                            })
                          }
                        >
                          Sign Up
                        </button>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                showAccount.registerAccount
                  ? "register-container active"
                  : "register-container "
              }
            >
              <div className="d-flex align-items-center">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="At-LoginBoxOuter">
                        <div className="At-LoginBox">
                          <figure>
                            <img src={signupImage} alt="signup image" />
                          </figure>
                          <h3 className="welcome mt-3">
                            <span>Sign Up</span>
                          </h3>
                          <p>Create an account</p>
                          <form
                            className="At-LoginForm mt-5"
                            onSubmit={handleSubmitSignUp(onSubmit2)}
                          >
                            <div className="row">
                              {/* <div className="col-lg-6">
                              <div className="form-group">
                                <label>First Name</label>
                                <input
                                  type="text"
                                  placeholder="John Doe"
                                  {...signUpRegister("firstName")}
                                  className="form-control"
                                />
                                <ValidationError
                                  name="firstName"
                                  errors={errorsSignUp}
                                  sErrors={sErrors}
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label>Last Name</label>
                                <input
                                  type="text"
                                  placeholder="John Doe"
                                  {...signUpRegister("lastName")}
                                  className="form-control"
                                />
                                <ValidationError
                                  name="lastName"
                                  errors={errorsSignUp}
                                  sErrors={sErrors}
                                />
                              </div>
                            </div> */}
                              <div className="col-lg-12">
                                <div className="google-btn">
                                  <button
                                    className="btn-google"
                                    onClick={() => {
                                      window.location.href = `${
                                        import.meta.env.VITE_BASE_URL
                                      }/auth/google`;
                                    }}
                                  >
                                    <Icon icon="flat-color-icons:google" />
                                    <span>Continue with Google</span>
                                  </button>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label>Email address</label>
                                  <input
                                    type="text"
                                    placeholder="e.g: john@doe.com"
                                    {...signUpRegister("email")}
                                    className="form-control"
                                  />
                                  <ValidationError
                                    name="email"
                                    errors={errorsSignUp}
                                    sErrors={sErrors}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label>Password</label>
                                  <div className="position-relative">
                                    <input
                                      type={
                                        showRegisterPassword
                                          ? "text"
                                          : "password"
                                      }
                                      placeholder={
                                        showRegisterPassword
                                          ? "********"
                                          : "Password"
                                      }
                                      {...signUpRegister("password")}
                                      className="form-control"
                                    />
                                    <div
                                      className="btn-password"
                                      style={{ top: "3px" }}
                                      onClick={() =>
                                        setShowRegisterPassword(
                                          (showRegisterPassword) =>
                                            !showRegisterPassword
                                        )
                                      }
                                    >
                                      {showRegisterPassword ? (
                                        <Icon icon="akar-icons:eye-open" />
                                      ) : (
                                        <Icon icon="akar-icons:eye-slashed" />
                                      )}
                                    </div>
                                  </div>
                                  <ValidationError
                                    name="password"
                                    errors={errorsSignUp}
                                    sErrors={sErrors}
                                  />
                                </div>
                              </div>
                              {/* <div className="col-lg-6">
                              <div className="form-group">
                                <label>Confirm Password</label>
                                <input
                                  type="password"
                                  placeholder="Password"
                                  {...signUpRegister("confirmPassword")}
                                  className="form-control"
                                />
                                <ValidationError
                                  name="confirmPassword"
                                  errors={errorsSignUp}
                                  sErrors={sErrors}
                                />
                              </div>
                            </div> */}
                            </div>

                            <div className="d-flex justify-content-center">
                              <button
                                type="submit"
                                className="btn btn-yellow"
                                onClick={handleSubmitSignUp(onSubmit2)}
                              >
                                {loading ? (
                                  <Spinner animation="border" />
                                ) : (
                                  "Sign Up"
                                )}
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      <h6 className="already mt-5 text-center">
                        Already have an account?
                        <button
                          onClick={() =>
                            setShowAccount({
                              loginAccount: true,
                              registerAccount: false,
                              forgetPasswordAccount: false,
                            })
                          }
                        >
                          Log In
                        </button>
                      </h6>
                      <h5>
                        By clicking “Sign Up”, agree to Careerli's{" "}
                        <a href="#">TOS</a> and <a href="#">Privacy Policy</a>.
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                showAccount.forgetPasswordAccount
                  ? "register-container active"
                  : "register-container "
              }
            >
              <div className="d-flex align-items-center">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="At-LoginBoxOuter">
                        <div className="At-LoginBox">
                          <figure>
                            <img
                              src={forgetpasswordImage}
                              alt="forgetpasswordImage image"
                            />
                          </figure>
                          <h3 className="welcome mt-3">
                            <span>Forgot Password?</span>
                          </h3>
                          <p>
                            Enter your email and we'll send you a reset link
                          </p>
                          <form className="At-LoginForm mt-5">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="form-group">
                                  <label>Your Email</label>
                                  <input
                                    type="text"
                                    placeholder="e.g: john@doe.com"
                                    {...forgotRegister("email")}
                                    className="form-control"
                                  />
                                  <ValidationError
                                    name="email"
                                    errors={errorsForgot}
                                    sErrors={sErrors}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="d-flex justify-content-center">
                              <button
                                type="submit"
                                className="btn btn-yellow"
                                onClick={handleSubmitForgot(
                                  handleForgetPassword
                                )}
                              >
                                {loading ? (
                                  <Spinner animation="border" />
                                ) : (
                                  "Reset Password"
                                )}
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      <h6 className="already mt-5 text-center">
                        Back to
                        <button
                          onClick={() =>
                            setShowAccount({
                              loginAccount: true,
                              registerAccount: false,
                              forgetPasswordAccount: false,
                            })
                          }
                        >
                          Log In
                        </button>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};

export default LoginModal;
