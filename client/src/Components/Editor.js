import React, { useState, useEffect, useCallback } from 'react';
import 'quill/dist/quill.snow.css';
import Quill from 'quill';
import './Editor.css';
import { io } from 'socket.io-client';
import { ENDPOINT } from '../constants';

var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  [{ size: ['small', false, 'large', 'huge'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ['clean'],
];

const Editor = () => {
  const [socket, setSocket] = useState(null);
  const [quill, setQuill] = useState(null);

  useEffect(() => {
    const s = io(ENDPOINT);
    setSocket(s);
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket || !quill) return;
    const handler = (delta, oldDelta, source) => {
      if (source !== 'user') return;
      console.log(delta);
      socket.emit('send-changes', delta);
    };

    quill.on('text-change', handler);
    return () => {
      quill.off('text-change', handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (!socket || !quill) return;
    const handler = (delta) => {
      quill.updateContents(delta);
    };

    socket.on('recieve-changes', handler);
    return () => {
      socket.off('recieve-changes', handler);
    };
  }, [socket, quill]);

  const editorRef = useCallback((editorWrapper) => {
    if (editorWrapper === null) return;

    editorWrapper.innerHTML = '';
    const editor = document.createElement('div');
    editorWrapper.append(editor);

    const q = new Quill(editor, {
      theme: 'snow',
      modules: {
        toolbar: toolbarOptions,
      },
    });
    setQuill(q);
  },[]);

  return (
    <>
      <div className='head'>
        <h4>Docs</h4>
        <div className='document-options'>
          <h5>Download</h5>
          <h5>Share</h5>
        </div>
      </div>
      <div className='editor' ref={editorRef}></div>
    </>
  );
};

export default Editor;
