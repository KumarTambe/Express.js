// error handling

import express from 'express'
const app = express();

app.use(express.json());

let dishes = [
    { id: 1, name: "Vada Pav", category: "snacks", price: 20, available: true },
    { id: 2, name: "Masala Chai", category: "beverages", price: 15, available: true }
]

let reviews = [
    { id: 1, dishId: 1, text: "Best on campus", rating: 5 },
    { id: 2, dishId: 1, text: "Bit oily today", rating: 3 },
    { id: 3, dishId: 2, text: "Too sweet", rating: 2 }
]

app.get('/dishes/:dishId/reviews', (req, res) => {
    const dish = dishes.find((d) => d.id == req.params.dishId)
    if (!dish) {
        res.status(404).json({ message: "Dish not found" })
    } else {
        const dishReview = reviews.filter((r) => r.dishId == req.params.dishId)
        if (dishReview.length == 0) {
            res.status(200).json({ count: 0 })
        } else {
            res.status(200).json(dishReview)
        }
    }
})

app.post('/dishes/:dishId/reviews', (req, res) => {
    const dish = dishes.find(d => d.id == req.params.dishId)
    if (!dish) {
        return res.status(404).json({ message: "Dish not found" })
    } else {
        if (!req.body.text || !req.body.rating) {
            res.status(400).json({ message: "Incomplete data" })
        } else {
            const newReview = {
                id: reviews.length + 1,
                dishId: Number(req.params.dishId),
                text: req.body.text,
                rating: req.body.rating
            }
            reviews.push(newReview)
            res.status(201).json({ message: "Done" })
        }
    }
})

app.get('/crash', (req, res) => {
    throw new Error("On purpose")
})

app.get('/asyncboom', async (req, res, next) => {

    await Promise.reject(new Error("Async failure"))

})

app.use((req, res) => {
    res.status(404).json({ message: "Route note found" })
})

app.use((err, req, res, next) => {
    console.log(err.message)
    res.status(500).json({ message: "Something went wrong" })
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});