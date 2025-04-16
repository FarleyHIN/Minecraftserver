const express = require("express");
const path = require("path");
const { exec } = require("child_process");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/start-server", (req, res) => {
  const { edition, version } = req.body;

  console.log(`Request to start ${edition} server, version ${version}`);

  // Replace this command with your actual server start command
  let command = "";

  if (edition === "java") {
    command = `cd java_servers/${version} && java -Xmx1024M -Xms1024M -jar server.jar nogui`;
  } else if (edition === "bedrock") {
    command = `cd bedrock_servers/${version} && ./bedrock_server`;
  }

  // Actually execute the server command (only works if your environment supports it)
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ status: "error", message: error.message });
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
    }

    console.log(`Server started: ${stdout}`);
    res.json({ status: "started", edition, version });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
