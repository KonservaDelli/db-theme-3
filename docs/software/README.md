# Реалізація інформаційного та програмного забезпечення

В рамках проекту розробляється: 
## - SQL-скрипт для створення на початкового наповнення бази даних
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema db-theme-3
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db-theme-3
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db-theme-3` DEFAULT CHARACTER SET utf8 ;
USE `db-theme-3` ;

-- -----------------------------------------------------
-- Table `db-theme-3`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db-theme-3`.`role` (
  `id` INT NOT NULL,
  `name` ENUM('Respondent', 'Interviewer') NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db-theme-3`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db-theme-3`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `role_id` INT NOT NULL,
  PRIMARY KEY (`id`, `role_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_users_role1_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `db-theme-3`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db-theme-3`.`quizes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db-theme-3`.`quizes` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `end_date` DATE NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db-theme-3`.`questions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db-theme-3`.`questions` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `help_text` VARCHAR(45) NOT NULL,
  `required` TINYINT NOT NULL,
  `quizes_id` INT NOT NULL,
  PRIMARY KEY (`id`, `quizes_id`),
  INDEX `fk_questions_quizes1_idx` (`quizes_id` ASC) VISIBLE,
  CONSTRAINT `fk_questions_quizes1`
    FOREIGN KEY (`quizes_id`)
    REFERENCES `db-theme-3`.`quizes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db-theme-3`.`options`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db-theme-3`.`options` (
  `id` INT NOT NULL,
  `text` VARCHAR(45) NOT NULL,
  `iscorrect` TINYINT NULL,
  `questions_id` INT NOT NULL,
  PRIMARY KEY (`id`, `questions_id`),
  INDEX `fk_options_questions1_idx` (`questions_id` ASC) VISIBLE,
  CONSTRAINT `fk_options_questions1`
    FOREIGN KEY (`questions_id`)
    REFERENCES `db-theme-3`.`questions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db-theme-3`.`results`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db-theme-3`.`results` (
  `id` INT NOT NULL,
  `options_id` INT NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`, `options_id`, `users_id`),
  INDEX `fk_results_options1_idx` (`options_id` ASC) VISIBLE,
  INDEX `fk_results_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_results_options1`
    FOREIGN KEY (`options_id`)
    REFERENCES `db-theme-3`.`options` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_results_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `db-theme-3`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db-theme-3`.`State`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db-theme-3`.`State` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db-theme-3`.`actionType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db-theme-3`.`actionType` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db-theme-3`.`actions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db-theme-3`.`actions` (
  `id` INT NOT NULL,
  `actedAt` DATETIME NOT NULL,
  `State_id` INT NOT NULL,
  `actionType_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_actions_State1_idx` (`State_id` ASC) VISIBLE,
  INDEX `fk_actions_actionType1_idx` (`actionType_id` ASC) VISIBLE,
  CONSTRAINT `fk_actions_State1`
    FOREIGN KEY (`State_id`)
    REFERENCES `db-theme-3`.`State` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_actions_actionType1`
    FOREIGN KEY (`actionType_id`)
    REFERENCES `db-theme-3`.`actionType` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db-theme-3`.`groups`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db-theme-3`.`groups` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `creatorId` INT NOT NULL,
  `actions_id` INT NOT NULL,
  `users_id` INT NOT NULL,
  `users_Roles_id` INT NOT NULL,
  `quizes_id` INT NOT NULL,
  PRIMARY KEY (`id`, `actions_id`, `users_id`, `users_Roles_id`, `quizes_id`),
  INDEX `fk_groups_actions1_idx` (`actions_id` ASC) VISIBLE,
  INDEX `fk_groups_users1_idx` (`users_id` ASC, `users_Roles_id` ASC) VISIBLE,
  INDEX `fk_groups_quizes1_idx` (`quizes_id` ASC) VISIBLE,
  CONSTRAINT `fk_groups_actions1`
    FOREIGN KEY (`actions_id`)
    REFERENCES `db-theme-3`.`actions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_groups_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `db-theme-3`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_groups_quizes1`
    FOREIGN KEY (`quizes_id`)
    REFERENCES `db-theme-3`.`quizes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `db-theme-3`.`role`
-- -----------------------------------------------------
START TRANSACTION;
USE `db-theme-3`;
INSERT INTO `db-theme-3`.`role` (`id`, `name`) VALUES (1, 'Respondent');
INSERT INTO `db-theme-3`.`role` (`id`, `name`) VALUES (2, 'Interviewer');

COMMIT;
## - RESTfull сервіс для управління даними
**Налаштування Express сервера**

```
const express = require("express");
const cors = require("cors");
const router = require("./routes");
const AppError = require("./utils/appError");
const errorHandler = require("./utils/errorHandler");

const app = express();
// Use express.json() middleware to parse the URL encoded body
app.use(express.json());
app.use(cors());
app.use("/api", router);

app.all("*", (req, res, next) => {
  next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
});
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

module.exports = app;
```

**Підключення до бази даних MySQL**
```
const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "HV-IO-21",
});

conn.connect();

module.exports = conn;
```

**Створення контролерів додатка**
```
const AppError = require("../utils/appError");
const conn = require("../services/db");

exports.getAllUsers = (req, res, next) => {
  conn.query("SELECT * FROM User", function (err, data, fields) {
    if (err) return next(new AppError(err));
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
    });
  });
};

exports.createUser = (req, res, next) => {
  if (!req.body) return next(new AppError("No form data found", 404));
  const values = [
    req.body.username,
    req.body.email,
    req.body.password,
    req.body.Role,
  ];
  conn.query(
    "INSERT INTO User (username, email, password, Role) VALUES(?)",
    [values],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "user added!",
      });
    }
  );
};

exports.getUserById = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No user id found", 404));
  }
  conn.query(
    "SELECT * FROM User WHERE id = ?",
    [req.params.id],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      });
    }
  );
};

exports.updateUser = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No user id found", 404));
  }
  conn.query(
    "UPDATE User SET username=?, email=?, password=?, Role=? WHERE id=?",
    [
      req.body.username,
      req.body.email,
      req.body.password,
      req.body.Role,
      req.params.id,
    ],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "user info updated!",
      });
    }
  );
};

exports.deleteUser = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No todo id found", 404));
  }
  conn.query(
    "DELETE FROM User WHERE id=?",
    [req.params.id],
    function (err, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "user deleted!",
      });
    }
  );
};
```

**Створення глобальних обробників помилок**
```
class AppError extends Error {
  constructor(msg, statusCode) {
    super(msg);

    this.statusCode = statusCode;
    this.error = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;
```
```
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
```

**Створення routes**

```
const express = require("express");
const controllers = require("../controllers");
const router = express.Router();

router.route("/User").get(controllers.getAllUsers).post(controllers.createUser);
router
  .route("/User/:id")
  .get(controllers.getUserById)
  .put(controllers.updateUser)
  .delete(controllers.deleteUser);
module.exports = router;
```
