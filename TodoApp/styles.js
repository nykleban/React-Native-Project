
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

  form: {
    backgroundColor: 'white',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
  },
  error: {
    color: 'red',
  },
  priorityRow: {
    flexDirection: 'row',
    gap: 16,
    marginVertical: 10,
  },
  priority: {
    color: 'gray',
  },
  selectedPriority: {
    color: '#6195F5',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#6195F5',
    padding: 10,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
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
    fontSize: 13,
    marginRight: 10,
  },

  taskDetails: {
    flex: 1,
  },
  taskMeta: {
    fontSize: 11,
    color: 'gray',
    marginTop: 4,
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
