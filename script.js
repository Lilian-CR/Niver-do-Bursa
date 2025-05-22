(function () {
    const second = 1000,
          minute = second * 60,
          hour = minute * 60,
          day = hour * 24;
  
    const testMode = false; // ✅ Set true for instant celebration preview
  
    function getTargetTimeBrasiliaUTC() {
      const now = new Date();
      const brasiliaOffsetMinutes = -180;
      const tomorrowBrasilia = new Date(now);
      tomorrowBrasilia.setUTCMinutes(tomorrowBrasilia.getUTCMinutes() + brasiliaOffsetMinutes);
      tomorrowBrasilia.setUTCDate(tomorrowBrasilia.getUTCDate() + 1);
      tomorrowBrasilia.setUTCHours(3, 1, 0, 0); // 00:01 BRT = 03:01 UTC
      return tomorrowBrasilia.getTime();
    }
  
    const targetTimeUTC = getTargetTimeBrasiliaUTC();
  
    const x = setInterval(function () {
      const nowUTC = new Date().getTime();
      const distance = targetTimeUTC - nowUTC;
  
      if (distance < 0) {
        const headline = document.getElementById("headline");
        const countdown = document.getElementById("countdown");
        const content = document.getElementById("content");
  
        headline.innerText = "O Bursa tá de aniversário! 23/05/2025";
        countdown.style.display = "none";
        content.style.display = "block";
  
        launchBalloons();
        clearInterval(x);
        return;
      }
  
      document.getElementById("days").innerText = Math.floor(distance / day);
      document.getElementById("hours").innerText = Math.floor((distance % day) / hour);
      document.getElementById("minutes").innerText = Math.floor((distance % hour) / minute);
      document.getElementById("seconds").innerText = Math.floor((distance % minute) / second);
    }, 1000);
  
    function launchBalloons() {
      const container = document.getElementById("balloons-container");
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