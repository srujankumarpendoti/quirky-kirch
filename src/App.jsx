import { useState, useRef } from "react";
import "./styles.css";

export default function App() {
  const [opened, setOpened] = useState(false);
  const noBtnRef = useRef(null);

  // 😈 NO button runs anywhere on screen
  const moveNoButton = () => {
    const noBtn = noBtnRef.current;
    if (!noBtn) return;

    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    const maxX = window.innerWidth - btnWidth - 20;
    const maxY = window.innerHeight - btnHeight - 20;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.position = "fixed";
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
  };

  return (
    <div className="container">

      {/* 💖 Floating Hearts */}
      <div className="hearts">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i}>💗</span>
        ))}
      </div>

      {!opened && (
        <button className="startBtn" onClick={() => setOpened(true)}>
          Click Here ✨💖
        </button>
      )}

      {opened && (
        <div className="proposal">
          <h1 className="text">Will you marry me ? 💍</h1>

          <div className="btnRow">
            <button className="yesBtn">YES 😍</button>

            <button
              ref={noBtnRef}
              className="noBtn"
              onMouseEnter={moveNoButton}
              onTouchStart={moveNoButton}
            >
              NO 😅
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
