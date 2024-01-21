export const getSessionStorage = () => {
    const userPharm: {
        user: { available: boolean; user?: {} };
        localPharm: { available: boolean; localPharm?: {} };
    } = { user: { available: false }, localPharm: { available: false } };

    const getuser = sessionStorage.getItem("user");
    if (getuser !== null && getuser !== "undefined") {
        const user = JSON.parse(getuser);
        userPharm.user = { available: true, user };
    } else {
        userPharm.user = { available: false };
    }

    const getlocalPharm = sessionStorage.getItem("activepharmacy");
    
    if (getlocalPharm !== null && getlocalPharm !== "undefined") {
        const localPharm = JSON.parse(getlocalPharm);
        userPharm.localPharm = { available: true, localPharm };
    } else {
        userPharm.localPharm = { available: false };
    }

    return userPharm;
};
