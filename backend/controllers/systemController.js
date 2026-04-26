const si = require("systeminformation");

exports.getSystemData = async (req, res) => {
  try {
    const cpu = await si.currentLoad();
    const memory = await si.mem();

    const cpuUsage = cpu.currentLoad.toFixed(2);
    const memoryUsage = ((memory.used / memory.total) * 100).toFixed(2);

    let recommendation = "System is running smoothly";

    if (cpuUsage > 80) {
      recommendation = "High CPU usage! Close some heavy applications.";
    } else if (memoryUsage > 80) {
      recommendation = "Memory usage is too high. Close unused apps.";
    }

    res.json({
      cpu: cpuUsage,
      memory: memoryUsage,
      recommendation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Data nahi aa raha",
    });
  }
};