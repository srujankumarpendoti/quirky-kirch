import { useState, useRef } from "react";
import "./styles.css";

export default function App() {
  const [opened, setOpened] = useState(false);
  const noBtnRef = useRef(null);

  // 🔥 ADVANCED ESCAPE LOGIC
  const moveAway = (clientX, clientY) => {
    const btn = noBtnRef.current;
    const container = document.querySelector(".container");

    if (!btn || !container) return;

    const rect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    // button center
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    // direction vector (away from finger/mouse)
    let dx = btnCenterX - clientX;
    let dy = btnCenterY - clientY;

    const length = Math.sqrt(dx * dx + dy * dy) || 1;

    // normalize direction
    dx = dx / length;
    dy = dy / length;

    // distance to move
    const distance = 120;

    let newX = btn.offsetLeft + dx * distance;
    let newY = btn.offsetTop + dy * distance;

    // keep inside screen bounds
    newX = Math.max(0, Math.min(rect.width - btnRect.width, newX));
    newY = Math.max(0, Math.min(rect.height - btnRect.height, newY));

    btn.style.left = `${newX}px`;
    btn.style.top = `${newY}px`;
  };

  // Desktop mouse move
  const handleMouseMove = (e) => {
    moveAway(e.clientX, e.clientY);
  };

  // Mobile touch move
  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    moveAway(touch.clientX, touch.clientY);
  };

  return (
    <div
      className="container"
      onMouseMove={opened ? handleMouseMove : null}
      onTouchMove={opened ? handleTouchMove : null}
    >
      {!opened && (
        <button className="startBtn" onClick={() => setOpened(true)}>
          Click Here 💖
        </button>
      )}

      {opened && (
        <div className="proposal">
          <h1 className="text">Will you marry me ? 💍</h1>

          <div className="btnRow">
            <button className="yesBtn">YES 😍</button>

            {/* 🔥 ESCAPING BUTTON */}
            <button ref={noBtnRef} className="noBtn">
              NO 😅
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
