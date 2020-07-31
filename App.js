import React, {useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Header } from "react-native-elements";
import PayRateForm from "./components/PayRateForm";
import PayRateCounter from "./components/PayRateCounter";

export default function App() {
  const [rate, setRate] = useState(0)
  const [counterStatus, setCounterStatus] = useState(false)
  const [resetStatus, setResetStatus] = useState(false)
  const calculateRate = (payRate, taxDeductions, payType) =>{
    const truePay = payRate * (1- taxDeductions)
    let hourlyRate = truePay
    if(payType==="yearly"){
      hourlyRate = truePay/(52 * 40)
    }
    setRate(hourlyRate)
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={false}
    >
      <View style={{ flex: 1 }}>
        <Header centerComponent={{text: "Live Pay Calculator", style: { color: "white", fontSize: 15 }}}backgroundColor={"#262927"}/>
        <View style={styles.container}>
          <PayRateForm calculateRate={calculateRate} counterStatus={setCounterStatus} resetStatus={setResetStatus}/>
          <PayRateCounter hourlyRate={rate} counterStatus={counterStatus} resetStatus={resetStatus}/>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
});
