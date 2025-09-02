async function postData(endpoint,obj) {
  try {
    const peticion = await fetch(`http://localhost:2929/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    });
    return await peticion.json();
  } catch (error) {
    console.error('Error:', error);
  }
}
async function getData(endpoint) {
  try {
    const peticion = await fetch(`http://localhost:2929/${endpoint}`);
    return await peticion.json();
  } catch (error) {
    console.error('Error:', error);
  }
}
async function patchData(endpoint, obj,id) {
  try {
    const peticion = await fetch(`http://localhost:2929/${endpoint}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj) // pasa info al db.json **api
    });
    return await peticion.json();
  } catch (error) {
    console.error('Error:', error);
  }
}
async function delData(endpoint,id) {
 try {
   const peticion = await fetch (`http://localhost:2929/${endpoint}/${id}`, {
     method: "delete",
     headers:{
       "Content-type": "application/json"
     }
   });
   const respuesta = await peticion.json()
   console.log(respuesta);
   return respuesta
 } catch (error) {
  console.error(error);
 }
}
export {postData,getData,patchData,delData}

