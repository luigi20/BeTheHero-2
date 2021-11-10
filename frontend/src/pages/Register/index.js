import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';

export default function Logon() {
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p> Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link to="/register">
                        <FiLogIn size={16} color="E02041" />
                        Não tenho Cadastro
                    </Link>
                </section>
                <form>
                    <input placeholder="Nome da ONG"
                    />
                    <input type="email" placeholder="E-mail"
                    />
                    <input type="password" placeholder="Senha"
                    />
                    <input placeholder="Whatsapp"
                    />
                    <div className="input-group">
                        <input placeholder="Cidade"
                        />
                        <input placeholder="UF" style={{ width: 80 }}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}