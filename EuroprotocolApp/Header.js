import React from 'react';
import { Pressable, Text, View } from 'react-native';
import styles from '../styles';

export default function Footer({ home = false, onBack, onNext, disabled = false, nextText = 'Продовжити' }) {
  return (
    <View style={[styles.footer, home && styles.homeFooter]}>
      <View style={styles.buttonRow}>
        {onBack && (
          <Pressable style={[styles.button, styles.backButton]} onPress={onBack}>
            <Text style={styles.backButtonText}>Назад</Text>
          </Pressable>
        )}
        {onNext && (
          <Pressable
            style={[styles.button, styles.nextButton, disabled && styles.disabledButton]}
            onPress={onNext}
            disabled={disabled}
          >
            <Text style={styles.nextButtonText}>{nextText}</Text>
          </Pressable>
        )}
      </View>
      <Text style={[styles.footerText, home && styles.homeFooterText]}>Навчальний проєкт «Європротокол»</Text>
    </View>
  );
}
