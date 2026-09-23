const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

const users = [];

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
  }

  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
  }

  try {

    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = {
      id: Date.now(),
      name,
      email,
      password: hashedPassword
    };
    users.push(newUser);

    console.log('Зарегистрирован новый пользователь:', email);


    res.status(201).json({
        message: 'Аккаунт успешно создан!',
        user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});