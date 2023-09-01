import express  from  'express';

const app = express();

const db= {
    todos: []
};

app.use(express.json());

app.get('/todos', (req, res) =>{
    res.status(200).json({
        status: 'success',
        data:{
            todos: db.todos,
        },
    });
});

app.post('/todo', (req, res) => {
    const { text } = req.body;

    const todo = {
        id: db.todos.length + 1,
        text,
    };
    db.todos.push(todo)

    res.status(201).json({
        data: {
            message: 'todos created successfully',
             todo,
        }

    })
});

 app.delete('/todo/:id', (req, res) => {
    const { id } = req.params;

    const todo = db.todos.find((todo) => todo.id == Number(id))
        
    if (!todo) {
        res.status(404).json({
            data: {
                message:'Todo not found',
            },
        });
    }

    const index = db.todos.indexOf(todo);

    db.todos.splice(index, 1);
    res.status(200).json({
        data: {
            message: 'Todo deleted Successfully',
        },
    });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});