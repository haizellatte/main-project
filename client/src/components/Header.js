import React, { useEffect } from "react";
import styled from "styled-components";
import {
  BREAKPOINTMOBILE,
  BREAKPOINTTABLET,
  BREAKPOINTMOBILE2,
} from "../../src/breakpoint";
import { Link, useNavigate } from "react-router-dom";
import postbox from "../asset/postbox.svg";
import axios from "axios";
import { getCookie } from "../pages/Certified/Cookie";

function Header({ isLogin }) {
  const navigate = useNavigate();

  //로그아웃 제출 버튼
  const onLogout = async () => {
    await axios
      .post(
        `/api/sendy/auth/logout`,
        {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
          Refresh: localStorage.getItem("refreshToken"),
        },
        {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "12",
        }
      )
      .then((res) => {
        console.log(res.body);
        navigate("/completeLogout");
      })
      .catch((err) => {
        console.log(err);
        alert("로그아웃에 실패하였습니다.");
      });
  };

  return (
    <>
      <HeaderComponent>
        <HeaderContainer>
          <Link to="/">
            <h1 className="logo">
              Sendy
              <img
                className="logo-img"
                src={require("../asset/작은편지.png")}
              />
            </h1>
          </Link>
          {isLogin ? (
            <div id="nav-container">
              <li>
                <Link to="/writeletter">Write</Link>
              </li>
              <li>
                <Link to="/letterbox">
                  <img className="postImg" src={postbox} />
                </Link>
              </li>
              <li>
                <Link to="/mypage">mypage</Link>
              </li>
              <li>
                <a onClick={() => onLogout}>Logout</a>
              </li>
            </div>
          ) : (
            <div id="nav-container">
              <li>
                <Link to="/login">Log in</Link>
              </li>
              <li>
                <Link to="/signup">Sign up</Link>
              </li>
            </div>
          )}
        </HeaderContainer>
      </HeaderComponent>
    </>
  );
}

export default Header;

const HeaderComponent = styled.header`
  align-items: center;
  background: #fcfbf4;
  border-bottom: 1px solid #312f2b;
  display: flex;
  width: 100%;
  height: 60px;
  position: sticky;
  z-index: 90;
  /* ~767까지 */
  @media screen and (max-width: ${BREAKPOINTMOBILE}px) {
    height: 50px;
  }
`;

const HeaderContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;
  margin: 0px 50px;
  width: 100vw;

  /* 768부터~ */
  @media screen and (min-width: ${BREAKPOINTTABLET}px) {
    margin: 0px 40px;
  }
  /* ~767까지 */
  @media screen and (max-width: ${BREAKPOINTMOBILE}px) {
    margin: 0px 25px;
  }

  .logo {
    padding: 0px 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Sriracha";
    font-size: 3.3rem;
    padding-bottom: 4px;

    /* 768부터~ */
    @media screen and (min-width: ${BREAKPOINTTABLET}px) {
      font-size: 2.8rem;
    }
    /* ~767까지 */
    @media screen and (max-width: ${BREAKPOINTMOBILE}px) {
      font-size: 2rem;
    }
  }

  .logo-img {
    display: inline-block;
    width: 22px;
    height: 16px;
    margin-left: 3px;

    /* ~767까지 */
    @media screen and (max-width: ${BREAKPOINTMOBILE}px) {
      width: 20px;
      height: 14px;
    }
  }

  #nav-container {
    display: flex;
    li {
      padding: 0px 20px;

      /* 768부터~ */
      @media screen and (min-width: ${BREAKPOINTTABLET}px) {
        padding: 0px 15px;
      }
      /* ~767까지 */
      @media screen and (max-width: ${BREAKPOINTMOBILE}px) {
        padding: 0px 10px;
      }
    }
    .postImg {
      width: 35px;
      padding-top: 2px;
    }
  }
  a {
    line-height: 36px;
    font-size: 1.9rem;
    color: #000000;
    font-family: "Inria Sans", sans-serif;
    cursor: pointer;

    /* 768부터~ */
    @media screen and (min-width: ${BREAKPOINTTABLET}px) {
      font-size: 1.6rem;
    }
    /* ~767까지 */
    @media screen and (max-width: ${BREAKPOINTMOBILE}px) {
      font-size: 1.2rem;
    }
  }
`;
