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
  firstName: yup.string().label("First name").required(),
  lastName: yup.string().label("Last name").required(),
  email: yup.string().label("Email").email().required(),
  password: yup.string().label("Password").min(4).required(),
  confirmPassword: yup.string().label("Confirm Password").min(4).required(),
});

const SignupPage = () => {
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
    const res = await post("auth/signup", value);
    // console.log(response, "response is here");
    if (response.ok) {
      toast("Account registered successfully!");
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

  // console.log(errors);

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
                <h3 className="welcome mt-5">
                  <span style={{ color: "#5F4BDB" }}>welcome,</span>
                  <br />
                  Please register your account.
                </h3>
                <form
                  className="At-LoginForm mt-5"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Form.Group controlId="firstName" className="mt-2">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="John"
                      {...register("firstName")}
                    />
                    <ValidationError
                      name="firstName"
                      errors={errors}
                      sErrors={sErrors}
                    />
                  </Form.Group>

                  <Form.Group controlId="lastName" className="mt-2">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Doe"
                      {...register("lastName")}
                    />
                    <ValidationError
                      name="lastName"
                      errors={errors}
                      sErrors={sErrors}
                    />
                  </Form.Group>

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

                  <Form.Group controlId="password" className="mt-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      {...register("password")}
                    />
                    <ValidationError
                      name="password"
                      errors={errors}
                      sErrors={sErrors}
                    />
                  </Form.Group>

                  <Form.Group controlId="confirmPassword" className="mt-2">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      {...register("confirmPassword")}
                    />
                    <ValidationError
                      name="confirmPassword"
                      errors={errors}
                      sErrors={sErrors}
                    />
                  </Form.Group>

                  <ButtonCustom
                    type="submit"
                    className="btn-primary btn-block"
                    onClick={handleSubmit(onSubmit)}
                    label={"Singup"}
                    loading={loading}
                  />
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

export default SignupPage;
