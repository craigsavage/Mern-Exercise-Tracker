const router = require('express').Router();
const Exercise = require('../models/Exercise');

router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
    Exercise.create({ 
        username: req.body.username,
        description: req.body.description,
        duration: Number(req.body.duration),
        date: Date.parse(req.body.date)
    })
        .then(exercise => res.json('New exercise added!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id')
    .get((req, res) => {
        Exercise.findById( req.params.id )
            .then(exercise => res.json(exercise))
            .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .delete((req, res) => {
        Exercise.deleteOne({ _id: req.params.id })
            .then(deletedExercise => {
                console.log(deletedExercise);
                // return res.redirect('/exercises');
            })
            .catch(err => res.status(400).json(`Error: ${err}`));
    })

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username,
            exercise.description = req.body.description,
            exercise.duration = Number(req.body.duration),
            exercise.date = Date.parse(req.body.date)

            exercise.save()
                .then((updatedExercise) => {
                    console.log(updatedExercise);
                    return res.redirect('/exercises');
                })
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
})


module.exports = router;