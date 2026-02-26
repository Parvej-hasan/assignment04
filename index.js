let currentTab = "all";
const tabActive = ["bg-blue-600", "border-blue-600", "text-white"];
const tabInactive = [
  "bg-transparent",
  "text-slate-700",
  "border-slate-200",
  "text-black",
];
const allContainer = document.getElementById("all-container");
const interviewContainer = document.getElementById("interview-container");
const rejectedContainer = document.getElementById("rejected-container");
const emptyState = document.getElementById("empty-state");

function switchTab(tab) {
  currentTab=tab
  const tabs = ["all", "interview", "rejected"];
  for (const t of tabs) {
    const tabName = document.getElementById("tab-" + t);
    if (t === tab) {
      tabName.classList.remove(...tabInactive);
      tabName.classList.add(...tabActive);
    } else {
      tabName.classList.remove(...tabActive);
      tabName.classList.add(...tabInactive);
    }
  }
  const pages = [allContainer, interviewContainer, rejectedContainer];
  for (const section of pages) {
    section.classList.add("hidden");
  }
  emptyState.classList.add("hidden");

  if (tab === "all") {
    allContainer.classList.remove("hidden");
    if (allContainer.children.length < 1) {
      emptyState.classList.remove("hidden");
    }
  } else if (tab === "interview") {
    interviewContainer.classList.remove("hidden");
    if (interviewContainer.children.length < 1) {
      emptyState.classList.remove("hidden");
    }
  } else if (tab === "rejected") {
    rejectedContainer.classList.remove("hidden");
    if (rejectedContainer.children.length < 1) {
      emptyState.classList.remove("hidden");
    }
  }
  updateStat();
}
// status
const taotalStat = document.getElementById("state-total");
const interviewStat = document.getElementById("state-interview");
const rejectedStat = document.getElementById("state-rejected");
const avilablestat=document.getElementById("Available")


switchTab(currentTab);

document
  .getElementById("jobs-container")
  .addEventListener("click", function (event) {
    const clickedElement = event.target;
    const card = clickedElement.closest(".card");
    const parent = card.parentNode;
    const status = card.querySelector(".job-status");

    if (clickedElement.classList.contains("interview")) {
      status.innerText = "Interviewed";

      interviewContainer.appendChild(card);
      updateStat();
    }
    if (clickedElement.classList.contains("rejected")) {
      status.innerText = "Rejected";

      rejectedContainer.appendChild(card);
      updateStat();
    }
    if (clickedElement.classList.contains("delete")) {
      parent.removeChild(card);
    }
    updateStat();
  });

function updateStat() {
  taotalStat.innerText = allContainer.children.length;
  interviewStat.innerText = interviewContainer.children.length;
  rejectedStat.innerText = rejectedContainer.children.length;

     const counts={
       all:allContainer.children.length,
      interview:interviewContainer.children.length,
      rejected:rejectedContainer.children.length,
    };
     taotalStat.innerText=counts.all;
     interviewStat.innerText=counts.interview;
    rejectedStat.innerText=counts.rejected;
   avilablestat.innerText=counts[currentTab];
   if(counts[currentTab]<1)
   {
    emptyState.classList.remove("hidden");
   }
   else
   {
    emptyState.classList.add("hidden");
   }
}
updateStat();