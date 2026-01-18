import { advisors } from "../data/advisors.js";

const grid = document.getElementById("cardGrid");
const searchInput = document.getElementById("searchInput");

let filteredAdvisors = [...advisors]; //current details

// Render function
function renderCards(list) {
  grid.innerHTML = "";

  list.forEach((advisor) => {
    const col = document.createElement("div");
    if (!col) {
      console.error("Cannot generate div");
    }
    col.className = "col-lg-3";
    col.innerHTML = `
      <div class="card p-3 border-none">
        <div class="d-flex justify-content-between align-items-start">
            <div class="profile-card">
                <h5 class="mb-1 fw-medium">${advisor.name}</h5>
                <p class="mb-0 fw-normal">Referral ${advisor.referrals} | Completed ${advisor.completed}</p>
            </div>
            <span class="badge ${advisor.status === "Done" ? "done" : "pending"} fw-normal">${advisor.status}</span>
        </div>
        <a class="btn-sm icon mt-2 openBtn" style="cursor:pointer;">
            <img src="/images/open-icon.png" alt="" width="28" height="28">
        </a>
    </div>
    `;

    col.querySelector(".openBtn").addEventListener("click", () => {
      const params = new URLSearchParams({
        id: advisor.id,
        name: advisor.name,
        phone: advisor.phone,
        referrals: advisor.referrals,
        completed: advisor.completed,
      });

      window.location.href = `details.html?${params.toString()}`;
    });

    grid.appendChild(col);
  });
}

// Initial render
renderCards(filteredAdvisors);

// Search logic
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase().trim();

  filteredAdvisors = advisors.filter((advisor) => {
    return (
      advisor.name.toLowerCase().includes(query) ||
      advisor.phone.includes(query)
    );
  });

  renderCards(filteredAdvisors);
});
