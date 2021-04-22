/**
 * @class Session();
 */
class Session
{
    /**
     * @constructor
     */
    constructor()
    {
        this.id = undefined;
        this.socket = undefined;
        this.connected = false;
    }

    async createSession(playerId, projectId)
    {
        return new Promise((resolve, reject) =>
        {
            fetch("http://localhost:3030/connect/session/create",
            {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ playerId, projectId }),
            })
            .then(response => response.json())
            .then(data =>
            {
                if(data.success)
                {
                    resolve(data);
                }
                else
                {
                    resolve({ success: false });
                }
            })
            .catch((error) =>
            {
                reject({ success: false });
            });
        });
    }

    async connectToSocket()
    {
        return new Promise((resolve, reject) =>
        {
            this.socket = new WebSocket(`ws://localhost:3030/connect/`);

            this.socket.onopen = (event) =>
            {
                resolve({ success: true });
            }
        });
    }
}

/**
 * @exports Session();
 */
export { Session };
