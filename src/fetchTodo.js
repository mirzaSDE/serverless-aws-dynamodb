const AWS = require('aws-sdk')

const fetchTodo = async (event) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient()

    const {id} = event.pathParameters
    console.log(id)
    
    let result
    try{
        result = await dynamoDB.get({
            TableName: "TodoTable",
            Key: {id}
        }).promise()
    } catch(err){
        throw err
    }

    return {
        statusCode: 200, 
        body: JSON.stringify(
            {
                success:true, 
                data: result.Item
            }
        )
    }
}

module.exports = {
    handler: fetchTodo
}