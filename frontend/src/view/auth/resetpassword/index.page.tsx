import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useFetch from "use-http";
import * as yup from "yup";
import forgetpasswordImage from "../../../assets/images/forgetpassword.png";
import { ValidationError } from "../../../components/form/validation.component";
import Header from "../../../components/Header/Header";
import LoginModal from "../../../components/Login/LoginModal";
const schema = yup.object().shape({
  password: yup.string().label("Password").min(4).required(),
  confirmPassword: yup.string().label("Password").min(4).required(),
});

const ResetPassword = () => {
  const { response, post, loading, data: repos } = useFetch();
  const [showPassword, setShowPassword] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [sErrors, setSErrors] = useState({});
  const params = useParams();
  const history = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    verifyCode();
  }, []);
  // console.log(params);
  const verifyCode = async () => {
    console.log(params, "params");
    const res = await post("auth/verify-code", params);
    console.log(res, "response");
    if (res?.status === "error") {
      toast.error(res.message);
      // history(routes.forgot_password);
    }
  };

  const onSubmit = async (value: any) => {
    if (value.password !== value.confirmPassword)
      return setSErrors({ confirmPassword: "Password does not matched!" });
    const res = await post("auth/reset-password", { ...value, ...params });
    // console.log(res, "response");
    if (res?.status === "success") {
      toast.success(res?.message);
      history("/");
    } else {
      toast.error(res?.message);
    }
  };

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
                    <h3 className="welcome mt-5">Forgot Password?</h3>
                    <p>Enter your email and we’ll send you a reset link</p>
                    <form
                      className="At-LoginForm mt-5"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Password</label>
                            <input
                              type={showPassword ? "text" : "password"}
                              placeholder={
                                showPassword ? "********" : "Password"
                              }
                              {...register("password")}
                              className="form-control"
                            />
                            <div
                              className="btn-password"
                              onClick={(e) =>
                                setShowPassword((showPassword) => !showPassword)
                              }
                            >
                              {showPassword ? (
                                <Icon icon="akar-icons:eye-open" />
                              ) : (
                                <Icon icon="akar-icons:eye-slashed" />
                              )}
                            </div>
                            <ValidationError
                              name="password"
                              errors={errors.password}
                              sErrors={sErrors}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder={
                                showConfirmPassword
                                  ? "********"
                                  : "Confirm Password"
                              }
                              {...register("confirmPassword")}
                              className="form-control"
                            />
                            <div
                              className="btn-password"
                              onClick={(e) =>
                                setShowConfirmPassword(
                                  (showConfirmPassword) => !showConfirmPassword
                                )
                              }
                            >
                              {showConfirmPassword ? (
                                <Icon icon="akar-icons:eye-open" />
                              ) : (
                                <Icon icon="akar-icons:eye-slashed" />
                              )}
                            </div>
                            <ValidationError
                              name="password"
                              errors={errors.confirmPassword}
                              sErrors={sErrors}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center mt-3">
                        <button
                          type="submit"
                          className="btn btn-yellow"
                          onClick={handleSubmit(onSubmit)}
                        >
                          Reset Password
                        </button>
                      </div>
                    </form>
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
