import React from 'react';
import { Document, Text, Page } from '@react-pdf/renderer';
import { StyleSheet} from '@react-pdf/renderer';
import { getSelectedExemen } from '../../actions/examenActions';


export default function BonExamen(props){
   
  const [data, setData] = React.useState();

  const [hiv, setHiv] = React.useState();
  const [hbs, setHbs] = React.useState();
  const [hcv, setHcv] = React.useState();
  const [bw, setBw] = React.useState();
  const [toxo, setToxo] = React.useState();
  const [rub, setRub] = React.useState();

    const styles = StyleSheet.create({
        body: {
          paddingTop: 15,
          paddingBottom: 15,
          paddingHorizontal: 20,
        },
        title: {
          fontSize: 24,
          textAlign: 'center',
          marginTop: 10,
          marginBottom: 15
        },
        author: {
          fontSize: 10,
          marginBottom: 5,
          marginLeft: 8
        },
        subtitle: {
          fontSize: 10,
          marginLeft: 8,
          marginTop: 4,
          marginBottom: 4
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
            setData(await getSelectedExemen(token, props.id));
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData()
      },[]);


      React.useEffect(() =>{
        if(data){
            if(data.HIV_test == "p"){
                setHiv("positive +");
            }else if(data.HIV_test == "n"){
                setHiv("negative -");
            }else{
                setHiv("/////////");
            }

            if(data.HCV_test == "p"){
               setHcv("positive +");
            }else if(data.HCV_test == "n"){
                 setHcv("negative -");
            }else{
                setHcv("/////////");
            }

            if(data.HBS_test == "p"){
               setHbs("positive +");
            }else if(data.HBS_test == "n"){
                setHbs("negative -");
            }else{
                setHbs("//////////");
            }

            if(data.BW_test == "p"){
                setBw("positive +");
            }else if(data.BW_test == "n"){
                setBw("negative -");
            }else{
                setBw("//////////");
            }

            if(data.RUBIOLE_test == "p"){
                setRub("positive +");
            }else if(data.RUBIOLE_test == "n"){
                setRub("negative -");
            }else{
                setRub("//////////");
            }

            if(data.TOXOPLASME_test == "p"){
                setToxo("positive +");
            }else if(data.TOXOPLASME_test == "n"){
                setToxo("negative -");
            }else{
                setToxo("//////////");
            }
        }
      },[data]);

    return(
    <Document>
        <Page style={styles.body} size="A5">
        <Text style={styles.header} fixed>
           REPUBLIQUE ALGERIENNE DEMOCRATIQUE ET POPULAIRE
      </Text>
      <Text style={styles.header} fixed>
           MINISTERE DE SANTE
      </Text>

      <Text style={styles.subtitle}>
        ETABLISSEMENT PUBLIQUE DE LA SANTE DE PROXIMITE DE DJANET
      </Text>

      <Text style={styles.subtitle}>
        SEMEP DE DJANET
      </Text>

      <Text style={styles.subtitle}>
        LABORATOIRE DE PREVENTION
      </Text>

      <Text style={styles.title}>BON D'EXAMEN</Text>

      <Text style={styles.author}>
        Nom : { data ? data.name : null}                                                            Date de naissance: { data ? data.date_naissance : null}
      </Text>

      <Text style={styles.author}>
        Prenom : { data ? data.prenom : null}
      </Text>


      <Text style={styles.title2}>EXAMENS SEROLOGIQUES :</Text>

      <Text style={styles.author2}>
        HIV : { hiv ? hiv : null}                                                    Toxoplasme: { toxo ? toxo : null}   
      </Text>

      <Text style={styles.author2}>
        HBS : { hbs ? hbs : null}                                                    Rubiole: { rub ? rub : null}        
      </Text>

      <Text style={styles.author2}>
        HCV : { hcv ? hcv : null}                         
      </Text>

      <Text style={styles.author2}>
        BW : { bw ? bw : null}                  
      </Text>


      <Text style={styles.author}>
        .                                                                                Djanet le : ........................
      </Text>
        </Page>
    </Document>
    );
}
 


