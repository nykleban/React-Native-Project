import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  page: { flex: 1, backgroundColor: '#f6f8f7' },
  homePage: { backgroundColor: '#557b76' },

  header: { backgroundColor: '#557b76', padding: 20, alignItems: 'center' },
  headerTitle: { color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  homeHeader: { paddingTop: 45 },
  homeTitle: { fontSize: 34 },

  content: { flexGrow: 1, padding: 20 },
  homeContent: { justifyContent: 'center', alignItems: 'center' },
  handshake: { marginBottom: 15 },
  homeDescription: { marginTop: 20, color: 'white', fontSize: 17 },
  hint: { fontSize: 17, color: '#283c39', marginBottom: 18 },

  checkboxRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'white',
    padding: 14, marginBottom: 10, borderRadius: 8,
  },
  checkbox: { fontSize: 28, color: '#398d75', marginRight: 12 },
  checkboxLabel: { fontSize: 16, color: '#20312f', flex: 1 },
  input: {
    backgroundColor: 'white', borderWidth: 1, borderColor: '#c8d3d0',
    borderRadius: 8, padding: 15, fontSize: 16, color: '#20312f',
  },

  footer: { padding: 16, backgroundColor: '#edf1ef' },
  homeFooter: { backgroundColor: '#557b76', paddingBottom: 28 },
  buttonRow: { flexDirection: 'row', gap: 10 },
  button: { flex: 1, padding: 15, borderRadius: 5, alignItems: 'center' },
  backButton: { backgroundColor: '#d3ddda' },
  nextButton: { backgroundColor: '#a6ff00' },
  disabledButton: { backgroundColor: '#bac5c2' },
  backButtonText: { fontSize: 17, color: '#1d2a27' },
  nextButtonText: { fontSize: 17, color: '#15201a', fontWeight: '600' },
  footerText: { marginTop: 16, color: '#596c68', textAlign: 'center', fontSize: 12 },
  homeFooterText: { color: '#e2eeeb' },

  successIcon: { alignSelf: 'center', marginTop: 30 },
  successTitle: { fontSize: 28, fontWeight: 'bold', color: '#20312f', textAlign: 'center', marginTop: 18 },
  successText: { fontSize: 16, color: '#596c68', textAlign: 'center', marginTop: 12, marginBottom: 18 },

  finishButton: {
    marginTop: 16, backgroundColor: '#a6ff00', borderRadius: 5,
    padding: 16, alignItems: 'center',
  },
  finishButtonText: { fontSize: 18, color: '#15201a' },

  // Універсальні поля
  fieldBlock: { marginBottom: 16 },
  fieldLabel: { fontSize: 15, fontWeight: '600', color: '#20312f', marginBottom: 7 },
  fieldHelp: { color: '#596c68', fontSize: 12, marginTop: 5 },
  phoneRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'white', borderWidth: 1, borderColor: '#c8d3d0',
    borderRadius: 8, paddingHorizontal: 15,
  },
  phonePrefix: { fontSize: 16, fontWeight: '600', color: '#20312f', marginRight: 9 },
  phoneInput: { flex: 1, paddingVertical: 15, fontSize: 16, color: '#20312f' },
  pickerButton: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: 'white', borderWidth: 1, borderColor: '#c8d3d0',
    borderRadius: 8, padding: 15,
  },
  pickerText: { fontSize: 16, color: '#20312f' },
  iosPicker: { backgroundColor: 'white', borderRadius: 8, marginTop: 8, padding: 5 },
  pickerDone: { alignSelf: 'flex-end', padding: 12 },
  pickerDoneText: { color: '#398d75', fontSize: 16, fontWeight: '600' },
});
