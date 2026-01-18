export function showToast(message, type="info", duration=3000) {
  const toast = document.getElementById("toast");
  if(!toast){
    console.error("Toast not found");
    return;
  }
  const colors = {
    success: "#2ecc71",
    error: "#e74c3c",
    info: "#333"
  }

  toast.style.background = colors[type] || colors.info
  toast.innerText = message;
  toast.classList.add("show");
  setTimeout(()=>{
    toast.classList.remove("show");
  }, duration)
  
}