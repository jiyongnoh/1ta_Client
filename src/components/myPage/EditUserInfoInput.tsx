import styled from 'styled-components';
import theme from 'theme';

const { danger, success, fontColor, gray, pointColor } = theme.colors;
const dangerRGB = '236, 60, 60';
const successRGB = '101, 226, 113';

const EditUserInfo = styled.input`
  padding: 0.1rem 0.2rem;
  border-radius: 0.2rem;
  margin-right: 0.4rem;
  color: ${fontColor};
  border: 1px solid
    ${({ color }) => {
      switch (color) {
        case 'danger':
          return danger;
        default:
          return gray;
      }
    }};
  background-color: ${({ color }) => {
    switch (color) {
      case 'danger':
        return `rgba(${dangerRGB}, 0.2)`;
      default:
        return 'white';
    }
  }};
  :-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px inset
      ${({ color }) => {
        switch (color) {
          case 'danger':
            return `rgba(${dangerRGB}, 0.2)`;
          default:
            return 'white';
        }
      }};
  }
  :focus {
    border-color: ${pointColor};
    box-shadow: 0px 0 5px rgba(0, 0, 0, 0.3);
  }
`;

const StyleErrorMessage = styled.p`
  color: ${danger};
`;

type EditUserInfoInputProps = {
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  errorMessage: string;
  value: string;
  color?: 'danger' | 'success';
};

function EditUserInfoInput({
  placeholder,
  onChange,
  errorMessage,
  value,
  color,
}: EditUserInfoInputProps) {
  return (
    <>
      <EditUserInfo
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        color={color}
      />
      <StyleErrorMessage>{errorMessage}</StyleErrorMessage>
    </>
  );
}

EditUserInfoInput.defaultProps = {
  color: undefined,
};

export default EditUserInfoInput;
