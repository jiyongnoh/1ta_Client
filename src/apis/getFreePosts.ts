import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const getFreePosts = async (id: number | null, select: string) => {
  let boardType;
  if (select === '자유 게시판') {
    boardType = 'frees';
  }
  if (select === '질문 게시판') {
    boardType = 'questions';
  }
  if (select === '강의 리뷰') {
    boardType = 'reviews';
  }
  if (select === '답변 게시판') {
    boardType = 'answers';
  }

  const response = await axios.get(`${apiUrl}/members/${id}/${boardType}`, {
    headers: {
      'ngrok-skip-browser-warning': '69420',
    },
  });
  return response.data.data;
};

export default getFreePosts;
