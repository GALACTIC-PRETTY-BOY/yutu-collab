document.addEventListener("DOMContentLoaded", () => {
    const analyzeBtn = document.getElementById("analyzeBtn");
    const resultsDiv = document.getElementById("results");

    // Replace this with your actual ngrok URL
    const API_URL = "https://connivingly-gravelly-mariko.ngrok-free.dev/predict";

    async function analyzeVideo() {
        const videoIdInput = document.getElementById("videoId").value.trim();

        if (!videoIdInput) {
            alert("Please enter a video ID or URL");
            return;
        }

        // Extract ID if user pastes full URL
        let videoId = videoIdInput;
        if (videoId.includes("youtube.com/watch?v=")) {
            const url = new URL(videoIdInput);
            videoId = url.searchParams.get("v");
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

            if (data.error) {
                resultsDiv.innerHTML = data.error;
                return;
            }

            const results = data.results;
            if (!results || !results.length) {
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
    }

    analyzeBtn.addEventListener("click", analyzeVideo);
});



