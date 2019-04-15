import express from "express";
import HttpStatus from "http-status-codes";

const router = express.Router({ mergeParams: true });

const info = (req, res) => {
  return res.status(HttpStatus.OK).json({
    info: {
      phoneNumbers: [
        {
          name: "Darren O'Hagan",
          number: "1234567890"
        },
        {
          name: "Devin Clancy",
          number: "0987654321"
        }
      ],
      address: {
        street: "230 Ridout St",
        city: "Walkerton",
        province: "Ontario",
        postalCode: "N0G 2V0"
      }
    }
  });
};

router.get("/", info);

export default router;
