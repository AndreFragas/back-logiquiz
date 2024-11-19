export abstract class BaseView{
    removeNull(){
        Object.keys(this).map((key) => {
            if(!this[key]){
                delete this[key]
            }
        })
    }
}