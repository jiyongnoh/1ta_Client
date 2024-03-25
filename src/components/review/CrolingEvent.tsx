import styled from 'styled-components';
import { FlexContainer } from 'pages/review/TeacherList/ReviewPage';

type Props = {
  event: {
    imageUrl: string;
    title: string;
    source: string;
    hyperLink: string;
    date: string;
    // imageUrl: string;
  };
};

function CrolingEvent({ event }: Props) {
  const endCheck = (last: string) => {
    const today = new Date();
    const lastDay = last.slice(14);

    if (Number(today.getFullYear()) < Number(lastDay.slice(0, 4))) return false;
    if (Number(today.getMonth()) + 1 < Number(lastDay.slice(5, 7)))
      return false;
    if (Number(today.getDate()) <= Number(lastDay.slice(8, 10))) return false;
    return true;
  };

  return (
    <Container>
      <FlexContainer width="14%">
        <MiddleFont>외부</MiddleFont>
      </FlexContainer>
      <FlexContainer width="58%" dir="col" align="start" gap="0.3rem">
        <TitleSpan end={endCheck(event.date)} href={event.hyperLink}>
          {event.title.length > 30
            ? `${event.title.slice(0, 30)}...`
            : event.title}
        </TitleSpan>
      </FlexContainer>

      <FlexContainer width="13%">
        <FlexContainer dir="col" gap="0" align="start">
          <DateFont>{event.date.slice(0, 13)}</DateFont>
          <DateFont>{event.date.slice(13)}</DateFont>
        </FlexContainer>
      </FlexContainer>
      <FlexContainer width="12%">
        {endCheck(event.date) ? <EndFont>종료</EndFont> : '진행중'}
      </FlexContainer>
    </Container>
  );
}

export default CrolingEvent;

type Container = {
  first?: boolean;
};
type TitleSpan = {
  end?: boolean;
};

const Container = styled.div<Container>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1.5rem;
  border-top: ${props => (props.first ? '2px solid black' : null)};
  border-bottom: 0.5px solid black;
`;

const MiddleFont = styled.div`
  font-size: 0.9rem;
  color: #6667ab;
  font-weight: bold;
`;

const DateFont = styled.span`
  font-size: 0.8rem;
  color: gray;
`;

const TitleSpan = styled.a<TitleSpan>`
  font-size: 1rem;
  font-weight: bold;
  color: ${props => (props.end ? 'gray' : 'black')};
  text-decoration: ${props => (props.end ? 'line-through' : 'none')};

  :hover {
    color: ${props => (props.end ? 'gray' : 'red')};
  }
  cursor: pointer;
`;

const EndFont = styled.span`
  font-size: small;
  color: gray;
`;
