/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from 'components/common/Button';
import Loading from 'components/review/Loading';
import LectureReview2 from 'components/review/LectureReview2';
import LectureIntro from 'components/review/LectureIntro';
import theme from 'theme';
import GoBackMenu from 'components/board/post/goBackMenu';
import { Title } from 'pages/FreeBoard';
import { FlexContainer } from '../TeacherList/ReviewPage';
import { SmallFont } from '../TeacherDetail/Information';

const defaultData = {
  data: {
    lectureId: 62,
    title: '정승제 의 수능특강 국어완전 정복 이름수정!',
    introduction: '3개월 국어 1등급',
    status: '진행중',
    teacher: {
      teacherId: 23,
      name: '정승제',
      starPointAverage: 0,
    },
    starPointAverage: 0,
    totalReviewCount: 0,
    starPointCount: {
      '1점갯수': 0,
      '5점갯수': 0,
      '4점갯수': 0,
      '2점갯수': 0,
      '3점갯수': 0,
    },
    gradeTags: [
      {
        gradeTag: '고1',
      },
      {
        gradeTag: '예비고1',
      },
      {
        gradeTag: '고2',
      },
    ],
    subjectTags: [
      {
        subjectTag: '국어',
      },
    ],
    platformTags: [
      {
        platformTag: 'EBS',
      },
    ],
    lectureReviews: [
      {
        lectureReviewId: 1,
        title: 'ㅇㅇㅇ',
        starPoint: 5,
        createdAt: '날짜',
        voteCount: 5,
        totalCommentCount: 4,
        lecture: {
          lectureId: 2,
          title: 'ㄹㅎㄹㅎㅎㄹ',
          starPointAverage: 7,
        },
        member: {
          memberId: 1,
          email: 'ㅇㄴㅇㄴ',
          displayName: 'ㄴㅇㄴㅇㅇㄴ',
          password: 'ㅇㅇㅇㄴㅇ',
          iconImageUrl: 'ㄴㅇㅇㄴㄴㅇㅇㄴ',
          createdAt: '날짜',
          roles: ['1'],
          memberStatus: '강사',
        },
      },
    ],
  },
};

function LectureReviewList() {
  const [data, setData] = useState(defaultData);
  const [isPending, setIsPending] = useState<boolean>(true);
  const { lectureId } = useParams();

  const Authorization = localStorage.getItem('token');

  const list = ['추천', '만족도', '제목', '작성자', '등록일'];

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`${process.env.REACT_APP_API_URL}/boards/lectures/${lectureId}`, {
        headers: {
          'ngrok-skip-browser-warning': 'asdasdas',
        },
      })
      .then((res: any) => {
        return res.data;
      })
      .then(data => {
        setData(data);
        setIsPending(false);
      });
  }, []);

  return (
    <Container>
      {isPending ? (
        <Loading />
      ) : (
        <FlexContainer width="62.5%" height="100%" dir="col" gap="0.5rem">
          <Title>
            <H2>리뷰게시판</H2>
            <p>강의에 대한 리뷰를 한 눈에 볼 수 있는 공간입니다.</p>
          </Title>
          <GoBackMenu />
          {/* 강의 등록 - 관리자 */}
          <FlexContainer
            display={!data.data.lectureReviews.length ? 'flex' : 'none'}
            width="100%"
          >
            {Authorization ? (
              <Link to="create">
                <PButton>리뷰 등록</PButton>
              </Link>
            ) : null}
          </FlexContainer>
          {/* 강의 목록 */}
          {!data.data.lectureReviews.length ? (
            <FlexContainer height="30vh">등록된 리뷰가 없습니다</FlexContainer>
          ) : (
            <FlexContainer width="100%" dir="col" gap="1rem">
              {data.data.lectureReviews.length ? (
                <LectureIntro
                  lecture={data.data.lectureReviews[0].lecture}
                  teacher={data.data.teacher}
                />
              ) : null}

              <FlexContainer
                width="100%"
                borderTop="2px solid black"
                borderBottom="1px solid black"
                padding="1.5rem 1rem"
              >
                {list.map((el, index) => {
                  return (
                    <FlexContainer key={index} grow={el === '제목' ? 5 : 1}>
                      <SmallFont>{el}</SmallFont>
                    </FlexContainer>
                  );
                })}
              </FlexContainer>
              <FlexContainer width="100%" gap="0" dir="col">
                {!data.data.lectureReviews.length ? (
                  <FlexContainer dir="col" width="100%" gap="0">
                    <div>등록된 수강 후기가 없습니다</div>
                  </FlexContainer>
                ) : (
                  data.data.lectureReviews.map((el, index) => {
                    return (
                      <LectureReview2
                        key={index}
                        lectureReviewId={el.lectureReviewId}
                        title={el.title}
                        starPoint={el.starPoint}
                        createdAt={el.createdAt}
                        voteCount={el.voteCount}
                        totalCommentCount={el.totalCommentCount}
                        lecture={el.lecture}
                        member={el.member}
                      />
                    );
                  })
                )}
              </FlexContainer>
            </FlexContainer>
          )}
        </FlexContainer>
      )}
    </Container>
  );
}

export default LectureReviewList;

const PButton = Button.PointBtn;

type Container = {
  height?: string;
};

const Container = styled.div<Container>`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  margin-bottom: 3rem;
`;

const H2 = styled.h2`
  font-weight: bold;
  font-size: ${theme.fontSizes.subTitle};
  margin-bottom: ${theme.gap.px10};
`;
