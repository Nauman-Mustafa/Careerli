import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useFetch from "use-http";
import * as yup from "yup";
import { ButtonCustom } from "../../../components/form/button.component";
import { ValidationError } from "../../../components/form/validation.component";
import { routes } from "../../../routes/routesConstants";

const schema = yup.object().shape({
  password: yup.string().label("Password").min(4).required(),
  confirmPassword: yup.string().label("Password").min(4).required(),
});

const ResetPasswordPage = () => {
  const { response, post, loading, data: repos } = useFetch();
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
    const res = await post("auth/verify-code", params);
    // console.log(res, "response");
    if (res?.status === "error") {
      toast.error(res.message);
      history(routes.forgot_password);
    }
  };

  const onSubmit = async (value: any) => {
    console.log(value);
    if (value.password !== value.confirmPassword)
      return setSErrors({ confirmPassword: "Password does not matched!" });
    const res = await post("auth/reset-password", { ...value, ...params });
    // console.log(res, "response");
    if (res?.status === "success") {
      toast.success(res?.message);
      history(routes.login);
    } else {
      toast.error(res?.message);
    }
  };

  return (
    <section className="At-SectionLoginForm">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="At-LoginLeft">
              <img src="images/1.png" alt="" className="images-grounp" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="At-LoginBoxOuter">
              <div className="At-LoginBox">
                <h3 className="welcome mt-5">Let's reset new password</h3>
                <form
                  className="At-LoginForm mt-5"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      {...register("password")}
                    />
                    <ValidationError
                      errors={errors}
                      sErrors={sErrors}
                      name="password"
                    />
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      {...register("confirmPassword")}
                    />
                    <ValidationError
                      errors={errors}
                      sErrors={sErrors}
                      name="confirmPassword"
                    />
                  </Form.Group>

                  <div className="mt-2">
                    <ButtonCustom
                      type="submit"
                      className="btn-primary btn-block"
                      onClick={handleSubmit(onSubmit)}
                      label={"Reset Password"}
                      loading={loading}
                    />
                  </div>
                </form>
              </div>
            </div>
            <h6 className="already mt-5">
              Already have an account?{" "}
              <Link to={routes.login} className="At-ForgetLink">
                Login
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
