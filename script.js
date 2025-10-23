async function analyze() const analyzeBtn = document.getElementById("analyzeBtn");
        const resultsDiv = document.getElementById("results");

        // Replace this with your actual ngrok URL
        const API_URL = "https://connivingly-gravelly-mariko.ngrok-free.dev
/predict";

        analyzeBtn.addEventListener("click", async () => {
            const videoId = document.getElementById("videoId").value.trim();
            if (!videoId) {
                alert("Please enter a video ID");
                return;
            }

            resultsDiv.innerHTML = "Fetching and analyzing comments...";

            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ video_id: videoId })
                });

                if (!response.ok) throw new Error("Network response was not ok");

                const data = await response.json();
                const results = data.results;

                if (!results.length) {
                    resultsDiv.innerHTML = "No comments found.";
                    return;
                }

                resultsDiv.innerHTML = "";
                results.forEach(item => {
                    const div = document.createElement("div");
                    div.className = `comment ${item.sentiment}`;
                    div.innerHTML = `<strong>${item.sentiment}</strong>: ${item.comment}`;
                    resultsDiv.appendChild(div);
                });

            } catch (err) {
                console.error(err);
                resultsDiv.innerHTML = "Error connecting to backend. Make sure ngrok and Flask are running.";
            }
        });

