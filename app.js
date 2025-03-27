require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER ,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE 
});

connection.connect(function (err) {
    if (err) {
        console.error("Erro ao conectar ao MySQL:", err);
        return;
    }
    console.log("Conectado ao MySQL!");
});

const app = express();
const port = 3333;
app.use(express.json()); 

app.get("/", (req, res) => {
    res.send("pão");
});

app.get("/getJson", (req, res) => {
    res.json({ pao: "a" });
});

app.get("/queryString", (req, res) => {
    const response = { name: req.query.name };
    res.json(response);
});

app.get("/products", (req, res) => {

    const sql = "SELECT * FROM products";
    
    connection.query(sql, (err, result) => {
        if (err) {
            console.error("Erro na consulta:", err);
            return res.status(500).json({ error: "Erro ao buscar produto" });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "produto não encontrado" });
        }

        res.json(result);
    });
});


app.post("/product", (req,res)=>{
    const { name, supplier, supplier_adress, quantity, unit_price } = req.body;
    if (!name || !supplier || !supplier_adress || !quantity || !unit_price) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }
    const sql = "INSERT INTO products (name, supplier, supplier_adress, quantity, unit_price) VALUES (?, ?, ?, ?, ?)";
    const values = [name, supplier, supplier_adress, quantity, unit_price];
    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error("Erro ao inserir produto:", err);
            return res.status(500).json({ error: "Erro ao cadastrar produto" });
        }

        res.status(201).json({ message: "Produto cadastrado com sucesso", id: result.insertId });
    });
}
)


app.put("/product/:id", (req, res) => {
    const { id } = req.params;
    const { name, supplier, supplier_adress, quantity, unit_price } = req.body;

    if (!name || !supplier || !supplier_adress || !quantity || !unit_price) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const sql = `UPDATE products SET name = ?, supplier = ?, supplier_adress = ?, quantity = ?, unit_price = ? WHERE id = ?`;
    const values = [name, supplier, supplier_adress, quantity, unit_price, id];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error("Erro ao atualizar produto:", err);
            return res.status(500).json({ error: "Erro ao atualizar produto" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Produto não encontrado" });
        }

        res.status(200).json({ message: "Produto atualizado com sucesso" });
    });
});

app.delete("/product/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM products WHERE id = ?";
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Erro ao deletar produto:", err);
            return res.status(500).json({ error: "Erro ao deletar produto" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Produto não encontrado" });
        }

        res.status(200).json({ message: "Produto deletado com sucesso" });
    });
});


app.all('*', (req, res, next) => {
    next(createError(501, "Método não implementado"));
});

app.listen(port, () => console.log(`App rodando na porta ${port} >>`));
