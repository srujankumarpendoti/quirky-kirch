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

    // parent container position
    const parentRect = noBtn.parentElement.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();

    // calculate relative movement INSIDE parent
    const x = yesRect.left - parentRect.left - 20;
    const y = yesRect.top - parentRect.top - 10;

    noBtn.style.transform = `translate(${x}px, ${y}px) scale(0.9)`;
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
              onTouchStart={handleNoHover} // 📱 mobile support added
            >
              NO 😅
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
