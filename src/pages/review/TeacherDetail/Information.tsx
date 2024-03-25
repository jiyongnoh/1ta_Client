/* eslint-disable react/no-array-index-key */
import GlobalStyle from 'GlobalStyles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { FlexContainer } from '../TeacherList/ReviewPage';

type Data = {
  gradeTags: string[];
  profileImageUrl: string;
  realImageUrl: string;
  introduction: string;
  name: string;
  platformTags: { platformTag: string }[];
  starPointAverage: number;
  subjectTags: { subjectTag: string }[];
  teacherId: number;
  totalReviewCount: number;
  lectures: string[];
  analects: string[];
  profile: string[];
};

const defaultData = [
  {
    lectures: [],
    analects: ['물리면 물리무리'],
    profile: ['물리학 일타 강사 김민지!'],

    gradeTags: ['고1', '전체'],
    introduction: '민지민지',
    name: '김민지',
    platformTags: [{ platformTag: '이투스' }, { platformTag: '전체' }],
    starPointAverage: 5,
    subjectTags: [{ subjectTag: '물리학' }, { subjectTag: '전체' }],
    teacherId: 0,
    profileImageUrl: '/Teacher_image/teachers_1.jpg',
    realImageUrl: '',
    totalReviewCount: 5,
  },
  {
    lectures: [],
    analects: ['수학을 줄이면? 솩~'],
    profile: ['수학 일타 강사 이지민!'],

    gradeTags: ['고2', '전체'],
    imageUrl: '',
    introduction: '아재같은 선생님',
    name: '이지민',
    platformTags: [{ platformTag: '메가스터디' }, { platformTag: '전체' }],
    starPointAverage: 3.8,
    subjectTags: [{ subjectTag: '수학' }, { subjectTag: '전체' }],
    teacherId: 1,
    profileImageUrl: '/Teacher_image/teachers_2.jpg',
    realImageUrl: '',
    totalReviewCount: 0,
  },
  {
    lectures: [],
    analects: ['저는 외국인입니다'],
    profile: ['국어 일타 강사 강호선!'],

    gradeTags: ['중1', '전체'],
    imageUrl: '',
    introduction: '제 친구 실명입니다',
    name: '강호선',
    platformTags: [{ platformTag: '에듀윌' }, { platformTag: '전체' }],
    starPointAverage: 2.2,
    subjectTags: [{ subjectTag: '국어' }, { subjectTag: '전체' }],
    teacherId: 2,
    profileImageUrl: '/Teacher_image/teachers_3.jpg',
    realImageUrl: '',
    totalReviewCount: 0,
  },
];

function Information() {
  const [data, setData] = useState<Data>(defaultData[0]);
  const [isPending, setIsPending] = useState<boolean>(true);
  const { teacherId } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    // axios
    //   .get(`${process.env.REACT_APP_API_URL}/boards/teachers/${teacherId}`, {
    //     headers: { 'ngrok-skip-browser-warning': '69420' },
    //   })
    //   .then((res: any) => {
    //     return res.data.data;
    //   })
    //   .then(data => {
    //     setData(data);
    //     setIsPending(false);
    //   });
    setIsPending(false);
    setData(defaultData[Number(teacherId)]);
  }, []);

  return (
    <Container>
      {isPending ? (
        <FlexContainer height="100vh" />
      ) : (
        <FlexContainer width="100%">
          <GlobalStyle />
          <FlexContainer
            width="100%"
            height="100%"
            dir="col"
            gap="3rem"
            grow={1}
          >
            <FlexContainer dir="col">
              <Img
                src={
                  data.profileImageUrl ||
                  'https://web.yonsei.ac.kr/_ezaid/board/_skin/albumRecent/1/no_image.gif'
                }
                alt="profileImage"
              />
              <span>프로필 사진</span>
            </FlexContainer>

            <FlexContainer dir="col">
              <Img
                src={
                  data.realImageUrl ||
                  'https://web.yonsei.ac.kr/_ezaid/board/_skin/albumRecent/1/no_image.gif'
                }
                alt="realImage"
              />
              <span>실제 사진</span>
            </FlexContainer>
          </FlexContainer>

          <FlexContainer
            width="100%"
            height="100%"
            dir="col"
            grow={1}
            align="start"
          >
            <TitleBox>
              {data.subjectTags.map((el, index) => {
                return (
                  <SmallFont key={index}>{`${el.subjectTag} 영역`}</SmallFont>
                );
              })}
              <BigFont>{data.name} 선생님</BigFont>
            </TitleBox>

            <ContentBox>
              <MiddleFont>프로필</MiddleFont>
              <FlexContainer dir="col" gap="0.5rem" align="start">
                {data.profile.map((el, index) => {
                  return <SmallFont key={index}>{`· ${el}`}</SmallFont>;
                })}
              </FlexContainer>
            </ContentBox>

            <ContentBox>
              <MiddleFont>강의 이력</MiddleFont>
              <FlexContainer dir="col" gap="0.5rem" align="start">
                {data.platformTags.map((el, index) => {
                  return (
                    <SmallFont key={index}>{`· ${el.platformTag}`}</SmallFont>
                  );
                })}
              </FlexContainer>
            </ContentBox>

            <ContentBox>
              <MiddleFont>강사 소개</MiddleFont>
              <FlexContainer dir="col" gap="0.5rem" align="start">
                {data.introduction}
              </FlexContainer>
            </ContentBox>

            <ContentBox>
              <MiddleFont>어록</MiddleFont>
              <FlexContainer dir="col" gap="0.5rem" align="start">
                {data.analects.map((el, index) => {
                  return <SmallFont key={index}>{`· ${el}`}</SmallFont>;
                })}
              </FlexContainer>
            </ContentBox>
          </FlexContainer>
        </FlexContainer>
      )}
    </Container>
  );
}

export default Information;

export const Container = styled.div`
  width: 98vw;
  padding: 3rem 0;
`;

const TitleBox = styled.div`
  border-left: 0.3rem solid #6667ab;
  padding: 0.7rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContentBox = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const BigFont = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

export const MiddleFont = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;
export const SmallFont = styled.div`
  font-size: 1.1rem;
`;

const Img = styled.img`
  width: 340px;
  height: 350px;
  border-radius: 0.5rem;
  background-color: #b8b8b8;
`;
