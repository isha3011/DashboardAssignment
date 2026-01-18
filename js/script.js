import {sendOTP} from "./sendOtp.js";

const otpform = document.getElementById("otpVerification");
if(otpform){
  otpform.addEventListener("submit", function (e){
  e.preventDefault();
  const mobileNumber = document.getElementById("mobileNumber").value.trim();
  sendOTP(mobileNumber);
  console.log(mobileNumber);
})
}
