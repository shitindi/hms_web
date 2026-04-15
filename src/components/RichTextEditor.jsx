import { useRef, useState } from 'react';

export default function RichTextEditorBasic() {
  const editorRef = useRef(null);
  const [htmlContent, setHtmlContent] = useState('');

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    setHtmlContent(editorRef.current?.innerHTML || '');
  };

  const handleInput = () => {
    setHtmlContent(editorRef.current?.innerHTML || '');
  };

  const toolbarButtons = [
    { label: 'B', action: () => formatText('bold'), title: 'Bold' },
    { label: 'I', action: () => formatText('italic'), title: 'Italic' },
    { label: 'U', action: () => formatText('underline'), title: 'Underline' },
    { label: 'S', action: () => formatText('strikeThrough'), title: 'Strikethrough' },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-slate-200 bg-slate-50 p-4">
        <div className="flex flex-wrap items-center gap-2">
          {toolbarButtons.map((button) => (
            <button
              key={button.title}
              type="button"
              title={button.title}
              onClick={button.action}
              className="min-w-[42px] rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              {button.label}
            </button>
          ))}

          <button
            type="button"
            onClick={() => formatText('insertUnorderedList')}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            • List
          </button>

          <button
            type="button"
            onClick={() => formatText('insertOrderedList')}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            1. List
          </button>

          <button
            type="button"
            onClick={() => formatText('justifyLeft')}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Left
          </button>

          <button
            type="button"
            onClick={() => formatText('justifyCenter')}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Center
          </button>

          <button
            type="button"
            onClick={() => formatText('justifyRight')}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Right
          </button>

          <select
            onChange={(event) => formatText('formatBlock', event.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
            defaultValue="p"
          >
            <option value="p">Paragraph</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="blockquote">Quote</option>
          </select>

          <input
            type="color"
            title="Text Color"
            onChange={(event) => formatText('foreColor', event.target.value)}
            className="h-10 w-12 rounded-xl border border-slate-300 bg-white p-1"
          />

          <button
            type="button"
            onClick={() => formatText('removeFormat')}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Clear
          </button>
        </div>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        className="min-h-[260px] w-full p-5 outline-none prose prose-slate max-w-none"
        style={{ whiteSpace: 'pre-wrap' }}
      >
        <p>Start writing here...</p>
      </div>

      <div className="border-t border-slate-200 bg-slate-50 p-4">
        <div className="mb-2 text-sm font-medium text-slate-700">HTML Preview</div>
        <pre className="max-h-48 overflow-auto rounded-2xl bg-slate-900 p-4 text-xs text-slate-100">
{htmlContent || '<p>Start writing here...</p>'}
        </pre>
      </div>
    </div>
  );
}
