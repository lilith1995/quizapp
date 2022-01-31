import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Modal from "../Modal/Modal";

import View from "../../assets/viewicon.png";
import Edit from "../../assets/edit.png";
import Delete from "../../assets/deleteicon.png";

import './Admin.scss';

const Admin = () => {
    const [questionList, setQuestionList] = useState({
        description: " ",
        choices: " ",
        answer: " "
    });

    const { description, choices, answer } = questionList;


    const onChange = e => setQuestionList({ ...questionList, [e.target.name]: e.target.value });


    const [editList, setEditList] = useState({
        description: " ",
        choices: " ",
        answer: " "
    });

    // const onChoicesChangeHandler = e => setQuestionList({ ...questionList, choices: e.target.value.split(',') });

    const [displayAdd, setDisplayAdd] = useState(false);
    const [displayView, setDisplayView] = useState(false);
    const [displayEdit, setDisplayEdit] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);


    let history = useHistory();

    useEffect(
        () => {
            const getQuestions = async () => {
                try {
                    const res = await fetch("/api/questions");
                    const data = await res.json();
                    setQuestionList(data);
                } catch (e) {
                    console.log('Something went wrong, please try again later.')
                }
            }
            getQuestions();
        },
        []
    );

    const onAdding = async e => {
        e.preventDefault();

        const body = {
            description,
            choices: choices.split(','),
            answer

        }

        try {

            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }
            const res = await axios.post('/api/admin/addQuestion', body, config)
            console.log(res.data);
            history.push('/admin')
            window.location.reload();
        } catch (err) {
            console.error(err.response.data);

        }
        setDisplayAdd(false)
    };

    const deletingQuestion = (id) => () => {
        const link = '/api/admin/deleteQuestion/' + id;

        const deleteItem = async () => {
            try {
                await axios.delete(link);

                let arr = [];
                let index = 0;

                for (let item in questionList) {
                    if (questionList[item]._id !== id) {
                        arr[index] = questionList[item];
                        index++;
                    }
                }
                setQuestionList(arr);
            } catch (e) {
                console.log('Something went wrong, please try again!');
            }
        }
        deleteItem();
    }

    const onUpdateing = (id, index) => async () => {

        const updateQuestion = {
            description,
            choices,
            answer,
        };

        if (updateQuestion.description && updateQuestion.answer && updateQuestion.choices) {

            try {
                const config = {
                    headers: {
                        'Content-type': 'application/json'
                    }
                }

                await axios.put('/updateQuestion/' + id, updateQuestion, config)

                let arrQuestions = [];

                for (let i = 0; i < questionList.length; i++) {
                    arrQuestions[i] = questionList[i];
                    if (i === index) {
                        arrQuestions[i].description = updateQuestion.description;
                        arrQuestions[i].choices = updateQuestion.choices;
                        arrQuestions[i].answer = updateQuestion.answer;
                    }
                }

                setQuestionList(arrQuestions)
            } catch (e) {
                console.error("'Something went wrong, please try again!'");
            }

            setDisplayEdit(false);
        }
    }

    const exitToMainPage = () => {
        history.push({ pathname: '/auth' });
    }

    return (
        <div className='adminplace'>
            <BrowserRouter>
                <Route path="/admin">
                    <button type="button" className="buttonquit" onClick={exitToMainPage}>Exit</button>
                    <h2>Here you can see all the questions, edit and delete them or add the new one</h2>
                    <section className="quiztable">
                        <table>
                            <thead>
                                <tr>
                                    <th >ID</th>
                                    <th >Question</th>
                                    <th >Choices</th>
                                    <th >Correct Answer</th>
                                </tr>
                            </thead>
                            <tbody className='tabledata'>
                                {questionList.length >= 1 &&
                                    questionList.map((currentQuestion, index) => (
                                        <tr key={currentQuestion._id} className="tableitems" >
                                            <td scope="row">{currentQuestion._id}</td>
                                            <td>{currentQuestion.description}</td>
                                            <td>{currentQuestion.choices[0]}, {currentQuestion.choices[1]}, {currentQuestion.choices[2]}, {currentQuestion.choices[3]}</td>
                                            <td>{currentQuestion.answer}</td>
                                            <td><img onClick={() => { setCurrentIndex(index); setDisplayView(true); }} className="viewicon" src={View} alt="View" /></td>
                                            <td><img onClick={() => { setCurrentIndex(index); setDisplayEdit(true); }} className="viewicon" src={Edit} alt="Edit" /></td>
                                            <td><img onClick={deletingQuestion(currentQuestion._id)} className="deleteicon" src={Delete} alt="Delete" /></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </section>
                    <button type="button" className="buttonadd" onClick={() => setDisplayAdd(true)}>Add question</button>
                    {questionList[currentIndex] &&
                        <Modal show={displayView} setShow={setDisplayView}>
                            <div className='modalshow'>
                                <h4>Question: {questionList[currentIndex].description}.</h4>
                                <p>Choices: {questionList[currentIndex].choices[0]}, {questionList[currentIndex].choices[1]}, {questionList[currentIndex].choices[2]}, {questionList[currentIndex].choices[3]} .</p>
                                <p>Correct Answer: {questionList[currentIndex].answer}</p>
                            </div>
                        </Modal>
                    }
                    <Modal show={displayAdd} setShow={setDisplayAdd}>
                        <form action="" className='modaladd'>
                            <h3>Add a new question</h3>
                            <div className="input">
                                <input type="text" placeholder="Type Question" name="description" value={description || ""} onChange={e => onChange(e)
                                } required />
                            </div>
                            <div className="input">
                                <input type="text" placeholder="Type the choices and separate them with comma" name="choices" value={choices || ""} onChange={e => onChange(e)
                                } required />
                            </div>
                            <div className="input">
                                <input type="text" placeholder="Type the correct answer" name="answer" value={answer || ""} onChange={e => onChange(e)
                                } required />
                            </div>
                            <button onClick={e => onAdding(e)} className="buttonssaveadding" type="button">Save</button>
                        </form>
                    </Modal>
                    {questionList[currentIndex] &&
                        <Modal show={displayEdit} setShow={setDisplayEdit}>
                            <form action="" className='modaledit'>
                                <h3>Edit the question, choices and the correct answer</h3>
                                <div className="input">
                                    <input type="text" defaultValue={questionList[currentIndex].description} onChange={e => setEditList((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))} required />
                                </div>
                                <div className="input">
                                    <input type="text" placeholder="Type the choices" name="choices" defaultValue={questionList[currentIndex].choices} onChange={e => setEditList((prev) => ({
                                        ...prev,
                                        choices: e.target.value,
                                    }))} required />
                                </div>
                                <div className="input">
                                    <input type="text" placeholder="Type the correct answer" name="answer" defaultValue={questionList[currentIndex].answer} onChange={e => setEditList((prev) => ({
                                        ...prev,
                                        answer: e.target.value,
                                    }))} required />
                                </div>
                                <button className="buttonsave" type="button" onClick={onUpdateing(questionList[currentIndex]._id, currentIndex)}>Save</button>
                            </form>
                        </Modal>
                    }
                </Route>
            </BrowserRouter>
        </div>
    );
}


export default Admin;