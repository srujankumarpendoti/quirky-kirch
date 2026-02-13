import { useState, useRef } from "react";
import "./styles.css";

export default function App() {
  const [opened, setOpened] = useState(false);
  const noBtnRef = useRef(null);

  // 🔥 Move button away from cursor/finger
  const moveAway = (clientX, clientY) => {
    const btn = noBtnRef.current;
    const container = document.querySelector(".container");

    if (!btn || !container) return;

    const rect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    // button center
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    // 🔥 DISTANCE CHECK (important fix)
    const distX = btnCenterX - clientX;
    const distY = btnCenterY - clientY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    // 👉 only escape when mouse is CLOSE (120px range)
    if (distance > 120) return;

    // direction away from cursor
    let dx = distX / distance;
    let dy = distY / distance;

    const moveDistance = 140;

    let newX = btn.offsetLeft + dx * moveDistance;
    let newY = btn.offsetTop + dy * moveDistance;

    newX = Math.max(0, Math.min(rect.width - btnRect.width, newX));
    newY = Math.max(0, Math.min(rect.height - btnRect.height, newY));

    btn.style.left = `${newX}px`;
    btn.style.top = `${newY}px`;
  };

  // 💻 PC
  const handleMouseMove = (e) => {
    moveAway(e.clientX, e.clientY);
  };

  // 📱 Mobile
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

            <button ref={noBtnRef} className="noBtn">
              NO 😅
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
