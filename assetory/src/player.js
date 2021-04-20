/**
 * class Player();
 */
class Player
{
    /**
     * @constructor
     * @param { object } config
     */
    constructor({ id, name, playerData } = {})
    {
        this.id = id || undefined;
        this.name = name || undefined;
        this.playerData = playerData || undefined;

        this.isLoggedIn = false;
        this.isNewPlayer = undefined;
    }

    /**
     * @type { boolean }
     */
    get loggedIn()
    {
        return this.isLoggedIn
    }

    /**
     * @type { boolean }
     */
    set loggedIn(state)
    {
        this.isLoggedIn = state;
    }

    /**
     * @static
     * @method .getOrCreatePlayer();
     * @description Checks if the player exists, if not, creates it.
     * @param { object } playerData 
     * @returns 
     */
    static getOrCreatePlayer(playerData)
    {
        if(!playerData.name) return false;

        return new Promise((resolve, reject) =>
        {
            fetch(`${ window.apiURL }/player/api/check`,
            {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: { playerName: playerData.name } }),
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
}

/**
 * @exports Player();
 */
export { Player };
