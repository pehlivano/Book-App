package main

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"

	"github.com/pehlivano/books/book"
	"github.com/pehlivano/books/database"
)

func initDatabase() {
	var err error
	dsn := "root:password@tcp(127.0.0.1:3306)/bookdb?charset=utf8&parseTime=True&loc=Local"
	database.DbConnection, err = gorm.Open(mysql.Open(dsn),  &gorm.Config{})
	if err != nil {
		panic("Failed to connect database")
	}
	fmt.Println("Database connected")

	database.DbConnection.AutoMigrate(&book.Book{})
}

func setupRoutes(app *fiber.App) {
	app.Get("/books", book.GetAllBooks)
	app.Get("/books/:id", book.GetBook)
	app.Post("/books", book.AddBook)
	app.Delete("/books/:id", book.DeleteBook)
}

func main() {
  app := fiber.New()
	initDatabase()
	//defer database.DbConnection.Close()

	app.Use(cors.New())
	
	setupRoutes(app)

	app.Listen(":3010")
}
