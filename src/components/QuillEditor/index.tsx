import 'quill/dist/quill.snow.css';
import { useEffect } from 'react';
import { useQuill } from 'react-quilljs';

interface QuillEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  /** 默认高度 */
  defaultHeight?: string;
}

const QuillEditor = (props: QuillEditorProps) => {
  const { quill, quillRef } = useQuill();
  const defaultHeight = props.defaultHeight || '100px';
  useEffect(() => {
    if (quill) {
      // 取值
      if (props.value) quill.clipboard.dangerouslyPasteHTML(props.value);
      // 赋值
      quill.on('text-change', () => {
        props?.onChange?.(quill.getSemanticHTML());
      });
    }
  }, [quill]);

  return (
    <div className="min-[300px]">
      <div ref={quillRef} style={{ minHeight: defaultHeight }} />
    </div>
  );
};

export default QuillEditor;
