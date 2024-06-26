import GlobalStyle from 'GlobalStyles';
import styled from 'styled-components';
import SortBar from 'components/review/SortBar';
import SearchBar from 'components/review/SearchBar';
import Pagenation from 'components/review/Pagenation';
import CharacterCard from 'components/review/CharacterCard';
import Carousel from 'components/review/Carousel';
import SubjectMenu from 'components/review/SubjectMenu';
import Loading from 'components/review/Loading';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'components/common/Button';
import { Link } from 'react-router-dom';
import useUserInfoStore from 'stores/userInfoStore';

type Teachers = {
  gradeTags: string[];
  imageUrl: string;
  introduction: string;
  name: string; // 강사명
  platformTags: { platformTag: string }[];
  starPointAverage: number;
  subjectTags: { subjectTag: string }[];
  teacherId: number;
  profileImageUrl: string;
  realImageUrl: string;
  totalReviewCount: number;
};

type PageInfo = {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

const defaultPageInfo = {
  page: 1,
  size: 6,
  totalElements: 6,
  totalPages: 1,
};

const defaultTeachers = [
  {
    gradeTags: ['고1', '전체'],
    imageUrl: '',
    introduction: 'Default introduction',
    name: '김민지',
    platformTags: [{ platformTag: '이투스' }, { platformTag: '전체' }],
    starPointAverage: 5,
    subjectTags: [{ subjectTag: '물리학' }, { subjectTag: '전체' }],
    teacherId: 0,
    profileImageUrl: '/Teacher_image/teachers_1.jpg',
    realImageUrl: '',
    totalReviewCount: 0,
  },
  {
    gradeTags: ['고2', '전체'],
    imageUrl: '',
    introduction: 'Default introduction',
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
    gradeTags: ['중1', '전체'],
    imageUrl: '',
    introduction: 'Default introduction',
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

function ReviewPage() {
  const [buttonOpen, setButtonOpen] = useState<boolean>(false);
  const [subject, setSubject] = useState<string>('전체');
  const [grade, setGrade] = useState<string>('전체');
  const [platform, setPlatform] = useState<string>('전체');
  const [sortTag, setSortTag] = useState<string>('평점순');
  const [search, setSearch] = useState<string>('');
  const [reverse, setReverse] = useState<string>('정순');
  const [teachers, setTeachers] = useState<Teachers[]>(defaultTeachers); // 서버에서 받아올 선생 정보
  const [pageInfo, setPageInfo] = useState<PageInfo>(defaultPageInfo);
  const [curPage, setCurPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isPending, setIsPending] = useState(false);

  const { userInfo } = useUserInfoStore(state => state);

  useEffect(() => {
    // axios
    //   .get(
    //     `${process.env.REACT_APP_API_URL}/boards/teachers?${
    //       subject !== '전체' ? `subject=${subject}&` : ''
    //     }${sortTag !== '최신순' ? `sort=${sortTag}&` : ''}${
    //       grade !== '전체' ? `grade=${grade}&` : ''
    //     }${search !== '' ? `name=${search}&` : ''}${
    //       platform !== '전체' ? `platform=${platform}&` : ''
    //     }${
    //       reverse !== '정순' ? `reverse=on&` : ''
    //     }page=${curPage}&size=${pageSize}`,
    //     {
    //       headers: { 'ngrok-skip-browser-warning': '69420' },
    //     },
    //   )
    //   .then((res: any) => {
    //     setTeachers(res.data.data);
    //     setPageInfo(res.data.pageInfo);
    //     setCurPage(res.data.pageInfo.page);
    //     setIsPending(false);
    //   })
    //   .catch(() => {
    //     setIsPending(false);
    //   });
    console.log();

    const updateTeachers = defaultTeachers
      .filter(teacher => teacher.name.includes(search))
      .filter(
        teacher =>
          teacher.platformTags.filter(form => form.platformTag === platform)
            .length,
      )
      .filter(
        teacher =>
          teacher.subjectTags.filter(form => form.subjectTag === subject)
            .length,
      )
      .filter(
        teacher => teacher.gradeTags.filter(form => form === grade).length,
      );

    setTeachers(updateTeachers);
  }, [subject, sortTag, search, curPage, grade, platform, reverse]);

  return (
    <FlexContainer dir="col">
      <GlobalStyle />
      <Carousel />
      <FlexContainer
        display={userInfo.state === 'ADMIN' ? 'flex' : 'none'}
        justify="right"
      >
        <Link to="createTeacher">
          <PButton>강사 등록</PButton>
        </Link>
      </FlexContainer>
      <SortBar
        reverse={reverse}
        setReverse={setReverse}
        sortTag={sortTag}
        setSortTag={setSortTag}
        buttonOpen={buttonOpen}
        setButtonOpen={setButtonOpen}
        setCurPage={setCurPage}
      />
      <SubjectMenu
        buttonOpen={buttonOpen}
        subject={subject}
        grade={grade}
        platform={platform}
        setGrade={setGrade}
        setSubject={setSubject}
        setPlatform={setPlatform}
        setCurPage={setCurPage}
      />
      <SearchBar
        search={search}
        setSearch={setSearch}
        setCurPage={setCurPage}
      />

      {isPending ? (
        <Loading />
      ) : (
        <FlexContainer width="80%" dir="col">
          {!teachers.length ? (
            <FlexContainer height="50vh">등록된 강사가 없습니다</FlexContainer>
          ) : (
            <CharacterCard
              teachers={teachers}
              setPlatform={setPlatform}
              setSubject={setSubject}
              setCurPage={setCurPage}
            />
          )}
          <Pagenation
            size={pageInfo.totalPages}
            currentPage={curPage}
            pageSize={pageInfo.size}
            setCurPage={setCurPage}
          />
        </FlexContainer>
      )}
    </FlexContainer>
  );
}

export default ReviewPage;

type Container = {
  dir?: string;
  gap?: string;
  justify?: string;
  align?: string;
  width?: string;
  height?: string;
  backColor?: string;
  borderRadius?: string;
  display?: string;
  wrap?: string;
  grow?: number;
  borderTop?: string;
  borderBottom?: string;
  padding?: string;
  overflow?: string;
  top?: string;
  min?: string;
};

type SubjectSelectButton = {
  isOpen: boolean;
};

export const FlexContainer = styled.div<Container>`
  width: ${props => props.width};
  height: ${props => props.height};
  display: ${props => props.display || 'flex'};
  flex-direction: ${props => (props.dir === 'col' ? 'column' : 'row')};
  flex-wrap: ${props => props.wrap};
  justify-content: ${props => props.justify || 'center'};
  align-items: ${props => props.align || 'center'};
  gap: ${props => props.gap || '1rem'};
  background-color: ${props => props.backColor || 'none'};
  border-radius: ${props => props.borderRadius || 'none'};
  flex-grow: ${props => props.grow};
  border-top: ${props => props.borderTop};
  border-bottom: ${props => props.borderBottom};
  padding: ${props => props.padding};
  overflow: ${props => props.overflow};
  top: ${props => props.top};
  min-height: ${props => props.min};
`;

const SubjectSelectButton = styled.div<SubjectSelectButton>`
  width: 5.25rem;
  height: 2.125rem;
  text-align: center;
  color: white;
  background-color: ${props => (props.isOpen ? '#6667ab' : '#b8b8b8')};
  border: none;
  border-radius: 13px;
  font-weight: bold;

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const PButton = Button.PointBtn;
