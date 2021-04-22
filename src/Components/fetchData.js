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
    fetch(`http://localhost:3001/users/${id}`, {
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
    })
        .then(res => res.json())
        .catch((error) => {
            console.error('Error:', error);
        });
}

export function deleteRequest(id) {
    fetch(`http://localhost:3001/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(() => {
        console.log(`User with ID:${id} deleted successfully`)
    })
        .catch((error) => {
            console.log(error)
        });
}