# 🚀 NanoLink – Tiny Links, Big Impact  

NanoLink is a fast, lightweight, and efficient URL shortener that converts long URLs into tiny, shareable links. 🔗✨  

I'll create the complete backend code, including:  
✅ **Express.js server**  
✅ **MongoDB connection**  
✅ **NanoID for unique short links**  
✅ **API endpoints** for shortening and redirecting URLs  

---

### **📜 Steps to Run NanoLink**
1️⃣ Install **Node.js** and **MongoDB**  
2️⃣ Clone the repo and install dependencies  
3️⃣ Start the server and access **http://localhost:3000**  

Now, let's create the full **server.js** code: 👇🏼

### **📦 How to Run NanoLink Locally**
1️⃣ **Install Dependencies**  
```sh
npm install express mongoose nanoid cors dotenv
```

2️⃣ **Set Up Environment Variables**  
Create a `.env` file and add:  
```env
MONGO_URI=mongodb://localhost:27017/nanolink
```

3️⃣ **Start MongoDB** (if not running)  
```sh
mongod --dbpath /data/db
```

4️⃣ **Run the Server**  
```sh
node server.js
```

5️⃣ **Use the API**
- **Shorten a URL** → `POST http://localhost:3000/shorten`
- **Redirect** → Open `http://localhost:3000/{shortId}`  

---
![WhatsApp Image 2025-02-10 at 12 30 53_373fcec7](https://github.com/user-attachments/assets/6202755c-358f-4ae4-a7e5-bfdea6232a75)

🔥 **Now NanoLink shortener is live at** `http://localhost:3000` 🚀  

