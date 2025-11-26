document.addEventListener('DOMContentLoaded', () => {
    // --- Music Player Logic ---
    const audio = document.getElementById('bg-music');
    const playBtn = document.getElementById('play-btn');
    const songTitle = document.getElementById('song-title');

    // Define your songs here. Make sure these files exist in public/music/
    const playlist = [
        { title: "The Cutest Pair - Regina Song", src: "/music/the-cutest-pair.mp3" },
        { title: "Blue - Yung Kai", src: "/music/blue.mp3" }
    ];

    let currentSongIndex = 0;
    let isPlaying = false;

    function loadSong(index) {
        audio.src = playlist[index].src;
        songTitle.textContent = playlist[index].title;
    }

    // Initial load
    loadSong(currentSongIndex);

    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            playBtn.textContent = "▶️";
        } else {
            audio.play().catch(e => console.log("Autoplay prevented:", e));
            playBtn.textContent = "⏸️";
        }
        isPlaying = !isPlaying;
    }

    playBtn.addEventListener('click', togglePlay);

    // Loop logic: When one song ends, play the next
    audio.addEventListener('ended', () => {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(currentSongIndex);
        audio.play();
        isPlaying = true;
        playBtn.textContent = "⏸️";
    });

    // --- Floating Hearts Animation ---
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        
        // Randomize position and size
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        document.getElementById('hearts-container').appendChild(heart);

        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }

    // Create a heart every 500ms
    setInterval(createHeart, 500);
});