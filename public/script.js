        const video = document.getElementById('videoPlayer');
        const playOverlay = document.getElementById('playOverlay');
        const videoWrapper = document.getElementById('videoWrapper');
        const playPauseBtn = document.getElementById('playPauseBtn');
        const progressBar = document.getElementById('progressBar');
        const progressFilled = document.getElementById('progressFilled');
        const timeDisplay = document.getElementById('timeDisplay');
        const fullscreenBtn = document.getElementById('fullscreenBtn');

        function togglePlay() {
            if (video.paused) {
                video.play();
                playOverlay.classList.add('hidden');
                videoWrapper.classList.add('playing');
                playPauseBtn.textContent = '⏸';
            } else {
                video.pause();
                playOverlay.classList.remove('hidden');
                videoWrapper.classList.remove('playing');
                playPauseBtn.textContent = '▶';
            }
        }

        playOverlay.addEventListener('click', togglePlay);
        playPauseBtn.addEventListener('click', togglePlay);

        video.addEventListener('timeupdate', () => {
            const percent = (video.currentTime / video.duration) * 100;
            progressFilled.style.width = percent + '%';
            
            const currentMin = Math.floor(video.currentTime / 60);
            const currentSec = Math.floor(video.currentTime % 60);
            const durationMin = Math.floor(video.duration / 60);
            const durationSec = Math.floor(video.duration % 60);
            
            timeDisplay.textContent = `${currentMin}:${currentSec.toString().padStart(2, '0')} / ${durationMin}:${durationSec.toString().padStart(2, '0')}`;
        });

        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            video.currentTime = pos * video.duration;
        });

        fullscreenBtn.addEventListener('click', () => {
            if (videoWrapper.requestFullscreen) {
                videoWrapper.requestFullscreen();
            } else if (videoWrapper.webkitRequestFullscreen) {
                videoWrapper.webkitRequestFullscreen();
            }
        });

        video.addEventListener('ended', () => {
            playOverlay.classList.remove('hidden');
            videoWrapper.classList.remove('playing');
            playPauseBtn.textContent = '▶';
        });