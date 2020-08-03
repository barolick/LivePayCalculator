import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";

export default function PayRateCounter({
  hourlyRate,
  counterStatus,
  resetStatus,
}) {
  const [payRateCount, setPayRateCount] = useState(0);
//   const [elapsedTime, setElapsedTime] = useState({
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//     milliseconds: 0
//   })
  const [currentTime, setCurrentTime] = useState(Date.now())
  useEffect(() => {
    let interval = null;
    setCurrentTime(Date.now())
    if (counterStatus) {
      interval = setInterval(() => {
        let passedTimeBetweenInterval = Date.now() - currentTime
        setPayRateCount((payRateCount) => payRateCount + (passedTimeBetweenInterval * hourlyRate)/ 3600000);
        //setElapsedTime(increaseTime(elapsedTime, passedTimeBetweenInterval));
        setCurrentTime(Date.now())
      }, 1);
    } else if (!counterStatus && resetStatus) {
      clearInterval(interval)
      setPayRateCount(0)
    }
    return () => clearInterval(interval);
  });
  const increaseTime = (prevTime, addedTime) => {
      const tempTime = {hours:prevTime.hours, minutes:prevTime.minutes, seconds:prevTime.seconds, milliseconds:prevTime.milliseconds}
    if (tempTime.milliseconds + addedTime>=1000) {
        tempTime.milliseconds=tempTime.milliseconds + addedTime-1000
      if (tempTime.seconds === 59) {
        tempTime.seconds = 0;
        if (tempTime.minutes === 59) {
            tempTime.minutes = 0;
            tempTime.hours++;
        } else {
            tempTime.minutes++;
        }
      } else {
        tempTime.seconds++;
      }
    }
    else{
        tempTime.milliseconds+=addedTime
    }
    return tempTime;
  };
  return (
    <View style={styles.container}>
      <Text h1 h1Style={styles.counter}>
        {"$" + payRateCount.toFixed(4)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  counter: {
    color: "white",
    fontSize: 70
  },
  elapsedTimeContainer: {
    flex: 0.5,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  elapsedTime: {
    color: "white",
    fontSize: 25
  }
});
