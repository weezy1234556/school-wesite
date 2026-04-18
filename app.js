// Default admin credentials
let adminEmail = "admin@school.com";
let adminPassword = "admin123";

// Select forms & sections
const loginForm = document.getElementById("loginForm");
const admissionForm = document.getElementById("admissionForm");
const feesForm = document.getElementById("feesForm");
const adminPanel = document.getElementById("adminPanel");
const adminTrigger = document.getElementById("adminTrigger");
const changePasswordForm = document.getElementById("changePasswordForm");

const admissionList = document.getElementById("admissionList");
const paymentList = document.getElementById("paymentList");

const receiptSection = document.getElementById("receiptSection");
const receiptText = document.getElementById("receiptText");
const downloadReceiptBtn = document.getElementById("downloadReceipt");

// Handle navigation clicks to show/hide sections
const navLinks = document.querySelectorAll("nav ul li a");
const sections = document.querySelectorAll(".section");

navLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);

    sections.forEach(section => {
      if (section.id === targetId) {
        section.classList.remove("hidden");
        window.scrollTo(0, section.offsetTop);
      } else if (section.id !== "adminPanel" && section.id !== "login") {
        section.classList.add("hidden");
      }
    });
  });
});

// Admission form
admissionForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const name = this.name.value;
  const age = this.age.value;
  const grade = this.grade.value;

  alert(`Application submitted!\nName: ${name}\nAge: ${age}\nGrade: ${grade}`);

  const li = document.createElement("li");
  li.textContent = `${name}, Age: ${age}, Grade: ${grade}`;
  admissionList.appendChild(li);

  this.reset();
});

// Fees form
feesForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const student = this.student.value;
  const amount = this.amount.value;
  const momo = this.momo.value;
  const reference = this.reference.value;

  if (momo !== "0595518728") {
    alert("Invalid MoMo Number! Please use 0595518728.");
    return;
  }

  const message = `Payment successful!\nStudent: ${student}\nAmount: GHS ${amount}\nMoMo: ${momo}\nReference: ${reference}`;
  alert(message);

  const li = document.createElement("li");
  li.textContent = `${student} paid GHS ${amount} (Ref: ${reference})`;
  paymentList.appendChild(li);

  // Show receipt section
  receiptText.textContent = `${student} paid GHS ${amount}. Reference: ${reference}`;
  receiptSection.classList.remove("hidden");

  // Save details for download
  downloadReceiptBtn.onclick = () => {
    const receiptContent = `
      Firmly Rooted Montessori School
      -------------------------------
      Student: ${student}
      Amount: GHS ${amount}
      MoMo Number: ${momo}
      Reference: ${reference}
      Date: ${new Date().toLocaleString()}
    `;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${student}_receipt.txt`;
    link.click();
  };

  this.reset();
});

// Login form
loginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === adminEmail && password === adminPassword) {
    alert("Admin Login Successful!");
    document.getElementById("login").classList.add("hidden");
    adminPanel.classList.remove("hidden");
  } else {
    alert("Invalid login credentials!");
  }
});

// Show hidden admin login when footer text clicked
adminTrigger.addEventListener("click", function() {
  document.getElementById("login").classList.remove("hidden");
  window.scrollTo(0, document.getElementById("login").offsetTop);
});

// Change password
changePasswordForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const oldPass = document.getElementById("oldPassword").value;
  const newPass = document.getElementById("newPassword").value;

  if (oldPass === adminPassword) {
    adminPassword = newPass;
    alert("Password changed successfully!");
    this.reset();
  } else {
    alert("Old password is incorrect!");
  }
});
