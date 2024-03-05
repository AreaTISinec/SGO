import axios from 'axios'



export const login = async (username, password ) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const body = JSON.stringify({ username, password });
    
    try {
        const res = await axios.post('https://sgo-django.azurewebsites.net/api/accounts/token/', body, config);

        if(res.status === 200){
            const token = res.data.token;

            document.cookie = `token=${token}; max-age=${60*60}; path=/`
        }
    
    }catch(err ){
        console.error(err)
    }
} 

export const signup = async ({ username, email, password, re_password, rol })    => {
    const config = {
        headers: {
            'Content-Type': 'application/json',

        }
    }

    const body = JSON.stringify({ username, email, password, re_password, rol });

    try {
        const res = await axios.post('https://sgo-django.azurewebsites.net/api/accounts/registrar/', body, config);

        //dispatch(login(email, password));
    }catch(err ){
        console.error(err)
    }
} 

export const logout = async () => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'token': ''
        }
    }
    const body = ''
    try {
        const res = await axios.post('https://sgo-django.azurewebsites.net/api/accounts/logout/', body, config);

        if (res.status === 200) {
            // Eliminar la cookie del navegador
            document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }

        //dispatch(login(email, password));
    }catch(err ){
        console.error(err)
    }
}
