//variants
const express = require('express')
const uuid = require('uuid')
const app = express()
app.use(express.json())
const port = 3000
const users = []

const checkId = (request, response, next) => {
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: 'user not found' })
    }
    request.userIndex = index
    request.userid = id
    
    
    next()
}

//applications
app.get('/users', (request, response) => {
    console.log(request.method)
    console.log(request.url)
    return response.json(users)
})

app.post('/users', (request, response) => {
    const { order, clientName, price, status } = request.body

    const user = { id: uuid.v4(), order, clientName, price, status }

    users.push(user)
    console.log(request.method)
    console.log(request.url)
    return response.status(201).json(user)
})

app.put('/users/:id',checkId, (request, response) => {

    const { order, clientName, price, status } = request.body
    const index = request.userIndex 
    const id = request.userid
    const updateUser = { id, order, clientName, price, status }
   



    users[index] = updateUser
    console.log(request.method)
    console.log(request.url)
    return response.json(updateUser)
})

app.delete('/users/:id',checkId,(request,response) => {
    const index = request.userIndex

    users.splice(index,1) 
    console.log(request.method)
    console.log(request.url)
    return response.status(204).json()
   
})



app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})