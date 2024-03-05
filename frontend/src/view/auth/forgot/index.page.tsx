import { yupResolver } from "@hookform/resolvers/yup";
import { StatusCodes } from "http-status-codes";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useFetch from "use-http";
import * as yup from "yup";
import { ButtonCustom } from "../../../components/form/button.component";
import { ValidationError } from "../../../components/form/validation.component";
import { routes } from "../../../routes/routesConstants";

const schema = yup.object().shape({
  email: yup.string().email().label("Email or Username").required(),
});

const ForgotPasswordPage = () => {
  const { response, post, loading, data: repos } = useFetch();

  const [sErrors, setSErrors] = useState({});
  const history = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (value: any) => {
    const res = await post("auth/forget-password", value);
    if (response.ok) {
      toast.success("Reset link is sent!");
      history("/");
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

  console.log(errors);

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
                <h3 className="welcome mt-5">Forget Password</h3>
                <form
                  className="At-LoginForm mt-5"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Form.Group controlId="email" className="mt-2">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g: john@doe.com"
                      {...register("email")}
                    />
                    <ValidationError
                      name="email"
                      errors={errors}
                      sErrors={sErrors}
                    />
                  </Form.Group>

                  <div className="mt-2">
                    <ButtonCustom
                      type="submit"
                      className="btn-primary btn-block"
                      onClick={handleSubmit(onSubmit)}
                      label={"Send Link"}
                      loading={loading}
                    />
                  </div>
                </form>
              </div>
            </div>
            <h6 className="already mt-5">
              Already have an account?
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

export default ForgotPasswordPage;
