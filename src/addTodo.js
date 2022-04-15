const AWS = require('aws-sdk')
const {v4} = require('uuid')

const addTodo = async (event) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient()

    const {todo} = JSON.parse(event.body)

    const id = v4()
    const createdAt = new Date().toISOString()
    const status = false

    const newTodo = {
        id,
        todo, 
        createdAt,
        completed: status
    }

    await dynamoDB.put({
        TableName: "TodoTable",
        Item: newTodo
    }).promise()

    // debugging purposes log in cloud watch
    console.log(`Task with id: ${id} created successfully at ${createdAt}!`)

    return {
        statusCode: 200, 
        body: JSON.stringify(
            {
                message: "Task inserted to the TodoTable",
                input: newTodo
            }, 
        )
    }
}

module.exports = {
    handler: addTodo
}