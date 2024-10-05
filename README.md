
# 🧑‍💼 Resume-Based Job and Course Recommendation App

Welcome to the **Resume-Based Job and Course Recommendation App**, an intelligent platform that analyzes your resume and provides job role suggestions, job listings via the **LinkedIn API**, and tailored course recommendations via the **Gemini API** to help boost your career.

![App Screenshot](screenshot.png)

## 🚀 Features

- **Upload Resume**: Upload your resume in PDF format, and the app will predict a suitable job role for you.
- **Job Listings**: Get matching job listings via the **LinkedIn API** based on the predicted job role, with advanced filtering options.
- **Course Recommendations**: Tailored courses from the **Gemini API** to help enhance your skills and knowledge for the predicted job role.
- **User Authentication**: Secure login and registration to track your recommendations.
- **Clean UI**: A modern, easy-to-use interface for a seamless user experience.

---

## 🛠️ Tech Stack

### **Frontend**
- [React.js](https://reactjs.org/) – For building a responsive, dynamic UI.
- [React Router](https://reactrouter.com/) – For seamless page navigation.
- [Axios](https://axios-http.com/) – To handle API requests.
- HTML5 & CSS3 – For the app's structure and design.

### **Backend**
- [Flask](https://flask.palletsprojects.com/) – For creating the API to handle file uploads, job and course recommendations.
- [Python](https://www.python.org/) – For the backend logic and processing.
- **LinkedIn API** – To fetch job listings for the predicted job role.
- **Gemini API** – For providing tailored course recommendations.

### **Database**
- [Firebase](https://firebase.google.com/) – For managing user authentication and session storage.

---

## ⚙️ Installation and Setup

Follow these steps to get the app running locally.

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
```

### 2. Install Dependencies

Navigate to the project directory and run the following command:

```bash
cd your-repo-name
npm install
```

This will install all the necessary dependencies for the frontend.

### 3. Start the React Development Server

```bash
npm start
```

The app will now be running on `http://localhost:3000`.

### 4. Set Up the Backend

Move into the backend folder and create a Python virtual environment:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # For Mac/Linux
venv\Scripts\activate      # For Windows
```

Install the Python dependencies:

```bash
pip install -r requirements.txt
```

Start the Flask server:

```bash
python app.py
```

The backend will be running on `http://127.0.0.1:5000`.

---

## 🔑 Environment Variables

Make sure to set up your environment variables for both frontend and backend. For example:

**Backend (Flask) `.env` file**:

```
SECRET_KEY=your_secret_key
LINKEDIN_API_KEY=your_linkedin_api_key
GEMINI_API_KEY=your_gemini_api_key
```

**Frontend `.env` file**:

```
REACT_APP_API_URL=http://localhost:5000
```

---

## 🧑‍💻 How to Use

### 1. Register/Login
- Sign up for an account, or log in using your existing credentials.
- Your session will be tracked securely using Firebase authentication.

### 2. Upload Your Resume
- Upload your resume in PDF format.
- The app will analyze your resume and suggest a **Predicted Job Role** based on your qualifications and experience.

### 3. Explore Matching Jobs
- The app will display a list of job listings fetched from the **LinkedIn API** based on your predicted job role.
- Use filters (company, location, date posted) to refine your job search.

### 4. View Course Recommendations
- Under the **Predicted Job Role**, you will see recommended courses from the **Gemini API**.
- Each course includes a link to enroll or learn more.

---

## 📂 Project Structure

```
├── backend                # Flask API to handle resume processing and course/job recommendations
│   ├── app.py             # Main backend file
│   └── requirements.txt   # Backend dependencies
├── frontend               # React frontend
│   ├── public             # Public files like index.html
│   └── src                # React source files
│       ├── components     # Reusable components
│       └── App.js         # Main frontend file
└── .gitignore             # Git ignore file
```

---

## 🎨 Screenshots

![Upload Resume](screenshot1.png)
*Upload your resume in PDF format.*

![Job Listings](screenshot2.png)
*View job listings fetched using the LinkedIn API.*

![Course Recommendations](screenshot3.png)
*Get course recommendations powered by the Gemini API.*

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the project.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

---

## 🛡️ License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

## 💬 Contact

For any inquiries, feel free to reach out:

- Your Name – [Your Email](mailto:youremail@example.com)
- GitHub – [@your-username](https://github.com/your-username)
- LinkedIn – [Your LinkedIn](https://linkedin.com/in/your-profile)

---

**Don't forget to ⭐ this repository if you found it useful!**
