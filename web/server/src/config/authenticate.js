exports.isAuthenticated = (context) => {
    if ( context.user) {
        return true;
    }
    throw new Error('User is not signed in (or authenticated)!')
}