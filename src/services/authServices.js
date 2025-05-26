export const getLoggedInUser = () => {
    if (window !== undefined) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            return JSON.parse(storedUser);
        }
    }
    return null;
}

