import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import PeopleRecommendTable from '../../Components/People/Recommend/PeopleRecommendTable';
import PeopleHeader from '../../Components/People/PeopleHeader';
import PeopleList from '../../Components/People/PeopleList';
import { USER_SERVER } from '../../Config';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { fetchLikeUsers } from '../../modules/like';

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  margin: 0px auto;
`;

interface IUser {
  _id: string;
  avartarImg: string;
  nickname: string;
  position: string;
  positionLevel: string;
  interestSkills: string[];
  receivedLike: number;
}

const defaultProps: IUser[] = [];

const PeoplePresenter = () => {
  const [users, setUsers] = useState(defaultProps);
  const [endpoint, setEndpoint] = useState(`${USER_SERVER}?`);
  const page = useRef(1);
  const dispatch = useDispatch();

  const refreshList = () => {
    page.current = 1;
    axios
      .get(endpoint, {
        params: {
          page: page.current,
        },
      })
      .then((response) => {
        if (!response.data.success) {
          alert('데이터를 가져오는데 실패했습니다.');
          return false;
        }
        if (response.data.user.length == 0) {
          alert('데이터가 없습니다.');
          return false;
        }
        page.current += 1;
        const userList = response.data.user;
        const user: [IUser] = userList.map((userInfo: any) => {
          return {
            _id: userInfo._id,
            avartarImg: userInfo.avartarImg
              ? userInfo.avartarImg
              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
            nickname: userInfo.nickname,
            position: userInfo.position,
            positionLevel: userInfo.positionLevel,
            interestSkills: userInfo.interestSkills,
            receivedLike: userInfo.receivedLike,
          };
        });
        setUsers([...user]);
      });
  };

  const LoadUser = () => {
    axios
      .get(endpoint, {
        params: {
          page: page.current,
        },
      })
      .then((response) => {
        if (!response.data.success) {
          alert('데이터를 가져오는데 실패했습니다.');
          return false;
        }
        if (response.data.user.length == 0) {
          alert('더 이상 데이터가 없습니다.');
          return false;
        }
        page.current += 1;
        const userList = response.data.user;
        const user: [IUser] = userList.map((userInfo: any) => {
          return {
            _id: userInfo._id,
            avartarImg: userInfo.avartarImg
              ? userInfo.avartarImg
              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
            nickname: userInfo.nickname,
            position: userInfo.position,
            positionLevel: userInfo.positionLevel,
            interestSkills: userInfo.interestSkills,
            receivedLike: userInfo.receivedLike,
          };
        });
        setUsers([...users, ...user]);
      });
  };

  useEffect(() => {
    refreshList();
  }, [endpoint]);

  useEffect(() => {
    dispatch(fetchLikeUsers());
  }, []);

  return (
    <Container>
      <InfiniteScroll
        dataLength={users ? users.length : 1}
        next={LoadUser}
        hasMore={true}
        loader={<h4></h4>}
      >
        <PeopleHeader endpoint={endpoint} submitFilter={setEndpoint} />
        <PeopleRecommendTable />
        {users.length < 1 ? (
          <div style={{ textAlign: 'center' }}>해당 유저가 없습니다.</div>
        ) : (
          <PeopleList userList={users} />
        )}
      </InfiniteScroll>
    </Container>
  );
};

export default PeoplePresenter;
