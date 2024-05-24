import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = ({ setLoggedIn, setUsername }) => {
  const [username, setUsernameState] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const onButtonClick = () => {
    setUsernameError("");
    setPasswordError("");

    if (username === "") {
      setUsernameError("아이디를 입력해주세요.");
      return;
    }

    if (password === "") {
      setPasswordError("비밀번호를 입력해주세요.");
      return;
    }

    registerAccount();
  };

  const registerAccount = () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    axios.post("http://192.168.2.1:8082/admin/join", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(response => {
      const r = response.data;
      if (r.message === "success") {
        // 회원가입 성공 시 로그인 페이지로 이동
        navigate("/login");
      } else {
        window.alert("회원가입 실패: " + r.error);
      }
    })
    .catch(err => {
      console.error("회원가입 실패:", err);
      window.alert("회원가입 요청에 문제가 있습니다.");
    });
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>회원가입</div>
      </div>
      <br />
      <div className="inputContainer">
        <input
          value={username}
          placeholder="아이디를 입력해주세요."
          onChange={ev => setUsernameState(ev.target.value)}
          className="inputBox"
        />
        <label className="errorLabel">{usernameError}</label>
      </div>
      <br />
      <div className="inputContainer">
        <input
          type="password"
          value={password}
          placeholder="비밀번호를 입력해주세요."
          onChange={ev => setPassword(ev.target.value)}
          className="inputBox"
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className="inputContainer">
        <input
          className="inputButton"
          type="button"
          onClick={onButtonClick}
          value="회원가입"
        />
      </div>
    </div>
  );
};

export default SignUp;
