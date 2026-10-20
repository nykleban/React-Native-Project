
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FA',
  },

  header: {
    backgroundColor: 'white',
    paddingTop: 65,
    paddingHorizontal: 30,
    paddingBottom: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },

  date: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  list: {
    padding: 25,
  },

  task: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 12,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },

  taskText: {
    flex: 1,
    fontSize: 13,
    marginRight: 10,
  },

  status: {
    fontSize: 11,
    color: 'gray',
  },

  bottom: {
    height: 75,
    backgroundColor: '#EEF4F7',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  icon: {
    fontSize: 22,
    color: '#AEBAC5',
  },

  addButton: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: '#6195F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
  },

  plus: {
    fontSize: 34,
    color: 'white',
  },
});
