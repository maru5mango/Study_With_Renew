import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../modules';

const Container = styled.div`
  width: 300px;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserImg = styled.img`
  object-fit: cover;
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const ImgContainer = () => {
  const { data } = useSelector((state: RootState) => state.user);
  let ImgUrl =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  if (data?.user.avartarImg) {
    ImgUrl = data?.user.avartarImg;
  }
  return (
    <Container>
      <UserImg src={ImgUrl} alt="Avatar" />
    </Container>
  );
};

export default ImgContainer;
