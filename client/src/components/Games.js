import React,{useState ,useEffect , useRef}from 'react'
import '../scss/games.scss'
import {motion} from 'framer-motion';
// import Deep from '../images/Group 5.png'
import Logo from '../images/Logo.png'
import scroll from '../utils/scroll';
import CloseIcon from '@mui/icons-material/Close';
import Bg from '../images/tp2.png'
import Confetti from 'react-confetti'
import ConfettiExplosion from 'react-confetti-explosion';
import Quiz from '../utils/quiz'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Games = () => {
  const [data,setdata] = useState([])
  const [flag,setflag] = useState(false)
  const [rule,setrule] = useState(false)
  const [correct,setcorrect] = useState(false)
  const box = useRef(null)
  const game = useRef(null)
  const [checked,setchecked] = useState(false)
  const [fast , setfast] = useState(false)
  const [finish , setfinish] = useState(false)
  const [score,setscore] = useState(0)
  const [edition,setedition]=useState(-1)
  console.log(edition)
  const edarr = ["Celebrity Edition" , "Politician Edition" , "Random YT Video"]
 useEffect(()=>{
    if(flag===true){
      document.body.style.backgroundColor = "#605e5e";
      document.body.style.overflowY="hidden";
      document.body.style.overflowX="hidden";
      const temp =game.current;
      temp.style.backgroundColor="#605e5e";
      scroll("games")
    }
    // eslint-disable-next-line
 },[flag])
  
useEffect(()=>{
   if(correct===true){
     setTimeout(()=>{
        setcorrect(false)
     },2000)
   }
    // eslint-disable-next-line
},[correct])

useEffect(()=>{
   if(rule===false && data.length!==0){
    let name = "#id0"
    const ele = document.querySelector(name)
    ele.style.display="flex";
    for(let i =1;i<data.length;i++){
      let name = "#id"+i
      const ele = document.querySelector(name)
      ele.style.display="none";
    }
   }
    // eslint-disable-next-line
},[rule])

// let currindex=0

const [ idx , setidx] = useState(0)
const cards = document.querySelectorAll('.boxu');
console.log("card" + cards.length)
console.log("IDXX" + idx)
function showCard() {
    cards.forEach((card, index) => {
      console.log(index-idx)
        card.style.transform = `translateX(${(index - idx) * 120}%)`;
    });
}

function nextCard() {
  let currindex = idx + 1;
  const ele = document.querySelector("#boxu"+currindex)
  ele.style.transform = "translateX(0%)"
  const el1 = document.querySelector("#boxu"+idx)
  el1.style.animation="prev 1s ease"
  console.log(currindex)
  setidx(currindex)
  // showCard();
}
function prevCard() {
  let currindex = (idx - 1);
  const ele = document.querySelector("#boxu"+currindex)
  ele.style.transform = "translateX(0%)"
  const el1 = document.querySelector("#boxu"+idx)
  el1.style.animation="trans 1s ease"
  setidx(currindex)
  // showCard();
}
showCard();
  return ( 
    <div className="games" ref={game}>
       <motion.h2 initial={{ opacity: 0, x: -150 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, x: 0 }} transition={{duration:0.7 , type:"Spring" , bounce:0.4}}>DeepFake challenge</motion.h2>
        <div className="play">
          {(idx > 0) && <ArrowBackIosNewIcon className='arrow' onClick={(e)=>{
            e.preventDefault()
            prevCard()
          }}/>}
          <div className="card">
          {Quiz.map((item,idx)=>(
          <div className="boxu" id={`boxu${idx}`} key={idx}>
            <img src={item.cover} alt="ef" />
          <div className="theory">
          <p>{item.heading} <span>{item.context}.</span></p>
          <p>{item.focus}.</p>
          <button onClick={(e)=>{
            e.preventDefault()
            setflag(true)
            setrule(true) 
            setdata(item.data) 
            setedition(item.edition)  
            setchecked(false)
          }}>Start</button>
          </div>
              </div>
          ))}
          </div>
           {(idx !== Quiz.length-1) && <ArrowForwardIosIcon className='arrow' onClick={(e)=>{
            e.preventDefault()
            nextCard()
          }}/>}
          {/* <div className="box">
          <img src={Deep} alt="ef" />
          <div className="theory">
          <p>Test your skills and see if you can spot the difference between real videos and deepfake creations <span>without audio.</span></p>
          <p> Focus on face masking and lip syncing to spot the difference between real and fake.</p>
          <button onClick={(e)=>{
            e.preventDefault()
            setflag(true)
            setrule(true) 
            setdata(NoAudio) 
            setedition(0)  
            setchecked(false)
          }}>Start</button>
          </div>
          </div> */}
        </div>
        {flag===true && (
          <div className="cover">
            {correct && (
              <>
            <Confetti/>
            </>
            )}
          <motion.div className="block" ref={box} initial={{ scale:0}}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 , type:"Spring" , bounce:0.9 }}>
          {correct && (
            <ConfettiExplosion/>
            )}
          <div className="up">
                   <img src={Logo} alt="asd" />
                   <h1>DeepFake Challenge - <span>{edarr[0]}</span> 
                   </h1>
                   <CloseIcon className='icon' onClick={(e)=>{
                    e.preventDefault()
                    document.body.style.backgroundColor = "white";
                    document.body.style.overflowY="scroll";
                    const temp =game.current;
                    temp.style.backgroundColor="#f5f5f7";
                    scroll("games")
                    setflag(false)
                    setrule(false)
                    setchecked(false)
                    setdata([])
                   }}/>
          </div>
          <img src={Bg} alt="" className='image' />
             {rule===true ? (
              <div className="rules">
                  <h1>How to Play -</h1>
                  <ul>
                    <li>You will be shown a series of celebrities' video clips.</li>
                    <li>Your task is to determine if each video is real or a deepfake.</li>
                    <li>Click on "Real" or "Deepfake" to make your choice.</li>
                    <li>The authentic video for Every Deepfake edited video will be shown after selecting an option.</li>
                    <li>No audio will be there , analyze the Face and make ur guess.</li>
                  </ul>
                  <button onClick={(e)=>{
                    e.preventDefault()
                    setrule(false) 
                  }}>Lesss goo</button>
              </div>
             ) :(
              <>
            {finish === false && data?.map((item,idx)=>(
            <motion.div className="box" key={idx} id={`id${idx}`} 
            initial={{ opacity: 0, x: 1000 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }} transition={{duration:0.7 , type:"Spring" , bounce:0.8}} >
              <div className="left">
              {fast===true && item.result===0 && (
                  <div className="appear" initial={{ scale:0}}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 4 , type:"Spring" , bounce:0.9  }}  >
                    <div className="ans">
                  <h1>The video was DeepFake edit , Here is the Original video.</h1>
                  
                  </div>
              <video loop autoPlay controls>
              <source src={item.real} type="video/mp4" />
              Your browser does not support the video tag.
              </video>
                  </div>
              )}
              {fast===true && item.result===1 && (
                  <motion.h1 initial={{ scale:0}}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>The Video is Authentic</motion.h1>
              )}
              {(fast===false || item.result===1) && (
              <video loop autoPlay controls>
              <source src={item.video} type="video/mp4" />
              Your browser does not support the video tag.
              </video>
              )}
              </div>
              <div className="right">
                {checked===false && (
                <div className="upar" id={`upar${idx}`} >
                <button className='wrong' id={`wrong${idx}`} onClick={(e)=>{
                  e.preventDefault()
                  setfast(true)
                  if(item.result===0){
                    let tem = score
                    setscore(++tem)
                    setcorrect(true)
                    setchecked(true)
                  }else{
                    let btn = document.querySelector(`#wrong${idx}`)
                    btn.style.animation="vibrate 0.7s ease"
                    btn.addEventListener("animationend",()=>{
                      setchecked(true)
                    });
                  }
                }}>Deepfake</button>
                <button className='correct' id={`correct${idx}`}  onClick={(e)=>{
                  e.preventDefault()
                  setfast(true)
                  if(item.result===1){
                    let tem = score
                    setscore(++tem)
                    setcorrect(true)
                    setchecked(true)
                  }else{
                    let btn = document.querySelector(`#correct${idx}`)
                    btn.style.animation="vibrate 0.7s ease"
                    btn.addEventListener("animationend",()=>{
                      setchecked(true)
                    })
                  }
                }}>Real</button>
                </div>
                )}
                {checked===true &&(
               <div className="niche">
                  <button 
                  onClick={(e)=>{
                    e.preventDefault()
                    let el1 = document.querySelector("#id"+idx)
                    el1.style.position="relative"
                    el1.style.animation="left_go 1s ease"
                    el1.addEventListener("animationend", () => {
                      el1.style.display="none"
                      let next = idx+1;
                      if(next<data.length){
                      let el2 = document.querySelector("#id"+next)
                      el2.style.display="flex"
                      }else{
                        setfinish(true)
                      }
                      setchecked(false)
                      setcorrect(false)
                      setfast(false)
                    });
                  }}
                  >Next</button>
                   </div>
                )}
              </div>
                  </motion.div>
                ))}
                {finish===true && (
                    <div className="finish">
                      <div className="score">
                        <h1>Your Score :</h1>
                        <h3>{score}/{data.length} correct guess</h3>
                      </div>
                      <div className="more">
                        <h1>Similar Challenges -</h1>
                        <div className="boxes">
                          <div className="box"></div>
                          <div className="box"></div>
                        </div>
                      </div>
                    </div>
                )}
                </>
             )}
          </motion.div>
          </div>
        )}
    </div>
  )
}

export default Games