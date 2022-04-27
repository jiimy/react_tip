import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import classNames from 'classnames';
import './utilToolkit.scss';
import { Link } from 'react-router-dom';

const UtilToolkit = () => {
  const [editMode, setEditMode] = useState(false);
  const [position, setPosition] = useState({ x: 887, y: 946 });
  const [keyInput, setkeyInput] = useState('');

  // TODO: f4 눌럿을때 수정모드 off 로 변경
  const trackPos = data => {
    setPosition({ x: data.x, y: data.y });
  };
  const toggleEditMode = () => {
    if (editMode === false) {
      setEditMode(true);
      document.designMode = 'on';

      // let Target = document.querySelector('body');
      // Target.addEventListener('click', function(event) {
      //   console.log(event.target.style);
      //   event.target.style.pointerEvents = 'none';
      // })
    } else {
      setEditMode(false);
      document.designMode = 'off';
    }
  };

  const viewMode = () => {
    keyInput === 'alt + 9' && (document.designMode = 'off');
  };

  useEffect(() => {
    window.onkeydown = e => setkeyInput(e.key);

    window.addEventListener('keydown', keysPressed, false);
    window.addEventListener('keyup', keysReleased, false);

    
    var keys = [];

    function keysPressed(e) {
      keys[e.keyCode] = true;

      // Ctrl + Space
      if (keys[17] && keys[32]) {
        console.log('Ctrl + Space');
        e.preventDefault(); // prevent default browser behavior
      }
    }
    function keysReleased(e) {
      keys[e.keyCode] = false;
    }
  }, []);

  // TODO: 다중키 입력으로 ui 토글.
  // x+s
  // x누른체로 s누르기

  // TODO: 편집모드 일시 body에 pointer-event none 넣기, 편집모드 창에 hover 시 body에 넣은 pointer-event none 제거

  return (
    <>
      {(window.location.href.includes(':3000/') || window.location.href.includes('-dev')) && keyInput === 'F2' && (
        <Draggable onDrag={(e, data) => trackPos(data)}>
          <div className={classNames('drag-box', { 'is-none-event': editMode })}>
            <div className={classNames('editmode', { 'is-edit': editMode })} onClick={() => toggleEditMode()}>
              수정모드 : {editMode ? 'ON' : 'OFF'}
            </div>
            <div className="list-style-none">
              <div className="sub-title">
                {/* <a href="#/component">- 컴포넌트 페이지</a> */}
                <a href="http://localhost:3000/#/component">- 컴포넌트 페이지</a>
                <a href="http://localhost:3000/#/popup">- 팝업 페이지</a>
              </div>
            </div>
          </div>
        </Draggable>
      )}
    </>
  );
};

export default UtilToolkit;
