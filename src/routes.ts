import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateAviability,
  updateProduct,
} from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router();

router.get("/", getProducts);
router.get(
  "/:id",
  param("id").isInt().withMessage("Not valid ID"),
  handleInputErrors,
  getProductById,
);

router.post(
  "/",

  body("name").notEmpty().withMessage("Product name is required"),

  body("price")
    .isNumeric()
    .withMessage("Not valid value")
    .notEmpty()
    .withMessage("Product price is required")
    .custom((value) => value > 0)
    .withMessage("Not valid Price"),
  handleInputErrors,
  createProduct,
);

router.put(
  "/:id",
  param("id").isInt().withMessage("Not valid ID"),
  body("name").notEmpty().withMessage("Product name is required"),

  body("price")
    .isNumeric()
    .withMessage("Not valid value")
    .notEmpty()
    .withMessage("Product price is required")
    .custom((value) => value > 0)
    .withMessage("Not valid Price"),
  body("availability").isBoolean().withMessage("Not valid value"),
  handleInputErrors,
  updateProduct,
);

router.patch(
  "/:id",
  param("id").isInt().withMessage("Not valid ID"),
  body("availability").isBoolean().withMessage("Not valid value"),
  handleInputErrors,
  updateAviability,
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("Not valid ID"),
  handleInputErrors,
  deleteProduct,
);
export default router;
