import { useEffect, useState, useRef } from "react";

function App() {
  const [angle, setAngle] = useState(0);
  const [musicStarted, setMusicStarted] = useState(false);
  const audioRef = useRef(null);

  const radius = 220;
  const centerX = window.innerWidth / 2 - 75;
  const centerY = window.innerHeight / 2 - 55;

  const numPetals = 12; // number of flower-like particles

  // Play music and start rotation
  const handleStart = () => {
    setMusicStarted(true);
    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.log(err));
    }
  };

  // Rotation & animation
  useEffect(() => {
    if (!musicStarted) return;
    const interval = setInterval(() => {
      setAngle((prev) => (prev + 0.25) % 360);
    }, 20);
    return () => clearInterval(interval);
  }, [musicStarted]);

  // Krishna position
  const x = musicStarted
    ? centerX + radius * Math.cos((angle * Math.PI) / 180)
    : centerX + 140; // initial top-right inside div
  const y = musicStarted
    ? centerY + radius * Math.sin((angle * Math.PI) / 180)
    : centerY - 210;

  // Floating scale
  const scale = 1 + 0.05 * Math.sin((angle * Math.PI) / 45);

  // Flower-like aura petals
  const createFlowerPetals = () => {
    const petals = [];
    const petalRadius = 60; // distance from center of image
    for (let i = 0; i < numPetals; i++) {
      const petalAngle = ((360 / numPetals) * i + angle) * (Math.PI / 180);
      const petalX = x + petalRadius * Math.cos(petalAngle);
      const petalY = y + petalRadius * Math.sin(petalAngle);
      const hue = (angle + i * (360 / numPetals)) % 360;
      const petalScale = 0.5 + 0.5 * Math.sin((angle + i * 20) * Math.PI / 180);
      petals.push(
        <div
          key={i}
          style={{
            position: "absolute",
            left: petalX,
            top: petalY,
            width: `${12 * petalScale}px`,
            height: `${12 * petalScale}px`,
            borderRadius: "50%",
            background: `hsl(${hue}, 100%, 60%)`,
            filter: `blur(${2 * petalScale}px)`,
            pointerEvents: "none",
            transform: `translate(-50%, -50%)`,
            transition: "left 0.05s linear, top 0.05s linear",
          }}
        ></div>
      );
    }
    return petals;
  };

  // Krishna glow
  const hue = angle % 360;
  const boxShadow = `0 0 30px 15px hsl(${hue}, 100%, 50%)`;

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
      {/* 🎵 Hidden Music Player */}
      <audio ref={audioRef} loop>
        <source src="/flutemusic.mp3" type="audio/mp3" />
      </audio>

      {/* ▶️ Play Button */}
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

      {/* Center Div */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            background: "#fff7e6",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            width: "300px",
            height: "300px",
          }}
        >
          <h1 style={{ color: "#8b0000", marginBottom: "10px" }}>
            Hare Krishna!!
          </h1>
          <h3 style={{ color: "#ff8c00", marginBottom: "5px" }}>
            Nitaai Gaur Hari Premanande
          </h3>
          <h5 style={{ color: "#006400" }}>Hari Hari Bol.. 🙌🏼</h5>
        </div>
      </div>

      {/* 🌸 Flower petals around Krishna */}
      {musicStarted && createFlowerPetals()}

      {/* 🟡 Krishna Image */}
      <img
        src="https://media.istockphoto.com/id/2154467772/vector/cute-baby-krishna-vector-illustration-poster-art-print.jpg?s=612x612&w=0&k=20&c=2i-2Vdj9Sum01sC2EPxFi9kFa9ir9OQ92J9J8m1ZYPM="
        alt="Krishna"
        style={{
          position: "absolute",
          left: x,
          top: y,
          height: "150px",
          pointerEvents: "none",
          transform: `scale(${scale})`,
          borderRadius: "100px",
          boxShadow,
          transition: "left 0.05s linear, top 0.05s linear, transform 0.05s linear",
        }}
      />
    </div>
  );
}

export default App;
