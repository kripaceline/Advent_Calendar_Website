function addSong() {
    const songInput = document.getElementById('songInput');
    const songList = document.getElementById('songList');
    
    const songName = songInput.value.trim();
    
    if (songName !== '') {
        const li = document.createElement('li');
        li.textContent = songName;
        songList.appendChild(li);
        
        songInput.value = ''; // Clear input after adding
    } else {
        alert('Please enter a song name!');
    }
}
