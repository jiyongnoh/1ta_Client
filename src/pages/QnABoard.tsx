import { Routes, Route } from 'react-router-dom';

import styled from 'styled-components';
import theme from 'theme';

import PostList from 'components/board/post/postList';
import PostContent from 'components/board/qnaBoard/postContent';
import WritePost from 'components/board/post/postWrite';

function QnABoard() {
  return (
    <Container>
      <Main>
        <Title>
          <H2>질문게시판</H2>
          <p>학습 중 생긴 궁금증에 관해 질문하고 답변할 수 있는 공간입니다.</p>
        </Title>
        <Routes>
          <Route path="" element={<PostList />} />
          <Route path="articles/:id" element={<PostContent />} />
          <Route path="articles/write" element={<WritePost />} />
          <Route path="articles/:id/edit" element={<WritePost />} />
        </Routes>
      </Main>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 62.5%;
  margin: 0 auto;
`;

const Title = styled.div`
  width: 100%;
  height: 150px;
  padding: 45px 42px;
  border-radius: 25px;
  background-color: ${theme.colors.palePurple};
  margin-top: ${theme.gap.px40};
`;

const H2 = styled.h2`
  font-weight: bold;
  font-size: ${theme.fontSizes.subTitle};
  margin-bottom: ${theme.gap.px10};
`;

export default QnABoard;
