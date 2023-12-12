const SeriesName = episodesImg = document.querySelector('#SeriesName');
const episodesNumber = document.querySelector('#episodesNumber');

async function getData() {
    try {
        
        const response = await fetch('http://localhost:3000/');
        const data = await response.json();
        const series = data.series[0]

        //Serie name
        SeriesName.innerHTML = `<h1>${series.name}</h1>`

        series.episodes.map(episodesList => {
            //console.log(episodesList)

            //Episode numbers
            episodesNumber.innerHTML +=
                `
                <div class="column mb-4">
                <div class="card">
                    <img src="${episodesList.image}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${episodesList.episode}</h5>
                        <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#exampleModal"
                            onclick="playVideo('${episodesList.urlStream}')">
                            Watch Now
                        </button>
                    </div>
                </div>
            </div>
            `
        })

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

//Video
function playVideo(stream) {
    const video = document.getElementById('videoLive');

    // Attempt to play HLS (m3u8) using HLS.js
    const hls = new Hls();

    hls.loadSource(stream);
    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
    });

    hls.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
            // HLS playback failed, try MP4 playback
            tryMP4(stream);
        }
    });

    // Try MP4 playback
    function tryMP4(stream) {
        if (video.canPlayType('video/mp4')) {
            video.src = stream;
            video.play();
        } else {
            console.error('MP4 video playback is not supported.');
        }
    }
}

getData();
