import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { db } from "../db/db.js";

export const order = async (req, res) => {
  const userId = req.user.id;

  const { bookId, quantity, status } = req.body;

  if (!bookId || !quantity || !status) {
    return next(new apiError(400, "All fields are required "));
  }
  try {
    const book = await db.book.findUnique({ where: { id: bookId } });
    if (!book) {
      return next(new apiError(404, "Book not found"));
    }

    const totalPrice = book.price * quantity;

    const newOrder = await db.order.create({
      data: {
        quantity,
        status,
        totalPrice,
        user: { connect: { id: userId } },
        book: { connect: { id: bookId } },
      },
    });

    const order = await db.order.findFirst({
      where: { id: newOrder.id },
      select: {
        status: true,
        totalPrice: true,
        book: {
          select: {
            id: true,
            title: true,
            price: true,
          },
        },
      },
    });

    res
      .status(200)
      .json(new apiResponse(200, order, "Order placed successfully"));
  } catch (error) {
    console.error(error);
    throw new apiError(500, "Internal error while placing order");
  }
};

export const listOrder = async (req, res) => {
  const userId = req.user.id;
  try {
    const order = await db.order.findFirst({
      where: { userId: userId },
      select: {
        id: true,
        quantity: true,
        status: true,
        totalPrice: true,
        book: {
          select: {
            id: true,
            title: true,
            price: true,
          },
        },
      },
    });

    res
      .status(200)
      .json(new apiResponse(200, order, "Order listed successfully"));
  } catch (error) {
    console.error(error);
    throw new apiError(500, "Internal error while listing order");
  }
};

export const orderDetails = async (req, res) => {
  const userId = req.user.id;
  const { orderId } = req.params;
  if (!orderId) {
    return next(new apiError(400, "Order id is required"));
  }
  try {
    const order = await db.order.findFirst({
      where: { id: orderId },
      select: {
        id: true,
        quantity: true,
        status: true,
        totalPrice: true,
        book: {
          select: {
            id: true,
            title: true,
            price: true,
          },
        },
      },
    });
    if (!order) {
      return next(new apiError(404, "Order not found"));
    }

    res
      .status(200)
      .json(new apiResponse(200, order, "Successfully fetched order detail"));
  } catch (error) {
    console.error(error);
    throw new apiError(500, "Internal error while fetching order details");
  }
};

export const deleteOrder = async (req, res) => {
  const userId = req.user.id;
  const {orderId} = req.params;
  if (!orderId) {
    throw new apiError(400, "order id is required");
  }
  try {
    const existingOrder = await db.order.findFirst({
      where: {
        id: orderId,
        userId: userId, 
      },
    });

    if (!existingOrder) {
      return new apiError(404, "Order not found or unauthorized");
    }

     const deletedOrder = await db.order.delete({
      where: { id: orderId },
    });
    res
      .status(200)
      .json(new apiResponse(200, deletedOrder, "Successfully deleted the order."));

  } catch (error) {
    console.error(error);
    throw new apiError(500, "Internal error while deleting order.");
  }
};
