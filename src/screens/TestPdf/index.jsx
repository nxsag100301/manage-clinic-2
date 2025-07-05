import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

const TestPdf = () => {
  const source = {
    uri: 'https://www.rd.usda.gov/sites/default/files/pdf-sample_0.pdf',
  };
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{
          uri: `http://docs.google.com/gview?embedded=true&url=http://www.africau.edu/images/default/sample.pdf`,
        }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default TestPdf;

const styles = StyleSheet.create({});
