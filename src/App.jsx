import { useState, useRef } from "react";
import "./styles.css";

export default function App() {
  const [opened, setOpened] = useState(false);
  const noBtnRef = useRef(null);
  const yesBtnRef = useRef(null);

  // 🔥 FIXED — Move NO button near YES (mobile safe)
  const handleNoHover = () => {
  const noBtn = noBtnRef.current;
  const yesBtn = yesBtnRef.current;

  if (!noBtn || !yesBtn) return;

  const yesRect = yesBtn.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();

  // 🔥 Calculate relative move instead of full screen jump
  const moveX = yesRect.left - noRect.left;
  const moveY = yesRect.top - noRect.top;

  noBtn.style.transform = `translate(${moveX}px, ${moveY}px) scale(0.9)`;
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
