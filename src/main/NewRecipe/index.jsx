import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useHistory, Link } from 'react-router-dom';
import InputWrapper from '../../components/InputWrapper';
import Card from '../../components/Card';
import Input from '../../components/Input';

const NewRecipe = () => {

    const baseUrl = "http://localhost:3001";
    const history = useHistory();
    const iName = `ingredients`;
    const dName = `directions`;
    const [toFocus, setToFocus] = useState(null);
    const newDirection = { instructions: "new-direction-instruction", optional: "new-direction-optional" }
    const newIngredient = { name: "new-ingredient-name", measurement: "new-ingredient-measurement", amount: "new-ingredient-amount" };
    const { register, handleSubmit, errors, control, setValue, getValues, watch } = useForm({ mode: 'onChange' });
    const { fields: ingredientFields, append: ingredientAppend, remove: ingredientRemove } = useFieldArray({ name: iName, control: control });
    const { fields: directionFields, append: directionAppend, remove: directionRemove } = useFieldArray({ name: dName, control: control });

    const onSubmit = (data, e) => {
        e.preventDefault();
        data.postDate = new Date();
        data.editDate = new Date();
        delete data[`new-direction-instruction`];
        delete data[`new-direction-optional`];
        delete data[`new-ingredient-amount`];
        delete data[`new-ingredient-measurement`];
        delete data[`new-ingredient-name`];
        data.ingredients.map(obj => obj.amount = parseFloat(obj.amount));
        data = {
            ...data,
            cookTime: parseFloat(data.cookTime),
            prepTime: parseFloat(data.prepTime),
            servings: parseFloat(data.servings)
        }
        data.images = { full: "", medium: "", small: "" }
        console.log(data);

        fetch(`${baseUrl}/recipes`, {
            method: 'post',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data)
        }).then((response) => {
            console.log(response);
            history.push('/');
        }, (error) => {
            console.log(error);
        })
    };

    let form = {
        title: {
            attr: {
                name: 'title',
                className: '',
            },
            ref: register({
                required: true,
                maxLength: 50
            }),
            errors: errors.title
        },
        description: {
            attr: {
                name: 'description',
                className: '',
            },
            ref: register({
                required: true,
                maxLength: 50
            }),
            errors: errors.description
        },
        cookTime: {
            attr: {
                name: 'cookTime',
                className: '',
            },
            ref: register({
                required: true,
                maxLength: 50
            }),
            errors: errors.cookTime
        },
        prepTime: {
            attr: {
                name: 'prepTime',
                className: '',
            },
            ref: register({
                required: true,
                maxLength: 50
            }),
            errors: errors.prepTime
        },
        servings: {
            attr: {
                name: 'servings',
                className: '',
            },
            ref: register({
                required: true,
                maxLength: 50
            }),
            errors: errors.servings
        }
    }

    const newIngredientInput = (e, name) => {
        if (getValues(newIngredient.name)) {
            console.log(getValues(newIngredient.name));
            setToFocus(name);
            ingredientAppend({
                name: getValues(newIngredient.name),
                amount: getValues(newIngredient.amount),
                measurement: getValues(newIngredient.measurement),
            })
        }
    }

    const removeIngredient = (i) => {
        if (!ingredientFields[i].name && !ingredientFields[i].amount && !ingredientFields[i].measurement) {
            ingredientRemove(i);
        }
    }


    const newDirectionInput = (e, name) => {
        directionAppend({
            instructions: getValues(newDirection.instructions),
            optional: getValues(newDirection.optional) ? true : false
        })
    }

    const removeDirection = (i) => {

    }


    useEffect(() => {
        console.log(ingredientFields);
        setValue(newIngredient.name, '');
        setValue(newIngredient.amount, '');
        setValue(newIngredient.measurement, '');
    }, [ingredientFields])

    useEffect(() => {
        console.log(directionFields);
        setValue(newDirection.instructions, '');
    }, [directionFields])

    return (
        <div style={{ maxWidth: "60%", margin: "0 auto" }}>
            <Card title={<React.Fragment>New Recipe</React.Fragment>}>
                <div className="questions-container" style={{ padding: "30px", paddingTop: "10px" }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputWrapper label="Title" htmlFor="title" errors={errors}>
                            <Input text attr={form['title'].attr} register={form['title'].ref} errors={form['title'].errors} />
                        </InputWrapper>
                        <InputWrapper label="Description" htmlFor="description" errors={errors}>
                            <Input text attr={form['description'].attr} register={form['description'].ref} errors={form['description'].errors} />
                        </InputWrapper>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <InputWrapper style={{ flexBasis: "30%" }} label="Cook Time" htmlFor="cookTime" errors={errors}>
                                <input type="number" {...form['cookTime'].attr} ref={form['cookTime'].ref} />
                            </InputWrapper>
                            <InputWrapper style={{ flexBasis: "30%" }} label="Prep Time" htmlFor="prepTime" errors={errors}>
                                <input type="number" {...form['prepTime'].attr} ref={form['prepTime'].ref} />
                            </InputWrapper>
                            <InputWrapper style={{ flexBasis: "30%" }} label="Servings" htmlFor="servings" errors={errors}>
                                <input type="number" {...form['servings'].attr} ref={form['servings'].ref} />
                            </InputWrapper>
                        </div>
                        <InputWrapper label="Ingredients" errors={errors}>
                            <div className={`options-wrapper`}>
                                {ingredientFields.map((field, i) => {
                                    return (
                                        <div className="choice-container" key={field.id}>
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <Input style={{ flexBasis: "65%" }} text attr={{ defaultValue: field.name, name: `${iName}[${i}].name`, autoFocus: toFocus == 1 ? true : false }} register={register({ required: { value: true, message: "required" } })} onChange={(e) => !e.target.value && removeIngredient(i)} />
                                                <Input style={{ flexBasis: "15%" }} number attr={{ defaultValue: field.amount, name: `${iName}[${i}].amount`, autoFocus: toFocus == 2 ? true : false }} register={register({ required: { value: true, message: "required" } })} onChange={(e) => !e.target.value && removeIngredient(i)} />
                                                <Input style={{ flexBasis: "15%" }} text attr={{ defaultValue: field.measurement, name: `${iName}[${i}].measurement`, autoFocus: toFocus == 3 ? true : false }} register={register({ required: { value: true, message: "required" } })} onChange={(e) => !e.target.value && removeIngredient(i)} />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="choice-container">
                                <div className={`text ${errors ? 'danger' : ''}`} style={{ display: "flex", justifyContent: "space-between" }}>
                                    <input style={{ flexBasis: "65%" }} type="text" name={newIngredient.name} placeholder="Enter name" ref={register({ required: { value: ingredientFields.length < 1, message: "required" } })} onChange={(e) => newIngredientInput(e)} />
                                    <input style={{ flexBasis: "15%" }} type="number" name={newIngredient.amount} placeholder="Enter amount" ref={register({ required: { value: ingredientFields.length < 1, message: "required" } })} />
                                    <input style={{ flexBasis: "15%" }} type="text" name={newIngredient.measurement} placeholder="Enter measurement" ref={register({ required: { value: ingredientFields.length < 1, message: "required" } })} />
                                </div>
                            </div>
                        </InputWrapper>
                        <InputWrapper label="Directions">
                            {directionFields.map((field, i) => {
                                return (
                                    <div className="choice-container" key={field.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <Input style={{ flexBasis: "75%" }} text attr={{ defaultValue: field.instructions, name: `${dName}[${i}].instructions`, autoFocus: true }} register={register()} onChange={(e) => !e.target.value && removeDirection(i)} />
                                        <label style={{ flexBasis: "5%" }} htmlFor={newDirection.optional}>Optional</label>
                                        <input style={{ flexBasis: "10%" }} type="checkbox" ref={register()} name={`${dName}[${i}].optional`} />
                                    </div>
                                )
                            })}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <input style={{ flexBasis: "75%" }} type="text" name={newDirection.instructions} placeholder="Type to add new option" ref={register({ required: { value: directionFields.length < 1, message: "required" } })} onChange={(e) => newDirectionInput(e)} />
                                <label style={{ flexBasis: "5%" }} htmlFor={newDirection.optional}>Optional</label>
                                <input style={{ flexBasis: "10%" }} type="checkbox" value={true} ref={register} name={newDirection.optional} />
                            </div>
                        </InputWrapper>
                        <button type="submit" className="submit card info" style={{ border: "none" }}>Next</button>
                    </form>
                </div>
            </Card>
        </div >
    )
}

export default NewRecipe
