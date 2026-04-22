# 🎓 Student Registration System

## 📝 **Project Overview**
A functional, responsive web application designed for managing student records. This project leverages **Vanilla JavaScript** and **Tailwind CSS** to demonstrate proficiency in **DOM manipulation**, **form validation**, and **client-side data persistence**.

---

## 🚀 **Core Features**

### **1. Full CRUD Operations**
* **Create:** Register new students via a strictly validated form.
* **Read:** View all registered students in a real-time dynamic table.
* **Update:** Edit existing records; data automatically populates the form for modification.
* **Delete:** Remove specific records with a built-in confirmation prompt.

### **2. Data Persistence**
* Utilizes **`localStorage`** to ensure all student data is saved and remains persistent even after a page refresh or browser restart.

### **3. Robust Validation Engine**
* **Student Name:** Accepts alphabetical characters and spaces only.
* **Student ID:** Numeric input only.
* **Contact Number:** Strictly enforces a **minimum of 10 digits**.
* **Email:** Validates against standard professional email patterns.
* **Empty State Logic:** Prevents the submission of empty rows or incomplete records.

### **4. Dynamic UI/UX**
* **Responsive Design:** Fully optimized for **Mobile, Tablet, and Desktop** views.
* **Smart Scrollbar:** A custom JavaScript-driven vertical scrollbar appears automatically only when the table exceeds **5 entries** to maintain layout integrity.

---

## 🛠️ **Tech Stack**

* **HTML5:** Structured for semantic accessibility.
* **Tailwind CSS:** Utility-first styling for a modern, sleek interface.
* **JavaScript (ES6):** Core logic for DOM manipulation, Regex validation, and storage management.

---

## 💡 **Technical Standards & Expectations**

This project is built to meet the critical pillars evaluated in professional frontend assignments:
* **Technical Accuracy:** Clear definition of the tech stack and project logic.
* **Requirement Compliance:** Explicitly addresses mandatory tasks such as **10-digit validation** and **dynamic scrollbars**.
* **Code Professionalism:** Features an organized file structure and "clean code" principles, essential for scalable software development.

---

## 📂 **File Structure**
```text
├── dist/
│   ├── index.html    # Main entry point
│   ├── style.css     # Compiled Tailwind styles
│   └── index.js      # Core JavaScript logic
├── src/
│   ├── input.css     # Source Tailwind directives
├── package.json      # Dependencies and scripts
└── README.md         # Project documentation
```
---
## ⚙️ **Setup & Installation**

### **Step 1: Clone the repository**
```bash
git clone [https://github.com/Shivank-Arya/Assignment_DOM_Manipulation_Student_Registration_System.git](https://github.com/Shivank-Arya/Assignment_DOM_Manipulation_Student_Registration_System.git)
```
### **Step 2: Navigate to the folder**
```Bash
cd Assignment_DOM_Manipulation_Student_Registration_System
```
### **Step 3: Launch the application**
Open ```dist/index.html``` in your preferred web browser.
