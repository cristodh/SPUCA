/*Estudiante*/
async function postDataEst(obj) {
    try {
        const peticion = await fetch("http://localhost:2929/estudiantes", {
            method: "POST",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify(obj)
        });
        const respuesta = await peticion.json();
        return respuesta;
    } catch (error) {
        console.log(error);
    }
}

async function putDataEst(obj) {
    try {
        const peticion = await fetch("http://localhost:2929/estudiantes", {
            method: "PATCH",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify(obj)
        });
        const respuesta = await peticion.json();
        return respuesta;
    } catch (error) {
        console.log(error);        
    }
}

async function getDataEst() {
    try {
        const peticion = await fetch("http://localhost:2929/estudiantes", {
        method: "GET",
        headers:{"Content-Type": "application/json" },
        })
    const respuesta = await peticion.json();
    return respuesta;
    } catch (error) {
        console.log(error);
    }
}

async function deleteDataEst(obj) {
    try {
        const peticion = await fetch("http://localhost:2929/estudiantes", {
            method: "DELETE",
            headers: {"Content-Type": "application/json" },
        });
        const respuesta = await peticion.json();
        return respuesta;
    }
    catch (error) {
        console.log(error);
    }
}

/*Docente*/

async function postDataDoc(obj) {
    try {
        const peticion = await fetch("http://localhost:2929/docentes", {
            method: "POST",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify(obj)
        });
        const respuesta = await peticion.json();
        return respuesta;
    } catch (error) {
        console.log(error);
    }
}

async function putDataDoc(obj) {
    try {
        const peticion = await fetch("http://localhost:2929/docentes", {
            method: "PATCH",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify(obj)
        });
        const respuesta = await peticion.json();
        return respuesta;
    } catch (error) {
        console.log(error);        
    }
}

async function getDataDoc() {
    try {
        const peticion = await fetch("http://localhost:2929/docentes", {
        method: "GET",
        headers:{"Content-Type": "application/json" },
        })
    const respuesta = await peticion.json();
    return respuesta;
    } catch (error) {
        console.log(error);
    }
}
async function deleteDataDoc(obj) {
    try {
        const peticion = await fetch("http://localhost:2929/docentes",{
            method: "DELETE",
            headers: {"Content-Type": "application/json" },
        });
        const respuesta = await peticion.json();
        return respuesta;
    }  catch (error) {
        console.log(error);
    }
}

/*CPU*/

async function postDataCpu(obj) {
    try {
        const peticion = await fetch("http://localhost:2929/cpu", {
            method: "POST",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify(obj)
        });
        const respuesta = await peticion.json();
        return respuesta;
    } catch (error) {
        console.log(error);
    }
}

async function putDataCpu(obj) {
    try {
        const peticion = await fetch("http://localhost:2929/cpu", {
            method: "PATCH",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify(obj)
        });
        const respuesta = await peticion.json();
        return respuesta;
    } catch (error) {
        console.log(error);        
    }
}

async function getDataCpu() {
    try {
        const peticion = await fetch("http://localhost:2929/cpu", {
        method: "GET",
        headers:{"Content-Type": "application/json" },
        })
    const respuesta = await peticion.json();
    return respuesta;
    } catch (error) {
        console.log(error);
    }
}

async function deleteDataCpu(obj) {
    try {
        const peticion = await fetch("http://localhost:2929/cpu", {
            method: "DELETE",
            headers: {"Content-Type": "application/json" },
        });
        const respuesta = await peticion.json();
        return respuesta;
    }  catch (error) {
        console.log(error);
    }
}

/*Solicitudes*/
async function postDataSolicitudes(obj) {
    try {
        const peticion = await fetch("http://localhost:2929/solicitudes", {
            method: "POST",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify(obj)
        });
        const respuesta = await peticion.json();
        return respuesta;
    } catch (error) {
        console.log(error);
    }
}

async function putDataSolicitudes(obj) {
    try {
        const peticion = await fetch(`http://localhost:2929/solicitudes/${obj.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify(obj)
        });
        const respuesta = await peticion.json();
        return respuesta;
    } catch (error) {
        console.log(error);        
    }
}

async function getDataSolicitudes() {
    try {
        const peticion = await fetch("http://localhost:2929/solicitudes", {
        method: "GET",
        headers:{"Content-Type": "application/json" },
        })
    const respuesta = await peticion.json();
    return respuesta;
    } catch (error) {
        console.log(error);
    }
}

async function deleteDataSolicitudes(obj) {
    try {
        const peticion = await fetch(`http://localhost:2929/solicitudes/${obj}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json" },
        });
        const respuesta = await peticion.json();
        return respuesta;
    }  catch (error) {
        console.log(error);
    }
}
export { postDataEst, putDataEst, getDataEst, deleteDataEst,
         postDataDoc, putDataDoc, getDataDoc, deleteDataDoc,
         postDataCpu, putDataCpu, getDataCpu, deleteDataCpu,postDataSolicitudes,putDataSolicitudes,getDataSolicitudes,deleteDataSolicitudes };