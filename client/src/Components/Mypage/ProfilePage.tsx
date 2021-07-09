import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ImgInfo from './ImgInfo';
import axios from 'axios';
import SelectBox from '../Common/SelectBox';
import Button from '../Common/Button';
import InputBox from '../Common/InputBox';
import { LevelData } from '../../Components/Common/OptionData';
import TagInput from './TagInput';
import PortfolioInput from './PortfolioInput';

const Container = styled.div`
  width: 95%;
  min-height: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  p {
    color: ${(props) => props.theme.palette.orange};
    font-size: 12px;
  }
`;

const FormArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 2rem;
  width: 100%;
`;

const RowCenterArea = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 0.9rem;
  padding: 0.3rem;
  p {
    margin-left: 2rem;
  }
  h3 {
    font-size: 12px;
    width: 120px;
    line-height: 1.5;
    margin-top: 1rem;
  }
  input {
    margin-left: 0;
  }
`;
const RowArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 0.9rem;
  padding: 0.3rem;
  p {
    margin-left: 2rem;
  }
  h3 {
    font-size: 0.75rem;
    min-width: 120px;
    line-height: 1.5;
    padding-top: 10px;
  }
  textarea {
    overflow: auto;
    width: 90%;
    height: 190px;
    border: 1px solid ${(props) => props.theme.palette.lightGray};
    border-radius: 4px;
    padding: 0.5rem;
    margin: 0.2rem;
    resize: none;
  }
`;

const InputArea = styled.div`
  width: 80%;
  input {
    margin-left: 0;
  }
`;
const InfoArea = styled.div`
  width: 100%;
`;

const SelectArea = styled.div`
  width: 100%;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const PortFolioArea = styled.div`
  width: 100%;
  margin-left: 2rem;
`;

const ButtonArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

function ProfilePage() {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [tel, setTel] = useState('');
  const [pos, setPos] = useState('');
  const [interest, setInterest] = useState<string[]>([]);
  const [level, setLevel] = useState('');
  const [levelText, setLevelText] = useState('');
  const [availableLocation, setAvailableLocation] = useState('');
  const [availableWeek, setAvailableWeek] = useState('');
  const [availableTime, setAvailableTime] = useState('');
  const [avartarImg, setAvartarImg] = useState<null | File>(null);
  const [portfolioes, setPortfolioes] = useState(['']);
  const [intro, setIntro] = useState('');

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios.post('/api/users/info', { _id: userId }).then((response) => {
      if (response.data.success) {
        const user = response.data.user;
        if (user.avartarImg) {
          setAvartarImg(user.avartarImg);
        }
        setAvailableLocation(user.availableLocation);
        setAvailableTime(user.availableTime);
        setAvailableWeek(user.availableWeek);
        setEmail(user.email);
        setIntro(user.intro);
        setNickname(user.nickname);
        setPortfolioes(user.portfolio.length ? user.portfolio : ['']);
        setPos(user.position);
        setLevel(user.positionLevel);
        setTel(user.tel);
        setInterest(user.interestSkills);
      } else {
        alert('정보를 불러오는데 실패했습니다. 다시 시도해주세요.');
      }
    });
  }, []);

  useEffect(() => {
    const Item = LevelData.find((item) => item.value === level && item);
    {
      Item && setLevelText(Item.text);
    }
  }, [level]);

  const handleChangeIntro = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setIntro(event.currentTarget.value);
  };

  const handleAddPortfolioClick = () => {
    setPortfolioes([...portfolioes, '']);
  };

  const handleDeletePortfolioClick = () => {
    const newPortfolioes = [...portfolioes];
    newPortfolioes.splice(-1, 1);
    setPortfolioes(newPortfolioes);
  };

  const onSubmit = () => {
    const formData = new FormData();
    if (avartarImg) {
      formData.append('profileImg', avartarImg);
    }
    axios
      .post('/api/users/updateImg', formData, {
        headers: { 'content-type': 'multipart/form-data' },
      })
      .then((response) => {
        if (response.data.success) {
          const FilePath = response.data.filePath;
          const formData = {
            _id: userId,
            tel: tel,
            position: pos,
            positionLevel: level,
            availableLocation: availableLocation,
            availableWeek: availableWeek,
            availableTime: availableTime,
            avartarImg: FilePath,
            portfolio: portfolioes,
            intro: intro,
            interestSkills: interest,
          };
          axios.post('/api/users/update', formData).then((response) => {
            if (response.data.success) {
              alert('내 정보를 성공적으로 수정했습니다.');
            } else {
              alert('저장에 실패했습니다. 다시 시도해주세요.');
            }
          });
        } else {
          alert('저장에 실패했습니다. 다시 시도해주세요.');
        }
      });
  };

  return (
    <Container>
      <ImgInfo value={avartarImg} submitValue={setAvartarImg} />
      <FormArea>
        <InputArea>
          <RowArea>
            <InputBox
              InputBoxSize="m"
              InputBoxType="disabled"
              SubmitValue={setEmail}
              value={email || ''}
              readOnly
            />
          </RowArea>
          <RowCenterArea>
            <InputBox
              InputBoxSize="m"
              InputBoxType="disabled"
              SubmitValue={setNickname}
              value={nickname || ''}
              readOnly
            />
          </RowCenterArea>
          <RowArea>
            <InputBox
              InputBoxSize="m"
              InputBoxType="active"
              SubmitValue={setTel}
              value={tel || ''}
              placeholder="010-1122-3344"
            />
          </RowArea>
        </InputArea>
        <InfoArea>
          <RowArea>
            <h3>직무/능력치</h3>
            <SelectArea>
              <SelectBox Mode="pos" DefaultValue={pos} SubmitValue={setPos} />
              <SelectBox
                Mode="level"
                DefaultValue={level}
                SubmitValue={setLevel}
              />
              <p>{levelText}</p>
            </SelectArea>
          </RowArea>
          <RowArea>
            <h3>관심 분야</h3>
            <InputArea>
              <TagInput
                placeholder="ex) #react, #vue ..."
                value={interest}
                SubmitValue={setInterest}
              />
            </InputArea>
          </RowArea>
          <RowArea>
            <h3>지역 설정</h3>
            <SelectArea>
              <SelectBox
                Mode="location"
                DefaultValue={availableLocation}
                SubmitValue={setAvailableLocation}
              />
            </SelectArea>
          </RowArea>
          <RowArea>
            <h3>시간 설정</h3>
            <SelectArea>
              <SelectBox
                Mode="availableWeek"
                DefaultValue={availableWeek}
                SubmitValue={setAvailableWeek}
              />
              <SelectBox
                Mode="availableTime"
                DefaultValue={availableTime}
                SubmitValue={setAvailableTime}
              />
            </SelectArea>
          </RowArea>
          <RowArea>
            <h3>자기 소개</h3>
            <textarea
              value={intro}
              onChange={handleChangeIntro}
              placeholder="최대 200자까지 작성 가능합니다."
            />
          </RowArea>
          <RowCenterArea>
            <h3>포트폴리오</h3>
            <PortFolioArea>
              {portfolioes.map((url, index) => {
                return (
                  <PortfolioInput
                    key={index}
                    placeholder="URL을 입력해주세요."
                    portfolioes={portfolioes}
                    value={url}
                    submitValue={setPortfolioes}
                    index={index}
                  />
                );
              })}
            </PortFolioArea>
            {portfolioes.length < 5 && (
              <Button
                ButtonColor="darkblue"
                ButtonSize="small"
                ButtonName="추가"
                ButtonMode="active"
                onClick={handleAddPortfolioClick}
              />
            )}
            {portfolioes.length !== 1 && (
              <Button
                ButtonColor="orange"
                ButtonSize="small"
                ButtonName="삭제"
                ButtonMode="active"
                onClick={handleDeletePortfolioClick}
              />
            )}
          </RowCenterArea>
        </InfoArea>
        <ButtonArea>
          <Button
            ButtonColor="red"
            ButtonSize="medium"
            ButtonMode="active"
            ButtonName="저장하기"
            onClick={onSubmit}
          />
        </ButtonArea>
      </FormArea>
    </Container>
  );
}

export default ProfilePage;
