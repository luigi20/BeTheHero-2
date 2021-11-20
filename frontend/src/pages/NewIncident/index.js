import React, { useState } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    async function handleNewIncident(e) {
        e.preventDefault();
        const data = {
            title,
            description,
            value,
        }
        try {
            await api.post('register_incidents', data, {
                headers: {
                    Authorization: token,
                    context: ongId
                }
            })
            navigate('/profile');
        } catch (error) {
            alert('Erro ao Cadastrar');
        }
    }
    return (
        <div className="new-incident">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastrar Novo Caso</h1>
                    <p> Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="E02041" />
                        Voltar para a Home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input placeholder="Titulo do Caso"
                        value={title} onChange={e => setTitle(e.target.value)} />
                    <textarea placeholder="Descrição"
                        value={description} onChange={e => setDescription(e.target.value)} />
                    <input placeholder="Valor em Reais"
                        value={value} onChange={e => setValue(e.target.value)} />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}