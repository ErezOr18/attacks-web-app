import cors from "cors";
import express from "express";
import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import { Attack } from "./entities/Attack";
import { textSearchByFields } from "typeorm-text-search";
import { insertToDb } from "./helper";

const port = 5000;

async function main() {
  const conn = await createConnection({
    type: "postgres",
    database: "refael",
    username: "postgres",
    password: "postgres",
    entities: [Attack],
    logging: false,
    synchronize: true,
  });
  console.log("connection to database: ", conn.isConnected);
  await getRepository(Attack).delete({});
  await insertToDb();
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/api/attacks", async (_req, res) => {
    const attacks = await getRepository(Attack).find({});
    res.json(attacks);
  });

  app.post("/api/attacks", async (req, res) => {
    console.log(req.url);
    const take = req.query.take ? parseInt(req.query.take.toString()) : 10;
    const skip = req.query.skip ? parseInt(req.query.skip.toString()) : 0;
    const keyword: string = (req.query.keyword as string) || "";
    // const condition = {
    //   description: Like(String("%" + keyword + "%")),
    // };
    // const [result, total] = await getRepository(Attack).findAndCount({
    //   where: condition,
    //   order: { name: "DESC" },
    //   take: take,
    //   skip: skip,
    // });
    const query = await getRepository(Attack).createQueryBuilder("attack");
    textSearchByFields<Attack>(query, keyword, ["description"]);
    const [result, total] = await query.take(take).skip(skip).getManyAndCount();
    res.send({ data: result, count: total });
  });
  app.listen(port, () =>
    console.log(`server is now listening on port: ${port}`)
  );
}

main().catch((err) => console.error(err));
