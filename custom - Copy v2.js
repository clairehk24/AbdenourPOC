document.addEventListener("DOMContentLoaded", () => {

  // --- FILTER BUTTONS ---
  document.getElementById("apply-filters").addEventListener("click", function () {
    const selectedFilters = {
      Topic: [],
      CAATEStandard: [],
      PracticeAreas: [],
      date: [],
      BodyRegion: [],
    };

    document.querySelectorAll(".filter:checked").forEach(function (checkbox) {
      const filterType = checkbox.getAttribute("data-filter");
      selectedFilters[filterType].push(checkbox.value);
    });

    document.querySelectorAll(".video-item").forEach(function (video) {
      const videoTopic = video.getAttribute("data-Topic");
      const videoCAATEStandard = video.getAttribute("data-CAATEStandard");
      const videoPracticeAreas = video.getAttribute("data-PracticeAreas");
      const videoDate = video.getAttribute("data-date");
      const videoBodyRegion = video.getAttribute("data-BodyRegion");

      const matchesTopic = selectedFilters.Topic.length === 0 || selectedFilters.Topic.includes(videoTopic);
      const matchesCAATEStandard = selectedFilters.CAATEStandard.length === 0 || selectedFilters.CAATEStandard.includes(videoCAATEStandard);
      const matchesPracticeAreas = selectedFilters.PracticeAreas.length === 0 || selectedFilters.PracticeAreas.includes(videoPracticeAreas);
      const matchesDate = selectedFilters.date.length === 0 || selectedFilters.date.includes(videoDate);
      const matchesBodyRegion = selectedFilters.BodyRegion.length === 0 || selectedFilters.BodyRegion.includes(videoBodyRegion);

      if (matchesTopic && matchesCAATEStandard && matchesPracticeAreas && matchesDate && matchesBodyRegion) {
        video.style.display = "block";
      } else {
        video.style.display = "none";
      }
    });
  });

  document.getElementById("clear-filters").addEventListener("click", function () {
    document.querySelectorAll(".filter").forEach(function (checkbox) {
      checkbox.checked = false;
    });
    document.querySelectorAll(".video-item").forEach(function (video) {
      video.style.display = "block";
    });
  });

  // --- SORT BUTTONS ---
  document.getElementById("sortNewest").addEventListener("click", function () {
    sortVideos("newest");
  });

  document.getElementById("sortOldest").addEventListener("click", function () {
    sortVideos("oldest");
  });

  function sortVideos(order) {
    const videoContainer = document.querySelector(".video-list");
    const videos = Array.from(videoContainer.querySelectorAll(".video-item"));
    const dateRank = {
      "24hours": 5,
      week: 4,
      month: 3,
      year: 2,
      older: 1,
    };

    videos.sort(function (a, b) {
      const dateA = dateRank[a.getAttribute("data-date").toLowerCase()];
      const dateB = dateRank[b.getAttribute("data-date").toLowerCase()];
      return order === "newest" ? dateB - dateA : dateA - dateB;
    });

    videos.forEach(function (video) {
      videoContainer.appendChild(video);
    });
  }

  // --- STOP IFRAME VIDEOS WHEN MODAL CLOSES ---
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("hidden.bs.modal", () => {
      // For iframes (e.g. placeholder or fallback)
      const iframe = modal.querySelector("iframe");
      if (iframe) iframe.src = iframe.src;

      // For video-js, pause if needed
      const tag = modal.querySelector("video-js");
      if (tag && window.videojs && videojs.getPlayer) {
        let player = videojs.getPlayer(tag.id);
        if (player) player.pause();
      }
    });
  });

  // --- PREVENT QUIZ IF BUTTON IS DISABLED ---
  document.querySelectorAll(".quiz-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (btn.hasAttribute("disabled")) {
        e.preventDefault();
        alert("Please watch the entire video before taking the quiz.");
      }
    });
  });

  // --- INITIALIZE VIDEO.JS ONLY WHEN MODAL IS OPENED ---
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("shown.bs.modal", () => {
      const tag = modal.querySelector("video-js");
      if (!tag || !window.videojs) return;

      let player;
      // Try to get the player, otherwise initialize it
      try {
        player = videojs.getPlayer ? videojs.getPlayer(tag.id) : null;
      } catch (e) {
        player = null;
      }
      if (!player) {
        player = videojs(tag.id);
      }
      if (player) {
        player.load();

        // --- Enable Quiz Button Logic ---
        const videoId = tag.getAttribute("data-video-id");
        const enableQuiz = () => {
          const btn = document.querySelector(`.quiz-btn[data-video-id="${videoId}"]`);
          if (btn) btn.removeAttribute("disabled");
        };
        // Remove any previous listeners (avoid stacking them)
        player.off("ended", enableQuiz);
        player.off("timeupdate", enableQuiz);
        player.on("ended", enableQuiz);
        player.on("timeupdate", () => {
          if (player.currentTime() >= player.duration() - 0.1) {
            enableQuiz();
          }
        });
      }
    });
  });

});
