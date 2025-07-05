import { StyleSheet, Text, View } from 'react-native';
import Pdf from 'react-native-pdf';
import { Height, Width } from '../../theme';

const TestPdf = () => {
  const source = {
    uri: 'https://beta-portalv2.mifi.vn/DownloadPDFCA.aspx?kk=1434747710&keyinv=mfRzFqQkhZSGI1eVE9&coid=MWNuWGNKQkk0MjA9&p=1&c=0&publishDomain=https://demo.matbao.in',
    cache: true,
  };
  return (
    <View style={styles.container}>
      <Pdf
        trustAllCerts={false}
        source={source}
        style={styles.pdf}
        // onLoadComplete={(numberOfPages, filePath) => {
        //   console.log(`Number of pages: ${numberOfPages}`);
        // }}
        // onPageChanged={(page, numberOfPages) => {
        //   console.log(`Current page: ${page}`);
        // }}
        // onError={error => {
        //   console.log(error);
        // }}
        // onPressLink={uri => {
        //   console.log(`Link pressed: ${uri}`);
        // }}
      />
    </View>
  );
};

export default TestPdf;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: Width,
    height: Height,
  },
});
