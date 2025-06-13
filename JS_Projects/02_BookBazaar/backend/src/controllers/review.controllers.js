import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { db } from "../db/db.js";

export const addReview = async (req, res) => {
  const { title, message, rating } = req.body;


  const {bookId} = req.params
  const userId = req.user.id;

    if (!bookId) {
    throw new apiError(400, "Book Id is required");
  }


  if (!title || !message || !rating ) {
    throw new apiError(400, "All fields are required");
  }

  try {
    const newReview = await db.review.create({
      data: {
        title,
        message,
        rating,
        user: { connect: { id: userId } },
        book: { connect: { id: bookId } },
      },
    });

    const review = await db.review.findFirst({
      where: { id: newReview.id },
      select: {
        id:true,
        title: true,
        message: true,
        rating: true
      }
    });

    return res.status(200).json(new apiResponse(201, review, "review created successfully"));
  } catch (error) {
    console.error(error)
    new apiError(500, "Internal error while creating response")
  }
};


export const listReview = async(req,res) => {
    const {bookId}= req.params

  if (!bookId) {
    throw new apiError(400, "Book Id is required");
  }

  try {
    const review = await db.review.findMany({
        where:{bookId:bookId},
        select: {
        title: true,
        message: true,
        rating: true
      }
    })
     return res.status(200).json(new apiResponse(200, review, "successfully fetched reviews"));
  } catch (error) {
    console.error(error)
    new apiError(500, "Internal error while fetching reviews")
  }
};

export const deleteReview = async(req,res)=>{
     const {id} = req.params
      if (!id) {
    throw new apiError(400, "Review Id is required");
  }

  try {
const existingReview = await db.review.findUnique({ where: { id } });

if (!existingReview) {
  throw new apiError(404, "Review not found");
}

    const review = await db.review.delete({
        where:{id}
    })
     return res.status(200).json(new apiResponse(200, review, "successfully deleted review"));
  } catch (error) {
    console.error(error)
     throw new apiError(500, "Internal error while deleting review")
  }
};