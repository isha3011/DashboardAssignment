import {sendOTP} from "./sendOtp.js";
import {showToast}  from "./toast.js"

  const otp = sessionStorage.getItem("otp");
  const otpInputs = document.querySelectorAll(".form-control");
  const otpError = document.getElementById("otpError");
  const verifyBtn = document.getElementById("verifyBtn");
  const mobile = sessionStorage.getItem("mobile");
  const mobileDisplay = document.getElementById("mobileDisplay");
  
  if(otp){
    showToast(`This is your OTP: ${otp}`, "success", 10000);
  }
  if(otpInputs.length>0){
      otpInputs[0].focus();
      otpInputs.forEach((input, index)=>{
        input.addEventListener("input", (e)=>{
            const value = e.target.value;
            if(!/^\d$/.test(value)){
                e.target.value="";
                otpError.innerText = "Please enter valid OTP";
                return;
            }
            otpError.innerText="";
               if(index < otpInputs.length-1){
                  otpInputs[index+1].focus()
                }
            })
            input.addEventListener("keydown", (e)=>{
                if(e.key === "Backspace" && !e.target.value && index>0){
                    otpInputs[index-1].focus();
                }
            })
        })
  }
  
  if(mobile && mobileDisplay){
    mobileDisplay.innerText = `+91-${mobile}`;
  }
  const resend = document.getElementById("resendOtp");
  if(resend){
    resend.addEventListener("click", function(e){
        e.preventDefault();
        sendOTP(mobile);
        showToast(`This is your OTP: ${otp}`, "success", 10000);
        window.location.href=`otp.html`;
    })
  }  

  verifyBtn.addEventListener("click", ()=>{
    let enterdOTP = "";
    otpInputs.forEach(input =>{
        enterdOTP+=input.value;
    })
    if(!/^\d{6}$/.test(enterdOTP)){
        otpError.innerText = "Please enter all 6 digits";
        showToast("Please enter all 6 digits", "error");
        return;
    }
    otpError.innerText = "";
    if(enterdOTP === otp){
        showToast("OTP verified successfully", "success");
        sessionStorage.removeItem("otp");
        sessionStorage.removeItem("mobile");
        setTimeout(()=>{
            window.location.href = `dashboard.html`;
        })
    }
    else{
        showToast("Invalid OTP");
    }
  })

  

  
