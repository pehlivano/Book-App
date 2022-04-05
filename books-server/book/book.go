package book

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"

	"github.com/pehlivano/books/database"
)

type Book struct {
	gorm.Model
	Title string `json:"title"`
	Author string `json:"author"`
	PageCount	int `json:"page_count"`
}

func GetAllBooks(c *fiber.Ctx) error {
	db := database.DbConnection
	var books []Book
	db.Find(&books)
	return c.JSON(books)
}

func GetBook(c *fiber.Ctx) error{
	db := database.DbConnection
	var book Book
	db.Find(&book, c.Params("id"))
	return c.JSON(book)
}

func AddBook(c *fiber.Ctx) error {
	db := database.DbConnection
	
	book := new(Book)
	if err := c.BodyParser(book); err != nil {
		c.Status(503).SendString(err.Error())
	}
	db.Create(&book)
	return c.JSON(book)
}

func DeleteBook(c *fiber.Ctx) error{
	db := database.DbConnection
	var book Book
	db.Delete(&book, c.Params("id"))
	return c.JSON(book)
}

