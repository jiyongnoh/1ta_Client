/* eslint-disable react/button-has-type */
/* eslint-disable react/require-default-props */
import GlobalStyle from 'GlobalStyles';
import styled from 'styled-components';
import { FlexContainer } from 'pages/review/TeacherList/ReviewPage';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import useUserInfoStore from 'stores/userInfoStore';
import { BsStarFill } from 'react-icons/bs';

type Props = {
  first?: boolean;
  lecture: {
    lectureId: number;
    title: string;
    introduction: string;
    status: string;
    starPointAverage: number;
    totalReviewCount: number;
    gradeTags: { gradeTag: string }[];
    subjectTags: {
      subjectTag: string;
    }[];
    teacher: {
      teacherId: number;
      name: string;
      starPointAverage: number;
    };
  };
};

function Lecture({ lecture, first }: Props) {
  const { teacherId } = useParams();
  const { userInfo } = useUserInfoStore(state => state);
  return (
    <Container first={first}>
      <FlexContainer width="12%">
        <MiddleFont>{lecture.teacher.name}</MiddleFont>
      </FlexContainer>
      <FlexContainer width="62%" dir="col" align="start" gap="0.3rem">
        <StatusBox>{lecture.status}</StatusBox>
        <IntroSpan>{`${lecture.introduction}`}</IntroSpan>
        <Link to={`/lecturereviewlist/${lecture.lectureId}`}>
          <TitleSpan>{`${lecture.title}`}</TitleSpan>
        </Link>
        <SmallFont>+ 자세히 보기</SmallFont>
      </FlexContainer>
      <FlexContainer width="12%" gap="0.4rem">
        <BsStarFill size="20px" color="gold" />
        <span>{lecture.starPointAverage.toFixed(1)}</span>
      </FlexContainer>
      <FlexContainer width="14%">
        {lecture.totalReviewCount} Reviews
      </FlexContainer>
      <FlexContainer
        dir="col"
        display={userInfo.state === 'ADMIN' && teacherId ? 'flex' : 'none'}
      >
        <Link to={`updateLecture/${lecture.lectureId}`}>
          <button>수정</button>
        </Link>
        <button
          onClick={() => {
            axios
              .delete(
                `${process.env.REACT_APP_API_URL}/boards/lectures/${lecture.lectureId}`,
                {
                  headers: { 'ngrok-skip-browser-warning': '69420' },
                },
              )
              .then(() => {
                window.location.reload();
              });
          }}
        >
          삭제
        </button>
      </FlexContainer>
    </Container>
  );
}

export default Lecture;

type Container = {
  first?: boolean;
};

const Container = styled.div<Container>`
  min-width: 50vw;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-top: ${props => (props.first ? '2px solid black' : null)};
  border-bottom: 0.5px solid black;
`;

const MiddleFont = styled.div`
  font-size: 0.9rem;
`;

const SmallFont = styled.div`
  font-size: 0.6rem;
  color: gray;
`;

const StatusBox = styled.div`
  text-align: center;
  font-size: 0.4rem;
  background-color: #4f4f4f;
  color: white;
  padding: 0.1rem 0.3rem;
`;

const TitleSpan = styled.span`
  font-size: 1rem;
  font-weight: bold;
  :hover {
    color: red;
  }
`;

const IntroSpan = styled.span`
  font-size: 0.8rem;
  color: gray;
`;
