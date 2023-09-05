export async function getAllWorkers(token){
    const response = await fetch(
        '/app/api/get_all_workers/' ,
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

  export async function addNewWorker(token, data){
    const response = await fetch(
        '/app/api/create_worker/',
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
    } else {
      console.log("failed", text);
      return "error";
    }
    
    };

    export async function updateWorker(token, data, id){
        const response = await fetch(
            '/app/api/update_worker/'+id,
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

        export async function deleteWorker(token, id){
            const response = await fetch(
                '/app/api/delete_worker/'+id,
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

            export async function getSelectedWorker(token, id){
  
                const response = await fetch(
                  '/app/api/get_selected_worker/'+id,
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
