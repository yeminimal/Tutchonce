import React, { useCallback, useState } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor, Descendant } from 'slate';
import { cn } from '@/lib/utils';
import EditorStyles from './components/EditorStyles';

interface AdvancedEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

const AdvancedEditor: React.FC<AdvancedEditorProps> = ({
  value,
  onChange,
  placeholder = 'Start writing...',
  className,
  minHeight = '300px',
}) => {
  const [editorValue, setEditorValue] = useState<Descendant[]>([
    { type: 'paragraph', children: [{ text: value }] },
  ]);
  const editor = React.useMemo(() => withReact(createEditor()), []);

  const handleChange = useCallback(
    (newValue: Descendant[]) => {
      setEditorValue(newValue);
      const plainText = newValue.map((node) => node.children.map((child) => child.text).join('')).join('\n');
      onChange(plainText);
    },
    [onChange]
  );

  return (
    <div className={cn('advanced-editor', className)}>
      <EditorStyles minHeight={minHeight} />
      <Slate editor={editor} value={editorValue} onChange={handleChange}>
        <Editable
          placeholder={placeholder}
          style={{ minHeight, padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </Slate>
    </div>
  );
};

export default AdvancedEditor;
