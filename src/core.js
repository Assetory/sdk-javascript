/**
 * @class Assetory();
 */
class Assetory
{
    /**
     * @constructor
     * @param { object } config 
     */
    constructor({ key, secret, token, devmode, debug } = {})
    {
        /*
            onMessage:<ASYNC MESSAGE HANDLER>
        */
        this.key = key || undefined;
        this.secret = secret || undefined;
        this.token = token || undefined;
        this.debug = debug || false;
        this.devmode = devmode || false;
        this.apiurl = this.devmode ? "assetory-develop-vsz7g.ondigitalocean.app" : "assetory.net";
        this.socket = new WebSocket(`ws://${this.apiurl}/connect/`);
        this.loggedIn = false;
    }

    init({} = {})
    {
        
    }

    // get player data
    getPlayer(playerName)
    {
        return new Promise((resolve, reject) =>
        {
            fetch('http://localhost:3033/player/api/check', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: { playerName } }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                resolve(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    };

    // get project data
    getProject(interval)
    {
        return new Promise((resolve, reject) =>
        {
            setTimeout(function ()
            {
                console.log("get project");

                resolve("done");
            }, interval);
        });
    };

    // validate data
    getAnswer(interval)
    {
        return new Promise((resolve, reject) =>
        {
            setTimeout(function ()
            {
                resolve({ success: true });
            }, interval);
        });
    };

    /**
     * @async
     * @method .login();
     * @description
     * @callback
     * @param { object } callback
     */
    async login(playerName, callback)
    {
        const player = await this.getPlayer(playerName);
        const project = await this.getProject(3000);
        const answer = await this.getAnswer(3000);

        this.loggedIn = answer.success;

        this.socket.onopen = (event) =>
        {
            console.log("connect to socket...");
        }

        callback({ player, project, answer });
    }

    /**
     * @async
     * @method .save();
     * @description
     * @param { object } callback 
     */
    async save(callback)
    {
        callback({ success: true });
    }

    /**
     * @async
     * @method .logout();
     * @description
     * @callback
     * @param { object } callback 
     */
    async logout(callback)
    {
        callback({ success: true });
    }

    /**
     * @method .update();
     * @description
     * @param { object } data 
     * @callback
     * @param { object } callback 
     */
    update(data, callback = undefined)
    {
        this.socket.send(JSON.stringify(data));

        this.socket.onmessage = (event) =>
        {
            callback(JSON.parse(event.data));
        }
    }
}

/*
// assetory-develop-vsz7g.ondigitalocean.app/project/api/get/607734216d6e254974db7139

fetch('https://example.com/profile', {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: "include",
    mode: 'cors',
    body: JSON.stringify({ username: 'example' }),
}).then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
*/
