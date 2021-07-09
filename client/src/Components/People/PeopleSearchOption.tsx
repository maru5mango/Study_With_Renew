import React from 'react';
import styled from 'styled-components';
import SelectBox from '../Common/SelectBox';

const SearchOption = styled.div``;

interface IProps {
  Location: string;
  Pos: string;
  ProjectState: string;
  SubmitLocation: React.Dispatch<React.SetStateAction<string>>;
  SubmitPos: React.Dispatch<React.SetStateAction<string>>;
  SubmitProjectState: React.Dispatch<React.SetStateAction<string>>;
}

const PeopleSearchOption = ({
  Location,
  Pos,
  ProjectState,
  SubmitLocation,
  SubmitPos,
  SubmitProjectState,
}: IProps) => {
  return (
    <SearchOption>
      <SelectBox
        Mode="location"
        DefaultValue={Location}
        SubmitValue={SubmitLocation}
      />
      <SelectBox Mode="pos" DefaultValue={Pos} SubmitValue={SubmitPos} />
      <SelectBox
        Mode="projectState"
        DefaultValue={ProjectState}
        SubmitValue={SubmitProjectState}
      />
    </SearchOption>
  );
};

export default PeopleSearchOption;
