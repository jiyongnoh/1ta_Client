import React, { useRef, useMemo } from 'react';
import axios, { AxiosError } from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import theme from 'theme';

const apiUrl = process.env.REACT_APP_API_URL;

type Props = {
  textContent: string;
  setTextContent: React.Dispatch<React.SetStateAction<string>>;
  // uploadImages: string[] | [];
  // setUploadImages: React.Dispatch<React.SetStateAction<string[] | []>>;
  path: string;
};

function TextEditor({
  textContent,
  setTextContent,
  // uploadImages,
  // setUploadImages,
  path,
}: Props) {
  const QuillRef: any = useRef();

  // const ArrayHandler = (value: string) => {
  //   if (uploadImages) {
  //     return [...uploadImages, value];
  //   }
  // };

  const imageHandler = () => {
    const input = document.createElement('input');
    const formData = new FormData();
    let url = '';

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/jpg, image/png, image/jpeg, image/gif');
    input.click();

    input.onchange = async () => {
      const file = input.files;

      if (file) {
        formData.append('image', file[0]);
        formData.append('filePath', path);
      }

      try {
        const response = await axios.post(`${apiUrl}/upload`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'ngrok-skip-browser-warning': '69420',
          },
        });

        url = response.data.data;

        if (QuillRef.current) {
          const index = QuillRef.current?.getEditor().getSelection()?.index;

          if (index !== null && index !== undefined) {
            const quill = QuillRef.current?.getEditor();
            quill?.setSelection(index, 1);
            quill?.clipboard.dangerouslyPasteHTML(
              index,
              `<a target="_blank" href="${url}"><img src=${url} alt="사진" /></a>`,
            );
            // const bufferUrl = ArrayHandler(url);
            // if (Array.isArray(bufferUrl)) {
            //   setUploadImages(bufferUrl);
            // }
          }
        }
        return { ...response, success: true };
      } catch (error) {
        const err = error as AxiosError;
        return { ...err.response, success: false };
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ size: ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ color: [] }, { background: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['image'],
        ],
        handlers: { image: imageHandler },
      },
    }),
    [],
  );

  return (
    <TextEditorDiv>
      <ReactQuill
        ref={QuillRef}
        theme="snow"
        style={{ width: '100%', height: '100%' }}
        modules={modules}
        value={textContent}
        onChange={setTextContent}
        placeholder="내용을 입력해 주세요."
      />
    </TextEditorDiv>
  );
}

const TextEditorDiv = styled.div`
  width: 100%;
  min-height: 25rem;
  padding-bottom: ${theme.gap.px40};

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
  img {
    max-width: 50em;
    height: auto;
  }
`;

export default TextEditor;
