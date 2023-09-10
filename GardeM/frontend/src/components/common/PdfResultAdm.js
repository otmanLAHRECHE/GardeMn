import React from 'react';
import { Document, Text, Page, View } from '@react-pdf/renderer';
import { StyleSheet, Font } from '@react-pdf/renderer';
import { getSelectedMonth } from '../../actions/monthActions'
import { getSoldesOfMonthForPrinting, getTotalSoldesOfMonth } from '../../actions/soldeActions'
import arabic from '../../assets/fonts/arabic2.ttf'


function tafqeet(numIn=0, code, op={}){
  let iso=tafqeetISOList[code];if(!iso)throw new Error("Currency code not in the list!");
  let arr=(numIn+="").split((0.1).toLocaleString().substring(1,2)),
  out=nToW(arr[0],iso.uGender=="female",op,[iso.uSingle,iso.uDouble,iso.uPlural]),
  frc=arr[1]?(arr[1]+"000").substring(0,iso.fraction):0;
  if (frc !=0){out+="، و"+(op.format=="short"?frc+"/1"+"0".repeat(+iso.fraction)+" "+iso.uSingle:
  nToW(frc,iso.sGender=="female",op,[iso.sSingle,iso.sDouble,iso.sPlural]));}
  return out;
  
  function nToW(numIn=0,fm,{comma,legal}={},names){
  if(numIn==0)return"صفر "+iso.uSingle;
  let tS=[,"ألف","مليون","مليار","ترليون","كوادرليون","كوينتليون","سكستليون"],tM=["","واحد","اثنان","ثلاثة","أربعة","خمسة","ستة","سبعة","ثمانية","تسعة","عشرة"],tF=["","واحدة","اثنتان","ثلاث","أربع","خمس","ست","سبع","ثمان","تسع","عشر"],
  num=(numIn+=""),tU=[...tM],t11=[...tM],out="",n99,SpWa=" و",miah="مائة",
  last=~~(((numIn="0".repeat(numIn.length*2%3)+numIn).replace(/0+$/g,"").length+2)/3)-1;
  t11[0]="عشر";t11[1]="أحد";t11[2]="اثنا";
  numIn.match(/.{3}/g).forEach((n,i)=>+n&&(out+=do999(numIn.length/3-i-1,n,i==last),i!==last&&(out+=(comma=='on'?"،":"")+SpWa)));
  let sub=" "+names[0],n=+(num+"").slice(-2);if(n>10)sub=" "+tanween(names[0]);else if(n>2)sub=" "+names[2];
  else if(n>0)sub=names[n-1]+" "+(fm?tF[n]:tM[n]);
  return out+sub;
  
  function tanween(n,a=n.split` `,L=a.length-1){
  const strTF=(str,l=str.slice(-1),o=str+"ًا")=>{return"ا"==l?o=str.slice(0,-1)+"ًا":"ة"==l&&(o=str+"ً"),o;};
  for(let i=0;i<=L;i++)if(!i||i==L)a[i]=strTF(a[i]);return a.join` `;}
  
  function do999(sPos,num,last){
  let scale=tS[sPos],n100=~~(num/100),nU=(n99=num%100)%10,n10=~~(n99/10),w100="",w99="",e8=(nU==8&&fm&&!scale)?"ي":"";
  if (fm&&!scale){[tU,t11,t11[0],t11[1],t11[2]]=[[...tF],[...tF],"عشرة","إحدى","اثنتا"];if(n99>20)tU[1]="إحدى";}
  if(n100){if(n100>2)w100=tF[n100]+miah;else if(n100==1)w100=miah;else w100=miah.slice(0,-1)+(!n99||legal=="on"?"تا":"تان");}
  if(n99>19)w99=tU[nU]+(nU?SpWa:"")+(n10==2?"عشر":tF[n10])+"ون";
  else if(n99>10)w99=t11[nU]+e8+" "+t11[0];else if(n99>2)w99=tU[n99]+e8;let nW=w100+(n100 && n99?SpWa:"")+w99;
  if(!scale)return nW;if(!n99)return nW+" "+scale;if(n99>2)return nW+" "+(n99>10?scale+(last?"":"ًا")
  :(sPos<3?[,"آلاف","ملايين"][sPos]:tS[sPos]+"ات"));nW=(n100?w100+((legal=="on"&&n99<3)?" "+scale:"")+SpWa:"")+scale;
  return(n99==1)?nW:nW+(last?"ا":"ان");}}}
  //=====================================================================
  
  
  
  
  
  
  
  //==================== Common ISO Currency List in Arabic ===============
  let tafqeetISOList={
  AED:{uSingle :"درهم إماراتي",uDouble:"درهمان إماراتيان",uPlural:"دراهم إماراتية",uGender:"male",
   sSingle :"فلس",sDouble:"فلسان",sPlural:"فلوس",sGender:"male",fraction:2},
  
  BHD:{uSingle :"دينار بحريني",uDouble:"ديناران بحرينيان",uPlural:"دنانير بحرينية",uGender:"male",
   sSingle :"فلس",sDouble:"فلسان",sPlural:"فلوس",sGender:"male",fraction:3},
  
  EGP:{uSingle :"جنيه مصري",uDouble:"جنيهان مصريان",uPlural:"جنيهات مصرية",uGender:"male",
   sSingle :"قرش",sDouble:"قرشان",sPlural:"قروش",sGender:"male",fraction:2},
  
  EUR:{uSingle :"يورو",uDouble:"يوروان",uPlural:"يوروات",uGender:"male",
   sSingle:"سنت",sDouble:"سنتان",sPlural:"سنتات",sGender:"male",fraction:2},
  
  GBP:{uSingle :"جنيه إسترليني",uDouble:"جنيهان إسترلينيان",uPlural:"جنيهات إسترلينية",uGender:"male",
   sSingle :"بنس",sDouble:"بنسان",sPlural:"بنسات",sGender:"male",fraction:2},
  
  INR:{uSingle :"روبية هندية",uDouble:"روبيتان هنديتان",uPlural:"روبيات هندية",uGender:"female",
   sSingle :"بيسة",sDouble:"بيستان",sPlural:"بيسات",sGender:"female",fraction:2},
  
  IQD:{uSingle :"دينار عراقي",uDouble:"ديناران عراقيان",uPlural:"دنانير عراقية",uGender:"male",
   sSingle :"فلس",sDouble:"فلسان",sPlural:"فلوس",sGender:"male",fraction:2},
  
  JOD:{uSingle :"دينار أردني",uDouble:"ديناران أردنيان",uPlural:"دنانير أردنية",uGender:"male",
   sSingle :"فلس",sDouble:"فلسان",sPlural:"فلوس",sGender:"male",fraction:3},
  
  KWD:{uSingle :"دينار كويتي",uDouble:"ديناران كويتيان",uPlural:"دنانير كويتية",uGender:"male",
   sSingle :"فلس",sDouble:"فلسان",sPlural:"فلوس",sGender:"male",fraction:3},
  
  LBP:{uSingle :"ليرة لبنانية",uDouble:"ليرتان لبنانيتان",uPlural :"ليرات لبنانية",uGender:"female",
   sSingle :"قرش",sDouble:"قرشان",sPlural:"قروش",sGender:"male",fraction:2},
  
  LYD:{uSingle :"دينار ليبي",uDouble:"ديناران ليبيان",uPlural:"دنانير ليبية",uGender:"male",
   sSingle:"درهم",sDouble:"درهمان",sPlural: "دراهم",sGender:"male",fraction:3},
  
  MAD:{uSingle :"درهم مغربي",uDouble:"درهمان مغربيان",uPlural:"دراهم مغربية",uGender:"male",
   sSingle :"سنتيم",sDouble:"سنتيمان",sPlural:"سنتيمات",sGender:"male",fraction:2},
  
  OMR:{uSingle :"ريال عماني",uDouble:"ريالان عمانيان",uPlural:"ريالات عمانية",uGender:"male",
   sSingle :"بيسة",sDouble:"بيستان",sPlural:"بيسات",sGender:"female",fraction:3},
  
  QAR:{uSingle:"ريال قطري",uDouble:"ريالان قطريان",uPlural:"ريالات قطرية",uGender:"male",
   sSingle:"درهم",sDouble:"درهمان",sPlural: "دراهم",sGender:"male",fraction:2},
  
  SAR:{uSingle:"ريال سعودي",uDouble:"ريالان سعوديان",uPlural:"ريالات سعودية",uGender:"male",
   sSingle:"هللة",sDouble:"هللتان",sPlural: "هللات",sGender:"female",fraction:2},
  
  SDG:{uSingle :"جنيه سوداني",uDouble:"جنيهان سودانيان",uPlural:"جنيهات سودانية",uGender:"male",
   sSingle :"قرش",sDouble:"قرشان",sPlural:"قروش",sGender:"male",fraction:2},
  
  SOS:{uSingle :"شلن صومالي",uDouble:"شلنان صوماليان",uPlural:"شلنات صومالية",uGender:"male",
   sSingle:"سنت",sDouble:"سنتان",sPlural:"سنتات",sGender:"male",fraction:2},
  
  SSP:{uSingle :"جنيه جنوب سوداني",uDouble:"جنيهان جنوب سودانيان",uPlural:"جنيهات جنوب سودانية",uGender:"male",
   sSingle :"قرش",sDouble:"قرشان",sPlural:"قروش",sGender:"male",fraction:2},
  
  SYP:{uSingle :"ليرة سورية",uDouble:"ليرتان سوريتان",uPlural :"ليرات سورية",uGender:"female",
   sSingle :"قرش",sDouble:"قرشان",sPlural:"قروش",sGender:"male",fraction:2},
  
  TND:{uSingle :"دينار تونسي",uDouble:"ديناران تونسيان",uPlural:"دنانير تونسية",uGender:"male",
   sSingle :"مليم",sDouble:"مليمان",sPlural:"ملاليم",sGender:"male",fraction:3},
  
  USD:{uSingle:"دولار أمريكي",uDouble:"دولاران أمريكيان",uPlural:"دولارات أمريكية",uGender:"male",
   sSingle:"سنت",sDouble:"سنتان",sPlural:"سنتات",sGender:"male",fraction:2},
  
  YER:{uSingle:"ريال يمني",uDouble:"ريالان يمنيان",uPlural:"ريالات يمنية",uGender:"male",
   sSingle:"فلس",sDouble:"فلسان",sPlural: "فلوس",sGender:"male",fraction:2},

   DZD:{uSingle :"دينار جزائري",uDouble:"دينار جزائري",uPlural:"دينار جزائري",uGender:"male",
   sSingle :"سنتيم",sDouble:"سنتيم",sPlural:"سنتيم",sGender:"male",fraction:2},
  
  
  //==== add here
  
  };

export default function SoldeReportAdm(props){
   
  const [month, setMonth] = React.useState();
  const [soldes, setSoldes] = React.useState([]);
  const [total, setTotal] = React.useState();

  Font.register({ family: 'Arabic', src: arabic });


    const styles = StyleSheet.create({
        body: {
          paddingTop: 5,
          paddingBottom: 5,
          paddingHorizontal: 10,
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
          fontSize: 14,
          marginLeft: 8,
          marginTop: 4,
          textAlign: 'right',
          marginBottom: 4,
          fontFamily: 'Arabic'
        },
        subtitle2: {
          fontSize: 12,
          marginLeft: 15,
          marginTop: 2,
          textAlign: 'left',
          marginBottom: 1,
          fontFamily: 'Arabic'
        },
        
        subtitle3: {
          fontSize: 13,
          marginRight: 10,
          marginTop: 10,
          textAlign: 'right',
          marginBottom: 1,
          fontFamily: 'Arabic'
        },
        subtitle4: {
          fontSize: 13,
          marginRight: 17,
          marginTop: 6,
          textAlign: 'right',
          marginBottom: 1,
          fontFamily: 'Arabic'
        },
        text: {
          margin: 8,
          fontSize: 14,
          textAlign: 'justify',
          fontFamily: 'Times-Roman'
        },
        header: {
          fontSize: 14,
          marginBottom: 5,
          textAlign: 'center',
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
          table: { 
            display: "table", 
            width: "auto", 
            borderStyle: "solid", 
            borderWidth: 1, 
            borderRightWidth: 0, 
            borderBottomWidth: 0,
            marginLeft: 30,
            marginRight: 30
          }, 
          tableRow: { 
            margin: "auto", 
            flexDirection: "row" 
          }, 
          tableCol: { 
            width: "33%", 
            borderStyle: "solid", 
            borderWidth: 1, 
            borderLeftWidth: 0, 
            borderTopWidth: 0 
          },
           
          tableColTotal: { 
            width: "66%", 
            borderStyle: "solid", 
            borderWidth: 1, 
            borderLeftWidth: 0, 
            borderTopWidth: 0,
            fontFamily: 'Arabic'
          }, 
          tableCell: { 
            margin: "auto",
            fontSize: 12, 
            marginTop: 3, 
            fontSize: 10,
            fontFamily: 'Arabic'
          },
          tableCellTotal: { 
            margin: "auto",
            fontSize: 12, 
            marginTop: 3, 
            fontSize: 10,
            fontWeight: 700,
            fontFamily: 'Arabic'
          }
      });


      React.useEffect(() =>{
        const fetchData = async () => {
          try {
            const token = localStorage.getItem("auth_token");
            setMonth(await getSelectedMonth(token, props.id));
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData()
      },[]);

      React.useEffect(() =>{
        const fetchData = async () => {
          try {
            const token = localStorage.getItem("auth_token");
            setSoldes(await getSoldesOfMonthForPrinting(token, props.id));
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData()
      },[]);

      React.useEffect(() =>{
        const fetchData = async () => {
          try {
            const token = localStorage.getItem("auth_token");
            setTotal(await getTotalSoldesOfMonth(token, props.id));
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData()
      },[]);

      console.log(total);

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

      <Text style={styles.subtitle2}>
            أ خ ب جانت
      </Text>
      <Text style={styles.subtitle2}>
            312947/51    
      </Text>

      <Text style={styles.title}>{month ? month.label +" "+ month.year : null} بيان الدفع لشهر </Text>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>صافي الدفع</Text> 
          </View>
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>الحساب البريدي الجاري</Text> 
          </View>
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>الإسم و اللقب</Text> 
          </View>
        </View>

        {soldes.map((solde) => {
          return (
            <View style={styles.tableRow}>
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}> {solde.sld}</Text> 
          </View>
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}> {solde.cp} </Text> 
          </View>
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}> {solde.work} </Text> 
          </View>
        </View>
          );

        })}

        <View style={styles.tableRow}>
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellTotal}>  { total ? total.total : null } </Text> 
          </View>
          <View style={styles.tableColTotal}> 
            <Text style={styles.tableCell}> المجموع </Text> 
          </View>
        </View>



      </View>

      <Text style={styles.subtitle3}>
    :  أقفل هذا الكشف بمبلغ قدره
      </Text>
      <Text style={styles.subtitle4}>
    { total ? tafqeet(total.total, "DZD") : null }      
      </Text>
        

        </Page>
    </Document>
    );
}
 


