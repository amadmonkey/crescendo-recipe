import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import Tooltip from '../../components/Tooltip';
import RecipeSrc from '../../img/shopping-list.svg';
import CookingTimeSrc from '../../img/cooking-pot.svg';
import PrepTimeSrc from '../../img/cooking-time.svg';
import ServingsSrc from '../../img/serving-dish.svg';
import Exam from '../../img/exam.svg';
import Plus from '../../img/plus.svg';

import './style.scss';

const Home = () => {

    const baseUrl = "http://localhost:3001";
    const [recipesList, setRecipesList] = useState([]);

    useEffect(() => {
        fetch(`${baseUrl}/recipes`)
            .then(res => res.json())
            .then(
                (result) => {
                    setRecipesList(result);
                },
                (error) => {
                    console.log(error);
                }
            )
    }, [])

    const deletMePles = (index) => {
        var confirmDelete = window.confirm("Are you sure you want to delete?");
        if (confirmDelete == true) {
            fetch(`${baseUrl}/recipes/${recipesList[index].uuid}`, {
                method: "delete",
                headers: { 'Content-Type': 'application/json' },
            }).then(res => res.json())
                .then(
                    (result) => {
                        setRecipesList(recipesList.filter((_, i) => i !== index));
                    },
                    (error) => {
                        console.log(error);
                    }
                )
        }
    }

    return (
        <>
            <div className="recipes-list">
                {
                    recipesList.map((obj, i) => {
                        return (
                            <Card key={`${obj.uuid}-${i}`} index={i} title={<><img style={{ marginRight: "5px" }} src={RecipeSrc} /> {obj.title}</>} showMore link={{ label: "View", to: `/recipe/${obj.uuid}` }} delete={deletMePles}>
                                <div className="recipe-content mini">
                                    <div className="img-container">
                                        <div className="img">
                                            {
                                                obj.images && <img src={baseUrl + obj.images.medium} alt={obj.images.medium} />
                                            }
                                        </div>
                                    </div>
                                    <div className="info-container">
                                        <p className="description">{obj.description}</p>
                                        <div className="mini">
                                            <div className="info-group">
                                                <img src={CookingTimeSrc} alt="" />
                                                <span>Cook Time: </span>
                                                <span>{obj.cookTime}</span>
                                            </div>
                                            <div className="info-group">
                                                <img src={PrepTimeSrc} alt="" />
                                                <span>Prep Time: </span>
                                                <span>{obj.prepTime}</span>
                                            </div>
                                            <div className="info-group">
                                                <img src={ServingsSrc} alt="" />
                                                <span>Servings: </span>
                                                <span>{obj.servings}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        )
                    })
                }
                <Tooltip label="Add new recipe" dark>
                    <Link to='/new-recipe' className="card new"><img src={Plus} /></Link>
                </Tooltip>
            </div>
        </>
    )
}

export default Home
