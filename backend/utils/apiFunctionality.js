class APIFunctionality {
    constructor(query, queryStr) {
        this.query = query,
            this.queryStr = queryStr
    }

    search() {
        const keyWord = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        } : {}

        this.query=this.query.find({...keyWord});
        return this
    }

    filter(){
        const queryCopy={...this.queryStr}
        const removeFields=["keyword","page","limit"];
        removeFields.forEach(key=>delete queryCopy[key])
    }
}
export default APIFunctionality