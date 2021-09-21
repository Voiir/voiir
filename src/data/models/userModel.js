export default class UserModel{
    name;
    email;
    access_token;
    imageUrl;

    userModel(name,email,access_token,imageUrl){
       this.name=name;
       this.email=email;
       this.access_token=access_token;
       this.imageUrl=imageUrl;
    }

    static createUserModel(user){
        return new UserModel(
            user.profileObj.name,
            user.profileObj.email,
            user.tokenObj.access_token,
            user.profileObj.imageUrl,
        );
    }
}