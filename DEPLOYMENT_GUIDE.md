# 🚀 Deployment Guide (Lifetime Free)

This project is set up to be deployed on **Render** (Backend) and **Vercel** (Frontend). Both offer free tiers that are sufficient for this project.

## ✅ Prerequisites
1. **GitHub Account**: You need a GitHub account to push your code.
2. **Render Account**: strict-up at [render.com](https://render.com).
3. **Vercel Account**: Sign up at [vercel.com](https://vercel.com).

---

## Step 1: Push Code to GitHub
1. Create a **New Repository** on GitHub (name it `fullstack-app` or anything you like).
2. Run the following commands in your VS Code terminal (inside `fullstack-app` folder):

```sh
# Initialize Git (if not done)
git init
git add .
git commit -m "Initial commit"

# Link to your GitHub Repo (Replace URL with your actual repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Backend (Render)
1. Go to your **Render Dashboard**.
2. Click **New +** -> **Web Service**.
3. Connect your **GitHub** account and select the repository you just pushed.
4. Configure the settings:
   - **Name**: `my-backend-app` (or similar)
   - **Root Directory**: `backend` (Important!)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: Select **Free**.
5. Click **Create Web Service**.
6. Wait for it to deploy. Once done, **Copy the Backend URL** (e.g., `https://my-backend.onrender.com`).

---

## Step 3: Deploy Frontend (Vercel)
1. Go to your **Vercel Dashboard**.
2. Click **Add New ...** -> **Project**.
3. Import the same GitHub repository.
4. In the **Configure Project** screen:
   - **Root Directory**: Click `Edit` and select `frontend`.
   - **Environment Variables**:
     - Key: `VITE_API_URL`
     - Value: Paste your **Render Backend URL** (from Step 2). **Do not add a trailing slash `/` at the end.**
       - Correct: `https://my-backend.onrender.com`
       - Incorrect: `https://my-backend.onrender.com/`
5. Click **Deploy**.

---

## 🎉 Done!
Your app should now be live!
- The **Frontend** runs on Vercel.
- The **Backend** runs on Render.
