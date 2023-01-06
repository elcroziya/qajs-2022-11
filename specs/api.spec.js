import axios from "axios";
import { test } from "@jest/globals";
import expect from "expect";
jest;

/*test('GET request', async () => {
    const config = {
        method: 'get',
        url: 'https://dummyjson.com/products/1',
    }
    const resp = await axios(config);
    console.log(resp.data);
    expect(resp.data.title).toEqual('iPhone 9');
}
)
test.skip('POST request', async () => {
    const config = {
        method: 'post',
        url: 'https://dummyjson.com/products/add',
        data: {
            "title": "test api",
            price: 9877
        }
    }
    const resp = await axios(config);
    console.log(resp.data);
    expect(resp.status).toEqual(200);
    expect(resp.data.title).toEqual('test api');
}
)

test('check producnt with AUTH', async () => {
    const config = {
        method: 'get',
        url: 'https://dummyjson.com/auth/products',
        headers: {},
    }
    const resp = await axios(config);
    console.log(resp.data);
    //expect(resp.status).toEqual(200);
    //expect(resp.data.title).toEqual('test api');
}
)*/


test('new user with Login already in use', async () => {
    const config = {
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/User',
        data: {
            "userName": "elcroziya",
            "password": "String@123",

        },

    }
    try {
        const response = await axios(config);
    }
    catch (error) {
        console.log(error.response.data.message);
        console.log(error.response.status);
        expect(error.response.status).toEqual(406);
        expect(error.response.data.message).toEqual("User exists!");
    }
});

test('new user with wrong password', async () => {
    const config = {
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/User',
        data: {
            "userName": "elcroziya",
            "password": "String123",
        },
    };
    try {
        const response = await axios(config);
    }
    catch (error) {
        console.log(error.response.data.message);
        console.log(error.response.status);
        expect(error.response.status).toEqual(400);
        expect(error.response.data.message).toEqual("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.");
    }
});

test('new user created', async () => {
    const config = {
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/User',
        data: {
            "userName": "elcroziya.1.23qw.e",
            "password": "String@123",
        },
    }
    try {
        const response = await axios(config);
    }
    catch (error) {
        console.log(error.response);
        console.log(error.response.userId);
        expect(error.response.status).toEqual(200);
    }
});

test('token is generated', async () => {
    const config = {
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/GenerateToken',
        data: {
            "userName": "elcroziya.1.23qw.e",
            "password": "String@123",
        },
    }

    const response = await axios(config);
    console.log(response.data);
    expect(response.status).toEqual(200);
});

test('token is not generated (wrong credentials)', async () => {
    const config = {
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/GenerateToken',
        data: {
            "userName": "elcroziya.1.23qw.e",
            "password": "String@12323",
        },
    }

    const response = await axios(config);
    console.log(response.data.result);
    expect(response.data.result).toEqual('User authorization failed.');
});
