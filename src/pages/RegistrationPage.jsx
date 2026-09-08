import React, { useState } from 'react';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatusMessage({ text: '', type: '' });

        try {
            const response = await window.fetch('https://cscai.pythonanywhere.com/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatusMessage({ text: 'Регистрация прошла успешно!', type: 'success' });
                setFormData({ username: '', email: '', password: '' }); // Очищаем форму
            } else {
                setStatusMessage({ text: data.message || 'Ошибка регистрации', type: 'error' });
            }
        } catch (error) {
            setStatusMessage({ text: 'Не удалось подключиться к серверу', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-slate-900 text-slate-100 flex items-center justify-center min-h-screen px-4">
            <div className="bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-700">

                {}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white">Регистрация в CSCAI</h2>
                    <p className="text-sm text-slate-400 mt-2">Создайте аккаунт, чтобы получить доступ к платформе</p>
                </div>

                {}
                {statusMessage.text && (
                    <div className={`mb-4 p-3 rounded-lg text-sm border ${
                        statusMessage.type === 'success'
                            ? 'bg-green-500/10 text-green-400 border-green-500/20'
                            : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                        {statusMessage.text}
                    </div>
                )}

                {}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Имя пользователя</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            placeholder="johndoe"
                        />
                    </div>

                    {}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Email адрес</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            placeholder="name@example.com"
                        />
                    </div>

                    {}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Пароль</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                            placeholder="••••••••"
                        />
                    </div>

                    {}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2.5 rounded-lg transition duration-200 shadow-lg shadow-blue-600/20">
                        {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
                    </button>
                </form>

                {}
                <p className="text-center text-sm text-slate-400 mt-6">
                    Уже есть аккаунт? <a href="/login" className="text-blue-400 hover:underline font-medium">Войти</a>
                </p>
                <div className="text-center mt-4">
                    <a href="/" className="text-xs text-slate-500 hover:text-slate-400 transition">← На главную</a>
                </div>
            </div>
        </div>
    );
}