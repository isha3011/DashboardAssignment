import { showToast } from "./toast.js";
const validationError = document.getElementById("error");
export function validateNumber(mobileNumber, errorText) {
  if (!errorText) {
    return false;
  }
  if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
    errorText.innerText = "Please enter 10 digit valid mobile number";
    showToast("Please enter 10 digit valid mobile number", "error");
    return false;
  }
  errorText.innerText = "";
  return true;
}

export function sendOTP(mobileNumber) {
  if (validateNumber(mobileNumber, validationError)) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem("otp", otp);
    sessionStorage.setItem("mobile", mobileNumber);
    window.location.href = `pages/otp.html`;
  } else {
    console.error("Please enter valid mobile number");
  }
}
