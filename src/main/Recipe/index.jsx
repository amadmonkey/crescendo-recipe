import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import RecipeSrc from '../../img/shopping-list.svg';
import CookingTimeSrc from '../../img/cooking-pot.svg';
import PrepTimeSrc from '../../img/cooking-time.svg';
import ServingsSrc from '../../img/serving-dish.svg';
import IngredientsSrc from '../../img/ingredients.svg';
import InstructionsSrc from '../../img/instructions.svg';

const Recipe = (props) => {
    let p = props;
    const baseUrl = "http://localhost:3001";
    const [recipe, setRecipe] = useState([]);
    const myFetch = (url) => fetch(url).then(res => res.json()).then(result => result, error => console.log(error));

    useEffect(() => {
        myFetch(`${baseUrl}/specials`).then(s => {
            myFetch(`${baseUrl}/recipes/${p.match.params.id}`).then(recipe => {
                recipe.ingredients.map(obj => obj.special = s.filter(sp => sp.ingredientId === obj.uuid)[0])
                setRecipe(recipe);
            })
        })
    }, [])

    return recipe && (
        <Card title={<><img style={{ marginRight: "5px" }} src={RecipeSrc} /> {recipe.title}</>} link={{ label: "Update", to: `/update/${p.match.params.id}` }}>
            <div className="recipe-content">
                <div className="img-container">
                    <div className="img">
                        {recipe.images && <img src={baseUrl + recipe.images.medium} alt={recipe.images.medium} />}
                    </div>
                </div>
                <div className="info-container">
                    <p className="description">{recipe.description}</p>
                    <div>
                        <div className="info-group">
                            <img src={CookingTimeSrc} alt="" />
                            <span>Cook Time: </span>
                            <span>{recipe.cookTime}</span>
                        </div>
                        <div className="info-group">
                            <img src={PrepTimeSrc} alt="" />
                            <span>Prep Time: </span>
                            <span>{recipe.prepTime}</span>
                        </div>
                        <div className="info-group">
                            <img src={ServingsSrc} alt="" />
                            <span>Servings: </span>
                            <span>{recipe.servings}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", padding: "20px", boxSizing: "border-box", fontSize: "20px", justifyContent: "space-evenly" }}>
                <div className="section">
                    <h1><img src={IngredientsSrc} /> Ingredients</h1>
                    <ul>
                        {recipe.ingredients && recipe.ingredients.map((obj, i) => {
                            return (
                                <li key={i}>
                                    {`${obj.amount && obj.amount} ${obj.measurement && obj.measurement} ${obj.name && obj.name}`}
                                    {
                                        obj.special && (
                                            <div className="special-details">
                                                <div className={obj.special.type}>{obj.special.type.toUpperCase()}</div>
                                                <h1>{obj.special.title}</h1>
                                                <p>{obj.special.text}</p>
                                            </div>
                                        )
                                    }
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="section">
                    <h1><img src={InstructionsSrc} /> Directions</h1>
                    <ul>{recipe.directions && recipe.directions.map((obj, i) => <li key={i}>{obj.instructions} {obj.optional ? '(OPTIONAL)' : ''}</li>)}</ul>
                </div>
            </div>
        </Card>
    )
}

export default Recipe
