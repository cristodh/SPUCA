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

export {postData,getData}

