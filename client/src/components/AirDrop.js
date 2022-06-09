import React, { useEffect, useState } from "react";

function Airdrop(props) {
  const [counter, setCounter] = useState(20);
  let timer;
  let stakingBalance = props.stakingBalance;

  useEffect(
    (stakingBalance) => {
      if (counter > 0) {
        timer = setInterval(() => setCounter(counter - 1), 1000);
      }
      return () => {
        clearInterval(timer);
        timer = 0;
      };
    },
    [counter]
  );

  return (
    <div className="App">
      <div>Countdown: {counter}</div>
    </div>
  );
}

export default Airdrop;
