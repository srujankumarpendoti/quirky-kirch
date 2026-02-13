import { useState, useRef } from "react";
import "./styles.css";

const handleNoHover = () => {
  const noBtn = noBtnRef.current;
  const container = noBtn.parentElement;

  if (!noBtn || !container) return;

  const containerRect = container.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  // 🔥 Random position inside button row
  const maxX = containerRect.width - btnRect.width;
  const maxY = containerRect.height - btnRect.height;

  const randomX = Math.random() * maxX - btnRect.width / 2;
  const randomY = Math.random() * maxY - btnRect.height / 2;

  noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
};

  return (
    <div className="container">
      {!opened && (
        <button className="startBtn" onClick={() => setOpened(true)}>
          Click Here 💖
        </button>
      )}

      {opened && (
        <div className="proposal">
          <h1 className="text">Will you marry me ? 💍</h1>

          <div className="btnRow">
            <button ref={yesBtnRef} className="yesBtn">
              YES 😍
            </button>

            <button
  ref={noBtnRef}
  className="noBtn"
  onMouseEnter={handleNoHover}
  onTouchStart={handleNoHover}
>
  NO 😅
</button>
          </div>
        </div>
      )}
    </div>
  );
}
