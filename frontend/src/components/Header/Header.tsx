import { Icon } from "@iconify/react";

import { useContext, useEffect, useMemo, useState } from "react";

import { Dropdown, Form } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import useFetch from "use-http";

import { svgIcons } from "../../assets/svg/svgIcons";

import { ThemeContext } from "../../contexts/theme-context";

import { destroyBilling, destroyLogin } from "../../store/action";

import LoginModal from "../Login/LoginModal";

import "./headerStyle.scss";

const Header = () => {
  const param = useParams();

  const { response, post, get, loading, data: repos } = useFetch();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const [modalShow, setModalShow] = useState(false);

  const [toggleActive, setToggleActive] = useState(false);

  const billingSelector = useSelector((state: any) => state.billing);

  const auth: any = useSelector((store: any) => store.auth);

  const [pricesData, setPricesData] = useState([]);

  const { theme, setTheme } = useContext(ThemeContext);

  const navMenu = useMemo(
    () => [
      { menuName: "Resume", to: "/dashboard" },

      { menuName: "Cover Letter", to: "/cover-letter" },

      {
        // Check if the user is logged in and doesn't have a current price ID
        // menuIcon:
        //   !billingSelector?.user?.curr_price_id && auth.isLoggedIn
        //     ? svgIcons.pricing // Render the crown icon if conditions are met
        //     : null,
        // to: !billingSelector?.user?.curr_price_id
        //   ? "/pricing-plan"
        //   : "/upgrade-plan", // Link destination
      },
    ],

    [billingSelector]
  );

  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 80);
    });
  }, []);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    const res = await get("subscription/stripe-config");

    setPricesData(res?.data?.prices);
  };

  const handleThemeChange = () => {
    const isCurrentDark = theme === "dark-mode";

    setTheme(isCurrentDark ? "light-mode" : "dark-mode");

    localStorage.setItem("theme", isCurrentDark ? "light-mode" : "dark-mode");
  };

  const filterData: any = () =>
    pricesData?.filter(
      (item: any) => item?.id === billingSelector?.user?.curr_price_id
    );

  const pathName = location.pathname.split("/")[2];

  const pathName2 = location.pathname.split("/")[1];
  return (
    <header className={scroll ? "header header-sticky" : "header"}>
      <div className="d-flex align-items-center justify-content-between container">
        <div className="logo">
          {svgIcons.logo}

          {/* <Link to="/dashboard">

            <Icon icon="akar-icons:arrow-left" />

            <span>Dashboard</span>

          </Link> */}

          {pathName ? (
            pathName === "dashboard" ||
            pathName === "my-resume" ||
            pathName === "reset-password" ? null : (
              <Link
                to={
                  pathName === "create-cover-letter"
                    ? "/cover-letter"
                    : "/dashboard"
                }
              >
                <Icon icon="akar-icons:arrow-left" />

                <span>Dashboard</span>
              </Link>
            )
          ) : null}

          {pathName2 ? (
            pathName2 === "my-profile" ? (
              <Link to="/dashboard">
                <Icon icon="akar-icons:arrow-left" />

                <span>Dashboard</span>
              </Link>
            ) : null
          ) : null}
        </div>

        {pathName === "/reset-password" ? null : (
          <>
            <div className={toggleActive ? "nav-menu active-menu" : "nav-menu"}>
              <ul>
                {navMenu.map((item, i) => (
                  <li key={`menu-item-${i}`}>
                    {/* Render NavLink if menuName exists */}

                    {item.menuName && (
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "active-item menu-item" : "menu-item"
                        }
                        to={item.to}
                      >
                        {item.menuName}
                      </NavLink>
                    )}

                    {/* Render button with icon if menuIcon exists */}

                    {/* {item.menuIcon && (

                      <button

                        className="btn btn-yellow"

                        onClick={() => navigate(item.to)}

                      >

                        {item.menuIcon}

                      </button>

                    )} */}
                  </li>
                ))}
              </ul>
            </div>

            <div className="header-right">
              {!billingSelector?.user?.curr_price_id && auth.isLoggedIn ? (
                <button
                  className="btn btn-yellow"
                  onClick={() =>
                    navigate(
                      !billingSelector?.user?.curr_price_id
                        ? "/pricing-plan"
                        : "/upgrade-plan"
                    )
                  }
                >
                  {svgIcons.pricing}
                </button>
              ) : null}

              {auth?.isLoggedIn && billingSelector?.user?.curr_price_id && (
                <>
                  {filterData() ? (
                    <button
                      className="btn btn-yellow"
                      onClick={() => navigate("/upgrade-plan")}
                    >
                      {svgIcons.crown}
                    </button>
                  ) : filterData() &&
                    filterData()[0]?.product?.name === "Free" ? (
                    <button
                      className="btn btn-yellow"
                      onClick={() => navigate("/upgrade-plan")}
                    >
                      <Icon icon="ph:star-four-bold" />

                      <span>Upgrade to Pro</span>
                    </button>
                  ) : null}
                </>
              )}
              {auth?.isLoggedIn && (
                <div className="user-profile">
                  <Dropdown align="end" onClick={(e) => e.stopPropagation()}>
                    <Dropdown.Toggle
                      id="dropdown-custom-components"
                      className="down-arrow"
                    >
                      <figure>
                        <Icon icon="ph:user-circle-light" />
                      </figure>

                      <Icon icon="ph:caret-down" className="caret-down" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <button
                        className="btn"
                        onClick={() => navigate("/my-profile")}
                      >
                        <Icon icon="ph:user-circle" />

                        <span>My Profile</span>
                      </button>

                      <button
                        className="btn btn-linen"
                        onClick={() => {
                          dispatch(destroyLogin());

                          dispatch(destroyBilling());

                          navigate("/dashboard");
                        }}
                      >
                        <Icon icon="ri:logout-box-line" />

                        <span>Logout</span>
                      </button>

                      {/* {billingSelector?.user?.curr_price_id ? (

                          <button

                            className="btn btn-linen"

                            onClick={() => {

                              navigate("/setting");

                            }}

                          >

                            <span>Setting</span>

                          </button>

                        ) : null} */}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}
              {!auth?.isLoggedIn && (
                <>
                  <button
                    className="btn btn-linen"
                    onClick={() => setModalShow(true)}
                  >
                    <Icon icon="fe:login" />

                    <span>Login</span>
                  </button>
                </>
              )}

              <button
                className={toggleActive ? "btn-toggle active" : "btn-toggle"}
                onClick={() => setToggleActive((toggleActive) => !toggleActive)}
              >
                <Icon icon="charm:menu-hamburger" />
              </button>
            </div>
          </>
        )}
      </div>

      <div
        className={
          pathName === "/dashboard" || "/reset-password"
            ? "d-none"
            : "color-mode"
        }
      >
        <Form onClick={handleThemeChange}>
          <Form.Check type="switch" id="custom-switch" label="Theme Mode" />
        </Form>
      </div>

      <LoginModal showModal={modalShow} showModalHandler={setModalShow} />
    </header>
  );
};

export default Header;
