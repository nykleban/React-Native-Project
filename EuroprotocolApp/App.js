import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Header from './components/Header';
import Footer from './components/Footer';
import DateTimeField from './components/DateTimeField';
import styles from './styles';

const Stack = createNativeStackNavigator();

// Сторінки, як і раніше
const pages = {
  DateTime: {
    title: 'Дата та час ДТП',
    next: 'Participants',
    fields: ['Дата події', 'Час події'],
  },
  Participants: {
    title: 'Інформація про учасників',
    next: 'Location',
    fields: [
      'ПІБ водія 1', 'Дата народження водія 1', 'Номер авто 1', 'Телефон водія 1',
      'ПІБ водія 2', 'Дата народження водія 2', 'Номер авто 2', 'Телефон водія 2',
    ],
  },
  Location: {
    title: 'Місце ДТП',
    next: 'Finish',
    fields: ['Адреса або опис місця ДТП'],
  },
};

function Page({ navigation, title, next, canNext = true, home = false, hideBack = false, children }) {
  return (
    <SafeAreaView style={[styles.page, home && styles.homePage]}>
      <Header title={title} home={home} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={[styles.content, home && styles.homeContent]}>
        {children}
      </ScrollView>
      <Footer
        home={home}
        onBack={!home && !hideBack ? () => navigation.goBack() : undefined}
        onNext={next ? () => navigation.navigate(next) : undefined}
        disabled={!canNext}
        nextText={home ? 'ОФОРМИТИ' : 'Продовжити'}
      />
    </SafeAreaView>
  );
}

function HomeScreen({ navigation }) {
  return (
    <Page navigation={navigation} title="ЕЛЕКТРОННИЙ ЄВРОПРОТОКОЛ" next="Conditions" home>
      <FontAwesome5 name="handshake" size={112} color="#FFFFFF" style={styles.handshake} />
      <Text style={styles.homeDescription}>Навчальна версія системи</Text>
    </Page>
  );
}

const conditions = [
  'В ДТП приймають участь тільки 2 учасники',
  'Пошкоджені тільки автомобілі, інше майно не пошкоджено',
  'Немає травмованих або загиблих',
  'Водії не вживали алкоголь або наркотичні речовини',
  'Водії не вживали лікарські засоби, що знижують увагу та швидкість реакції',
  'Водії мають діючі поліси ОСЦПВ',
  'Водії дійшли згоди щодо обставин ДТП',
  'Водії мають при собі справні мобільні телефони',
  'Автомобілі без причепів',
];

function ConditionsScreen({ navigation }) {
  const [checked, setChecked] = useState([]);

  function toggle(index) {
    setChecked((old) => old.includes(index)
      ? old.filter((item) => item !== index)
      : [...old, index]
    );
  }

  return (
    <Page navigation={navigation} title="Умови оформлення" next="DateTime" canNext={checked.length > 0}>
      <Text style={styles.hint}>Для навчального прикладу позначте хоча б один пункт, щоб продовжити.</Text>
      {conditions.map((condition, index) => (
        <Pressable
          key={index}
          style={styles.checkboxRow}
          onPress={() => toggle(index)}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: checked.includes(index) }}
        >
          <Text style={styles.checkbox}>{checked.includes(index) ? '☑' : '☐'}</Text>
          <Text style={styles.checkboxLabel}>{condition}</Text>
        </Pressable>
      ))}
    </Page>
  );
}

// Телефон зберігаємо як 9 цифр після незмінного +380
function phoneDigits(text) {
  let digits = text.replace(/\D/g, '');
  if (digits.startsWith('380') && digits.length > 9) digits = digits.slice(3);
  else if (digits.startsWith('0') && digits.length > 9) digits = digits.slice(1);
  return digits.slice(0, 9);
}

function FormScreen({ navigation, route }) {
  const page = pages[route.name];

  // При першому відкритті всі дати — сьогодні, час — поточний
  const [values, setValues] = useState(() => {
    const initial = {};
    page.fields.forEach((field) => {
      initial[field] = field.startsWith('Дата') || field.startsWith('Час') ? new Date() : '';
    });
    return initial;
  });

  function change(field, value) {
    setValues((old) => ({ ...old, [field]: value }));
  }

  // Телефон має містити рівно 9 цифр після +380, текстові поля не можуть бути порожніми
  const canNext = page.fields.every((field) => {
    const value = values[field];
    if (field.startsWith('Телефон')) return /^\d{9}$/.test(value);
    if (field.startsWith('Дата') || field.startsWith('Час')) return value instanceof Date && !isNaN(value.getTime());
    return typeof value === 'string' && value.trim().length > 0;
  });

  return (
    <Page navigation={navigation} title={page.title} next={page.next} canNext={canNext}>
      {page.fields.map((field) => {
        if (field.startsWith('Дата') || field.startsWith('Час')) {
          return (
            <DateTimeField
              key={field}
              label={field}
              mode={field.startsWith('Час') ? 'time' : 'date'}
              value={values[field]}
              onChange={(date) => change(field, date)}
            />
          );
        }

        if (field.startsWith('Телефон')) {
          return (
            <View key={field} style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>{field}</Text>
              <View style={styles.phoneRow}>
                <Text style={styles.phonePrefix}>+380</Text>
                <TextInput
                  style={styles.phoneInput}
                  keyboardType="phone-pad"
                  placeholder="XX XXX XX XX"
                  placeholderTextColor="#747f7c"
                  value={values[field]}
                  onChangeText={(text) => change(field, phoneDigits(text))}
                  maxLength={18}
                />
              </View>
              <Text style={styles.fieldHelp}>9 цифр після +380</Text>
            </View>
          );
        }

        const isPlate = field.startsWith('Номер авто');
        const isName = field.startsWith('ПІБ');
        return (
          <View key={field} style={styles.fieldBlock}>
            <Text style={styles.fieldLabel}>{field}</Text>
            <TextInput
              style={styles.input}
              placeholder={isPlate ? 'AA 1234 AA' : field}
              placeholderTextColor="#747f7c"
              value={values[field]}
              onChangeText={(text) => change(field, isPlate ? text.toUpperCase() : text)}
              keyboardType="default"
              autoCapitalize={isPlate ? 'characters' : isName ? 'words' : 'sentences'}
              autoCorrect={!isPlate}
              maxLength={isPlate ? 12 : undefined}
              multiline={field.startsWith('Адреса')}
            />
          </View>
        );
      })}
    </Page>
  );
}

function FinishScreen({ navigation }) {
  return (
    <Page navigation={navigation} title="Завершення оформлення">
      <Text style={styles.hint}>Натисніть кнопку, щоб завершити навчальне оформлення.</Text>
      <Pressable style={styles.finishButton} onPress={() => navigation.replace('Success')}>
        <Text style={styles.finishButtonText}>Оформити</Text>
      </Pressable>
    </Page>
  );
}

function SuccessScreen({ navigation }) {
  return (
    <Page navigation={navigation} title="Оформлено" hideBack>
      <FontAwesome5 name="check-circle" size={80} color="#398d75" style={styles.successIcon} />
      <Text style={styles.successTitle}>Оформлено!</Text>
      <Text style={styles.successText}>Це навчальна версія. Дані нікуди не надсилалися.</Text>
      <Pressable
        style={styles.finishButton}
        onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}
      >
        <Text style={styles.finishButtonText}>На головну</Text>
      </Pressable>
    </Page>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Conditions" component={ConditionsScreen} />
          <Stack.Screen name="DateTime" component={FormScreen} />
          <Stack.Screen name="Participants" component={FormScreen} />
          <Stack.Screen name="Location" component={FormScreen} />
          <Stack.Screen name="Finish" component={FinishScreen} />
          <Stack.Screen name="Success" component={SuccessScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
