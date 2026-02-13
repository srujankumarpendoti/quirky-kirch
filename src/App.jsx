import { useState, useRef } from "react";
import "./styles.css";

export default function App() {
  const [opened, setOpened] = useState(false);
  const noBtnRef = useRef(null);

  // 🔥 Move NO button to random place on hover
  const handleNoHover = () => {
    const btn = noBtnRef.current;
    if (!btn) return;

    const container = document.querySelector(".container");
    const rect = container.getBoundingClientRect();

    // random position inside screen
    const maxX = rect.width - 120;
    const maxY = rect.height - 60;

    const randomX = Math.random() * maxX - rect.width / 2 + 60;
    const randomY = Math.random() * maxY - rect.height / 2 + 30;

    btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
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
            <button className="yesBtn">YES 😍</button>

            <button
              ref={noBtnRef}
              className="noBtn"
              onMouseEnter={handleNoHover}
            >
              NO 😅
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
