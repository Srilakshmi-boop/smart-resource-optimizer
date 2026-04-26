function StatsCard({ title, value }) {
  const color =
    value > 80 ? "#ef4444" : value > 60 ? "#f59e0b" : "#22c55e";

  return (
    <div
      style={{
        background: "#1a2438",
        color: "white",
        padding: "25px",
        borderRadius: "22px",
        width: "260px",
        textAlign: "center",
        border: "1px solid #334155",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      }}
    >
      <h2 style={{ marginBottom: "18px", fontSize: "28px" }}>{title}</h2>

      <h1
        style={{
          color,
          fontSize: "52px",
          margin: 0,
        }}
      >
        {value}%
      </h1>
    </div>
  );
}

export default StatsCard;