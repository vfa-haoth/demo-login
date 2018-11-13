export default class BaseControllers {

    fieldValidation (fieldName, value) {
        let result = false;

        switch(fieldName){
            case 'username' || 'password' :
                result = (value.length >= 6 ? true : false)
                break;
            case 'tel' : 
                result = (value.length >= 10 ? true : false)
                break;
            case 'age' : 
                result = (value >= 13 ? true : false)
                break;
            case 'email' :
                result = (value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? true : false)
                break;
            default :
                break;
        }

        return result;
    }
}