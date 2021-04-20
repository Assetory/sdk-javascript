export const getApiURL = (devmode, local = false) =>
{
    const mode = devmode ? "develop" : "production";

    if(mode === "develop")
    {
        if(local)
        {
            return "http://localhost:3033";
        }
        else
        {
            /**
             * @todo Change app-platform url to develop.assetory.net
             */
            return "https://assetory-develop-vsz7g.ondigitalocean.app"; // develop.assetory.net
        }
    }
    else if(mode === "production")
    {
        return "https://assetory.net";
    }
}