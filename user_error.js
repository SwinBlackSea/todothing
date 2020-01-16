//more infomation click https://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript
//######### es5 #############
//js error的几种类型：Error、TypeError、SyntaxError、 EvalError、ReferenceError、RangeError、URLError
//Error三种field：name、message、stack
function UserError(message){
    this.message = message||'error message'
    this.name = 'UserError'
    this.stack = (new Error()).stack
}
UserError.prototype=new Error()
UserError.prototype.constructor=UserError
//you alse can define name by this
UserError.prototype.name  = 'UserError'
//you also can define other field by this
UserError.prototype.selfField = 'self_field'
//test
function catchError(){
    try{
        throw new UserError('this is a UserError')
    }catch(e){
        console.log('e.stack:',e.stack,'e.name:',e.name,'e.selfField:',e.selfField)
    }
}
//######### es6 #############
class UserError extends Error{
    constructor(message){
        super(message)
        this.name = 'UserError'
    }
}
