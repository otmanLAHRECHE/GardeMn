export async function getAllMonthsOfYear(token, year){
    const response = await fetch(
        '/app/api/get_all_examen_of_year/' + year ,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' +token,
          },
          body: JSON.stringify()
        }
    );
    const text = await response.text();
    if (response.status === 200) {
      return JSON.parse(text);
    } else {
      console.log("failed", text);
      return "no data";
    }
  
  };


  export async function addNewMonth(token, data){
    const response = await fetch(
        '/app/api/create_month/',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' +token,
          },
          body: data
        }
    );
    const text = await response.text();
    if (response.status === 201) {
      return JSON.parse(text);
    } else if(response.status === 500) {
      return "exist";
    }else {
      console.log("failed", text);
      return "error";
    }
    
    };