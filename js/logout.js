const logoutBtn = document.getElementById("logoutBtn");

if(logoutBtn){
    logoutBtn.addEventListener("click", ()=>{
        sessionStorage.removeItem("otp");
    sessionStorage.removeItem("mobile");
    setTimeout(()=>{
        window.location.href = `/index.html`;
    })
   })
    
}