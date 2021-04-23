export function getUsersList() {
    let users = fetch('http://localhost:3001/users')
        .then((res) => {
            if (!res.ok) {
                throw new Error(`${res.status}`);
            } else {
                return res.json();
            }
        }).then(data => {
            return data;
        });
    return users
}

export function putRequest(id, newData) {
    let newUser = fetch(`http://localhost:3001/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
    }).then((res) => {
        if (!res.ok) {
            throw new Error(`${res.status}`);
        } else {

            return res
        }
    }).then(res => res.json())
        .catch((error) => {
            console.error('Error:', error);
        });
    return newUser;
}

export function postRequest(user) {
    let newUser = fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(res => { return res })
        .catch((error) => {
            console.error('Error:', error);
        });
        return newUser
}

export function deleteRequest(id) {
    let deleted = fetch(`http://localhost:3001/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => {
        console.log(`User with ID:${id} deleted successfully`)
    }).catch((error) => {
        console.log(error)
    });
    return deleted;
}