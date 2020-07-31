import React, {useState, useEffect} from "react"
import { View, StyleSheet } from "react-native"
import { Text } from "react-native-elements"

export default function PayRateCounter({hourlyRate, counterStatus, resetStatus}){
    const [payRateCount, setPayRateCount] = useState(0)
    useEffect(() => {
        let interval = null
        if(counterStatus){
            interval = setInterval(() => {
                setPayRateCount(payRateCount => payRateCount + hourlyRate/3600000)
            }, 1)
        }
        else if(!counterStatus && resetStatus){
            clearInterval(interval)
            setPayRateCount(0)
        }
        return () => clearInterval(interval)
    })
    return(
        <View style={styles.container}>
            <Text h1 h1Style={styles.counter}>{"$"+ payRateCount.toFixed(4)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal:10,
        justifyContent: "center",
        alignItems: "center"
    },
    counter: {
        color: "white",
        fontSize: 70
    }
})