import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';

const DateWrapper = styled.div``;

const ProjectDateTitle = styled.span`
  margin-right: 15px;
`;

const SDatePicker = styled(DatePicker)`
  margin-top: 1.5rem;
  width: 300px;
  height: 42px;
  box-sizing: border-box;
  padding: 8px 20px;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.palette.lightGray};
  font-size: 12px;
`;

interface IProps {
  start: Date;
  end: Date;
  submitStart: React.Dispatch<React.SetStateAction<Date>>;
  submitEnd: React.Dispatch<React.SetStateAction<Date>>;
}

const ProjectDuration = ({ start, end, submitStart, submitEnd }: IProps) => {
  return (
    <>
      <DateWrapper>
        <ProjectDateTitle>프로젝트 시작일: </ProjectDateTitle>
        <SDatePicker
          locale={ko}
          dateFormat="yyyy년 MM월 dd일"
          selected={start}
          onChange={(date: Date) => submitStart(date)}
          selectsStart
          startDate={start}
          endDate={end}
          minDate={new Date()}
        />
      </DateWrapper>
      <DateWrapper>
        <ProjectDateTitle>프로젝트 종료일: </ProjectDateTitle>
        <SDatePicker
          locale={ko}
          dateFormat="yyyy년 MM월 dd일"
          selected={start > end ? start : end}
          onChange={(date: Date) => submitEnd(date)}
          selectsEnd
          startDate={start}
          endDate={end}
          minDate={start}
        />
      </DateWrapper>
    </>
  );
};

export default ProjectDuration;
