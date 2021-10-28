import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 



export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  const buttons = ['AC', 'DEL', '%', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '=']  

  const [currentNumber, setCurrentNumber] = useState("")
  const [ultNumber, setLastNumber] = useState("")


  function calculator(){
    const splitNumbers = currentNumber.split(' ')
    const priNumber = parseFloat(splitNumbers[0])
    const ultNumber = parseFloat(splitNumbers[2])
    const operador = splitNumbers[1]

    switch(operador){
      case '+':
        setCurrentNumber((priNumber + ultNumber).toString())
        return
      case '-': 
        setCurrentNumber((priNumber - ultNumber).toString())
        return
      case '*':
        setCurrentNumber((priNumber * ultNumber).toString())
        return
      case '/': 
        setCurrentNumber((priNumber / ultNumber).toString())
        return
    }
  }

  function handleInput(buttonPressed){
    console.log(buttonPressed)
    if(buttonPressed === '+' | buttonPressed === "-" | buttonPressed === "*" | buttonPressed === "/" ){
      setCurrentNumber(currentNumber + " " + buttonPressed + " ")
      return
    }
    switch(buttonPressed){
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length -1)))
        return
      case 'AC':
        setLastNumber("")
        setCurrentNumber("")
        return
      case '=':
        setLastNumber(currentNumber + " = ")
        calculator()
        return
      case '+/-':
        return
    }

    setCurrentNumber(currentNumber + buttonPressed)
  }

  const styles = StyleSheet.create({
    results: {
      backgroundColor:"#282f3b",
      width: '100%',
      minHeight: 280,
      alignItems: 'flex-end',
      justifyContent: 'flex-end'
    },
    resultText: {
      color:"#f5f5f5",
      margin: 10,
      fontSize: 40
    },

    historyText:{
      color:"#B5B7BB",
      fontSize: 20,
      marginRight: 10,
      alignSelf: 'flex-end',
    },
    buttons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    button: {
      borderColor:'#3f4d5b',
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 100, 
      minHeight: 115,
      flex: 2,
    },
    textButton: {
      color:"#b5b7bb",
      fontSize: 20,
    }, 
  });

  return (
    <View>
      <View style={styles.results}>
       
        <Text style={styles.historyText}>{ultNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) => 
          button === '=' ?
        <TouchableOpacity onPress={() => handleInput(button)} key={button} style={[styles.button, {backgroundColor: '#9DBC7B'}]}>
          <Text style={[styles.textButton, {color: "white", fontSize: 30}]}>{button}</Text>
        </TouchableOpacity>
          :
          <TouchableOpacity onPress={() => handleInput(button)} key={button} style={[styles.button, 
          {backgroundColor: typeof(button) === 'number' ? darkMode === true ? '#303946' : '#fff': darkMode === true ? '#414853' : '#ededed'}]}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}