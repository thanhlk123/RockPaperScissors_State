import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const CHOICES = [
  {
    name: 'rock',
    uri: 'http://pngimg.com/uploads/stone/stone_PNG13622.png'
  },
  {
    name: 'paper',
    uri: 'https://www.stickpng.com/assets/images/5887c26cbc2fc2ef3a186046.png'
  },
  {
    name: 'scissors',
    uri:
      'http://pluspng.com/img-png/png-hairdressing-scissors-beauty-salon-scissors-clipart-4704.png'
  }
];
const rulesVictory = [
  {
    status: 'Victory!!!',
    you: 'rock',
    com: 'scissors',
  },
  {
    status: 'Victory!!!',
    you: 'paper',
    com: 'rock',
  },
  {
    status: 'Victory!!!',
    you: 'scissors',
    com: 'paper',
  },
]
const buttonList = ['rock', 'paper', 'scissors']

const ButtonArea = props => {
  return (
    <View style={props.buttonContainer}>
      {buttonList.map(data => {
        return (
          <TouchableOpacity style={props.buttonStyle}
            onPress={() => (props.onPressX)(data)}
            key={data}
          >
            <Text style={props.buttonText}>{data}</Text>
          </TouchableOpacity>)
      }
      )}
    </View>
  )
}
const ChoiceDisplay = props => {
  return (
    <View style={props.choiceContainer} >
      <Text style={props.choiceDescription}>{props.player}</Text>
      <Image source={{ uri: props.uri }} 
        style={props.choiceImage}
        resizeMode='contain'/>
      <Text style={props.choiceCardTitle}>{props.imgname}</Text>
    </View>
  )
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      statusColor: {},
      comChoiceName: 'rock',
      comChoiceImg: 'http://pngimg.com/uploads/stone/stone_PNG13622.png',
      pChoiceName: 'rock',
      pChoiceImg: 'http://pngimg.com/uploads/stone/stone_PNG13622.png',
    }
  }
  setChoice = (val) => {
    let pResult = (CHOICES.filter(data => data.name === val))[0];
    let comResult = CHOICES[this.comRandom()];

    let victoryStatus = rulesVictory.filter(data => ((pResult.name === data.you) && (comResult.name === data.com)))
    let finalResult = {}
    if (victoryStatus.length) {
      finalResult = {
        status: 'Victory!!!',
        statusColor: { color: 'green' }
      }
    } else if (pResult.name === comResult.name) {
      finalResult = {
        status: 'Tie game !!!',
        statusColor: { color: null }
      }
    } else {
      finalResult = {
        status: 'Defeated',
        statusColor: { color: 'red' }
      }
    }

    this.setState({
      pChoiceName: pResult.name,
      pChoiceImg: pResult.uri,
      comChoiceImg: comResult.uri,
      comChoiceName: comResult.name,
      ...finalResult
    })
  }
  comRandom() {
    return (Math.floor(Math.random() * 3))
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: 24, backgroundColor: "blue", width: "100%" }}></View>
        {/* this is status win or loose */}
        <View style={styles.status}>
          <Text style={[styles.statusText, this.state.statusColor]}>{this.state.status}</Text>
        </View>
        {/* this is image choice area */}
        <View style={styles.choicesContainer}>

          <ChoiceDisplay
            key={1}
            choiceDescription={styles.choiceDescription}
            choiceContainer={styles.choiceContainer}
            choiceImage={styles.choiceImage}
            choiceCardTitle={styles.choiceCardTitle}
            player='you'
            imgname={this.state.pChoiceName}
            uri={this.state.pChoiceImg}/>

          <View>
            <Text>vs</Text>
          </View>

          <ChoiceDisplay
            choiceDescription={styles.choiceDescription}
            choiceContainer={styles.choiceContainer}
            choiceImage={styles.choiceImage}
            choiceCardTitle={styles.choiceCardTitle}
            player='com'
            imgname={this.state.comChoiceName}
            uri={this.state.comChoiceImg}/>

        </View>
        {/*this is button choice area*/}
        <ButtonArea
          onPressX={this.setChoice}
          buttonContainer={styles.buttonContainer}
          buttonStyle={styles.buttonStyle}
          buttonText={styles.buttonText} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9ebee'
  },
  status: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 24,
    fontWeight: "600"
  },
  buttonContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    width: 200,
    margin: 10,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#640D14',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  choicesContainer: {
    flex: 3,
    margin: 10,
    borderWidth: 2,
    paddingTop: 100,
    shadowRadius: 5,
    paddingBottom: 100,
    borderColor: 'grey',
    shadowOpacity: 0.90,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { height: 5, width: 5 },
    borderRadius: 10
  },
  choiceContainer: {
    flex: 2,
    alignItems: 'center',
  },
  choiceDescription: {
    fontSize: 25,
    color: '#250902',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  choiceCardTitle: {
    fontSize: 30,
    color: '#250902'
  },
  choiceImage: {
    width: 150,
    height: 150,
    padding: 10,
  }
});
