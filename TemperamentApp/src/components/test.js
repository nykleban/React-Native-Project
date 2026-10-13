import React, { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import StartButton from "./start";

const questions = [
  "Ти, як правило, завжди буваєш всім задоволений?",
  "Тобі іноді заважають заснути різні думки?",
  "Чи було коли-небудь так, що тобі довірили таємницю, а ти не зміг її зберегти?",
  "Чи було коли-небудь так, що тобі стає сумно без особливої причини?",
  "Чи любиш ти жартувати над ким-небудь?",
  "Чи можеш ти сказати про себе, що ти весела людина?",
  "Чи часто ти потребуєш допомоги інших?",
  "Чи часто у тебе міняється настрій?",
  "Чи завжди ти першим починаєш розмову при знайомстві?",
  "Якщо ти опиняєшся в незручному становищі, чи довго засмучуєшся?",
  "Як часто ти відволікаєшся, коли робиш уроки?",
  "Як ти думаєш, тебе вважають веселою людиною?",
  "Чи траплялося тобі говорити про будь-кого погано?",
  "Чи вважаєш ти себе більш образливим, ніж інші?",
  "Чи можеш ти сказати про себе, що ти безтурботна людина?",
  "Чи можеш ти веселитися, не стримуючи себе, в компанії?",
  "Чи бувало, що ти не виконав прохання допомогти вдома?",
  "Чи подобається тобі іноді бути одному більше, ніж з друзями?",
  "Чи часто ти мовчиш у компанії?",
  "Чи буває, що ти так хвилюєшся, що не можеш всидіти на місці?",
  "Чи буває у тебе запаморочення без причини?",
  "Чи бувало, що ти грубо розмовляв з батьками?",
  "Чи буває, що твоє серце сильно б'ється без причини?",
  "Тобі подобається робота, яку потрібно виконувати швидко?",
  "Тобі часом сняться страшні сни?",
  "Чи буває відчуття, що тобі все набридло?",
  "Чи бувало, що тобі було дуже погано?",
  "Чи буває, що тебе майже все дратує?",
  "Тобі подобається весела і галаслива компанія?",
  "Тобі подобається розповідати друзям жарти?",
  "Тобі завжди подобається грати з іншими?",
  "Чи можеш ти легко розвеселити компанію?",
  "Ти любиш ходити в гості?",
  "Ти любиш іноді похвалитися?",
  "Ти коли-небудь порушував правила поведінки?",
  "Ти коли-небудь говорив неправду?",
  "Ти іноді відчуваєш втому без причини?",
  "Ти зазвичай швидко приймаєш рішення?",
  "Ти завжди їси все, що тобі дають?",
  "Ти завжди виконуєш те, що тобі кажуть?",
  "Ти іноді жартуєш, коли немає вчителя?",
  "Ти сильно засмучуєшся, коли тебе сварять?",
  "Тебе легко образити або засмутити?",
  "Тобі важко відмовляти іншим?",
  "Ти швидко знаходиш відповідь на запитання?",
  "Ти часто буваєш сердитим?",
  "Чи буває, що ти не хочеш брати участь у святкуванні?",
  "Ти іноді говориш перше, що спадає на думку?",
  "Ти іноді відчуваєш себе самотнім?",
  "Коли на тебе кричать, ти кричиш у відповідь?",
  "На тебе впливає погода?",
  "Ти соромишся першим заговорити з незнайомцями?",
  "Ти впевнений, що впораєшся зі своєю справою?",
  "Ти часто розумієш помилки, коли вже пізно?",
  "Тобі іноді важко отримати задоволення від компанії?",
];

function getTemperament(score) {
  if (score < 14) {
    return {
      name: "Інтроверт",
      range: "0–13 балів",
      description: "Ви занурені в себе.",
    };
  } else if (score < 28) {
    return {
      name: "Флегматик-інтроверт",
      range: "14–27 балів",
      description:
        "Ви товариська людина, обернена до зовнішнього світу. Стабільна особистість: повільна, спокійна, пасивна, незворушна, обережна, замислена, мирна, стримана й надійна. Спокійні у взаєминах, здатні витримати тривалі негаразди без зривів здоров’я і настрою.",
    };
  } else if (score < 41) {
    return {
      name: "Холерик-інтроверт",
      range: "28–40 балів",
      description:
        "Ви спілкуєтеся, коли вам це потрібно. За описом холеричного типу, ви можете бути збудливими, нестриманими, імпульсивними, оптимістичними й активними. Працездатність і настрій можуть змінюватися, особливо у стресових ситуаціях.",
    };
  } else {
    return {
      name: "Меланхолік-інтроверт",
      range: "41–55 балів",
      description:
        "Нестабільна особистість: тривожна, песимістична, зовні стримана, але дуже емоційна й чутлива. Схильна перейматися, переживати, тривожитися та сумувати; у напружених ситуаціях можливі зрив або погіршення діяльності.",
    };
  }
}

export default function TemperamentTest() {
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState(null);

  function askQuestion(index, score) {
    if (index === questions.length) {
      setResult({
        score,
        ...getTemperament(score),
      });
      return;
    }

    Alert.alert(
      `Питання ${index + 1} з ${questions.length}`,
      questions[index],
      [
        { text: "Так", onPress: () => askQuestion(index + 1, score + 1) },
        { text: "Іноді", onPress: () => askQuestion(index + 1, score + 0.5) },
        { text: "Ні", onPress: () => askQuestion(index + 1, score) },
      ],
      { cancelable: false },
    );
  }

  function startTest() {
    setResult(null);
    setStarted(true);
    askQuestion(0, 0);
  }

  if (result) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Опрацювання результатів</Text>
        <Text style={styles.description}>
          Ваш результат: {result.score.toLocaleString("uk-UA")} балів із{" "}
          {questions.length}
        </Text>
        <Text style={styles.result}>{result.name}</Text>
        <Text style={styles.range}>{result.range}</Text>
        <Text style={styles.description}>{result.description}</Text>
        <Pressable onPress={startTest} style={styles.button}>
          <Text style={styles.buttonText}>Пройти ще раз</Text>
        </Pressable>
      </ScrollView>
    );
  }

  if (!started) {
    return <StartButton onPress={startTest} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Тест на темперамент</Text>
      <Text style={styles.description}>
        Відповідай на запитання у вікні, що з’являється.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#f4f6fb",
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 26,
    fontWeight: "700",
    color: "#172554",
  },
  result: {
    marginBottom: 8,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    color: "#4338ca",
  },
  range: {
    marginBottom: 16,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#475569",
  },
  description: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 17,
    lineHeight: 24,
    color: "#475569",
  },
  button: {
    minHeight: 52,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#4f46e5",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
