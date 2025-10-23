# 🎬 YouTube Comment Sentiment Analyzer

A web application that analyzes the sentiment of YouTube comments (Positive, Neutral, or Negative) using a trained deep learning model hosted through Google Colab and a simple frontend on GitHub Pages.

---

## 🚀 Project Overview

This project connects a **frontend website** (hosted on GitHub Pages) with a **Python Flask backend** (hosted on Google Colab using ngrok).

The backend:
- Loads a pre-trained Keras sentiment model (`ModelV2.keras`)
- Uses a custom tokenizer (`tokenizer.pkl`)
- Fetches YouTube comments via the YouTube Data API
- Classifies sentiments for each comment

The frontend:
- Lets you input a YouTube video ID
- Sends it to the backend
- Displays the sentiment results dynamically

---

## 🧠 Model Details

The model and tokenizer were trained for comment-level sentiment analysis and are included in:
- `ModelV2.keras`
- `tokenizer.pkl`

---

## 🧰 Tech Stack

**Frontend**
- HTML, CSS, JavaScript
- Hosted via GitHub Pages

**Backend**
- Flask + TensorFlow (in Google Colab)
- Connected via ngrok tunnel

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/sentiment-webapp.git
cd sentiment-webapp
