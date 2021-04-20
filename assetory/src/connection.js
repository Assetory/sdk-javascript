/**
 * @class Conection();
 */
class Connection
{
    /**
     * @constructor
     * @param { boolean } devmode 
     */
    constructor(devmode)
    {
        this.devmode = devmode || false;
        this.isOnline = false;
    }
    
    /**
     * @type { boolean }
     */
    get online()
    {
        return this.isOnline
    }

    /**
     * @type { boolean }
     */
    set online(state)
    {
        this.isOnline = state;
    }

    /**
     * @method .createConnection();
     * @description creates a connection to all sdk-relevant services and returns their success state.
     * @returns { Promise } Promise object representing the success state and data
     */
    createConnection()
    {
        const urls = [
            
            `${ window.apiURL }/player/api/test`,
            `${ window.apiURL }/project/api/test`,
        ];

        return Promise.all(urls.map(url =>
            fetch(url).then(resp => resp.json())
        )).then(data => {
            return data.map(dt =>
            {
                return dt.success;
            });
        }).then(proof =>
        {
           return { success:  proof.every(data => data === true) };
        }).catch(err => {
            new Error(err);
        })
    }
}

/**
 * @exports Connection();
 */
export { Connection };
