import{useRef, useState} from 'react';
import './App.css';
// import bb from './../Assests/Videos/video3.mp4';
function App() {
  const [currentMusicDetails, setcurrentMusicDetails]= useState({
    songName: 'Chasing',
    songArtist: 'NEFFEX MP3',
    songSrc: './Assests/songs/Chasing - NEFFEX.mp3',
    songAvatar: './Assests/Images/image1.jpg'

  })

  const musicAPI = [
    {
      songName: 'Chasing',
      songArtist: 'NEFFEX MP3',
      songSrc: './Assests/songs/Chasing - NEFFEX.mp3',
      songAvatar: './Assests/Images/image1.jpg'
        },
    {
      songName: 'AURORA - Runaway',
      songArtist: 'Aurora Aksnes',
      songSrc: './Assests/songs/AURORA - Runaway (Lyrics).mp3',
      songAvatar: './Assests/Images/image2.jpg'
    },
    {
      songName: 'Catch Me If I Fall',
      songArtist: 'TEGNENT',
      songSrc: './Assests/songs/Catch Me If I Fall - NEFFEX.mp3',
      songAvatar: './Assests/Images/image3.jpg'
    },
    {
      songName: 'Inspired (Clean)',
      songArtist: 'NEFFEX',
      songSrc: './Assests/songs/Inspired (Clean) - NEFFEX.mp3',
      songAvatar: './Assests/Images/image4.jpg' 
       },
    {
      songName: 'Baby doll [ slowed + reverb ]',
      songArtist: 'Kanika Kapoor',
      songSrc: './Assests/songs/Baby doll [ slowed + reverb ] __ meet bros ,Kanika Kapoor __ jr santu.mp3',
      songAvatar: './Assests/Images/3.jfif'
        },
     {
      songName: '123',
      songArtist: 'unKnwon artist',
      songSrc: './Assests/songs/123.m4a',
      songAvatar: './Assests/Images/1.jfif'
         },
     {
       songName: '1234',
       songArtist: 'unKnown Artist',
       songSrc: './Assests/songs/1234.m4a',
       songAvatar: './Assests/Images/2.jfif'
       },
        
    
  ]








  let avatarClass =['objectFitCover','objectFitContainer','none']


  const [audioProgress , setAudioProgress] = useState(0);
  const [avatarClassindex,setavatarClassindex] = useState(0)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [musicIndex, setmusicIndex] = useState(0)
  const [musicTotalLength, setMusicTotalLength] = useState('04 : 38')
  const [musicCurrentTime, setMusicCurrentTime] = useState('00 : 00')
  const [videoIndex, setVideoIndex] = useState(0)
  
  const handleMusicProgressBar = (e) => {
    setAudioProgress(e.target.value)
    currentAudio.current.currentTime = e.target.value * currentAudio.current.duration / 100;
  }
  
  
  const handleAvatar = () => { 
    if(avatarClassindex >= avatarClass.length - 1 ){
      setavatarClassindex(0)
    }else{
      setavatarClassindex(avatarClassindex + 1)
    }
    // console.log(avatarClass.length)
  }

  const handleAudioPlay = ()=>{
    if (currentAudio.current.paused) {
      
      setIsAudioPlaying(true)
      return(currentAudio.current.play());
  }else{
      
      setIsAudioPlaying(false)
      return (currentAudio.current.pause()); 
  }
  }
  const handleNextSong = () => {
    if(musicIndex >=musicAPI.length - 1){
      let setNumber = 0;
      setmusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber)
    }else{
      let setNumber = musicIndex + 1;
      setmusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
    setIsAudioPlaying(false)
  }
  const updateCurrentMusicDetails = (number) => {
    let musicObject = musicAPI[number];
    currentAudio.current.src=musicObject.songSrc

  

    currentAudio.currentTime=0
    currentAudio.current.play().catch(function(e) {
       console.log('There was an error', e);
    });
    

    setcurrentMusicDetails({
      songName: musicObject.songName,
      songArtist: musicObject.songArtist,
      songSrc: musicObject.songSrc,
      songAvatar: musicObject.songAvatar

    })
    setIsAudioPlaying(true)
  };
  const handlePrevSong = () => {
    if(musicIndex === 0){
      let setNumber = musicAPI.length -1;
      setmusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber)
    }else{
      let setNumber = musicIndex - 1;
      setmusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
   };
   const handleAudioUpdate = ()=>{
    //Input total length of the audio
    let minutes = Math.floor(currentAudio.current.duration / 60);
    let seconds = Math.floor(currentAudio.current.duration % 60);
    let musicTotalLength0 = `${minutes <10 ? `0${minutes}` : minutes} : ${seconds <10 ? `0${seconds}` : seconds}`;
    setMusicTotalLength(musicTotalLength0);

    //Input Music Current Time
    let currentMin = Math.floor(currentAudio.current.currentTime / 60);
    let currentSec = Math.floor(currentAudio.current.currentTime % 60);
    let musicCurrentT = `${currentMin <10 ? `0${currentMin}` : currentMin} : ${currentSec <10 ? `0${currentSec}` : currentSec}`;
    setMusicCurrentTime(musicCurrentT);

    const progress = parseInt((currentAudio.current.currentTime / currentAudio.current.duration) * 100);
    setAudioProgress(isNaN(progress)? 0 : progress)
  }


  const vidArray = ['./Assests/Videos/video1.mp4',
      './Assests/Videos/video2.mp4',
      './Assests/Videos/video3.mp4',
      './Assests/Videos/video4.mp4',
      './Assests/Videos/video5.mp4',
      './Assests/Videos/video.mp4',
      './Assests/Videos/video6.mp4'
    ];
   const handleChangeBackground = () =>{
    if(videoIndex > vidArray.length - 1){
      setVideoIndex(0);
    }else{
      setVideoIndex(videoIndex + 1 );
    }

   }


  const currentAudio = useRef()
  
  
  
  return (
    <>
    <div className='container'>
    <audio src={currentMusicDetails.songSrc} ref={currentAudio} onEnded={handleNextSong} onTimeUpdate={handleAudioUpdate}></audio>


    <video src={vidArray[videoIndex]} muted  autoPlay loop className='bcgVideo playsinline' ></video>
     
      <div className='blackScreen'></div>
        <div className='music-Container'>
          <p className='musicPlayer'>Music Player</p>
          <p className='music-head-name'>{currentMusicDetails.songName}</p>
          <p className='Music-Artist-name'>{currentMusicDetails.songArtist} </p>
          <img src={currentMusicDetails.songAvatar} className={avatarClass[avatarClassindex]} onClick={handleAvatar} alt='song avatar' id='songavatar' />
          <div className='musicTimrrDiv'>
            <p className='musicCurrentTime'>{musicCurrentTime}</p>
            <p className='musicTotalLength'>{musicTotalLength}</p>
          </div>
          <input type='range' name='musicProgressBar' className='musicProgressBar' value={audioProgress} 
        onChange={handleMusicProgressBar} />
        <div className='musicControlers'>
        <i className='fa-solid fa-backward musicControler' onClick={handlePrevSong} ></i>
        <i className={`fa-solid ${isAudioPlaying? 'fa-pause-circle' : 'fa-circle-play' } playbtn`} onClick={handleAudioPlay}></i>
        <i className='fa-solid fa-forward musicControler' onClick={handleNextSong}></i>

        </div>
         </div>
        <div className='changeBackBtn' onClick={handleChangeBackground}>
          Change Background
        </div>
      
    </div>
    </>
    
    );
}



export default App;
