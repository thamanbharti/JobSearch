import React, { useState } from 'react'
import './Test.css'
import NavBar2 from './NavBar2'
import axios from 'axios';
import { MdTimer } from "react-icons/md";
import MyTimer from './MyTimer';
import { useTimer } from 'react-timer-hook';

export default function Test() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);
  const list=[
    "WebDev","AppDev","ML","DataAnalyst"
]
    const [activeIndex,setActive]=useState(0);

    axios.get(`http://localhost:8080/api/v1/skilltest/${list[activeIndex]}`)
    .then((res)=>{
      console.log(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })

  
    const [questions] = useState([
        {
          id: 1,
          question: 'What is the capital of France?',
          options: ['London', 'Paris', 'Berlin', 'Madrid'],
          answer: 'Paris'
        },
        {
          id: 2,
          question: 'Which planet is known as the Red Planet?',
          options: ['Mars', 'Jupiter', 'Venus', 'Mercury'],
          answer: 'Mars'
        },
        {
          id: 3,
          question: 'What is the chemical symbol for water?',
          options: ['H2O', 'CO2', 'O2', 'NaCl'],
          answer: 'H2O'
        }
      ]);
    
      const [selectedOption, setSelectedOption] = useState({});
      
      const handleOptionSelect = (questionId, option) => {
        setSelectedOption({ [questionId]: option });
      };
    const handlesetActive=(index)=>{
        setActive(index);
    }
  return (
    <div className='container'>
        <NavBar2/>
        <div class="card-container-1">
            <div className='list-item'>
                {
                    list.map((list,index)=>(
                        
                        <li className={activeIndex === index ? 'list-item-active' : ''}  onClick={()=>handlesetActive(index)}>{list}</li>
                    ))
                }
                </div>
                <button className='apply-button' style={{fontSize:'21'}}><MyTimer expiryTimestamp={time} /><MdTimer size={20} style={{marginLeft:'10vw'}}/></button>
                
                <div className='questions' >
                    
                {questions.map(question => (
        <div key={question.id} className='job-card' style={{textAlign:'left',marginLeft:'0'}}>
          <h3>{question.question}</h3>
          <ul>
            {question.options.map(option => (
              <li
                key={option}
                style={{textAlign:'left'}}
                className={selectedOption[question.id] === option ? 'selected' : ''}
                onClick={() => handleOptionSelect(question.id, option)}
              >
                {option}
              </li>
            ))}
          </ul>
          
        </div>
      ))}
                    
                </div>
                <button className='apply-button' style={{fontSize:'21'}}>Submit&nbsp;</button>
</div>


    </div>
  )
}
