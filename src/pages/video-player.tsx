import React from 'react';
import ReactPlayer from 'react-player';

// Only loads the YouTube player
const Play = () => {
	const LogoPng = '/logo-hypertube/logo-no-background.png';
	//<ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
	//
	// <ReactPlayer
	// url={vidData.media[0]}
	// controls={true}
	// width={"100%"}
	// height={"auto"}
	// playing={playVid}
	// muted={true}
	// className="react-workout-player"
	// config={{
	//   file: {
	// 	attributes: {
	// 	  crossOrigin: "true",
	// 	},
	// 	tracks: [
	// 	  {
	// 		kind: "subtitles",
	// 		src: "https://prod.fitflexapp.com/files/captions/2021/11/18/23-b2j0oOsJ.vtt",
	// 		srcLang: "en",
	// 		default: true,
	// 	  },
	// 	],
	//   },
	// }}


	// const Player = (props, {hashMovie = null, thumbnail = null, subtitles = null, onStart = null, url = null}) => {
	// 	const classes = useStyle();
	  
	// 	return (
	// 	  <div className={classes.playerWrapper}>
	// 		<ReactPlayer
	// 		  url={props.url}
	// 		  controls={true}
	// 		  config={{
	// 			file: {
	// 			  tracks: props.subtitles || [],
	// 			  attributes: {
	// 				controlsList: 'nodownload'
	// 			  }
	// 			}
	// 		  }}
	// 		  className={classes.reactPlayer}
	// 		  playing={false}
	// 		  width="100%"
	// 		  height="100%"
	// 		  onStart={props.onStart}
	// 		  light={props.thumbnail}
	// 		/>
	// 	  </div>

	const streamMovie = () => {
		const response = fetch('/api/video/', {
			method: 'POST',
		})
	}

	return (
		<div>
			<video id="videoPlayer" width="50%" controls>
				<source src="/api/video/" type="video/mp4/webm" />
			</video>
			<button type='button' onClick={() => streamMovie()}>DOWNLOAD</button>
		</div>
	);
};

export default Play;