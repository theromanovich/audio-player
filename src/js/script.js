const image = document.querySelector('img'),
      title = document.getElementById('title'),
      artist = document.getElementById('artist'),
      music = document.querySelector('audio'),
      progressContainer = document.getElementById('progress-container'),
      progress = document.getElementById('progress'),
      currentTimeEl = document.getElementById('current-time'),
      durationEl = document.getElementById('duration'),
      prevBtn = document.getElementById('prev'),
      playBtn = document.getElementById('play'),
      nextBtn = document.getElementById('next');

    const songs = [
        {
        name: 'sweet-dreams',
        displayName: 'Sweet Dreams',
        artist: 'Eurythmics'
        },
        {
        name: 'paradise',
        displayName: 'Gangsta`s Paradise',
        artist: 'Coolio'
        },
        {
        name: 'happy-nation',
        displayName: 'Нappy Nation',
        artist: 'Ace Of Base'
        },
    ];
 