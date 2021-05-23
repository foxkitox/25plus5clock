import React,{useState,useEffect} from 'react'

const Clock = () => {

    const [lengthSession, setLengthSession] = useState(25)
    const [lengthBreak, setLengthBreak] = useState(5)
        
    const [mode,setMode] = useState('stop')
    const [timeLeft,setTimeLeft] = useState({time: 1500 , label:'Session'})
         
    const AumentarBreak = () => lengthBreak === 60 ? setLengthBreak(60): setLengthBreak(lengthBreak +1)
    const ReducirBreak = () => lengthBreak === 1 ? setLengthBreak(1): setLengthBreak(lengthBreak -1)

    const AumentarSession = () => {
        lengthSession === 60 ? setLengthSession(60): setLengthSession(lengthSession +1)
        timeLeft.time === 3600 ? setTimeLeft(prevTimeLeft =>({...prevTimeLeft,time:3600}) ): setTimeLeft(prevTimeLeft =>({...prevTimeLeft,time:prevTimeLeft.time + 60}))
    }
    const ReducirSession = () => {
        lengthSession === 1 ? setLengthSession(1): setLengthSession(lengthSession - 1)
        timeLeft.time <= 60 ? setTimeLeft(prevTimeLeft =>({...prevTimeLeft,time:60}) ): setTimeLeft(prevTimeLeft =>({...prevTimeLeft,time:prevTimeLeft.time - 60}))
    }

    const Reset = () => {
        setLengthSession(25)
        setLengthBreak(5)
        setMode('stop')
        setTimeLeft({time: 1500 , label:'Session'})
        alarm(false)
    }
    
    useEffect(() => {

        if(mode ==='start'){
            const timer = setInterval(() => {
                setTimeLeft(prevTimeLeft =>{
                    let obj = {}
                    if(prevTimeLeft.time === 0){
                        
                        const leftTime = prevTimeLeft.label === 'Session' ? lengthBreak * 60 : lengthSession * 60
                        const typeTime = prevTimeLeft.label === 'Session' ? 'Break' : 'Session'
                        
                        obj = {time :leftTime ,label: typeTime }
                    }else{
                        obj = {time :prevTimeLeft.time - 1 , label:prevTimeLeft.label }
                    }
                    
                    return obj
                });

            }, 50);
                       // clearing interval
            return () => clearInterval(timer);  
        
        }
        

      });

    const alarm = (beep) =>{

        const sound = document.getElementById('beep')    
        sound.currentTime = 0
        if(beep === true && timeLeft.time===0){ 
            sound.play() 
        }else if(beep === false){
            sound.pause() 
        }      
    }  

    const comenzar = () =>{
       
        mode !== 'start' ? setMode('start') : setMode('pause')
        mode === 'stop' ? setTimeLeft({label:'Session',time: lengthSession * 60}) : setTimeLeft(prevTimeLeft =>({...prevTimeLeft}) ) 
     
    }
    
    const clockify = () => {
        
        let minutes = Math.floor(timeLeft.time / 60);
        let seconds = timeLeft.time - minutes * 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return minutes + ':' + seconds;
      }

    const startStop = mode !== 'start' ? 'Start' : 'Pause'


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <p id="break-label">Break Length</p>
                    <p id="break-length">{lengthBreak}</p>
                    <button onClick={ReducirBreak} id="break-decrement" className="btn btn-primary">-</button>
                    <button onClick={AumentarBreak} id="break-increment" className="btn btn-primary">+</button>
                </div>
                <div className="col">
                    <p id="session-label">Session Length</p>
                    <p id="session-length">{lengthSession}</p>
                    <button onClick={ReducirSession} id="session-decrement" className="btn btn-primary">-</button>
                    <button onClick={AumentarSession} id="session-increment" className="btn btn-primary">+</button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button onClick={comenzar} id="start_stop" className="btn btn-primary">
                        {startStop}
                    </button>
                    <button onClick={Reset} id="reset" className="btn btn-primary">RESET</button>
                    <p id="timer-label">{timeLeft.label}</p>
                    <p id="time-left">{clockify()}</p>
                    <audio preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" className="clip" id="beep">{alarm(true)}</audio>
                </div>
            </div>
        </div>
    )
}

export default Clock