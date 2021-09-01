module.exports = function(platform,username){
    switch(platform){
        case 'linkedin':
            url = 'https://www.linkedin.com/in/' + username;
            return url;
            break;
        case 'twitter':
            url = 'https://twitter.com/'+username;
            return url;
            break;
        case 'instagram':
            url = 'https://www.instagram.com/'+username;
            return url;
            break;
        case 'facebook':
            url = 'https://www.facebook.com/'+username;
            return url;
            break;
    }
};