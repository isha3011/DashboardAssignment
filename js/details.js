import { contacts } from "../data/contacts.js";
import { validateNumber } from "./sendOtp.js";

const params = new URLSearchParams(window.location.search);
const contactList = document.getElementById("contactList");
if (params) {
  document.getElementById("id").innerText = params.get("id");
  document.getElementById("name").innerText = params.get("name");
  document.getElementById("phone").innerText = params.get("phone");
  document.getElementById("completed").innerText = params.get("completed");
  document.getElementById("referrals").innerText = params.get("referrals");
}

let advisorContacts = [...contacts];
function renderCards(list) {
  contactList.innerHTML = "";

  list.forEach((contact) => {
    const col = document.createElement("div");
    if (!col) {
      console.error("Cannot generate div");
    }
    col.className = "col-lg-3";
    col.innerHTML = `
        <div class="card p-4 border-none">
            <div class="profile-card">
                <h5 class="mb-1 fw-medium">${contact.name}</h5>
                <input type="tel" name="phone" pattern="\d{10}" maxlength="10"
                    class="d-flex w-100 p-1 contact-input" inputmode="numeric" placeholder="Add Phone number">
                    <span class="text-danger numberError"></span>
            </div>
        </div>
    `;

    contactList.appendChild(col);
  });
}
renderCards(advisorContacts);

const ContactInput = document.querySelectorAll(".contact-input");
const updateBtn = document.getElementById("updateBtn");
function checkAllFilled() {
  let allFilled = true;

  ContactInput.forEach((input) => {
    if (!/^\d{10}$/.test(input.value)) {
      allFilled = false;
    }
  });

  updateBtn.disabled = !allFilled;
}
ContactInput.forEach((input) => {
  input.addEventListener("input", checkAllFilled);
});

contactList.addEventListener("input", (e) => {
  if (!e.target.classList.contains("contact-input")) return;

  const value = e.target.value.trim();

  // Find the error span for THIS input
  const errorText = e.target
    .closest(".profile-card")
    .querySelector(".numberError");

  validateNumber(value, errorText);
});
