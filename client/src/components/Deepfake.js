import React,{useRef} from 'react'
import Polygon from '../images/Polygon 1.png';
import Rope from '../images/rope.png';
import "../scss/deepfake.scss"
const Deepfake = () => {
const inputRef = useRef(null);

  const handleClick = () => {
    // 👇️ open file input box on click of another element
    inputRef.current.click();
  };

  const handleFileChange = event => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    if (fileObj) {
      if (fileObj.type === 'video/mp4' && fileObj.size <= 30 * 1024 * 1024) {
          const formData = new FormData();
          formData.append('video', fileObj);
          
          console.log("data proper")
      } else {
          alert('Please select an MP4 video file (max 30MB).');
      }
    }
    console.log('fileObj is', fileObj);

    // 👇️ reset file input
    event.target.value = null;

    // 👇️ is now empty
    console.log(event.target.files);

    // 👇️ can still access file object here
    console.log(fileObj);
    console.log(fileObj.name);
  };
  return (
    <div className="deepfake">
      <div className="left"></div>
      <div className="right">
        <div className="box">
          <button id='uploaduu' onClick={(e)=>{
            e.preventDefault()
            handleClick()
          }}>   
            Upload your Videos
          </button>
          <input type="file" id='Videoupload' ref={inputRef} onChange={handleFileChange} />
          <p>Upto 30 mb of video & mp4 format only !</p>
        </div>
      </div>
      <img src={Polygon} alt="v" className='ploy' />
      <img src={Rope} alt="rve" className='rope' />
    </div>
  )
}
export default Deepfake











  
// function setupDrawing() {
//         let containe = document.querySelector('.rope');
//         let isDrawing = false;
//         // Get the top-left and bottom-right positions
//         const rect = containe.getBoundingClientRect();
//         const region1 = { x1: rect.top, x2: rect.bottom, y1: rect.left, y2: rect.right };
//         containe.addEventListener('mousedown', (e) => {
//             if (isInRegion(e, region1)) {
//                 isDrawing = true;
//             }
//         });
//         containe.addEventListener('mouseup', () => {
//             isDrawing = false;

//             // Remove all blue boxes
//             const blueBoxes = containe.querySelectorAll('.blue-box');
//             blueBoxes.forEach((box) => {
//                 containe.removeChild(box);
//             });
//         });
//         containe.addEventListener('mousemove', (e) => {
//           console.log("hey")
//             if (isDrawing) {
//                 if (isInRegion(e, region1)) {
//                     const blueBox = document.createElement('div');
//                     blueBox.className = 'blue-box';
//                     blueBox.style.left = (e.clientX - containe.getBoundingClientRect().left - 10) + 'px';
//                     blueBox.style.top = (e.clientY - containe.getBoundingClientRect().top - 10) + 'px';
//                     containe.appendChild(blueBox);
//                 }
//             }
//         });
//         function isInRegion(event, region) {
//             const { x, y } = getMouseCoordinates(event);
//             return x >= region.x1 && x <= region.x2 && y >= region.y1 && y <= region.y2;
//         }
//         function getMouseCoordinates(event) {
//             return {
//                 x: event.clientX - containe.getBoundingClientRect().left,
//                 y: event.clientY - containe.getBoundingClientRect().top
//             };
//         }
//       }
//         document.addEventListener('DOMContentLoaded', setupDrawing);
