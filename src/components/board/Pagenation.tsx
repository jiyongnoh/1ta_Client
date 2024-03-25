/* eslint-disable react/no-array-index-key */
/* eslint-disable react/require-default-props */
import styled from 'styled-components';
import theme from 'theme';
import { FlexContainer } from 'pages/review/TeacherList/ReviewPage';

type Props = {
  size: number; // 전체 강사 수
  currentPage: number; // 현재 페이지
  pageSize: number; // 한 페이지에 뿌릴 강사 수
  setCurPage: React.Dispatch<React.SetStateAction<number>>;
  // sort:string; // 정렬 형태
  // word:string; // 검색어
};

function Pagenation({ size, currentPage, pageSize, setCurPage }: Props) {
  const totalPage = size; // 전체 Page 개수
  const pageArr = [];
  for (let i = 1; i <= totalPage; i += 1) pageArr.push(i);
  return (
    <FlexContainer>
      <PagenationContainer>
        <PageBox
          first={currentPage === 1}
          onClick={() => {
            if (currentPage > 1) {
              setCurPage(currentPage - 1);
            }
          }}
        >
          ⬅ prev
        </PageBox>
        <PageContainer>
          {pageArr.map((el, index) => {
            return (
              <PageBox
                key={index}
                selected={currentPage === el}
                onClick={() => {
                  setCurPage(Number(el));
                }}
              >
                {el}
              </PageBox>
            );
          })}
        </PageContainer>
        <PageBox
          last={currentPage === totalPage}
          onClick={() => {
            if (currentPage < totalPage) {
              setCurPage(currentPage + 1);
            }
          }}
        >
          next ➡
        </PageBox>
      </PagenationContainer>
    </FlexContainer>
  );
}

export default Pagenation;

const PagenationContainer = styled.div`
  width: 100%;
  min-height: ${theme.gap.px60};
  border-top: 1px solid ${theme.colors.gray};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.gap.px60};
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

type BorderTop = {
  first?: boolean;
  selected?: boolean;
  last?: boolean;
};

const PageBox = styled.span<BorderTop>`
  font-weight: bold;
  padding: 2rem 0.5rem;
  border-top: ${props =>
    props.selected ? `2px solid ${theme.colors.pointColor}` : null};
  color: ${props =>
    props.first || props.last ? `${theme.colors.gray}` : null};
  cursor: pointer;
  :hover {
    color: ${theme.colors.pointColor};
  }
`;
