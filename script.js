import Chart from "chart.js/auto";
const data = [
  { year: 20, count: 20 },
  { year: 23, count: 30 },
  { year: 25, count: 40 },
  { year: 28, count: 50 },
  { year: 30, count: 60 },
  { year: 33, count: 70 },
  { year: 35, count: 80 },
  { year: 40, count: 90 },
  { year: 45, count: 110 },
  { year: 60, count: 120 },
  { year: 62, count: 130 },
  { year: 65, count: 135 },
];
const labels = {
  Employer: ["Employee: ", "K 73,5000"],
  Employee: ["Employee:", "K 52,500"],
  Total_Interest: ["Total Interest: ", "K 244,313"],
};

const chart = new Chart(document.getElementById("acquisitions"), {
  type: "bar",
  data: {
    labels: data.map((row) => row.year),
    datasets: [
      {
        label: `${labels.Employer[0]} ${labels.Employer[1]} `,
        data: data.map((row) => row.count),
        backgroundColor: ["#0800a3"],
        // fontWeight: 700,
        stack: "stack",
        // borderDash: [2, 5],
        borderWidth: "1rem",
        showLine: true,
        fill: false,
      },
      {
        label: "Employee Contribution",
        data: [25, 20, 20, 25, 30, 34, 37, 40, 35, 40, 45, 50, 60, 120], // Employee contribution data
        backgroundColor: "#4935ff",
        stack: "stack",
      },
      {
        label: "Total Interest",
        data: [10, 18, 22, 25, 33, 36, 45, 50, 60, 80, 100, 150], // Total interest data
        backgroundColor: "rgba(133, 175, 255, 0.7)",
        stack: "stack",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      labels: {
        display: true,
        color: "rgb(255, 99, 132)",
      },
    },
    scales: {
      x: {
        grid: { display: false },
        beginAtZero: true,
        stacked: true,
        ticks: {
          font: {
            weight: "bold", // Set the font weight for Y-axis labels
            family: "Arial, sans-serif", // Set the default font family for Y-axis labels
          },
          callback: function (value, index, a) {
            //giving th output if the value is even
            if (value % 2 === 0) {
              return 20 + value * 5; // Display money values on the left side
            }
          },
        },
      },
      y: {
        grid: {
          // display: false,
          drawOnChartArea: false,
        },
        ticks: {
          font: {
            weight: "bold", // Set the font weight for Y-axis labels
            family: "Arial, sans-serif", // Set the default font family for Y-axis labels
          },
          callback: function (value) {
            console.log(value);
            return `${value % 100 === 0 ? "$" + value : ""}`;
          },
        },
      },
    },
    indexAxis: "x", // This option makes the width setting applicable to the horizontal bars
    barPercentage: 0.7, // Adjust this value to set the width of each bar (0.8 means 80% of the available space)
    categoryPercentage: 0.7,
  },
});
// Custom plugin to draw dotted grid lines
// chart.rendor();
//////////////////////////////////////
// circular chart logic
const circularProgress = document.querySelectorAll(".circular-progress");

Array.from(circularProgress).forEach((progressBar) => {
  const progressValue = progressBar.querySelector(".percentage");
  const innerCircle = progressBar.querySelector(".inner-circle");
  let startValue = 0,
    endValue = Number(progressBar.getAttribute("data-percentage")),
    speed = 25,
    progressColor = progressBar.getAttribute("data-progress-color");

  const progress = setInterval(() => {
    startValue++;
    progressValue.textContent = `${startValue}%`;
    progressValue.style.color = "black";
    progressValue.style.fontWeight = "600";

    innerCircle.style.backgroundColor = `${progressBar.getAttribute(
      "data-inner-circle-color"
    )}`;

    progressBar.style.background = `conic-gradient(${progressColor} ${
      startValue * 3.6
    }deg,${progressBar.getAttribute("data-bg-color")} 0deg)`;
    if (startValue === endValue) {
      clearInterval(progress);
    }
  }, speed);
});
// scroll
const section = document.querySelector(".section-retirement-strategy");
const nav = document.querySelector(".nav-for-mob");
// document.addEventListener("scroll", function () {
//   // console.log(section);
//   const sectionHeight = section.getBoundingClientRect().y;
//   const navHeight = nav.getBoundingClientRect().y;
//   console.log(sectionHeight, navHeight);
//   const inital_height = navHeight;
//   if (navHeight > sectionHeight) {
//     console.log("aaaaaa");
//     nav.classList.add("hidden");
//   }
//   if (navHeight <= sectionHeight) {
//     console.log("bbbbbbbbbbb");
//     nav.classList.remove("hidden");
//   }
// });
// const obsCallback = function (entries, observer) {
//   entries.forEach((e) => console.log(e));
// };
// const obsOptions = { root: null, threshold: 0.1 };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section);
const removeSticky = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (entry.isIntersecting) nav.classList.add("hidden");
  if (!entry.isIntersecting) nav.classList.remove("hidden");
};
const navObserver = new IntersectionObserver(removeSticky, {
  root: null,
  threshold: 0.1,
});
navObserver.observe(section);
