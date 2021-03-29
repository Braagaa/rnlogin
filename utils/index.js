import {Platform} from 'react-native';

export const testProps = (testID, isText) => {
  if (Platform.OS === 'ios') {
    if (isText) {
      return {testID, accessibilityLabel: testID};
    } else {
      return {testID, accessible: false};
    }
  }

  return {accessible: true, accessibilityLabel: testID};
};
