import React from 'react';
import { Document, Text, Page } from '@react-pdf/renderer';
import { StyleSheet, Font } from '@react-pdf/renderer';
import { getSelectedMonth } from '../../actions/monthActions'
import { getSoldesOfMonthForPrinting, getTotalSoldesOfMonth } from '../../actions/soldeActions'
import arabic from '../../assets/fonts/arabic2.ttf'

export default function SoldeReport(props){
   
  const [month, setMonth] = React.useState();
  const [soldes, setSoldes] = React.useState();
  const [total, setTotal] = React.useState();

  Font.register({ family: 'Arabic', src: arabic });


    const styles = StyleSheet.create({
        body: {
          paddingTop: 10,
          paddingBottom: 10,
          paddingHorizontal: 20,
        },
        title: {
          fontSize: 24,
          textAlign: 'center',
          marginTop: 10,
          marginBottom: 15,
          fontFamily: 'Arabic'
        },
        author: {
          fontSize: 10,
          marginBottom: 5,
          marginLeft: 8,
          fontFamily: 'Arabic'
        },
        subtitle: {
          fontSize: 10,
          marginLeft: 8,
          marginTop: 4,
          textAlign: 'right',
          marginBottom: 4,
          fontFamily: 'Arabic'
        },
        text: {
          margin: 8,
          fontSize: 14,
          textAlign: 'justify',
          fontFamily: 'Times-Roman'
        },
        header: {
          fontSize: 10,
          marginBottom: 5,
          textAlign: 'center',
          color: 'grey',
          fontFamily: 'Arabic'
        },
        title2: {
            fontSize: 18,
            textAlign: 'center',
            marginTop: 15,
            marginBottom: 15
          },
          author2: {
            fontSize: 11,
            marginBottom: 50,
            marginLeft: 8
          },
      });


      React.useEffect(() =>{
        const fetchData = async () => {
          try {
            const token = localStorage.getItem("auth_token");
            //setData(await getSelectedMonth(token, props.id));
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData()
      },[]);

    return(
    <Document>
        <Page style={styles.body}>
        <Text style={styles.header} fixed>
           الجمهورية الجزائرية الديمقراطية الشعبية
      </Text>
      <Text style={styles.header} fixed>
          وزارة الصحة
      </Text>

      <Text style={styles.subtitle}>
          مديرية الصحة و السكان ولاية جانت
      </Text>

      <Text style={styles.subtitle}>
        المؤسسة العمومية للصحة الجوارية جانت
      </Text>

      <Text style={styles.title}>بيان الدفع لشهر </Text>

        </Page>
    </Document>
    );
}
 


