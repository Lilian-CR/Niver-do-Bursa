(function () {
  const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

  const testMode = false;

  function getNextTargetTimeBRT() {
    const now = new Date();

    // Brasília time Zone
    const nowInBRT = new Date(now.toLocaleString("en-UK", { timeZone: "America/Sao_Paulo" }));
    const currentYear = nowInBRT.getFullYear();

    // Target - May 23rd, 23:59 BRT
    let targetBRT = new Date(`May 23, ${currentYear} 23:59:00 GMT-0300`);

    // After the target time, set for next year
    if (nowInBRT > targetBRT) {
      targetBRT = new Date(`May 23, ${currentYear + 1} 23:59:00 GMT-0300`);
    }

    return targetBRT.getTime();
  }

  let targetTimeUTC = getNextTargetTimeBRT();

  const x = setInterval(function () {
    const nowUTC = new Date().getTime();
    const distance = testMode ? -1 : targetTimeUTC - nowUTC;

    if (distance < 0) {
      const headline = document.getElementById("headline");
      const countdown = document.getElementById("countdown");
      const content = document.getElementById("content");
      const card = document.getElementById("bday-card");

      if (headline) headline.innerText = "O Bursa tá de aniversário! 23/05";
      if (countdown) countdown.style.display = "none";
      if (content) content.style.display = "block";
      if (card) card.style.display = "block";

      launchBalloons();

      // Reseting the target for the upcoming year
      targetTimeUTC = getNextTargetTimeBRT();
      return;
    }

    document.getElementById("days").innerText = Math.floor(distance / day);
    document.getElementById("hours").innerText = Math.floor((distance % day) / hour);
    document.getElementById("minutes").innerText = Math.floor((distance % hour) / minute);
    document.getElementById("seconds").innerText = Math.floor((distance % minute) / second);
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
})();