import { postAlarm } from '../api/alarm';

interface IProps {
  receivedNickname: string;
  type: number;
}

const useCreateAlarm = ({ receivedNickname, type }: IProps) => {
  const userId = localStorage.getItem('userId');
  const sendMessage = (msg: string) => {
    postAlarm({
      senderId: userId,
      contents: msg,
      receivedUserNickname: receivedNickname,
      type: type,
    }).then((response) => {
      if (!response.success) {
        alert('알람 전송에 실패했습니다.');
      }
      alert(response.msg);
      location.reload();
    });
  };

  return { sendMessage };
};

export default useCreateAlarm;
