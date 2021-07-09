import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FieldData } from '../../Common/OptionData';

const HeaderWrap = styled.div`
  padding: 40px 0 44px;
`;

const CategoryWrap = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 28px;
`;

const Category = styled.div`
  display: inline-block;
  padding: 8px 20px;
  border-radius: 2px;
  border: 1px solid #c5e4ea;
  background-color: rgba(237, 246, 248, 0.4);
  color: #5fafc1;
  font-size: 14px;
  line-height: 15px;
`;

const HeaderContents = styled.div`
  max-width: 1040px;
  margin: 0 auto;
`;

const ProjectTitle = styled.h3`
  text-align: center;
  color: #222;
  font-size: 34px;
  font-weight: 700;
  line-height: 34px;
`;

const LeaderWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 28px;
  margin-bottom: 12px;
`;

const UserIdWrap = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const LeaderImageWrap = styled.div`
  width: 37px;
  height: 37px;
  border-radius: 100px;
  overflow: hidden;
`;

const LeaderImage = styled.img`
  width: 100%;
  height: 100%;
`;

const UserIdText = styled.span`
  font-size: 14px;
  color: #666;
  margin-left: 11.5px;
  margin-right: 6.5px;
`;

const StatusTagWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const StatusTag = styled.span`
  line-height: 1.5;
  background-color: #a06bff;
  padding: 3px 9px;
  color: ${(props) => props.theme.palette.white};
  border-radius: 100px;
  font-size: 0.7rem;
`;

interface IProps {
  field: string;
  title: string;
  avartarImg: string;
  nickname: string;
  recruitment: boolean;
}

const ProjectDetailHeader = ({
  field,
  title,
  avartarImg,
  nickname,
  recruitment,
}: IProps) => {
  const [fieldLabel, setLabel] = useState<string>('');

  useEffect(() => {
    const f = FieldData.find((item) => {
      return item.value === field;
    });
    setLabel(f ? f.label : '');
  }, [field]);

  return (
    <HeaderWrap>
      <CategoryWrap>
        <Category>{fieldLabel}</Category>
      </CategoryWrap>
      <HeaderContents>
        <ProjectTitle>{title}</ProjectTitle>
        <LeaderWrap>
          <UserIdWrap>
            <LeaderImageWrap>
              <LeaderImage
                src={
                  avartarImg
                    ? avartarImg
                    : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                }
              ></LeaderImage>
            </LeaderImageWrap>
            <UserIdText>{nickname}</UserIdText>
          </UserIdWrap>
        </LeaderWrap>
        <StatusTagWrap>
          <StatusTag>{recruitment ? '모집중' : '모집완료'}</StatusTag>
        </StatusTagWrap>
      </HeaderContents>
    </HeaderWrap>
  );
};

export default ProjectDetailHeader;
