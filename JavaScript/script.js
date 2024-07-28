document.addEventListener('DOMContentLoaded', function() {
  // Select the elements to animate
  var name1 = document.getElementById('name1');
  var name2 = document.getElementById('name2');
  var name3 = document.getElementById('name3');

  setTimeout(function() {
    name1.classList.add('fade-in');
    name2.classList.add('fade-in');
    name3.classList.add('fade-in');
  }, 3000); // Adjust the delay time (in milliseconds) as needed
})

document.addEventListener('DOMContentLoaded', function() {
  var loadingScreen = document.getElementById('loading-screen');
  var video = document.getElementById('loading-video');

  video.addEventListener('canplaythrough', function() {
    video.play();
  });

  window.addEventListener('load', function() {
    setTimeout(function() {
      window.location.href = "../Webpages/home.html";
    }, 4000);
  });
});
