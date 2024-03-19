// @ts-nocheck
// @ts-ignore
import { StatusCodes } from "http-status-codes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import useFetch from "use-http";
import CreateCoverLetter from "../components/CreateCoverLetter";
import Google from "../components/Googleauth/GoogleAuth";
import {
  destroyLogin,
  getSubscriptionData,
  saveProfile,
} from "../store/action";
import { AllSetLazy, ResetPasswordLazy } from "../view/auth";
import CoverLetter from "../view/CoverLetter";
import CreateResumePage from "../view/CreateResume/CreateResume";
import CustomizeCoverLetter from "../view/CustomizeCoverLetter/CustomizeCoverLetter";
import CustomizeTemplate from "../view/CustomizeTemplate/CustomizeTemplate";
import DashboardPage from "../view/dashboard/dashboard";
import MyResume from "../view/MyResume";
import PricingPlan from "../view/PricingPlan";
import UserProfile from "../view/Profile/UserProfile";
import Setting from "../view/setting/setting";
import StripePaymentRedirect from "../view/StripePaymentRedirect";
import StripeSuccess from "../view/StripeSuccess";
import UpgradePlan from "../view/UpgradePlans";
import StripeFailure from "../view/StripeFailure";

export const MainRoutes = () => {
  const [userData,setUserData]=useState()
  const auth: any = useSelector((store: any) => store.auth);

  const { response, get, loading, data: repos } = useFetch();
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth.access_token) fetchMe();
  }, []);

  const fetchMe = async () => {
    const res = await get("user/me");
    setUserData(res?.data)
    const subscriptionData = await get("subscription/subscription-data");

    dispatch(getSubscriptionData(subscriptionData?.data));
    if (response.ok) {
      dispatch(saveProfile(res?.data));
    } else {
      switch (response.status) {
        case StatusCodes.FORBIDDEN:
          dispatch(destroyLogin());
          break;
      }
    }
  };
  // const auth: any = useSelector((store: any) => store.auth);
  // const navigate = useNavigate();

  if (auth.isLoggedIn) {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/dashboard"
            exact
            element={<Navigate to="/dashboard/my-resume" replace />}
          />
          <Route path="/dashboard/my-resume" element={<MyResume />} />
          <Route
            path="/dashboard/:resume_type"
            element={<CreateResumePage />}
          />
          <Route
            path="/dashboard/:resume_type/customize-template"
            element={<CustomizeTemplate userData={userData}/>}
          />
          <Route
            path="/cover-letter/customize-cover-letter"
            element={<CustomizeCoverLetter userData={userData}/>}
          />
          <Route path="/cover-letter" element={<CoverLetter />} />
          <Route
            path="/cover-letter/create-cover-letter"
            element={<CreateCoverLetter />}
          />
          <Route path="/reset-password" element={<ResetPasswordLazy />} />
          <Route path="/all-set" element={<AllSetLazy />} />
          <Route path="/pricing-plan" element={<PricingPlan />} />
          <Route path="/upgrade-plan" element={<UpgradePlan />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/my-profile" element={<UserProfile />} />
          <Route
            path="/stripe-intent-redirect"
            element={<StripePaymentRedirect />}
          />
          <Route
            path="/stripe-success/:checkout_id"
            element={<StripeSuccess />}
          />
          <Route
            path="/stripe-failure/:checkout_id"
            element={<StripeFailure />}
          />
          {/* <Route path="/">
            <Route path="/subscription-plans" element={<Plans />} />
            <Route path="/setting" element={<Setting />} />
            <Route
              path="/stripe-success/:checkout_id"
              element={<StripeSuccess />}
            />
            <Route
              path="/stripe-failure/:checkout_id"
              element={<StripeSuccess />}
            />
            <Route path={routes.login} element={<LoginLazyPage />} />
            <Route path={routes.signup} element={<SignupLazyPage />} />
            <Route path={routes.forgot_password} element={<ForgotLazyPage />} />
            <Route
              path={routes.reset_password}
              element={<ResetPasswordLazyPage />}
            /> */}

          <Route path="/" element={<PrivateRoutes />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/dashboard/my-resume"
            element={<Navigate to="/dashboard" replace />}
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route
            path="/dashboard/:resume_type"
            element={<CreateResumePage />}
          />
          <Route path="/auth" element={<Google />} />
          <Route
            path="/dashboard/:resume_type/customize-template"
            element={<CustomizeTemplate />}
          />
          <Route path="/cover-letter" element={<CoverLetter />} />
          <Route
            path="/cover-letter/customize-cover-letter"
            element={<CustomizeCoverLetter />}
          />
          <Route
            path="/cover-letter/create-cover-letter"
            element={<CreateCoverLetter />}
          />
          {/* <Route path={routes.login} element={<LoginLazyPage />} />
          <Route path={routes.signup} element={<SignupLazyPage />} />
          <Route path={routes.forgot_password} element={<ForgotLazyPage />} /> */}
          <Route
            path="/auth/reset-password/:email/:pin"
            element={<ResetPasswordLazy />}
          />
          <Route path="/all-set" element={<AllSetLazy />} />
          <Route path="/pricing-plan" element={<PricingPlan />} />

          {/* <Route path="/dashboard/my-resume" element={<MyResume />} /> */}
          {/* <Route path="/">
             <Route path="/subscription-plans" element={<Plans />} /> 
            <Route path="/setting" element={<Setting />} /> 
             <Route
              path="/stripe-success/:checkout_id"
              element={<StripeSuccess />}
            />
            <Route
              path="/stripe-failure/:checkout_id"
              element={<StripeSuccess />}
            /> 
            <Route path={routes.login} element={<LoginLazyPage />} />
            <Route path={routes.signup} element={<SignupLazyPage />} />
            <Route path={routes.forgot_password} element={<ForgotLazyPage />} />
            <Route
              path={routes.reset_password}
              element={<ResetPasswordLazyPage />}
            />
          </Route> */}
          {/* <Route path="/" element={<PrivateRoutes />} /> */}
        </Routes>
      </BrowserRouter>
    );
  }
};

const PrivateRoutes = () => {
  const auth: any = useSelector((store: any) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.isLoggedIn) navigate("/");
  }, [auth]);
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/dashboard/my-resume" replace />}
      />
      <Route path="/dashboard/my-resume" element={<CreateResumePage />} />
      <Route path="/cover-letter" element={<CoverLetter />} />
    </Routes>
  );
};
// const PrivateSubscriptionRoutes = () => {
//   const billingSelector = useSelector((state: any) => state.billing);
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (billingSelector?.user?.stripe_checkout_session_status === false)
//       navigate(routes.dashboard);
//   }, [billingSelector]);
//   return (
//     <Routes>
//       <Route path="/" element={<Navigate to="/subscription-plans" replace />} />
//       <Route path="/subscription-plans" element={<Plans />} />
//       <Route path="/stripe-success/:checkout_id" element={<StripeSuccess />} />
//       <Route path="/stripe-failure/:checkout_id" element={<StripeSuccess />} />
//       <Route path="*" element={<Navigate to="/subscription-plans" replace />} />
//     </Routes>
//   );
// };
// const PrivateSubscriptionRoutes = () => {
//   const billingSelector = useSelector((state: any) => state.billing);
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (billingSelector?.user?.stripe_checkout_session_status === false)
//       navigate(routes.dashboard);
//   }, [billingSelector]);
//   return (
//     <Routes>
//       <Route path="/" element={<Navigate to="/subscription-plans" replace />} />
//       <Route path="/subscription-plans" element={<Plans />} />
//       <Route path="/stripe-success/:checkout_id" element={<StripeSuccess />} />
//       <Route path="/stripe-failure/:checkout_id" element={<StripeSuccess />} />
//       <Route path="*" element={<Navigate to="/subscription-plans" replace />} />
//     </Routes>
//   );
// };
