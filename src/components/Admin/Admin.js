import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Modal from "../Modal/Modal";

import View from "../../assets/viewicon.png";
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
            history.push('/')
        } catch (err) {
            console.error(err.response.data);

        }
        setDisplayAdd(false)
    };
    const deletingQuestion = (id) => () => {
        const link = '/api/admin/deleteQuestion/' + id;

        const deleteItem = async () => {
            try {
                await fetch(link, { method: 'DELETE' });

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
                console.log('Something went wrong, please try again later.');
            }
        }
        deleteItem();
    }

    const updatingQuestion = async e => {

        let body = {
            description,
            choices,
            answer
        };
        try {

            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }
            const res = await axios.put('/api/admin/updateQuestion/:id', body, config)
            console.log(res.data);
            history.push('/')
        } catch (err) {
            console.error(err.response.data);
            setDisplayEdit(false)

        }
        setDisplayAdd(false);
    };

    const exitToMainPage = () => {
        history.push({ pathname: '/' });
    }

    return (
        <div className='adminplace'>
            <BrowserRouter>
                <Route path="/admin">
                    <button type="button" className="buttonquit" onClick={exitToMainPage}>Exit</button>
                    <h3>Here you can see all the questions, edit and delete them or add the new one</h3>
                    <section className="quiztable">
                        <thead>
                            <tr>
                                <th >ID</th>
                                <th >Question</th>
                                <th >Choices</th>
                                <th >Correct Answer</th>
                            </tr>
                        </thead>
                        <tbody className="tabledata">
                            {questionList.length >= 1 &&
                                questionList.map((currentQuestion, index) => (
                                    <tr key={currentQuestion._id} onDoubleClick={() => { setDisplayView(true); setCurrentIndex(index); }} className="tableitems" >
                                        <th scope="row">{currentQuestion._id}</th>
                                        <td>{currentQuestion.description}</td>
                                        <td>{currentQuestion.choices[0]}, {currentQuestion.choices[1]}, {currentQuestion.choices[2]}, {currentQuestion.choices[3]}</td>
                                        <td>{currentQuestion.answer}</td>
                                        <td><img onClick={() => { setCurrentIndex(index); setDisplayEdit(true); }} className="viewicon" src={View} /></td>
                                        <td><img onClick={deletingQuestion(currentQuestion._id)} className="deleteicon" src={Delete} /></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </section>
                    <button type="button" className="buttonadd" onClick={() => setDisplayAdd(true)}>Add question</button>
                    {questionList[currentIndex] &&
                        <Modal show={displayView} setFoo={setDisplayView}>
                            <h4>Question: {questionList[currentIndex].description}.</h4>
                            <p>Choices: {questionList[currentIndex].choices}.</p>
                            <p>Correct Answer: {questionList[currentIndex].answer}</p>
                        </Modal>
                    }
                    <Modal show={displayAdd} setShow={setDisplayAdd}>
                        <form action="" className='addform'>
                            <div className="input">
                                <input type="text" placeholder="Type Question" name="description" value={description || ""} onChange={e => onChange(e)
                                } required />
                            </div>
                            <div className="input">
                                <input type="text" placeholder="Type the choices" name="choices" value={choices} onChange={e => onChange(e)
                                } required />
                            </div>
                            <div className="input">
                                <input type="text" placeholder="Type the correct answer" name="answer" value={answer || ""} onChange={e => onChange(e)
                                } required />
                            </div>
                            <button onClick={e => onAdding(e)} className="buttonadd" type="button">Add question</button>
                        </form>
                    </Modal>
                    {questionList[currentIndex] &&
                        <Modal show={displayEdit} setShow={setDisplayEdit}>
                            <form action="">
                                <div className="input">
                                    <input type="text" defaultValue={questionList[currentIndex].description} value={description} />
                                </div>
                                <div className="input">
                                    <input type="text" placeholder="Type the choices" name="choices" defaultValue={questionList[currentIndex].choices} value={choices} onChange={e => onChange(e)
                                    } required />
                                </div>
                                <div className="input">
                                    <input type="text" placeholder="Type the correct answer" name="answer" defaultValue={questionList[currentIndex].answer} value={answer} onChange={e => onChange(e)
                                    } required />
                                </div>
                                <button className="buttonedit" type="button" onClick={updatingQuestion(questionList[currentIndex]._id, currentIndex)}>Save</button>
                            </form>
                        </Modal>
                    }
                </Route>
            </BrowserRouter>
        </div>
    );
}


export default Admin;