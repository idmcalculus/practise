import React, {useState} from 'react';


/* const Hello = ({name, age}) => {
  const bornYear = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={33} />
      <Hello name={name} age={age} />
    </div>
  )
} */
const Display = ({ counter }) => <h1>{counter}</h1>

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const History = (props) => {

  let countL = 0;
  let countR = 0;
  let countM = 0;

  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  } else {
    props.allClicks.forEach(click => {
      click === 'L' ? countL = countL + 1 :
      click === 'R' ? countR = countR + 1 :
      countM = countM + 1
    })
  }

  return (
    <div>
      <div>
        button press history: {props.allClicks.join(' ')}
      </div>
      <div>Left:  {countL}</div>
      <div>Right:  {countR}</div>
      <div>Middle:  {countM}</div>
    </div>
  )
}

const showClicks = (props) => {
  const [clicks, setClicks] = useState({left: 0, right:0, middle: 0});
  const [allClicks, setAll] = useState([]);

  const handleLeft = () => {
    const newClicks = {
      left: clicks.left + 1,
      right: clicks.right,
      middle: clicks.middle
    }
    setAll(allClicks.concat('L'));
    setClicks(newClicks);
  }

  const handleRight = () => {
    const newClicks = {
      left: clicks.left,
      right: clicks.right + 1,
      middle: clicks.middle
    }
    setAll(allClicks.concat('R'));
    setClicks(newClicks);
  }

  const handleMid = () => {
    const newClicks = {
      left: clicks.left,
      right: clicks.right,
      middle: clicks.middle + 1
    }
    setAll(allClicks.concat('M'));
    setClicks(newClicks);
  }

  return (
    <div>
      <Display counter={clicks.left} />
      <Button handleClick={handleLeft} text='left' />
      <Display counter={clicks.middle} />
      <Button handleClick={handleMid} text='arin' />
      <Display counter={clicks.right} />
      <Button handleClick={handleRight} text='right' />
      <History allClicks={allClicks} />
    </div>
  )
}

export default showClicks;


