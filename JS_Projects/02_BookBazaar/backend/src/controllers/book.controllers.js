import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { db } from "../db/db.js";

export const addBook = async (req, res) => {
  const  userId  = req.user.id;

  if (!userId) {
   throw new Error("User ID not found");
}

  //get data
  const {
    title,
    description,
    language,
    author,
    price,
    publishedOn,
    page,
    genre,
    isbn,
  } = req.body;

  // validate data
  if (!title || !language || !price || !genre) {
    throw new apiError(400, "All fields are required");
  }
  try {
    //add book
    const book = await db.book.create({
      data: {
        title,
        description,
        language,
        author,
        price,
        publishedOn,
        page,
        genre,
        isbn,
        owner: { connect: { id: userId } },
      },
    });

    return res
      .status(200)
      .json(new apiResponse(200, book, "Book added successfully."));
  } catch (error) {
    console.error(error);
    throw new apiError(500, "Something went wrong while adding the book");
  }
};

export const allBooks = async (req, res) => {
  try {
    const books = await db.book.findMany();

    if (!books) {
      return next(new apiError(404, "No book found"));
    }

    return res
      .status(200)
      .json(new apiResponse(200, books, "All books found successfully"));
  } catch (error) {
    console.error(error);
    throw new apiError(500, "Internal error while finding books");
  }
};

export const bookDetails = async (req, res) => {
  const { bookId } = req.params;
  if(!bookId){
    throw new apiError(400,"Book id is required")
  }
  try {
    const book = await db.book.findFirst({
      where: { id: bookId },
      select: {
        title:true,
        description:true,
        language:true,
        author:true,
        price:true,
        publishedOn:true,
        page:true,
        genre:true,
        isbn:true,
      },
    });

    if (!book) {
      return next(new apiError(400, "No details found for this book"));
    }

    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          book,
          "All details found successfully for this book"
        )
      );
  } catch (error) {
    console.error(error);
    throw new apiError(500, "Internal error while finding book details");
  }
};

export const updateBook = async (req, res) => {
  const userId  = req.user.id
  const { bookId } = req.params;
    if(!bookId){
    throw new apiError(400,"Book id is required")
  }

    const {
    title,
    description,
    language,
    author,
    price,
    publishedOn,
    page,
    genre,
    isbn,
    bookCover
  } = req.body;

  try {
    let book = await db.book.findFirst({
      where: { id: bookId },
    });
    

    if (!book) {
      return next(new apiError(404, "No book found"));
    }

    book = await db.book.update({
      where:{id :bookId},
     data: {
        title,
        description,
        language,
        author,
        price,
        publishedOn,
        page,
        genre,
        isbn,
        bookCover,
        owner :{connect: {id: userId} }
      },
    });

    return res
      .status(200)
      .json(new apiResponse(200, book, "Book updated successfully"));
  } catch (error) {
    console.error(error);
    throw new apiError(500, "Internal error while updating book");
  }
};

export const deleteBook = async (req, res) => {
  const { bookId } = req.params;
     if(!bookId){
    throw new apiError(400,"Book id is required")
  }

  try {
    const book = await db.book.delete({
      where: { id:bookId },
      select:{
        title:true,
        id:true
      }
    });

    return res
      .status(200)
      .json(new apiResponse(200, book, "Book deleted successfully"));
  } catch (error) {
    console.error(error);
    throw new apiError(500, "Internal error while deleting book");
  }
};
