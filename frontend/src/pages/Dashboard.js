import { useEffect, useState } from "react";
import { getSystemData } from "../services/api";
import StatsCard from "../components/StatsCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [data, setData] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    const result = await getSystemData();
    setData(result);

    const time = new Date().toLocaleTimeString();

    setHistory((prev) => [
      ...prev.slice(-9),
      {
        time,
        cpu: Number(result.cpu),
        memory: Number(result.memory),
      },
    ]);
  };

  if (!data) {
    return (
      <div
        style={{
          background: "#07111f",
          color: "white",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "30px",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#07111f",
        minHeight: "100vh",
        padding: "30px",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "56px",
          marginBottom: "10px",
          fontWeight: "bold",
        }}
      >
        Smart Resource Dashboard
      </h1>

      <p
        style={{
          color: "#94a3b8",
          fontSize: "18px",
          marginBottom: "35px",
        }}
      >
        Real-time intelligent monitoring and optimization
      </p>

      <div
        style={{
          display: "flex",
          gap: "25px",
          marginBottom: "35px",
          flexWrap: "wrap",
        }}
      >
        <StatsCard title="CPU Usage" value={data.cpu} />
        <StatsCard title="Memory Usage" value={data.memory} />
      </div>

      <div
        style={{
          background: "#1a2438",
          padding: "25px",
          borderRadius: "22px",
          width: "600px",
          marginBottom: "35px",
          border: "1px solid #334155",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        <h2
          style={{
            fontSize: "30px",
            marginBottom: "15px",
          }}
        >
          Smart Recommendation
        </h2>

        <div
          style={{
            background:
              data.recommendation.includes("high") ||
              data.recommendation.includes("High")
                ? "rgba(239,68,68,0.12)"
                : "rgba(34,197,94,0.12)",
            border:
              data.recommendation.includes("high") ||
              data.recommendation.includes("High")
                ? "1px solid rgba(239,68,68,0.4)"
                : "1px solid rgba(34,197,94,0.4)",
            borderRadius: "16px",
            padding: "18px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "18px",
              color:
                data.recommendation.includes("high") ||
                data.recommendation.includes("High")
                  ? "#f87171"
                  : "#4ade80",
            }}
          >
            {data.recommendation}
          </p>
        </div>
      </div>

      <div
        style={{
          background: "#1a2438",
          padding: "25px",
          borderRadius: "22px",
          width: "95%",
          border: "1px solid #334155",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "30px",
              margin: 0,
            }}
          >
            Resource Usage History
          </h2>

          <div
            style={{
              display: "flex",
              gap: "20px",
              color: "#cbd5e1",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "#38bdf8",
                }}
              ></div>
              CPU
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "#22c55e",
                }}
              ></div>
              Memory
            </div>
          </div>
        </div>

        <div style={{ width: "100%", height: "350px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history}>
              <CartesianGrid stroke="#334155" strokeDasharray="5 5" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" domain={[0, 100]} />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                  color: "white",
                }}
              />

              <Line
                type="monotone"
                dataKey="cpu"
                stroke="#38bdf8"
                strokeWidth={4}
                dot={{ r: 4 }}
              />

              <Line
                type="monotone"
                dataKey="memory"
                stroke="#22c55e"
                strokeWidth={4}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;