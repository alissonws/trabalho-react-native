import {
  Image,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createIntl, createIntlCache } from '@formatjs/intl';
const cache = createIntlCache();
const intl = createIntl(
  {
    locale: 'en-US',
    messages: {},
  },
  cache
);

type Props = {
  value?: number;
  onChange?: (amount: number) => void;
  minValue?: number;
  maxValue?: number;
  placeholder?: string;
};

function getFormattedValue(value: number) {
  const formattedNumber = intl.formatNumber(value / 100, {
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL',
  });
  return formattedNumber === 'NaN' ? '' : formattedNumber;
}

function isFormattedPartially(value: string) {
  return value.endsWith('.') || value === '-';
}

function getUnformattedValue(value: string): number {
  return parseFloat(value.replace(/\D/g, ''));
}

export const isIOS = Platform.OS === 'ios';

const CurrencyInput = ({
  minValue = -999999999999999,
  maxValue = 999999999999999,
  onChange,
  value,
  ...restProps
}: Props) => {
  const isValid = useCallback(
    (newValue: number) => {
      if (
        (minValue !== undefined && newValue < minValue) ||
        (maxValue !== undefined && newValue > maxValue)
      ) {
        return false;
      }
      return true;
    },
    [minValue, maxValue]
  );

  const localValueRef = useRef(value);

  const [formattedValue, setFormattedValue] = useState(() => {
    if (value !== undefined && getFormattedValue) {
      return getFormattedValue(value);
    }
  });

  const onChangeValue = useCallback(
    (newValue: string) => {
      // for use cases like date/currency where it's not completed with / and dot as an end character in string
      if (isFormattedPartially(newValue)) {
        setFormattedValue(newValue);
        return;
      }

      const _newUnformattedValue = getUnformattedValue(newValue);
      if (!isValid(_newUnformattedValue)) {
        return;
      }

      const _formattedValue = getFormattedValue(_newUnformattedValue);
      localValueRef.current = _newUnformattedValue;

      if (onChange) {
        onChange(_newUnformattedValue);
      }
      setFormattedValue(_formattedValue);
    },
    [onChange]
  );

  useEffect(() => {
    if (value !== localValueRef.current) {
      // @ts-ignore
      setFormattedValue(getFormattedValue(value));
      localValueRef.current = value;
    }
  }, [value]);

  const _onChange = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      onChangeValue(e.nativeEvent.text);
    },
    [onChangeValue]
  );

  return (
    <View style={styles.container}>
      {/* <Image source={DollarIcon} style={styles.leftIcon} /> */}
      <TextInput
        onChange={_onChange}
        value={formattedValue}
        {...restProps}
        placeholderTextColor={'#A5A5A5'}
        style={styles.input}
        inputMode='numeric'
      />
    </View>
  );
};

export default CurrencyInput;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    color: '#fff',
    backgroundColor: '#1A1A1A',
    overflow: 'hidden',
    margin: 0,
    fontWeight: '600',
    textAlignVertical: 'center',
    fontSize: 16,
  },
  container: {
    paddingHorizontal: 12,
    backgroundColor: '#1A1A1A',
    borderColor: '#555555',
    borderWidth: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: isIOS ? 10 : 8,
    paddingTop: isIOS ? 12 : 8,
    borderRadius: 12,
  },
  leftIcon: {
    height: 24,
    width: 24,
    marginRight: 12,
  },
});
