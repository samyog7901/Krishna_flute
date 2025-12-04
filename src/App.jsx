import { useEffect, useState, useRef } from "react";

function App() {
  const [angle, setAngle] = useState(0);
  const [musicStarted, setMusicStarted] = useState(false);
  const [mantraAngle, setMantraAngle] = useState(0);
  const [pulse, setPulse] = useState(0);
  const audioRef = useRef(null);

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const numPetals = 12;
  const mantraWords = [
    "हरे", "कृष्ण", "हरे", "कृष्ण", "कृष्ण", "कृष्ण",
    "हरे", "हरे", "हरे", "राम", "हरे", "राम",
    "राम", "राम", "हरे", "हरे"
  ];
  const textRadius = 150;
  const scrollDuration = 35; // seconds for both top and bottom

  const handleStart = () => {
    setMusicStarted(true);
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log(err));
    }
  };

  // Rotate lotus petals
  useEffect(() => {
    if (!musicStarted) return;
    const interval = setInterval(() => {
      setAngle(prev => (prev + 0.25) % 360);
    }, 20);
    return () => clearInterval(interval);
  }, [musicStarted]);

  // Rotate circular mantra
  useEffect(() => {
    if (!musicStarted) return;
    const interval = setInterval(() => {
      setMantraAngle(prev => (prev + 0.2) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [musicStarted]);

  // Pulsating aura
  useEffect(() => {
    if (!musicStarted) return;
    const interval = setInterval(() => {
      setPulse(prev => (prev + 0.05) % (2 * Math.PI));
    }, 20);
    return () => clearInterval(interval);
  }, [musicStarted]);

  // Lotus petals
  const createFlowerPetals = () => {
    const petals = [];
    const layers = [
      { radius: 60, size: 12, blur: 2, speed: 1 },
      { radius: 90, size: 18, blur: 3, speed: 0.5 },
      { radius: 120, size: 8, blur: 4, speed: 0.2 },
    ];

    layers.forEach((layer, l) => {
      for (let i = 0; i < numPetals; i++) {
        const petalAngle = ((360 / numPetals) * i + angle * layer.speed) * (Math.PI / 180);
        const petalX = centerX + layer.radius * Math.cos(petalAngle);
        const petalY = centerY + layer.radius * Math.sin(petalAngle);
        const hue = (angle + i * (360 / numPetals) + l * 40) % 360;
        const petalScale = 0.5 + 0.5 * Math.sin(((angle + i * 20) * Math.PI) / 180);

        petals.push(
          <div
            key={`${l}-${i}`}
            style={{
              position: "absolute",
              left: petalX,
              top: petalY,
              width: `${layer.size * petalScale}px`,
              height: `${layer.size * petalScale}px`,
              borderRadius: "50%",
              background: `hsl(${hue}, 100%, 60%)`,
              filter: `blur(${layer.blur * petalScale}px)`,
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          />
        );
      }
    });
    return petals;
  };

  const hue = angle % 360;
  const glow = `0 0 35px 20px hsl(${hue}, 100%, 60%)`;

  const auraScale = 1 + 0.1 * Math.sin(pulse);
  const auraStyle = {
    position: "absolute",
    left: centerX,
    top: centerY,
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    background: "rgba(255, 200, 100, 0.3)",
    transform: `translate(-50%, -50%) scale(${auraScale})`,
    filter: "blur(40px)",
    pointerEvents: "none",
    zIndex: 0,
  };

  const mantraText = "हरेर्नाम हरेर्नाम हरेर्नामैव केवलम् । कलौ नास्त्येव नास्त्येव नास्त्येव गतिरन्यथा ॥ ";

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
        background: "#e6f7ff",
      }}
    >
      <audio ref={audioRef} loop>
        <source src="/flutemusic.mp3" type="audio/mp3" />
      </audio>

      {!musicStarted && (
        <button
          onClick={handleStart}
          style={{
            position: "absolute",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px 20px",
            fontSize: "18px",
            background: "#ffdd99",
            borderRadius: "10px",
            border: "2px solid #cc9900",
            cursor: "pointer",
          }}
        >
          ▶️ Start Krishna Flute Music
        </button>
      )}

      {musicStarted && createFlowerPetals()}

      {/* Pulsating aura */}
      {musicStarted && <div style={auraStyle}></div>}

      {/* Krishna at center */}
      <img
        src="https://media.istockphoto.com/id/2154467772/vector/cute-baby-krishna-vector-illustration-poster-art-print.jpg?s=612x612&w=0&k=20&c=2i-2Vdj9Sum01sC2EPxFi9kFa9ir9OQ92J9J8m1ZYPM="
        alt="Krishna"
        style={{
          position: "absolute",
          left: centerX,
          top: centerY,
          height: "150px",
          transform: "translate(-50%, -50%)",
          borderRadius: "100px",
          pointerEvents: "none",
          boxShadow: glow,
          zIndex: 1,
        }}
      />

      {/* Circular Sanskrit Mantra */}
      {musicStarted &&
        mantraWords.map((word, i) => {
          const total = mantraWords.length;
          const wordAngle =
            ((360 / total) * i + mantraAngle) * (Math.PI / 180);

          const wordX = centerX + textRadius * Math.cos(wordAngle);
          const wordY = centerY + textRadius * Math.sin(wordAngle);

          const rotation = (wordAngle * 180) / Math.PI + 90;

          return (
            <span
              key={i}
              style={{
                position: "absolute",
                left: wordX,
                top: wordY,
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                fontSize: "22px",
                fontWeight: "bold",
                fontFamily: "Tiro Devanagari, serif",
                color: "#6a0dad",
                textShadow: "0 0 8px rgba(106,0,218,0.6)",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                zIndex: 2,
              }}
            >
              {word}
            </span>
          );
        })}

      {/* Bottom scrolling mantra (left-to-right) */}
      {musicStarted && (
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
              fontSize: "28px",
              fontWeight: "bold",
              fontFamily: "Tiro Devanagari, serif",
              color: "#6a0dad",
              animation: `scrollMantraReverse ${scrollDuration}s linear infinite`,
            }}
          >
            {mantraText.repeat(2)}
          </div>
        </div>
      )}

      {/* Top-right scrolling mantra (right-to-left) */}
     {/* Top-right scrolling mantra (right-to-left) */}
    {/* Top-center mantra (static, always visible) */}
{/* Top-center mantra (static, glows after music starts) */}
<div
  style={{
    position: "absolute",
    top: "90px",
    left: "50%",
    transform: "translateX(-50%)",
    whiteSpace: "nowrap",
    fontSize: "28px",
    fontWeight: "bold",
    fontFamily: "Tiro Devanagari, serif",
    color: "#6a0dad",
    textAlign: "center",
    pointerEvents: "none",
    zIndex: 3,
    padding: "5px 15px",
    borderRadius: "10px",
    background: musicStarted ? "rgba(255, 220, 100, 0.5)" : "transparent",
    boxShadow: musicStarted
      ? "0 0 20px 10px rgba(255, 220, 100, 0.6)"
      : "none",
    transition: "background 0.5s, box-shadow 0.5s",
    animation: musicStarted ? "pulseGlow 2s ease-in-out infinite" : "none",
  }}
>
  {mantraText.repeat(1)}
</div>




      {/* Scroll animation keyframes */}
      <style>
  {`
    @keyframes scrollMantra {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    @keyframes scrollMantraReverse {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }
    @keyframes pulseGlow {
      0% {
        box-shadow: 0 0 20px 10px rgba(255, 220, 100, 0.6);
        background: rgba(255, 220, 100, 0.5);
      }
      50% {
        box-shadow: 0 0 35px 15px rgba(255, 220, 100, 0.8);
        background: rgba(255, 220, 100, 0.7);
      }
      100% {
        box-shadow: 0 0 20px 10px rgba(255, 220, 100, 0.6);
        background: rgba(255, 220, 100, 0.5);
      }
    }
  `}
</style>

    </div>
  );
}

export default App;
