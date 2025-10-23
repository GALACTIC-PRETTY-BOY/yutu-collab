document.addEventListener("DOMContentLoaded", () => {
    const analyzeBtn = document.getElementById("analyzeBtn");
    const resultsDiv = document.getElementById("results");

    // Replace with your actual ngrok URL or local URL
    const API_URL = "http://127.0.0.1:5000/analyze_comments";

    async function analyzeComments() {
        const commentsInput = document.getElementById("comments").value.trim();
        if (!commentsInput) {
            alert("Please enter comments to analyze.");
            return;
        }

        // Split comments by new line
        const comments = commentsInput.split("\n").filter(c => c.trim() !== "");

        resultsDiv.innerHTML = "Analyzing comments...";

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ comments })
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
            resultsDiv.innerHTML = "Error connecting to backend. Make sure Flask is running.";
        }
    }

    analyzeBtn.addEventListener("click", analyzeComments);
});





