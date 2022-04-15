const AWS = require('aws-sdk')

const fetchTodos = async (event) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient()
    
    let documents
    try{
        documents = await dynamoDB.scan({TableName: "TodoTable"}).promise()
    } catch(err){
        throw err
    }
    return {
        statusCode: 200, 
        body: JSON.stringify(
            {
                success: true, 
                data: documents.Items
            }
        )
    }
}

module.exports = {
    handler: fetchTodos
}