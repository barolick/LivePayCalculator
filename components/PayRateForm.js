import React, { useState, useRef } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { Button, Input } from "react-native-elements";
import { Picker } from "@react-native-community/picker";

export default function PayRateForm({calculateRate=f=>f, counterStatus=f=>f, resetStatus=f=>f}) {
  const [payRate, setPayRate] = useState("")
  const [taxDeductions, setTaxDeductions] = useState("")
  const [payType, setPayType] = useState("hourly")
  return (
    <>
      <Input placeholder="Pay Rate" keyboardType="numeric" placeholderTextColor="grey" inputStyle={styles.text} value={payRate} onChangeText={setPayRate}/>
      <Input placeholder="Estimated Tax Deductions" keyboardType="numeric" placeholderTextColor="grey"inputStyle={styles.text} value={taxDeductions} onChangeText={setTaxDeductions}/>
      <View style={styles.pickerContainer}>
        <Picker style={{ height: 20, width: 150 }} itemStyle={{ color: "white" }} selectedValue={payType} 
        onValueChange={(itemValue, itemIndex) => setPayType(itemValue)}>
          <Picker.Item label="Hourly" value="hourly" />
          <Picker.Item label="Yearly" value="yearly" />
        </Picker>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Start" type="outline" containerStyle={styles.button} buttonStyle={styles.buttonStyles} titleStyle={styles.text}
        onPress={()=>{
          Keyboard.dismiss()
          calculateRate(Number(payRate), Number(taxDeductions), payType)
          counterStatus(true)
          resetStatus(false)
        }}></Button>
        <Button title="Pause" type="outline" containerStyle={styles.button} buttonStyle={styles.buttonStyles} titleStyle={styles.text}
        onPress={()=>{
          counterStatus(false)
        }}></Button>
        <Button title="Reset" type="outline" containerStyle={styles.button} buttonStyle={styles.buttonStyles} titleStyle={styles.text}
        onPress={()=>{
          counterStatus(false)
          resetStatus(true)
        }}></Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    paddingHorizontal: 10,
  },
  buttonStyles: {
    borderColor: "white",
  },
  text: {
    color: "white",
  },
});
