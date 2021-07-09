import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../Components/Common/Button';
import useCreateAlarm from '../../../hook/useCreateAlarm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  height: 240px;
  border-radius: 15px;
  padding: 2rem;
  padding-top: 4rem;
  align-items: center;
  background-color: ${(props) => props.theme.palette.white};
`;

const SelectArea = styled.div`
  margin-top: 1rem;
  margin-bottom: 0.4rem;
`;

const Select = styled.select`
  width: 300px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.palette.lightGray};
  padding-left: 20px;
  font-size: 12px;
  appearance: none;
  background-size: 10px 5px;
  background-position: 90%;
  background-repeat: no-repeat;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNSA1LjI1bC01LTVoMTBsLTUgNXoiIGZpbGw9IiM0MjQ5NUIiLz48L3N2Zz4=);
`;

const Option = styled.option`
  text-align: center;
  margin: 1.2rem;
  color: ${(props) => props.theme.palette.gray};
  padding: 0px 2px 1px;
`;

interface IProps {
  projectList: Array<any> | undefined;
  nickname: string;
}

const ProjectInvitedContents = ({ projectList, nickname }: IProps) => {
  const [selectProject, setSelectProject] = useState('');
  const handleChangeSelect = (event: React.FormEvent<HTMLSelectElement>) => {
    setSelectProject(event.currentTarget.value);
  };
  const { sendMessage } = useCreateAlarm({
    receivedNickname: nickname,
    type: 1,
  });
  const SendMessage = () => {
    if (selectProject === 'noData') {
      alert('프로젝트를 선택해주세요.');
    } else {
      sendMessage(selectProject);
    }
  };
  return (
    <Container>
      <h2>함께 할 프로젝트를 골라주세요.</h2>
      <SelectArea>
        <Select value={selectProject} onChange={handleChangeSelect}>
          <Option value="noData">프로젝트를 골라주세요</Option>
          {projectList &&
            projectList.map((item, index) => (
              <Option value={item._id} key={index}>
                {item.title}
              </Option>
            ))}
        </Select>
      </SelectArea>
      <Button
        ButtonColor="red"
        ButtonMode="active"
        ButtonSize="xLarge"
        ButtonName="프로젝트 초대하기"
        onClick={SendMessage}
        type="button"
      />
    </Container>
  );
};

export default ProjectInvitedContents;
