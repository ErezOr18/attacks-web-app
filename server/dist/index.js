"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Attack_1 = require("./entities/Attack");
const typeorm_text_search_1 = require("typeorm-text-search");
const helper_1 = require("./helper");
const port = 5000;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield typeorm_1.createConnection({
            type: "postgres",
            database: "refael",
            username: "postgres",
            password: "postgres",
            entities: [Attack_1.Attack],
            logging: false,
            synchronize: true,
        });
        console.log("connection to database: ", conn.isConnected);
        yield typeorm_1.getRepository(Attack_1.Attack).delete({});
        yield helper_1.insertToDb();
        const app = express_1.default();
        app.use(cors_1.default());
        app.use(express_1.default.json());
        app.get("/api/attacks", (_req, res) => __awaiter(this, void 0, void 0, function* () {
            const attacks = yield typeorm_1.getRepository(Attack_1.Attack).find({});
            res.json(attacks);
        }));
        app.post("/api/attacks", (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.url);
            const take = req.query.take ? parseInt(req.query.take.toString()) : 10;
            const skip = req.query.skip ? parseInt(req.query.skip.toString()) : 0;
            const keyword = req.query.keyword || "";
            const query = yield typeorm_1.getRepository(Attack_1.Attack).createQueryBuilder("attack");
            typeorm_text_search_1.textSearchByFields(query, keyword, ["description"]);
            const [result, total] = yield query.take(take).skip(skip).getManyAndCount();
            res.send({ data: result, count: total });
        }));
        app.listen(port, () => console.log(`server is now listening on port: ${port}`));
    });
}
main().catch((err) => console.error(err));
//# sourceMappingURL=index.js.map