import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'theme';

import ProfileIcon from 'assets/icons/defaultProfileIcon';
import StateIcon from 'assets/icons/stateIcon';
import CountIcon from 'assets/icons/countIcon';
import CalElapsedTime from './calElapsedTime';

interface Data {
  freeId?: number;
  questionId?: number;
  category: string;
  adoptAnswerId?: number;
  member: {
    memberId: number;
    iconImageUrl?: string;
    displayName: string;
    state: string;
  };
  title: string;
  content: string;
  uploadImages?: string[] | [];
  viewCount: number;
  voteCount: number;
  answerCount: number;
  createdAt: string;
  modifiedAt?: string;
  commentsListNum: number;
}

interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

type Props = {
  ele: Data;
};

function PostTitleBlock({ ele }: Props) {
  const urlData = useLocation().pathname;
  const calTime: string = CalElapsedTime(ele.createdAt);

  return (
    <Container className={ele.category === '공지' ? 'notice' : ''}>
      <Top>
        <Category>{ele.category}</Category>
        {ele.adoptAnswerId ? <SelectedAnswer>답변채택</SelectedAnswer> : null}
      </Top>
      {urlData === '/free' ? (
        <Link to={`articles/${ele.freeId}`}>
          <Title>{ele.title}</Title>
        </Link>
      ) : (
        <Link to={`articles/${ele.questionId}`}>
          <Title>{ele.title}</Title>
        </Link>
      )}
      <UserData>
        <ProfileImg>
          <ProfileIcon.Mini />
        </ProfileImg>
        <NameDiv>
          {`${ele.member.displayName} `}
          {ele.member.state === 'TEACHER' ? (
            <StateIcon.Teacher title="강사" />
          ) : null}
          {ele.member.state === 'ADMIN' ? (
            <StateIcon.Admin title="관리자" />
          ) : null}
        </NameDiv>
        <div>{` · ${calTime}`}</div>
      </UserData>
      <Count>
        <div>
          <CountIcon.View />
          {ele.viewCount}
        </div>
        {urlData === '/free' ? (
          <div>
            <CountIcon.Comment />
            {ele.commentsListNum}
          </div>
        ) : (
          <div>
            <CountIcon.Comment />
            {ele.answerCount}
          </div>
        )}
        <div>
          <CountIcon.Vote />
          {ele.voteCount}
        </div>
      </Count>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100px;
  padding: 1rem ${theme.gap.px20};
  border-bottom: 1px solid ${theme.colors.gray};

  &.notice {
    background-color: ${theme.colors.palePurple};
  }
`;

const Top = styled.div`
  display: flex;
  margin-bottom: 6px;
`;

const Category = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 40px;
  height: 18px;
  padding: 0 calc(${theme.gap.px10} / 2);
  border: 1px solid ${theme.colors.pointColor};
  border-radius: 5px;
  font-size: ${theme.fontSizes.sm};
  font-weight: bold;
  color: ${theme.colors.pointColor};
  background-color: ${theme.colors.white};
`;

const SelectedAnswer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 18px;
  border: 1px solid ${theme.colors.pointColor};
  border-radius: 5px;
  font-size: ${theme.fontSizes.sm};
  font-weight: bold;
  color: ${theme.colors.white};
  background-color: ${theme.colors.pointColor};
  padding: 3px 8px;
  margin-left: 5px;
`;

const Title = styled.div`
  display: block;
  width: 100%;
  font-size: ${theme.fontSizes.md};
  font-weight: bold;
  margin-bottom: 6px;
  line-height: 1.4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    color: ${theme.colors.pointColor};
  }
`;

const UserData = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.125rem;
  height: 1.125rem;
  margin-right: 3px;
`;

const NameDiv = styled.div`
  margin-right: 3px;
  display: flex;
`;

const Count = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  right: ${theme.gap.px20};
  bottom: 1rem;
  width: ${theme.gap.px120};
  color: ${theme.colors.gray};

  > div {
    margin-left: 0.3125rem;
    }
  }
`;

export default PostTitleBlock;
