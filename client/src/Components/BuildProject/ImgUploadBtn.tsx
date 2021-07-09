import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  & > input {
    display: none;
  }
  margin-bottom: 1rem;
`;

const InputLable = styled.label`
  padding: 0.5rem;
  font: inherit;
  font-size: 12px;
  height: 80px;
  border: 1px solid ${(props) => props.theme.palette.darkblue};
  border-radius: 4px;
  text-align: center;
  line-height: 0.5;
  width: 110px;
  cursor: pointer;
`;

interface IProps {
  submitUrl: React.Dispatch<React.SetStateAction<string>>;
  submitFile: React.Dispatch<React.SetStateAction<null | File>>;
}

const ImgUploadBtn = ({ submitUrl, submitFile }: IProps) => {
  const handleFileChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.length < 1) return;

    if (event.currentTarget.files) {
      const imageFile = event.currentTarget.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      submitUrl(imageUrl);
      submitFile(imageFile);
    }
  };

  return (
    <Container>
      <InputLable htmlFor="imgFile">이미지 업로드</InputLable>
      <input
        type="file"
        name="thumbImg"
        id="imgFile"
        accept="image/png, image/jpeg"
        onClick={(event) => (event.currentTarget.value = '')}
        onChange={handleFileChange}
      />
    </Container>
  );
};

export default ImgUploadBtn;
