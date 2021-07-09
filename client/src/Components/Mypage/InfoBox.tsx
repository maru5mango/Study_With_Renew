import React, { useState } from 'react';
import styled from 'styled-components';
import { IPos, IProject, IUser } from '../../api/types';
import ProjectBox from '../../Components/Project/ProjectBox';
import ProjectBoxList from '../../Components/Project/ProjectBoxList';
import PeopleList from '../People/PeopleList';
import AlarmBox from './alarmBox';
import AlarmBoxList from './alarmBoxList';
import SimpleModal from '../Common/SimpleModal';
import AlarmModalContents from '../Common/AlarmModalContents';

const TitleStyle = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  line-height: 1.2;
`;

const MaintitleStyle = styled.h3`
  font-size: 22px;
  font-weight: bold;
  line-height: 3.125rem;
  padding: 0.2rem;
  color: ${(props) => props.theme.palette.gray};
`;

const InfoStyle = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.palette.faintGray};
  box-sizing: border-box;
  padding: 25px 0;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 20px;
  color: ${(props) => props.theme.palette.lightGray};
  min-height: 75px;
`;

interface InfoProps {
  title: string;
  array: any;
  defaultText: string;
  type: string;
}

type TypeNumber = 0 | 1 | 2 | 3;

function InfoBox({ title, array, defaultText, type }: InfoProps) {
  const getCurrentMembers = (positions: Array<IPos>): number => {
    const currentMembers = positions.map((position: IPos) => position.current);
    const sumCurrentMembers = currentMembers.reduce((a, b) => a + b);

    return sumCurrentMembers;
  };

  const getRequiredMembers = (positions: Array<IPos>): number => {
    const requiredMembers = positions.map(
      (position: IPos) => position.required
    );
    const sumRequiredMembers = requiredMembers.reduce((a, b) => a + b);

    return sumRequiredMembers;
  };

  const [open, setOpen] = useState<boolean>(false);
  const [sendNickname, setSendNickname] = useState<string>('');
  const [alarmId, setAlarmId] = useState<string>('');
  const [contents, setContents] = useState<string>('');
  const [typeModal, setType] = useState<TypeNumber>(0);
  const [reset, setReset] = useState<boolean>(true);
  const handleOnChange = () => {
    setOpen(!open);
  };
  const handleReset = (state: boolean) => {
    setReset(state);
  };
  const showAlarmInfo = (
    _id: string,
    sendNickname: string,
    contents: string,
    type: 0 | 1 | 2 | 3
  ) => {
    setOpen(true);
    setSendNickname(sendNickname);
    setContents(contents);
    setAlarmId(_id);
    setType(type);
  };

  return (
    <TitleStyle>
      <MaintitleStyle>{title}</MaintitleStyle>
      {array.length > 0 && type === 'project' ? (
        <ProjectBoxList>
          {array.map((project: IProject) => (
            <ProjectBox
              key={project._id}
              id={project._id}
              title={project.title}
              description={project.summary}
              image={project.thumb}
              state={[
                getCurrentMembers(project.position),
                getRequiredMembers(project.position),
              ]}
              category={project.field}
              receivedLike={project.receivedLike}
            />
          ))}
        </ProjectBoxList>
      ) : null}
      {array.length > 0 && type === 'user' ? (
        <PeopleList userList={array} />
      ) : null}
      {array.length > 0 && type === 'alarm' ? (
        <AlarmBoxList>
          {array.map((item: any, index: number) => (
            <div
              key={index}
              onClick={() =>
                showAlarmInfo(
                  item._id,
                  item.senderId.nickname,
                  item.Contents,
                  item.type
                )
              }
            >
              <AlarmBox
                visited={item.isRead}
                createdAt={item.createdAt}
                _id={item._id}
                senderNickname={item.senderId.nickname}
                type={item.type}
                content={item.Contents}
              />
            </div>
          ))}
        </AlarmBoxList>
      ) : null}
      {array.length === 0 && <InfoStyle> {defaultText} </InfoStyle>}
      <SimpleModal
        open={open}
        onToggle={handleOnChange}
        reset={reset}
        onResetToggle={handleReset}
      >
        <AlarmModalContents
          id={alarmId}
          sendNickname={sendNickname}
          contents={contents}
          type={typeModal}
          reset={reset}
          onResetToggle={handleReset}
        />
      </SimpleModal>
    </TitleStyle>
  );
}

export default InfoBox;
