Comandos Curl para testes
//get de produtos
curl http://localhost:3333/products

//post de produto
curl -X POST http://localhost:3333/product ^
     -H "Content-Type: application/json" ^
     -d "{\"name\": \"Produto Teste\", \"supplier\": \"Fornecedor X\", \"supplier_adress\": \"Rua XPTO\", \"quantity\": 10, \"unit_price\": 29.99}"

//put de produto
curl -X PUT http://localhost:3333/product/1 -H "Content-Type: application/json" -d "{\"name\": \"Produto Atualizado\",
 \"supplier\": \"Fornecedor A\", \"supplier_adress\": \"Rua A, 123\", \"quantity\": 50, \"unit_price\": 20.5}"

//Delete de produto

curl -X DELETE http://localhost:3333/product/1

Comandos SQL

use meu_banco;


CREATE TABLE products (
	id integer primary key auto_increment,
    name varchar(255),
    supplier varchar(255),
        supplier_adress varchar(255),
    quantity integer,
    unit_price float
);

INSERT INTO products (name, supplier, supplier_adress, quantity, unit_price) VALUES
('Notebook Gamer', 'TechSupplier Ltda', 'Rua das Inovações, 123', 10, 4999.99),
('Teclado Mecânico RGB', 'GamerTech Distribuidora', 'Av. dos Periféricos, 456', 25, 349.90),
('Cadeira Ergonômica', 'OfficeConfort', 'Rua do Escritório, 789', 15, 1299.00),
('Monitor 27" 144Hz', 'Display Solutions', 'Av. das Telas, 321', 20, 1899.50);













