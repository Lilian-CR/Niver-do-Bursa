document.addEventListener("DOMContentLoaded", function () {
  const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

  const testMode = false;

  function getBrasiliaTime() {
    // Uses Sao_Paulo (BRT) since Porto_Alegre was invalid
    return new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
  }

  function getNextBirthdayTime() {
    const now = getBrasiliaTime();
    let year = now.getFullYear();

    // Target birthday time: May 23rd 00:01 BRT = May 23rd 03:01 UTC
    const birthdayThisYear = Date.UTC(year, 4, 23, 3, 1, 0);
    const nowTime = now.getTime();

    if (nowTime >= birthdayThisYear) {
      year += 1;
    }

    return Date.UTC(year, 4, 23, 3, 1, 0);
  }

  const targetTimeUTC = getNextBirthdayTime();

  const x = setInterval(function () {
    const nowUTC = new Date().getTime();
    const nowBRT = getBrasiliaTime();
    const distance = testMode ? -1 : targetTimeUTC - nowUTC;

    // Debug info
    console.log("BRT Date:", nowBRT);
    console.log("nowUTC:", nowUTC);
    console.log("targetTimeUTC:", targetTimeUTC);
    console.log("Distance:", distance);

    const headline = document.getElementById("headline");
    const countdown = document.getElementById("countdown");
    const content = document.getElementById("content");
    const card = document.getElementById("bday-card");

    const isMay23 = nowBRT.getMonth() === 4 && nowBRT.getDate() === 23;

    if (isMay23 || testMode) {
      const birthdayYear = isMay23 ? nowBRT.getFullYear() : new Date(targetTimeUTC).getFullYear();
      if (headline) headline.innerText = `O Bursa tá de aniversário! 23/05/${birthdayYear}`;
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
