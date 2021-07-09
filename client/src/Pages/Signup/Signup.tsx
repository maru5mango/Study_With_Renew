import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Title from '../../Components/Common/Title';
import SelectBox from '../../Components/Common/SelectBox';
import Button from '../../Components/Common/Button';
import InputBox from '../../Components/Common/InputBox';
import { LevelData } from '../../Components/Common/OptionData';
import { USER_SERVER } from '../../Config';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const SignupSection = styled.section`
  .signupWrapper {
    margin: 0 auto;
    width: 100%;
    max-width: 530px;
    padding: 80px 0 140px;

    .formWrapper {
      margin-top: 28px;
    }
  }
`;

const SignupForm = styled.form`
  padding: 0.2rem;

  li {
    display: flex;
    margin-bottom: 10px;
  }

  li label {
    padding-top: 10px;
    font-size: 11px;
    width: 95px;
    color: ${(props) => props.theme.palette.gray};
    line-height: 1.5;
  }

  li .inputWrapper {
    padding-bottom: 20px;
    width: 414px;
    .selectArea {
      display: flex;
      justify-content: center;
      margin-left: 0.8rem;
    }
    .resultText {
      font-size: 10px;
      color: ${(props) => props.theme.palette.orange};
      padding-left: 0.5rem;
    }
  }

  .btnWrapper {
    text-align: center;
  }
`;

function Signup() {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [NicknameAvailable, setNicknameAbailable] = useState(false);
  const [pos, setPos] = useState('');
  const [level, setLevel] = useState('');
  const [levelText, setLevelText] = useState('');

  const location = useLocation();
  const Obj: any = location.state;

  useEffect(() => {
    const Item = LevelData.find((item) => item.value === level && item);
    {
      Item && setLevelText(Item.text);
    }
  }, [level]);

  useEffect(() => {
    setEmail(Obj.email);
  }, [Obj]);

  const CheckNickname = () => {
    if (nickname.length == 0) {
      alert('닉네임을 입력해주세요.');
      return false;
    }
    if (nickname.includes(' ')) {
      alert('닉네임은 뛰어쓰기가 불가능합니다.');
      return false;
    }
    axios
      .post(`${USER_SERVER}/nickname`, { nickname: nickname })
      .then((response) => {
        if (response.data.success) {
          setNicknameAbailable(response.data.nickname);
        } else {
          alert('사용 불가능한 닉네임입니다. 다른 닉네임을 입력해주세요.');
          setNickname('');
          setNicknameAbailable(false);
        }
      });
  };
  const resetNickname = () => {
    setNickname('');
    setNicknameAbailable(false);
  };

  const onSubmit = () => {
    if (!NicknameAvailable) {
      alert('닉네임 중복 확인을 해주세요.');
      return false;
    }
    if (pos == '') {
      alert('분야를 선택해주세요.');
      return false;
    }
    if (level == '') {
      alert('실력을 선택해주세요.');
      return false;
    }
    const formdata = {
      email: email,
      nickname: nickname,
      position: pos,
      positionLevel: level,
    };
    axios.post(`${USER_SERVER}/signup`, formdata).then((response) => {
      if (response.data.success) {
        alert('회원가입이 성공적으로 이루어졌습니다. 로그인 해주세요.');
        window.location.href = '/';
      } else {
        alert('가입에 실패했습니다. 다시 시도해주세요.');
      }
    });
  };

  return (
    <SignupSection>
      <div className="signupWrapper">
        <Title subtitle="본 캐릭터 설정" title="회원 가입이 바로 완료됩니다" />
        <div className="formWrapper">
          <SignupForm>
            <li>
              <label htmlFor="email">이메일</label>
              <div className="inputWrapper">
                <InputBox
                  type="text"
                  InputBoxSize="m"
                  InputBoxType="disabled"
                  value={email}
                  id="email"
                  SubmitValue={setEmail}
                  readOnly
                />
                <Button
                  ButtonColor="lightGray"
                  ButtonMode="disabled"
                  ButtonName="확인"
                  ButtonSize="small"
                />
              </div>
            </li>
            <li>
              <label htmlFor="nickname">닉네임</label>
              <div className="inputWrapper">
                <div className="checkbutton">
                  {NicknameAvailable ? (
                    <InputBox
                      type="text"
                      id="nickname"
                      value={nickname}
                      InputBoxSize="s"
                      InputBoxType="active"
                      SubmitValue={setNickname}
                      readOnly
                    />
                  ) : (
                    <InputBox
                      type="text"
                      id="nickname"
                      value={nickname}
                      InputBoxSize="s"
                      InputBoxType="active"
                      SubmitValue={setNickname}
                    />
                  )}
                  {NicknameAvailable ? (
                    <Button
                      ButtonColor="orange"
                      ButtonMode="active"
                      ButtonName="다시 찾기"
                      ButtonSize="medium"
                      onClick={resetNickname}
                    />
                  ) : (
                    <Button
                      ButtonColor="orange"
                      ButtonMode="active"
                      ButtonName="중복 확인"
                      ButtonSize="medium"
                      onClick={CheckNickname}
                    />
                  )}
                </div>
                {NicknameAvailable && (
                  <span className="resultText">
                    사용할 수 있습니다. 좋은 선택이예요!
                  </span>
                )}
              </div>
            </li>
            <li>
              <label>본 캐릭터 설정</label>
              <div className="inputWrapper">
                <div className="selectArea">
                  <SelectBox
                    Mode="pos"
                    DefaultValue={pos}
                    SubmitValue={setPos}
                  />
                  <SelectBox
                    Mode="level"
                    DefaultValue={level}
                    SubmitValue={setLevel}
                  />
                </div>
                <span className="resultText">{levelText}</span>
              </div>
            </li>
            <div className="btnWrapper">
              <Button
                ButtonColor="orange"
                ButtonMode="active"
                ButtonName="가입 완료"
                ButtonSize="medium"
                onClick={onSubmit}
              />
            </div>
          </SignupForm>
        </div>
      </div>
    </SignupSection>
  );
}

export default Signup;
