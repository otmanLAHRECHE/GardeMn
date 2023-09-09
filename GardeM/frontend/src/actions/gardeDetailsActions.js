export async function getAllGardesOfMonth(token, id){
    const response = await fetch(
        '/app/api/get_all_gardes_of_month/'+ id ,
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


  export async function syncWorkers(token, id){
    const response = await fetch(
        '/app/api/sync_workers/'+id,
        {
          method: 'POST',
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
      return "error";
    }
    
    };


    export async function saveGardes(token, data, id){
      const response = await fetch(
          '/app/api/save_gardes/'+id,
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
      if (response.status === 200) {
        return JSON.parse(text);
      } else if(response.status === 201) {
        return "end";
      }else{
        console.log("failed", text);
        return "error";
      }
      
      };