import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import useUserInfoStore from 'stores/userInfoStore';

import styled from 'styled-components';
import theme from 'theme';
import Button from 'components/common/Button';

import PostData from 'apis/board/postData';
import PatchData from 'apis/board/patchData';
import getPostDetail from 'apis/board/getPostDetail';
import TextEditor from '../customTextEditor';
import GoBackMenu from './goBackMenu';

function WritePost() {
  const { userInfo } = useUserInfoStore(state => state);
  const urlData = useLocation().pathname.slice(0, 4);
  const paramsData = useParams();
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(true);
  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [post, setPost] = useState<string>('');
  const [uploadImages, setUploadImages] = useState<string[] | []>([]);
  // const [tag, setTag] = useState<string[] | []>([]);

  const postHandler = async () => {
    try {
      if (category === '' || title === '' || post === '') {
        alert('주제, 제목, 내용은 빈 칸으로 둘 수 없습니다.');
      } else {
        const data = {
          title,
          content: post,
          category,
          uploadImages,
          createdAt: `${new Date()}`,
        };
        if (urlData === '/fre') {
          const resData = await PostData(data, 'frees');
          // alert('게시글 작성을 완료하였습니다.');
          navigate(`/free/articles/${resData.data.freeId}`, { replace: true });
        } else if (urlData === '/qna') {
          const resData = await PostData(data, 'qnas/questions');
          // alert('게시글 작성을 완료하였습니다.');
          navigate(`/qna/articles/${resData.data.questionId}`, {
            replace: true,
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const patchHandler = async () => {
    try {
      if (category === '' || title === '' || post === '') {
        alert('주제, 제목, 내용은 빈 칸으로 둘 수 없습니다.');
      } else {
        const data = {
          title,
          content: post,
          category,
          uploadImages,
          modifiedAt: `${new Date()}`,
        };
        if (urlData === '/fre') {
          const resData = await PatchData(data, 'frees', Number(paramsData.id));
          // alert('게시글 수정을 완료하였습니다.');
          navigate(`/free/articles/${resData.data.freeId}`, { replace: true });
        } else if (urlData === '/qna') {
          const resData = await PatchData(
            data,
            'qnas/questions',
            Number(paramsData.id),
          );
          // alert('게시글 수정을 완료하였습니다.');
          navigate(`/qna/articles/${resData.data.questionId}`, {
            replace: true,
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const cancelHandler = () => {
    navigate(-1);
  };

  const loadPostDetail = async () => {
    try {
      if (urlData === '/fre') {
        const buffer = await getPostDetail('frees', Number(paramsData.id));
        await setCategory(buffer.data.category);
        await setTitle(buffer.data.title);
        await setPost(buffer.data.content);
        // await setUploadImages(buffer.data.uploadImages);
        setIsPending(false);
        // setTag();
      } else {
        const buffer = await getPostDetail(
          'qnas/questions',
          Number(paramsData.id),
        );
        await setCategory(buffer.data.category);
        await setTitle(buffer.data.title);
        await setPost(buffer.data.content);
        // await setUploadImages(buffer.data.uploadImages);
        // setTag();
        setIsPending(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (paramsData.feat === 'edit') {
      loadPostDetail();
    }
  }, []);

  return (
    <Container>
      <GoBackMenu />
      {paramsData.feat === 'write' ? (
        <Title>
          <H2>글 작성하기</H2>
        </Title>
      ) : null}
      {paramsData.feat === 'edit' ? (
        <Title>
          <H2>글 수정하기</H2>
        </Title>
      ) : null}
      {isPending && paramsData.feat === 'edit' ? (
        <Main>
          <h1>로딩페이지가 들어갈 자리입니다.</h1>
        </Main>
      ) : (
        <Main>
          <PostDiv>
            <Label htmlFor="category">주제</Label>
            {urlData === '/fre' ? (
              <Select
                id="category"
                onChange={e => {
                  setCategory(e.target.value);
                }}
              >
                <option value="">주제를 선택해 주세요.</option>
                {userInfo.state === 'ADMIN' ? (
                  <option value="공지">공지</option>
                ) : null}
                <option value="일상">일상</option>
                <option value="정보">정보</option>
                <option value="유머">유머</option>
              </Select>
            ) : (
              <Select
                id="category"
                onChange={e => {
                  setCategory(e.target.value);
                }}
              >
                <option value="">주제를 선택해 주세요.</option>
                {userInfo.state === 'ADMIN' ? (
                  <option value="공지">공지</option>
                ) : null}
                <option value="국어">국어</option>
                <option value="영어">영어</option>
                <option value="수학">수학</option>
                <option value="사탐">사탐</option>
                <option value="과탐">과탐</option>
                <option value="국사">국사</option>
                <option value="기타">기타</option>
              </Select>
            )}
          </PostDiv>
          <PostDiv>
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              type="text"
              defaultValue={title}
              placeholder="제목을 입력해 주세요."
              onChange={e => setTitle(e.target.value)}
            />
          </PostDiv>
          <PostDiv>
            <Label htmlFor="post">내용</Label>
            <TextEditorDiv id="post">
              <TextEditor
                textContent={post}
                setTextContent={setPost}
                uploadImages={uploadImages}
                setUploadImages={setUploadImages}
                path={
                  urlData === '/fre'
                    ? 'boards/frees/content'
                    : 'boards/qnas/questions/contents'
                }
              />
            </TextEditorDiv>
          </PostDiv>
          {/* <PostDiv>
            <Label htmlFor="tag">태그</Label>
            <Input id="tag" placeholder="미구현 기능" />
          </PostDiv> */}
        </Main>
      )}
      <BtnDiv>
        {paramsData.feat === 'write' ? (
          <div>
            <CancelBtn onClick={cancelHandler}>취소</CancelBtn>
            <Button.WriteBtn onClick={postHandler}>작성</Button.WriteBtn>
          </div>
        ) : null}
        {paramsData.feat === 'edit' ? (
          <div>
            <CancelBtn onClick={cancelHandler}>취소</CancelBtn>
            <Button.WriteBtn onClick={patchHandler}>수정</Button.WriteBtn>
          </div>
        ) : null}
      </BtnDiv>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  width: 100%;
  padding: calc(${theme.gap.px10} * 3) ${theme.gap.px20};
  border-bottom: 1px solid ${theme.colors.gray};
`;

const H2 = styled.h2`
  font-weight: bold;
  font-size: ${theme.fontSizes.lg};
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${theme.gap.px20};
  margin-bottom: ${theme.gap.px20};
`;

const Label = styled.label`
  margin-bottom: ${theme.gap.px10};
`;

const Select = styled.select`
  display: flex;
  border-radius: 5px;
  padding: 15px;
  background-color: ${theme.colors.white};
  padding: 15px;
  padding-right: 30px;
`;

const Input = styled.input`
  display: flex;
  border: 1px solid ${theme.colors.gray};
  border-radius: 5px;
  padding: 15px;

  &:focus {
    border: 1px solid ${theme.colors.black};
  }
`;

const PostDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${theme.gap.px20};
`;

const BtnDiv = styled.div`
  display: flex;
  justify-content: right;
  padding: ${theme.gap.px20} ${theme.gap.px40};
  margin-bottom: ${theme.gap.px80};
  > div {
    display: flex;
    justify-content: space-between;
    width: 200px;
  }
`;
const CancelBtn = styled(Button.FilterBtn)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;

  &:hover {
    border: 1px solid ${theme.colors.gray};
    background-color: ${theme.colors.lightGray};
  }
`;

const TextEditorDiv = styled.div`
  display: flex;
  width: 100%;
  min-height: 25rem;

  white-space: pre-wrap;
  strong {
    font-weight: bold;
  }
  em {
    font-style: italic;
  }
  a {
    text-decoration: underline;
  }
`;

export default WritePost;
