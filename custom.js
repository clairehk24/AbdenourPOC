// Apply Filters Button Functionality
document.getElementById("apply-filters").addEventListener("click", function () {
  const selectedFilters = {
    Topic: [],
    CAATEStandard: [],
    PracticeAreas: [],
    date: [],
    BodyRegion: [], // Added BodyRegion filter
  };

  document.querySelectorAll(".filter:checked").forEach(function (checkbox) {
    const filterType = checkbox.getAttribute("data-filter");
    selectedFilters[filterType].push(checkbox.value);
  });

  // Filter videos
  document.querySelectorAll(".video-item").forEach(function (video) {
    const videoTopic = video.getAttribute("data-Topic");
    const videoCAATEStandard = video.getAttribute("data-CAATEStandard");
    const videoPracticeAreas = video.getAttribute("data-PracticeAreas");
    const videoDate = video.getAttribute("data-date");
    const videoBodyRegion = video.getAttribute("data-BodyRegion"); // Added attribute for BodyRegion

    const matchesTopic = selectedFilters.Topic.length === 0 || selectedFilters.Topic.includes(videoTopic);
    const matchesCAATEStandard = selectedFilters.CAATEStandard.length === 0 || selectedFilters.CAATEStandard.includes(videoCAATEStandard);
    const matchesPracticeAreas = selectedFilters.PracticeAreas.length === 0 || selectedFilters.PracticeAreas.includes(videoPracticeAreas);
    const matchesDate = selectedFilters.date.length === 0 || selectedFilters.date.includes(videoDate);
    const matchesBodyRegion = selectedFilters.BodyRegion.length === 0 || selectedFilters.BodyRegion.includes(videoBodyRegion); // New filter condition

    if (matchesTopic && matchesCAATEStandard && matchesPracticeAreas && matchesDate && matchesBodyRegion) {
      video.style.display = "block"; // Show matching video
    } else {
      video.style.display = "none"; // Hide non-matching video
    }
  });
});

// Clear Filters Button Functionality
document.getElementById("clear-filters").addEventListener("click", function () {
  document.querySelectorAll(".filter").forEach(function (checkbox) {
    checkbox.checked = false; // Uncheck all checkboxes
  });

  // Show all videos after clearing filters
  document.querySelectorAll(".video-item").forEach(function (video) {
    video.style.display = "block";
  });
});

document.getElementById("sortNewest").addEventListener("click", function () {
  sortVideos("newest");
});

document.getElementById("sortOldest").addEventListener("click", function () {
  sortVideos("oldest");
});

function sortVideos(order) {
  const videoContainer = document.querySelector(".video-list");
  const videos = Array.from(videoContainer.querySelectorAll(".video-item"));

  // Define a ranking system for the shorter date categories
  const dateRank = {
    "24hours": 5,
    week: 4,
    month: 3,
    year: 2,
    older: 1,
  };

  // Sort the videos based on their data-date attribute (short text)
  videos.sort(function (a, b) {
    const dateA = dateRank[a.getAttribute("data-date").toLowerCase()];
    const dateB = dateRank[b.getAttribute("data-date").toLowerCase()];

    if (order === "newest") {
      return dateB - dateA; // Newest to oldest
    } else {
      return dateA - dateB; // Oldest to newest
    }
  });

  // Re-arrange the videos in the DOM
  videos.forEach(function (video) {
    videoContainer.appendChild(video); // Moves the videos in sorted order
  });
}

// Utility function to reset iframe src
function resetIframe(modalId, iframeId) {
  var modal = document.getElementById(modalId);
  var iframe = document.getElementById(iframeId);
  if (modal && iframe) {
    modal.addEventListener('hidden.bs.modal', function () {
      // Save and reset src to stop the video
      var src = iframe.src;
      iframe.src = src;
    });
  }
}

// Apply to each modal/iframe pair
resetIframe('videoModal1', 'video1-iframe');
resetIframe('videoModal2', 'video2-iframe');
resetIframe('videoModal3', 'video3-iframe');
