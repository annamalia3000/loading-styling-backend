import express from "express"; // фреймворк Express для создания HTTP-сервера
import cors from "cors"; // middleware CORS для разрешения кросс-доменных запросов
import bodyParser from "body-parser"; // парсинг тела запросов в формате JSON

import pino from "pino"; // логгер для ведения журналов событий
import pinoPretty from "pino-pretty"; // для форматирования логов

const app = express();
const logger = pino(pinoPretty()); // логгер Pino с использованием Pino Pretty для форматирования логов

app.use(cors()); // middleware CORS для обработки запросов с других доменов

app.use(
  bodyParser.json({
    type(req) {
      return true; // bodyParser должен парсить все запросы как JSON
    },
  })
);

app.get("/api/data", (req, res) => {
  setTimeout(() => {
    res.json({ message: "Данные успешно загружены" });
  }, 10000); 
});

const port = process.env.PORT || 7070;

const bootstrap = async () => {
  try {
    app.listen(port, () =>
      logger.info(`Server has been started on http://localhost:${port}`)
    );
  } catch (error) {
    console.error(error);
  }
};

bootstrap();
