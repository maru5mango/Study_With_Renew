import React, { ComponentType, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { getAuthThunk } from '../modules/auth';
import { RouteComponentProps } from 'react-router-dom';

export default function AuthHOC(
  SpecificComponent: React.FC,
  option: boolean | null
) {
  //option == null: 아무나 출입이 가능한 페이지
  //option == true: 로그인한 유저만 출입이 가능한 페이지
  //option == false: 로그인한 유저는 출입이 불가능한 페이지
  function AuthenticationCheck({ history }: RouteComponentProps) {
    const [isRender, setIsRender] = useState(false);
    const dispatch = useDispatch();
    const { loading, data, error } = useSelector(
      (state: RootState) => state.auth.auth
    );
    useEffect(() => {
      if (!loading && !data && !error) {
        console.log('API CALL');
        dispatch(getAuthThunk());
      }
      if (data) {
        if ((!data.isAuth && option) || (data.isAuth && option === false)) {
          setIsRender(false);
          history.push('/');
        } else {
          setIsRender(true);
        }
      }
      if (error) {
        history.push('/');
      }
    }, [data, error]);

    return (
      <div style={{ minHeight: '100vh' }}>
        {loading && <p>Loading Page</p>}
        {isRender && <SpecificComponent />}
      </div>
    );
  }
  return AuthenticationCheck;
}
