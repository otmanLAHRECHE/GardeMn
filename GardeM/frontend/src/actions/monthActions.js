export async function getAllMonthsOfYear(token, year){
    const response = await fetch(
        '/app/api/get_all_months_of_year/' + year ,
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
    } else if(response.status === 208) {
      return "exist";
    }else {
      console.log("failed", text);
      return "error";
    }
    
    };

    export async function updateMonth(token, data, id){
      const response = await fetch(
          '/app/api/update_month/'+id,
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
      } else {
        console.log("failed", text);
        return "error";
      }
      
      };

      export async function deleteMonth(token, id){
        const response = await fetch(
            '/app/api/delete_month/'+id,
            {
              method: 'DELETE',
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

    export async function getSelectedMonth(token, id){
  
          const response = await fetch(
            '/app/api/get_selected_month/'+id,
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