/* eslint-disable react/button-has-type */
/* eslint-disable react/require-default-props */
import styled from 'styled-components';
import { FlexContainer } from 'pages/review/TeacherList/ReviewPage';
import { SmallFont } from 'pages/review/TeacherDetail/Information';
import { BsFillHandThumbsUpFill } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';

type Props = {
  lectureReviewId: number;
  title: string;
  starPoint: number;
  createdAt: string;
  voteCount: number;
  totalCommentCount: number;
  lecture: {
    lectureId: number;
    title: string;
    starPointAverage: number;
  };
  member: {
    memberId: number;
    email: string;
    displayName: string;
    password: string;
    iconImageUrl: string;
    createdAt: string;
    roles: string[];
    memberStatus: string;
  };
};

function LectureReview2({
  lectureReviewId,
  title,
  totalCommentCount,
  starPoint,
  createdAt,
  voteCount,
  lecture,
  member,
}: Props) {
  return (
    <Container>
      {/* 추천수 */}
      <FlexContainer
        width="10rem"
        dir="col"
        gap="0.1rem"
        padding="0 0 0 0.5rem"
      >
        <SmallFont>
          {voteCount >= 30 ? (
            <BestBox>Best</BestBox>
          ) : (
            <BsFillHandThumbsUpFill size="1.5rem" />
          )}
        </SmallFont>
        <SmallFont>{voteCount}</SmallFont>
      </FlexContainer>
      {/* 평점 */}
      <FlexContainer width="10rem" padding="0 0 0 3rem" gap="0.2rem">
        <AiFillStar color="gold" size="1.5rem" />
        <SmallFont>{starPoint}</SmallFont>
      </FlexContainer>
      {/* 강의 소개 및 타이틀 */}
      <FlexContainer
        width="70rem"
        dir="col"
        align="start"
        gap="0.4rem"
        padding="0 0 0 2rem"
      >
        <VerySmallGrayFont>{`${lecture.title}`}</VerySmallGrayFont>

        <SmallFont2>
          <Link to={`/lecturereviewdetail/${lectureReviewId}`}>
            {title.length > 20
              ? `${title.slice(0, 20)}... (${totalCommentCount})`
              : `${title} (${totalCommentCount})`}
          </Link>
        </SmallFont2>
      </FlexContainer>
      {/* 작성자 */}
      <FlexContainer width="15rem">
        <VerySmallGrayFont>
          {member.displayName.length > 5
            ? `${member.displayName.slice(0, 7)}...`
            : `${member.displayName}`}
        </VerySmallGrayFont>
      </FlexContainer>
      <FlexContainer width="20rem">
        <VerySmallGrayFont>{createdAt.slice(0, 10)}</VerySmallGrayFont>
      </FlexContainer>
    </Container>
  );
}

export default LectureReview2;

type Container = {
  first?: boolean;
};

const Container = styled.div<Container>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 0.5px solid black;
`;

const VerySmallGrayFont = styled.div`
  font-size: small;
  color: gray;
`;

const SmallFont2 = styled.div`
  font-size: 1.1rem;
  cursor: pointer;
  :hover {
    color: red;
  }
`;

const BestBox = styled.div`
  padding: 0.5rem;
  background-color: red;
  color: white;
  border-radius: 1rem;
`;
