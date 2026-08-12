const express = require("express");
const app = express();

app.use(express.json());

let dishes = [
    { id: "1", name: "Pizza" },
    { id: "2", name: "Burger" }
];

let reviews = [
    { id: "1", dishId: "1", text: "Really good!", rating: 5 },
    { id: "2", dishId: "1", text: "Pretty decent", rating: 4 }
];

app.get("/dishes/:dishId/reviews", (req, res) => {
    const { dishId } = req.params;
    const dish = dishes.find(dish => dish.id === dishId);
    if (!dish) {
        return res.status(404).json({
            message: "Dish not found"
        });
    }
    const dishReviews = reviews.filter(
        review => review.dishId === dishId
    );

    return res.status(200).json({
        count: dishReviews.length,
        reviews: dishReviews
    });
});

app.post("/dishes/:dishId/reviews", (req, res) => {
    const { dishId } = req.params;
    const { text, rating } = req.body;
    const dish = dishes.find(dish => dish.id === dishId);
    if (!dish) {
        return res.status(404).json({
            message: "Dish not found"
        });
    }
    if (!text || rating === undefined) {
        return res.status(400).json({
            message: "text and rating are required"
        });
    }
    const newReview = {
        id: String(reviews.length + 1),
        dishId: dishId,
        text,
        rating
    };
    reviews.push(newReview);
    return res.status(201).json(newReview);
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});