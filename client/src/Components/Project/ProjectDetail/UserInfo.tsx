import React from 'react';
import styled from 'styled-components';
import Button from '../../../Components/Common/Button';

const Container = styled.div`
  display: flex;
  margin: 2.5rem;
  height: 4rem;
`;
const InfoBox = styled.div`
  display: flex;
  align-items: center;
`;
const UserImg = styled.img`
  width: 55px;
  height: 55px;
  margin-right: 10px;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 4rem;
`;
const Text = styled.span`
  font-size: 10px;
  line-height: 1.2rem;
`;
const Reason = styled.p`
  flex: 3;
  border-radius: 4px;
  border: 2px solid ${(props) => props.theme.palette.lightGray};
  overflow: auto;
  padding: 0.7rem 1rem;
  font-size: 1rem;
`;
const BtnBox = styled.div`
  display: flex;
  align-items: center;
  padding-left: 1rem;
`;

interface IProps {
  avatarImg: string;
  nickName: string;
  pos: string;
  posLv?: string;
  reason?: string;
  isRemove: boolean;
  removeHandler?: (e: React.MouseEvent<HTMLElement>) => void;
  isAdd: boolean;
  addHandler?: (e: React.MouseEvent<HTMLElement>) => void;
}

function UserInfo({
  avatarImg,
  nickName,
  pos,
  posLv,
  reason,
  isRemove,
  removeHandler,
  isAdd,
  addHandler,
}: IProps) {
  return (
    <Container>
      <InfoBox>
        <UserImg
          src={
            avatarImg
              ? avatarImg
              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
          }
          alt="Avartar"
        />
        <Info>
          <Text>{nickName}</Text>
          <Text>{pos}</Text>
          <Text>{posLv}</Text>
        </Info>
      </InfoBox>
      {reason && <Reason>{reason}</Reason>}
      <BtnBox>
        {isRemove && (
          <Button
            ButtonName="삭제"
            ButtonSize="small"
            ButtonColor="darkblue"
            ButtonMode="active"
            onClick={removeHandler}
          />
        )}
        {isAdd && (
          <Button
            ButtonName="추가"
            ButtonSize="small"
            ButtonColor="white"
            ButtonMode="active"
            onClick={addHandler}
          />
        )}
      </BtnBox>
    </Container>
  );
}

export default UserInfo;
