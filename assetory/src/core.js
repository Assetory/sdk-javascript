import { Player, Connection, Project } from "./../index.js";
import { getApiURL } from './utils/index.js';

/**
 * @class Core();
 */
class Core
{
    /**
     * @constructor
     * @param { object } config 
     */
    constructor({ projectId, key, secret, token, devmode, debug } = {})
    {
        this.key = key || undefined;
        this.projectId = projectId || undefined;
        this.secret = secret || undefined;
        this.token = token || undefined;
        this.devmode = devmode || false;
        this.debug = debug || false;
        
        this.config();

        this.connection =  new Connection(this.devmode);
        this.player = new Player();
        this.project = new Project({ projectId: this.projectId });
        this.sessions = [];
    }

    /**
     * @method .config();
     * @description
     */
    config()
    {
        window.apiURL = getApiURL(this.devmode);
    }

    /**
     * @method .init();
     * @description
     * @param { object } config 
     */
    init({ id, key, secret, token, devmode, debug } = {})
    {
        this.projectId = id || this.id;
        this.key = key || this.key;
        this.secret = secret || this.secret;
        this.token = token || this.token;
        this.devmode = devmode || this.devmode;
        this.debug = debug || this.debug;

        this.config();
    }

    /**
     * @method .connect();
     * @description
     * @param { function } callback 
     * @returns { object }
     */
    async connect(callback)
    {
        if(!this.projectId) return false;

        const connection = await this.connection.createConnection();

        this.connection.online = connection.success;

        if(this.connection.online === true)
        {
            if (callback)
            {
                callback(connection);
            }
            else
            {
                return connection;
            }
        }
        else
        {
            throw Error("connection failed");
        }
    }

    /**
     * @method .login();
     * @description
     * @param { object} playerData 
     * @param { function } callback 
     * @callback
     * @returns { object }
     */
    async login(playerData, callback)
    {
        if(!playerData) return false;
        if(!this.connection.isOnline) return false;

        const player = await Player.getOrCreatePlayer(playerData);

        if(player.success)
        {
            this.player.id = player.data.playerId,
            this.player.name = player.data.name,
            this.player.playerData = player.data.playerData
            this.player.loggedIn = true;
            this.player.isNewPlayer = player.newlyCreated || false;

            if(callback)
            {
                callback({ success: player.success, player: this.player});
            }
            else
            {
                return { success: player.success, player: this.player};
            }
        }
        else
        {
            throw Error("could not create player");
        }
    }

    /**
     * @method .gather();
     * @description 
     * @param { function } callback 
     * @callback
     * @returns { object }
     */
    async gather(callback)
    {
        if(!this.player.isLoggedIn) return false;

        this.project.playerId = this.player.id;
        const project = await this.project.getProject();

        if(project.success)
        {
            this.project.title = project.data.title;

            if(callback)
            {
                callback({ success: project.success, project });
            }
            else
            {
                return { success: project.success, project };
            }
        }
        else
        {
            throw Error("could not validate project");
        }
    }

    /**
     * @method .validate();
     * @description 
     * @param { function } callback 
     * @callback
     * @returns { object }
     */
    async validate(callback)
    {
        const players = await this.project.checkPlayerState();

        if(players.success)
        {
            this.project.players = players.data;

            if(callback)
            {
                callback({ success: players.success, players });
            }
            else
            {
                return { success: players.success, players };
            }
        }
    }
}

export { Core };
