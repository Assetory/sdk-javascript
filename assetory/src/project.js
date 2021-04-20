/**
 * @class Project();
 */
class Project
{
    /**
     * @constructor
     * @param { object } config 
     */
    constructor({ projectId })
    {
        this.projectId = projectId || undefined;
        this.playerId = undefined;
        this.title = undefined;
        this.players = undefined;
    }

    /**
     * @method .getProject();
     * @description Gets the project data if the connection was successful.
     * @returns { Promise } Promise object representing the success state and data
     */
    getProject()
    {
        return new Promise((resolve, reject) =>
        {
            
            fetch(`${ window.apiURL }/project/api/get/${ this.projectId }`)
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
    };

    /**+
     * @method .checkPlayerState();
     * @description Checks if the player is part of the project.
     * @returns { Promise } Promise object representing the success state and data
     */
    checkPlayerState()
    {
        return new Promise((resolve, reject) =>
        {
            
            fetch(`${ window.apiURL }/project/api/validate`,
            {
                method: 'POST',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: {
                        projectId: this.projectId,
                        playerId: this.playerId
                    }
                }),
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
 * @exports Project();
 */
export { Project };
