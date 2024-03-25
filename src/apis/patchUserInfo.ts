import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

type UserInfoProps = {
  phoneNumber: string;
  displayName: string;
};

const patchUserInfo = async (pathData: UserInfoProps, id: number | null) => {
  await axios.patch(`${apiUrl}/members/${id}`, pathData, {
    headers: {
      'ngrok-skip-browser-warning': '69420',
    },
  });
};

export default patchUserInfo;
