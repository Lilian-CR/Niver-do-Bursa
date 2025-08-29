document.addEventListener("DOMContentLoaded", function () {
  const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

  const testMode = false;

  function getBrasiliaTime() {
    return new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
  }

  function getNextBirthdayTime() {
    const now = getBrasiliaTime();
    const year = now.getMonth() === 4 && now.getDate() >= 24 ? now.getFullYear() + 1 : now.getFullYear();
    const dateStr = `${year}-05-23T00:01:00-03:00`; // May 23, 00:01 BRT
    return new Date(dateStr).getTime();
  }

  const targetTimeUTC = getNextBirthdayTime();

  const x = setInterval(function () {
    const nowUTC = new Date().getTime();
    const nowBRT = getBrasiliaTime();
    const distance = testMode ? -1 : targetTimeUTC - nowUTC;

    const headline = document.getElementById("headline");
    const countdown = document.getElementById("countdown");
    const content = document.getElementById("content");
    const card = document.getElementById("bday-card");

    const isMay23 = nowBRT.getMonth() === 4 && nowBRT.getDate() === 23;

    if (isMay23 || testMode) {
      if (headline) headline.innerText = "O Bursa tá de aniversário! 23/05/2025";
      if (countdown) countdown.style.display = "none";
      if (content) content.style.display = "block";
      if (card) card.style.display = "block";

      launchBalloons();
      clearInterval(x);
      return;
    }

    if (document.getElementById("days")) {
      document.getElementById("days").innerText = Math.floor(distance / day);
      document.getElementById("hours").innerText = Math.floor((distance % day) / hour);
      document.getElementById("minutes").innerText = Math.floor((distance % hour) / minute);
      document.getElementById("seconds").innerText = Math.floor((distance % minute) / second);
    }
  }, 1000);

  function launchBalloons() {
    const container = document.getElementById("balloons-container");
    if (!container) return;

    for (let i = 0; i < 20; i++) {
      const balloon = document.createElement("div");
      balloon.classList.add("balloon");
      balloon.style.left = `${Math.random() * 100}%`;
      balloon.style.backgroundColor = getRandomColor();
      balloon.style.animationDelay = `${Math.random() * 2}s`;
      container.appendChild(balloon);
    }
  }

  function getRandomColor() {
    const colors = ["#ff6b81", "#feca57", "#48dbfb", "#1dd1a1", "#5f27cd"];
    return colors[Math.floor(Math.random() * colors.length)];
  }
});
