import { useEffect, useState } from "react";
import firebase from "../../config/firebase";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import Loader from "../Loader/Loader";

const fireStore = firebase.collection("meals");

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [httpError, sethttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      let payload = [];
      fireStore.onSnapshot((snapshot) => {
        if(snapshot.empty){
          throw new Error('Something went wrong.');
        }

        snapshot.forEach((doc) => {
          payload.push(doc.data());
        });
        setMeals(payload);
        setLoading(false);
      },
      err => new Error(err));
    };

      fetchMeals().catch(err => {
        setLoading(true);
        sethttpError(err.message);
      });

   
  }, []);

  const mealsList = meals.map((meal, key) => (
    <MealItem
      key={key}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  if(loading){
    return <Loader  className={classes.MealsLoading}  message={'Fetching..'}/>
  }

  if(httpError){
    return <Loader className={classes.MealsError} message={httpError}/>
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
