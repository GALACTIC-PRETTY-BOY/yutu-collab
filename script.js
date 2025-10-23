async function analyze() {
  const videoId = document.getElementById("videoId").value.trim();
  const output = document.getElementById("output");
  output.innerHTML = "Analyzing...";

  try {
    const response = await fetch("https://connivingly-gravelly-mariko.ngrok-free.dev/predict", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ video_id: videoId })
    });

    const data = await response.json();
    output.innerHTML = "";
    data.results.forEach(r => {
      const div = document.createElement("div");
      div.innerHTML = `<strong>${r.comment}</strong><br>Sentiment: ${r.sentiment}<hr>`;
      output.appendChild(div);
    });
  } catch (err) {
    output.innerHTML = "Error connecting to backend.";
  }
}

