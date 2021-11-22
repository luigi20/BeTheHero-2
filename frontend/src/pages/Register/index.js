import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import { useForm } from 'react-hook-form';

export default function Register() {
    /*  const [name, setName] = useState();
      const [email, setEmail] = useState();
      const [password, setPassword] = useState();
      const [uf, setUf] = useState();
      const [whatsapp, setWhatsapp] = useState();
      const [city, setCity] = useState();*/

    const navigate = useNavigate();

    const { register, handleSubmit, errors, reset } = useForm({
        defaultValues: { name: "", email: "", password: "", uf: "", whatsapp: "", city: "" },
    });



    async function handleRegister({ name, email, password, uf, whatsapp, city }, e) {
        e.preventDefault();
        const dataOng = {
            name,
            email,
            password,
            whatsapp,
            city,
            uf
        };
        try {
            await api.post('/register_ongs', dataOng);
            alert("Cadastro Realizado Com Sucesso.");
            navigate('/');
        } catch (error) {
            for (const status in error.response.data) {
                alert(status + ': ' + error.response.data[status]);
            }

        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p> Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleSubmit(handleRegister)}>
                    <input placeholder="Nome da ONG"
                        {...register('name', { required: true })}
                    />
                    <input type="email" placeholder="E-mail"
                        {...register('email', { required: true })}
                    />
                    <input type="password" placeholder="Senha"
                        {...register('password', { required: true })}
                    />
                    <input placeholder="Whatsapp"
                        {...register('whatsapp', { required: true })}
                    />
                    <div className="input-group">
                        <select placeholder="UF" >
                            <option selected value="UF">UF</option>
                            <option value="laranja">Laranja</option>
                            <option value="limao">Limão</option>
                            <option value="manga">Manga</option>
                        </select>
                        <input placeholder="Cidade" style={{ width: 80 }}
                            {...register('cidade', { required: true })}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}