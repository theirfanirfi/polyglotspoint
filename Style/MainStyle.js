import { Dimensions, StyleSheet } from 'react-native'
export default styles = StyleSheet.create({
  ProgressBarcontainer: {

    backgroundColor: '#080a09',
    alignItems: 'center',
    justifyContent: 'center',

  },
  LevelsContainer: {
    backgroundColor: '#080a09',

    flex: 1,
  },
  SelctLanguagescontainer: {
    backgroundColor: '#080a09',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,


  },
  CountriesCards: {
    borderWidth: 1,
    borderColor: '#36413d',
    backgroundColor: '#36413d',
    display: 'flex',
    flex: 1,

    flexWrap: 'wrap',
    width: 300,
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    marginBottom: 30
  },
  CountriesCardsText: {
    color: '#60AA6D',

    fontSize: 18
  },
  LevelCardsContainer: {
    marginTop: 8,
    margin: 30


  },
  LevelCard: {

    borderColor: 1,
    backgroundColor: '#36413d',
    borderRadius: 4,
    padding: 5,
    width: 155,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',





  },

  CheckdButtonText: {
    color: 'white',
    fontSize: 18,

    fontWeight: "bold",
    padding: 18,
    alignSelf: "center",

  },

  CheckdButton: {

    borderWidth: 1,
    borderColor: '#60AA6D',
    width: 270,
    marginTop: 30,
    borderRadius: 30,
    padding: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#60AA6D',




  },

  GroupsContainer: {
    backgroundColor: '#080a09',

    flex: 1,
  },
  GroupsCardsContainer: {
    marginTop: 8,
    margin: 30
  },
  GroupsCard: {
    borderColor: 1,
    backgroundColor: '#36413d',
    borderRadius: Math.round(Dimensions.get('window').height) / 2,
    padding: 5,
    width: Dimensions.get('window').width * 0.28,
    height: Dimensions.get('window').width * 0.28,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile_pic_container:
  {

    borderWidth: 1,
    borderColor: '#36413d',
    borderRadius: 100,
    right: 6,

  },
  profile_pic: {
    width: 30,
    height: 30,
    borderRadius: 100
  },
  LessonsContainer: {
    backgroundColor: '#080a09',
    // justifyContent: 'center',
    flex: 1,
  },
  LessonsCardContainer: {
    marginTop: 8,
    margin: 30
  },
  sentence: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'BalsamiqSans-Bold',
    marginTop: 20

  },
  SeparatewordsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 40,
    borderRadius: 4
  },
  wordsContainer: {
    borderColor: 'white', borderWidth: 1,
    marginTop: 20,
    display: 'flex',
    flexWrap: 'wrap',
    padding: 5,
    backgroundColor: '#36413d',
    borderColor: '#36413d'
  }


})