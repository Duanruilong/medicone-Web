export default function isNullObject(obj){  
    for(var p in obj){  
        if(obj.hasOwnProperty(p)){  
            return false;  //有自有属性或方法，返回false  
        }  
    }  
    return true;  //没有自有属性或方法，返回true，该对象是空对象  
};