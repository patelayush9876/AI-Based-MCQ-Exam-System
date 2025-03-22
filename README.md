# AI-Based MCQ Exam System

## 🚀 Project Overview
The **AI-Based MCQ Exam System** is an advanced online examination platform that utilizes **Artificial Intelligence (AI) to automate question generation, grading, and result analysis**. The system enables administrators to create quizzes, add students, and analyze performance through AI-driven insights.

## 🎯 Key Features
- **Quiz Management:** Add, update, delete quizzes with bulk question upload (Doc file support).
- **AI-Based Question Generation:** Generate MCQs using OpenAI API.
- **Automated Grading System:** AI-driven result evaluation for accurate scoring.
- **Result Summary & Insights:** AI-powered analytics to assess student performance.
- **Secure Authentication:** Role-based access for admin, teachers, and students.
- **Anti-Cheating Mechanism:** Randomized questions, tab-switch detection.
- **User-Friendly UI:** Modern, intuitive dashboard for quiz and student management.

## 🛠️ Tech Stack
- **Frontend:** React.js
- **Backend:** Java, Spring Boot
- **Database:** MySQL
- **AI Integration:** OpenAI API (for automated MCQ generation and grading)
- **Authentication:** JWT-based authentication system

## 📌 System Requirements
- Node.js v16+
- Java 11+
- MySQL Server
- OpenAI API Key
- Postman (for API testing, optional)

## 📥 Installation & Setup
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/ai-mcq-exam-system.git
cd ai-mcq-exam-system
```

### 2️⃣ Backend Setup (Spring Boot + MySQL)
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### 3️⃣ Frontend Setup (React.js)
```bash
cd frontend
npm install
npm run dev
```

### 4️⃣ Database Configuration
- Create a MySQL database named `mcq_exam_system`
- Update database credentials in `application.properties`

### 5️⃣ Environment Variables
Create a `.env` file in the root directory and configure:
```env
OPENAI_API_KEY=your_api_key_here
JWT_SECRET=your_secret_key
DATABASE_URL=jdbc:mysql://localhost:3306/mcq_exam_system
```

## 📊 Project Workflow
1. **Admin Panel:** Admin adds quizzes, manages students, and configures AI settings.
2. **AI-Powered Question Generation:** AI generates MCQs based on given topics.
3. **Students Take Quiz:** Students answer AI-generated MCQs.
4. **Automated Grading:** AI evaluates answers and assigns grades.
5. **Results & Insights:** AI provides performance analysis and improvement suggestions.

## 🧑‍💻 Contribution Guidelines
We welcome contributions! 🚀
- Fork the repository & create a new branch.
- Implement your feature or fix an issue.
- Open a pull request with detailed description.

## 📜 License
This project is licensed under the **MIT License**.

## 📩 Contact
For queries, reach out to:
- **Your Name**
- **Email:** patelayush9876@gmail.com
- **LinkedIn:** [Your Profile]([https://linkedin.com/in/your-profile](https://www.linkedin.com/in/ayush-patel-860793296/))

---
**⭐ If you find this project helpful, don't forget to star the repo!**
