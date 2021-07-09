import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiCamera } from 'react-icons/fi';
import { BsFillPersonFill } from 'react-icons/bs';
import axios from 'axios';

const Container = styled.div`
  width: 250px;
  height: 200px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 5px 15px;
`;

const ImgArea = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  position: relative;
  top: 20px;
  left: 10px;
  overflow: hidden;
  color: ${(props) => props.theme.palette.lightGray};
  background-color: ${(props) => props.theme.palette.faintGray};
`;

const ImgStyle = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ShowImg = styled.img`
  width: 100%;
  height: 100%;
  position: relative;
  background: cover;
`;

const ChangeImgButton = styled.label`
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: relative;
  bottom: 20px;
  left: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.palette.white};
  background-color: ${(props) => props.theme.palette.red};
  &:hover {
    cursor: pointer;
  }
`;

interface IProps {
  value: File | null;
  submitValue: React.Dispatch<React.SetStateAction<null | File>>;
}

function ImgInfo({ value, submitValue }: IProps) {
  const [imgFile, setImgFile] = useState<File | null>(value);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [beforeUrl, setBeforeUrl] = useState<string | null>(null);
  useEffect(() => {
    setBeforeUrl(`${value}`);
  }, [value]);

  const handleChangeFile = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      const imageFile = event.currentTarget.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      submitValue(imageFile);
      setImgFile(imageFile);
      setFileUrl(imageUrl);
    }
  };

  return (
    <Container>
      <ImgArea>
        <ImgStyle>
          {value ? (
            beforeUrl ? (
              fileUrl ? (
                <ShowImg src={fileUrl} />
              ) : (
                <ShowImg src={beforeUrl} />
              )
            ) : (
              <BsFillPersonFill size="100%" />
            )
          ) : (
            <BsFillPersonFill size="100%" />
          )}
        </ImgStyle>
      </ImgArea>
      <ChangeImgButton htmlFor="imgFile">
        <FiCamera size="22" />
      </ChangeImgButton>
      <input
        type="file"
        name="profileImg"
        id="imgFile"
        accept="image/*"
        onChange={handleChangeFile}
        style={{ display: 'none' }}
      />
    </Container>
  );
}

export default ImgInfo;
